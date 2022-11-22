import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TableContainer from "Components/common/Table/TableContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TableInputSearch from "Components/common/Table/TableInputSearch";
import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableTitle from "Components/common/Table/TableTitle";
import TableHeader from "Components/common/Table/TableHeader";
import Swal from "sweetalert2";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";
import TablePagination from "Components/common/Table/TablePagination";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const ActivitiesList = () => {
	const [activities, setActivities] = useState([]);
	const [amountOfActivities, setAmountOfActivities] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [amountToShow, setAmountToShow] = useState(5);
	const [page, setPage] = useState(0);

	const getActivities = async () => {
		setIsLoading(true);
		const res = { data: {}, error: null };
		try {
			const { data } = await axios.get(
				`https://ongapi.alkemy.org/api/activities?limit=${amountToShow}&skip=${
					amountToShow * page
				}`
			);
			res.data = data.data;
		} catch (error) {
			Swal.fire(
				`${error} error de peticion. Pongase en contacto con el administrador. `
			);
		}
		setActivities(res.data);
		setIsLoading(false);
	};

	const getAmountOfActivities = async () => {
		const res = { data: {}, error: null };
		try {
			const { data } = await axios.get(
				`https://ongapi.alkemy.org/api/activities`
			);
			res.data = data.data;
		} catch (error) {
			res.error = error;
		}
		setAmountOfActivities(res.data.length);
	};

	useEffect(() => {
		getAmountOfActivities();
		getActivities();
	}, [amountToShow, page]);

	const handlePreviusPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (page < Math.floor(amountOfActivities / amountToShow)) setPage(page + 1);
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
				<TableDropDownList // TODO:
					options={[{ value: "", name: "Filtrar por categoria" }]}
					name="category_id"
					setOnChange={() => {}}
				/>
				<TableInputSearch // TODO:
					placeholder="Buscar por nombre"
					inputFilter=""
					setInputFilter=""
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
											<img src={activity.image} className=" w-14" alt="Imagen no disponible" />
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
											{/* // TODO: */}
											<button onClick={() => {}}>
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
