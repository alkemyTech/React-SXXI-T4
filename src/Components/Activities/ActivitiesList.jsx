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

const ActivitiesList = () => {
	const [activities, setActivities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [amountToShow, setAmountToShow] = useState(5);

	const getActivities = async () => {
		setIsLoading(true);
		const res = { data: {}, error: null };
		try {
			const { data } = await axios.get(
				"https://ongapi.alkemy.org/api/activities"
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

	useEffect(() => {
		getActivities();
	}, []);

	console.log(amountToShow);

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
							<TableHeader>Descripcion</TableHeader>
							<TableHeader>Categoria</TableHeader>
							<TableHeader>Imagen</TableHeader>
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
											<p className=" text-gray-900 whitespace-nowrap">
												{activity.description}
											</p>
										</TableFieldContainer>
										<TableFieldContainer className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className=" text-gray-900 whitespace-nowrap">
												{activity.category_id}
											</p>
										</TableFieldContainer>
										<TableFieldContainer className=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<img
												src={activity.image}
												className=" text-gray-900 whitespace-nowrap"
											/>
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

export default ActivitiesList;
