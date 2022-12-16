import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";

import { searchCategory, getCategories, deleteCategory } from "Services/Category/ApiService";

import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";
import TableContainer from "Components/common/Table/TableContainer";
import TableTitle from "Components/common/Table/TableTitle";
import TableHeader from "Components/common/Table/TableHeader";
import TableInputSearch from "Components/common/Table/TableInputSearch";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [inputFilter, setInputFilter] = useState("");

	useEffect(() => {
		getCategories(setCategories);
	}, []);

	useEffect(() => {
		const debounce = setTimeout(() => {
			searchCategory(setCategories, inputFilter);
		}, 500);
		return () => clearTimeout(debounce);
	}, [inputFilter]);

	const handleDeleteCategory = id => {
		Swal.fire({
			title: "Estas seguro?",
			text: "No se pueden deshacer estos cambios!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Aceptar",
			cancelButtonText: "Cancelar",
		}).then(result => {
			if (result.isConfirmed) {
				deleteCategory(id);
			}
		});
	};

	return (
		<TablePrincipalContainer>
			<TableTitle title={"Categorias"} />
			<TableContainerFilters>
				<TableInputSearch placeholder="Buscar por nombre" inputFilter={inputFilter} setInputFilter={setInputFilter} />
				<Link
					to={"/backoffice/categorias/crear"}
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
						{categories?.map(category => {
							return (
								<tr key={category.id}>
									<TableFieldContainer className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<p className="text-gray-900 whitespace-no-wrap">{category.name}</p>
									</TableFieldContainer>
									<TableFieldContainer>
										<p className="text-gray-900 whitespace-no-wrap">{category.description}</p>
									</TableFieldContainer>
									<TableFieldContainer>
										<Link to={"/backoffice/categorias/editar/" + category.id}>
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
					</tbody>
				</table>
			</TableContainer>
		</TablePrincipalContainer>
	);
};
export default Categories;
