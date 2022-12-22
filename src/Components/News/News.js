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
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getAmount, newsList } from "store/Slices/newsSlice";

const News = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector(state=>state.news.isLoading);
	/* const [news, setNews] = useState([]); */
	const news = useSelector(state=>state.news.news)
	const [page, setPage] = useState({
		skip: 0,
		limit: 5,
		pages: 1,
	});
	/* const [itemsNews, setItemsNews] = useState({
		total: 0,
		totalPage: 0,
	}); */
	const itemsNews = {
		total: useSelector(state=>state.news.amount),
		totalPage: Math.floor(useSelector(state=>state.news.amount)/page.limit)
	}
	const [search, setSearch] = useState("");

	useEffect(() => {

		if (isLoading) {
			dispatch(getAmount(search))

			/* findAllByPageAndSearch(page, search)
				.then(resp => {
					setNews(resp.data.data);
				})
				.catch(err => {
					console.error(err);
				}); */
				dispatch(newsList({page, search}))
		}
	}, [isLoading, search, page]);

	const handlePreviusPage = () => {
		if (page.pages > 1 && page.skip <= itemsNews.total) {
			setPage({ ...page, skip: page.skip - page.limit, pages: page.pages - 1 });
		}
	};

	const handleNextPage = () => {
		if (page.pages * page.limit < itemsNews.total) {
			setPage({
				...page,
				skip: page.pages * page.limit,
				pages: page.pages + 1,
			});
		}
	};

	const handleSetAmountToShow = value => {
		setPage({ skip: 0, limit: parseInt(value), pages: 1 });
	};

	const handleSearch = value => {
		setPage({ ...page, skip: 0 });
		setSearch(value);
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
				dispatch(deleteNews(id))
				dispatch(newsList(({page, search})))
			}
		});
	};

	return (
		<TablePrincipalContainer>
					<TableTitle title={"Novedades"} />
					<TableContainerFilters>
						<TableDropDownList
							options={[
								{ value: 5, name: 5 },
								{ value: 10, name: 10 },
							]}
							name="pagination"
							setOnChange={handleSetAmountToShow}
						/>
						<TableInputSearch placeholder="Buscar por nombre" inputFilter={search} setInputFilter={handleSearch} />
						<Link to={"/backoffice/novedades/crear"} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded justify-self-end ">
							Crear Novedad
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
									news?.map(news => {
										return (
											<div key={news.id} className=" w-full border-b border-gray-200">
												<div className=" w-full flex flex-col md:flex-row">
													<div className=" w-full flex justify-between md:w-2/5 md:items-center">
														<div className="w-1/2 px-5 py-5 bg-white text-sm">
															<p className=" text-gray-900">{news?.name}</p>
														</div>
														<div className=" flex w-1/2 justify-end md:justify-start px-5 py-5 bg-white text-sm">
															<p className=" text-gray-900 md:hidden">Creado: &nbsp;</p>
															<p className=" text-gray-900">{news.created_at.slice(0, 10)}</p>
														</div>
													</div>
													<div className="flex justify-center md:w-1/5 md:justify-start md:pl-5 py-5">
														<img src={news?.image} alt="Novedades Image" className=" w-44 h-min md:w-14 md:h-9 rounded" />
													</div>
													<div className=" border-t w-full flex justify-around md:justify-end md:w-2/5">
														<div className=" px-5 py-5 bg-white text-sm flex justify-center">
															<Link to={`/backoffice/novedades/editar/${news.id}`}>
																<FaRegEdit size={30} className="text-yellow-500" />
															</Link>
														</div>
														<div className=" px-5 py-5">
															<button onClick={() => handleDeleteNews(news.id)}>
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
