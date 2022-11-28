import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { error as errorAler } from "utils/alerts/alerts";

import TableTitle from "Components/common/Table/TableTitle";
import TableContainer from "Components/common/Table/TableContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableHeader from "Components/common/Table/TableHeader";
import axios from "axios";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const SlidesList = () => {
	const [slides, setSlides] = useState([]);

	const obtainSlides = async () => {
		const res = { data: {}, error: null };
		try {
			const { data } = await axios.get("https://ongapi.alkemy.org/api/slides");
			res.data = data.data;
		} catch (error) {
			errorAler(
				`${error} error de peticion. Pongase en contacto con el administrador. `
			);
		}
		setSlides(res.data);
	};
	useEffect(() => {
		obtainSlides();
	}, []);

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
					setOnChange={() => {}} // TODO:
				/>
				<TableDropDownList
					options={[
						{ value: 1, name: "Todos" },
						{ value: 2, name: "Alfabetico" },
						{ value: 3, name: "Orden" },
					]}
					name="Ordenar Por"
					setOnChange={() => {}}
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
						{slides?.map(slide => {
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
												<Link>
													<FaRegEdit size={30} className=" text-yellow-500" />
												</Link>
											</div>
											<div>
												<div className=" px-5 py-5">
													<button>
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
					</div>
				</div>
			</TableContainer>
		</TablePrincipalContainer>
	);
};

export default SlidesList;
