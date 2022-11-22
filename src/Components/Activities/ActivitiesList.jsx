import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import {
	deleteActivity,
	getActivities,
	getAmountOfActivities,
} from "Services/Activity/ApiService";

import TableContainer from "Components/common/Table/TableContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TableInputSearch from "Components/common/Table/TableInputSearch";
import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableTitle from "Components/common/Table/TableTitle";
import TableHeader from "Components/common/Table/TableHeader";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";
import TablePagination from "Components/common/Table/TablePagination";

const ActivitiesList = () => {
	const [activities, setActivities] = useState([]);
	const [amountOfActivities, setAmountOfActivities] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [amountToShow, setAmountToShow] = useState(5);
	const [page, setPage] = useState(0);

	const updateActivities = async () => {
		setIsLoading(true);
		const { error, data } = await getActivities(search, amountToShow, page);
		if (error) {
			Swal.fire(
				`${error} error de peticion. Pongase en contacto con el administrador. `
			);
		} else {
			setActivities(data);
			setIsLoading(false);
		}
	};

	const updateAmountOfActivities = async () => {
		const { data, error } = await getAmountOfActivities(search);
		if (error) {
			Swal.fire(
				`${error} error de peticion. Pongase en contacto con el administrador. `
			);
		} else {
			setAmountOfActivities(data);
		}
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			updateActivities();
		}, 300);
		return () => clearTimeout(debounce);
	}, [amountToShow, page, search]);

	useEffect(() => {
		const debounce = setTimeout(() => {
			setPage(0);
			updateAmountOfActivities();
		}, 300);
		return () => clearTimeout(debounce);
	}, [amountToShow, search]);

	const handlePreviusPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (page < Math.floor(amountOfActivities / amountToShow)) setPage(page + 1);
	};

	const handleDelete = id => {
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
				const { error } = deleteActivity(id);
				if (error) {
					Swal.fire(
						`${error} error de peticion. Pongase en contacto con el administrador. `
					);
				} else {
					setSearch(search + " ");
				}
			}
		});
	};

	return (
		<TablePrincipalContainer>
			<TableTitle title={"Actividades"} />
			<TableContainerFilters>
				<TableDropDownList
					options={[
						{ value: 5, name: 5 },
						{ value: 10, name: 10 },
					]}
					name="pagination"
					setOnChange={setAmountToShow}
				/>
				<TableInputSearch
					placeholder="Buscar por nombre"
					inputFilter={search}
					setInputFilter={setSearch}
				/>
				<Link
					to={"/backoffice/create-activity"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Actividad
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<table className=" min-w-full leading-normal">
					<thead>
						<tr>
							<TableHeader>Nombre</TableHeader>
							<TableHeader>Imagen</TableHeader>
							<TableHeader>Creado</TableHeader>
							<TableHeader>Editar</TableHeader>
							<TableHeader>Borrar</TableHeader>
						</tr>
					</thead>
					<tbody>
						{!isLoading &&
							activities?.map(activity => {
								return (
									<tr key={activity.id}>
										<TableFieldContainer className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className=" text-gray-900 whitespace-nowrap">
												{activity.name}
											</p>
										</TableFieldContainer>
										<TableFieldContainer className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<img
												src={activity.image}
												className=" w-14 h-9 "
												alt="Imagen no disponible"
											/>
										</TableFieldContainer>
										<TableFieldContainer className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className=" text-gray-900 whitespace-nowrap">
												{activity.created_at.slice(0, 10)}
											</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<Link to={`/backoffice/update-activity/${activity.id}`}>
												<FaRegEdit size={30} className="text-yellow-500" />
											</Link>
										</TableFieldContainer>
										<TableFieldContainer>
											<button onClick={() => handleDelete(activity.id)}>
												<FaRegTrashAlt size={30} className="text-red-600" />
											</button>
										</TableFieldContainer>
									</tr>
								);
							})}
					</tbody>
				</table>
				<TablePagination
					title="Actividades"
					page={page + 1}
					amountOfPages={Math.floor(amountOfActivities / amountToShow + 1)}
					amount={amountOfActivities}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
				/>
			</TableContainer>
		</TablePrincipalContainer>
	);
};

export default ActivitiesList;
