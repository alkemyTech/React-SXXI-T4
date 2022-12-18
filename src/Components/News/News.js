import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";
import "react-loading-skeleton/dist/skeleton.css";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";
import TableContainer from "Components/common/Table/TableContainer";
import TableTitle from "Components/common/Table/TableTitle";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TableInputSearch from "Components/common/Table/TableInputSearch";
import TableHeader from "Components/common/Table/TableHeader";
import TablePagination from "Components/common/Table/TablePagination";
import { deleteById, findAllAndSearch, findAllByPageAndSearch } from "Services/News/NewsApiServices";

const News = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [news, setNews] = useState([]);
	const [page, setPage] = useState({
		skip: 0,
		limit: 5,
		pages: 1,
	});
	const [itemsNews, setItemsNews] = useState({
		total: 0,
		totalPage: 0,
	});
	const [search, setSearch] = useState("");

	const obtainItems = async () => {
		const data = await findAllAndSearch(search);
		if (data.length <= page.limit) {
			setItemsNews({
				total: data.length,
				totalPage: 1,
			});
		} else {
			if (data.length % page.limit === 0) {
				setItemsNews({
					total: data.length,
					totalPage: data.length / page.limit,
				});
			} else {
				setItemsNews({
					total: data.length,
					totalPage: Math.trunc(data.length / page.limit) + 1,
				});
			}
		}
	};

	const obtainNews = async () => {
		const data = await findAllByPageAndSearch(page, search);
		setNews(data);
	};

	useEffect(() => {
		if (isLoading) {
			setIsLoading(false);
			obtainItems();
			obtainNews();
		}
	}, [isLoading, search, page]);

	const handlePreviusPage = () => {
		if (page.pages > 1 && page.skip <= itemsNews.total) {
			setPage({ ...page, skip: page.skip - page.limit, pages: page.pages - 1 });
			setIsLoading(true);
		}
	};

	const handleNextPage = () => {
		if (page.pages * page.limit < itemsNews.total) {
			setPage({
				...page,
				skip: page.pages * page.limit,
				pages: page.pages + 1,
			});
			setIsLoading(true);
		}
	};

	const handleSetAmountToShow = value => {
		setPage({ skip: 0, limit: parseInt(value), pages: 1 });
		setIsLoading(true);
	};

	const handleSearch = value => {
		setPage({ ...page, skip: 0 });
		setSearch(value);
		setIsLoading(true);
	};

	const handleDeleteNews = id => {
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
				deleteById(id)
					.then(resp => {
						if (resp.status === 200) setIsLoading(true);
					})
					.catch(err => console.err(err));
			}
		});
	};

	return (
		<TablePrincipalContainer>
			<div className="flex justify-between items-center">
				<TableTitle title={"Novedades"} />
				<Link
					to={"/backoffice"}
					className="flex items-center justify-end my-3 font-poppins text-xl hover:scale-105 transition-all bg-sky-800 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded justify-self-end"
				>
					<p>Volver</p>
				</Link>
			</div>
			<TableContainerFilters>
				<TableDropDownList
					options={[
						{ value: 5, name: 5 },
						{ value: 10, name: 10 },
					]}
					name="pagination"
					setOnChange={handleSetAmountToShow}
				/>
				<TableInputSearch placeholder="Buscar...." inputFilter={search} setInputFilter={handleSearch} />
				<Link
					to={"/backoffice/novedades/crear"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Novedad
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<div className="min-w-full leading-normal">
					<div className=" hidden md:flex w-full justify-between">
						<TableHeader>Nombre</TableHeader>
						<TableHeader>Imagen</TableHeader>
						<TableHeader>Fecha Creación</TableHeader>
						<TableHeader></TableHeader>
						<TableHeader></TableHeader>
					</div>
					<div className="flex md:hidden">
						<TableHeader>Novedades</TableHeader>
					</div>
					<div>
						{!isLoading &&
							news?.map(n => {
								return (
									<div key={n.id} className=" w-full border-b border-gray-200">
										<div className=" w-full flex flex-col md:flex-row">
											<div className=" w-full flex justify-between md:w-2/5 md:items-center">
												<div className="w-1/2 px-5 py-5 bg-white text-sm">
													<p className=" text-gray-900">{n.name}</p>
												</div>
												<div className=" flex w-1/2 justify-end md:justify-start px-5 py-5 bg-white text-sm">
													<p className=" text-gray-900 md:hidden">Creado: &nbsp;</p>
													<p className=" text-gray-900">{n.created_at.slice(0, 10)}</p>
												</div>
											</div>
											<div className="flex justify-center md:w-1/5 md:justify-start md:pl-5 py-5">
												<img src={n.image} alt="n Image" className=" w-44 h-min md:w-14 md:h-9 rounded" />
											</div>
											<div className=" border-t w-full flex justify-around md:justify-end md:w-2/5">
												<div className=" px-5 py-5 bg-white text-sm flex justify-center">
													<Link to={`/backoffice/novedades/editar/${n.id}`}>
														<FaRegEdit size={30} className="text-yellow-500" />
													</Link>
												</div>
												<div className=" px-5 py-5">
													<button onClick={() => handleDeleteNews(n.id)}>
														<FaRegTrashAlt size={30} className="text-red-600" />
													</button>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						{isLoading &&
							_.times(page.limit, i => (
								<div key={"skeletonUserList" + i}>
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
					page={page.pages}
					amountOfPages={itemsNews.totalPage}
					amountOfElements={itemsNews.total}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
					title="Novedades"
				/>
			</TableContainer>
		</TablePrincipalContainer>
	);
};
export default News;
