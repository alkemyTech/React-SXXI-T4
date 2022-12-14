import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { Skeleton } from "@mui/material";
import _ from "lodash";
import Swal from "sweetalert2";

import { deleteActivity, getActivities, getAmountOfActivities } from "Services/Activity/ApiService";

import TableContainer from "Components/common/Table/TableContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TableInputSearch from "Components/common/Table/TableInputSearch";
import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableTitle from "Components/common/Table/TableTitle";
import TableHeader from "Components/common/Table/TableHeader";
import TablePagination from "Components/common/Table/TablePagination";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";

const ActivitiesList = () => {
	const [activities, setActivities] = useState([]);
	const [amountOfActivities, setAmountOfActivities] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [amountToShow, setAmountToShow] = useState(5);
	const [page, setPage] = useState(0);

	const updateActivities = async () => {
		setIsLoading(true);
		const data = await getActivities(search, amountToShow, page);
		setActivities(data);
		setIsLoading(false);
	};

	const updateAmountOfActivities = async () => {
		const amount = await getAmountOfActivities(search);
		setAmountOfActivities(amount);
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
				deleteActivity(id);
				updateActivities();
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
				<TableInputSearch placeholder="Buscar por nombre" inputFilter={search} setInputFilter={setSearch} />
				<Link
					to={"/backoffice/actividades/crear"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded justify-self-end "
				>
					Crear Actividad
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<div className=" min-w-full leading-normal">
					<div className=" hidden md:flex w-full justify-between">
						<TableHeader>Nombre</TableHeader>
						<TableHeader>Creado</TableHeader>
						<TableHeader>Imagen</TableHeader>
						<TableHeader></TableHeader>
						<TableHeader></TableHeader>
					</div>
					<div className="flex md:hidden">
						<TableHeader>Actividades</TableHeader>
					</div>
					<div>
						{!isLoading &&
							activities?.map(activity => {
								return (
									<div key={activity.id} className=" w-full border-b border-gray-200">
										<div className=" w-full flex flex-col md:flex-row">
											<div className=" w-full flex justify-between md:w-2/5 md:items-center">
												<div className="w-1/2 px-5 py-5 bg-white text-sm">
													<p className=" text-gray-900">{activity.name}</p>
												</div>
												<div className=" flex w-1/2 justify-end md:justify-start px-5 py-5 bg-white text-sm">
													<p className=" text-gray-900 md:hidden">Creado: &nbsp;</p>
													<p className=" text-gray-900">{activity.created_at.slice(0, 10)}</p>
												</div>
											</div>
											<div className="flex justify-center md:w-1/5 md:justify-start md:pl-5 py-5">
												<img src={activity.image} alt="Activity Image" className=" w-44 h-min md:w-14 md:h-9 rounded" />
											</div>
											<div className=" border-t w-full flex justify-around md:justify-end md:w-2/5">
												<div className=" px-5 py-5 bg-white text-sm flex justify-center">
													<Link to={`/backoffice/actividades/editar/${activity.id}`}>
														<FaRegEdit size={30} className="text-yellow-500" />
													</Link>
												</div>
												<div className=" px-5 py-5">
													<button onClick={() => handleDelete(activity.id)}>
														<FaRegTrashAlt size={30} className="text-red-600" />
													</button>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						{isLoading &&
							_.times(amountToShow, i => (
								<div key={"skeletonSliderList" + i}>
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
								</div>
							))}
					</div>
				</div>
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
