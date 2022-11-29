import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import _ from "lodash";

import { error as errorAler } from "utils/alerts/alerts";

import TableTitle from "Components/common/Table/TableTitle";
import TableContainer from "Components/common/Table/TableContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableHeader from "Components/common/Table/TableHeader";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import TableInputSearch from "Components/common/Table/TableInputSearch";
import {
	deleteSlide,
	getAmountOfSlides,
	getSlides,
} from "Services/Slide/apiService";
import TablePagination from "Components/common/Table/TablePagination";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";
import Swal from "sweetalert2";

const SlidesList = () => {
	const [slides, setSlides] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [amountOfSlides, setAmountOfSlides] = useState(0);
	const [amountToShow, setAmountToShow] = useState(5);
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState("");

	const updateSlides = async () => {
		setIsLoading(true);
		const { data, error } = await getSlides(search, amountToShow, page);
		if (error) {
			errorAler();
		} else {
			setSlides(data);
			setIsLoading(false);
		}
	};

	const updateAmountOfSlides = async () => {
		const length = await getAmountOfSlides(search);
		setAmountOfSlides(length);
	};

	const handlePreviusPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (page < Math.floor(amountOfSlides / amountToShow)) setPage(page + 1);
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			updateSlides();
		}, 300);
		return () => clearTimeout(debounce);
	}, [amountToShow, page, search]);

	useEffect(() => {
		const debounce = setTimeout(() => {
			setPage(0);
			updateAmountOfSlides();
		}, 300);
		return () => clearTimeout(debounce);
	}, [amountToShow, search]);

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
				deleteSlide(id);
				setSearch(search + " ");
			}
		});
	};

	return (
		<TablePrincipalContainer>
			<TableTitle title={"Slides"} />
			<TableContainerFilters>
				<TableDropDownList
					options={[
						{ value: 5, name: 5 },
						{ value: 10, name: 10 },
					]}
					name="Paginacion"
					setOnChange={setAmountToShow} // TODO:
				/>
				<TableInputSearch
					placeholder="Buscar por nombre"
					inputFilter={search}
					setInputFilter={setSearch}
				/>
				<Link
					to="/backoffice/slider"
					className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Slider
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<div className=" min-w-full leading-normal">
					<div className=" hidden md:flex w-full justify-between">
						<TableHeader>Titulo</TableHeader>
						<TableHeader>Orden</TableHeader>
						<TableHeader>Imagen</TableHeader>
						<TableHeader></TableHeader>
						<TableHeader></TableHeader>
					</div>
					<div className="flex md:hidden">
						<TableHeader>Slides</TableHeader>
					</div>
					<div>
						{!isLoading &&
							slides?.map(slide => {
								return (
									<div
										key={slide.id}
										className=" w-full border-b border-gray-200 "
									>
										<div className=" w-full flex flex-col  md:flex-row ">
											<div className="  w-full flex justify-between md:w-2/5 md:items-center ">
												<div className="w-1/2 px-5 py-5 bg-white text-sm">
													<p className=" text-gray-900">{slide.name}</p>
												</div>
												<div className=" flex w-1/2 justify-end md:justify-start px-5 py-5 bg-white text-sm">
													<p className=" text-gray-900 md:hidden">
														Orden: &nbsp;
													</p>
													<p className=" text-gray-900">{slide.order}</p>
												</div>
											</div>
											<div className="flex justify-center md:w-1/5 md:justify-start md:pl-5 py-5">
												<img
													src={slide.image}
													alt="Slide Image"
													className=" w-44 h-min md:w-14 md:h-9 rounded"
												/>
											</div>
											<div className=" border-t w-full flex justify-around md:justify-end md:w-2/5">
												<div className=" px-5 py-5 bg-white text-sm flex justify-center">
													<Link to={`/backoffice/slide/${slide.id}`}>
														<FaRegEdit size={30} className=" text-yellow-500" />
													</Link>
												</div>
												<div>
													<div className=" px-5 py-5">
														<button onClick={() => handleDelete(slide.id)}>
															<FaRegTrashAlt
																size={30}
																className=" text-red-600"
															/>
														</button>
													</div>
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
					title="Slides"
					page={page + 1}
					amountOfPages={Math.floor(amountOfSlides / amountToShow + 1)}
					amount={amountOfSlides}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
				/>
			</TableContainer>
		</TablePrincipalContainer>
	);
};

export default SlidesList;
