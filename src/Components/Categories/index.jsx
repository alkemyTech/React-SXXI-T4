import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";

import {
	getCategories,
	getAmountOfCategories,
	deleteCategory,
} from "Services/Category/ApiService";

import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";
import TableContainer from "Components/common/Table/TableContainer";
import TableTitle from "Components/common/Table/TableTitle";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TableInputSearch from "Components/common/Table/TableInputSearch";
import TableHeader from "Components/common/Table/TableHeader";
import TablePagination from "Components/common/Table/TablePagination";

const Categories = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [page, setPage] = useState(0);
	const [amountToShow, setAmountToShow] = useState(5);
	const [inputFilter, setInputFilter] = useState("");
	const [amountOfCategories, setAmountOfCategories] = useState(0);
	const [filterTypeOfCategory, setFilterTypeOfCategory] = useState("");

	useEffect(() => {
		setIsLoading(true);
		const debounce = setTimeout(() => {
			getCategories(
				setCategories,
				amountToShow,
				page,
				filterTypeOfCategory,
				inputFilter
			);
			setIsLoading(false);
		}, 300);
		return () => clearTimeout(debounce);
	}, [amountToShow, page, filterTypeOfCategory, inputFilter]);
	useEffect(() => {
		const debounce = setTimeout(() => {
			setPage(0);
			getAmountOfCategories(
				setAmountOfCategories,
				filterTypeOfCategory,
				inputFilter
			);
		}, 300);
		return () => clearTimeout(debounce);
	}, [filterTypeOfCategory, amountToShow, inputFilter]);

	const handlePreviusPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (page < Math.floor(amountOfCategories / amountToShow)) setPage(page + 1);
	};
	const handleDeleteCategory = id => {
		Swal.fire({
			title: "Estas seguro?",
			text: "No se pueden deshacer estos cambios!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si! Borrar",
			cancelButtonText: "No! no borrar",
		}).then(result => {
			if (result.isConfirmed) {
				deleteCategory(id);
				setInputFilter(inputFilter + " ");
			}
		});
	};

	return (
		<TablePrincipalContainer>
			<TableTitle title={"Categorias"} />
			<TableContainerFilters>
				<TableDropDownList
					options={[
						{ value: 5, name: 5 },
						{ value: 10, name: 10 },
					]}
					name="pagination"
					setOnChange={setAmountToShow}
				/>
				<TableDropDownList
					options={[
						{ value: "", name: "Todos" },
						{ value: 1, name: "Administrador" },
						{ value: 2, name: "Usuario" },
					]}
					name="role_id"
					setOnChange={setFilterTypeOfCategory}
				/>

				<TableInputSearch
					placeholder="Buscar por nombre"
					inputFilter={inputFilter}
					setInputFilter={setInputFilter}
				/>
				<Link
					to={"/backoffice/create-category"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Categoria
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<table className="min-w-full leading-normal">
					<thead>
						<tr>
							<TableHeader>Nombre</TableHeader>
							<TableHeader>Descripcion</TableHeader>
							<TableHeader>Editar</TableHeader>
							<TableHeader>Borrar</TableHeader>
						</tr>
					</thead>
					<tbody>
						{!isLoading &&
							categories?.map(category => {
								return (
									<tr key={category.id}>
										<TableFieldContainer className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{category.name}
											</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<p className="text-gray-900 whitespace-no-wrap">
												{category.description}
											</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<Link to={"/backoffice/update-category/" + category.id}>
												<FaRegEdit size={30} className=" text-yellow-500" />
											</Link>
										</TableFieldContainer>
										<TableFieldContainer>
											<button onClick={() => handleDeleteCategory(category.id)}>
												<FaRegTrashAlt size={30} className="text-red-600" />
											</button>
										</TableFieldContainer>
									</tr>
								);
							})}
						{isLoading &&
							_.times(amountToShow, i => (
								<tr key={"skeletonUserList" + i}>
									<TableFieldContainer className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<Skeleton width={"100%"} height={"30px"} />
									</TableFieldContainer>
									<TableFieldContainer>
										<Skeleton width={"100%"} height={"30px"} />
									</TableFieldContainer>
									<TableFieldContainer>
										<Skeleton width={"100%"} height={"30px"} />
									</TableFieldContainer>
									<TableFieldContainer>
										<Skeleton width={"100%"} height={"30px"} />
									</TableFieldContainer>
								</tr>
							))}
					</tbody>
				</table>
				<TablePagination
					title="categorias"
					page={page + 1}
					amountOfPages={Math.floor(amountOfCategories / amountToShow + 1)}
					amountOfUsers={amountOfCategories}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
				/>
			</TableContainer>
		</TablePrincipalContainer>
	);
};
export default Categories;
