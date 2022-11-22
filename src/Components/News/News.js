import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";

import "react-loading-skeleton/dist/skeleton.css";

import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";
import TableContainer from "Components/common/Table/TableContainer";
import TableTitle from "Components/common/Table/TableTitle";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TableInputSearch from "Components/common/Table/TableInputSearch";
import TableHeader from "Components/common/Table/TableHeader";
import TablePagination from "Components/common/Table/TablePagination";
import {
	deleteById,
	findAllAndSearch,
	findAllByPageAndSearch,
} from "Services/News/NewsApiServices";

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

	useEffect(() => {
		if (isLoading) {
			setIsLoading(false);
			findAllAndSearch(search)
				.then(resp => {
					const data = resp.data.data;
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
				})
				.catch(err => console.error(err));
			findAllByPageAndSearch(page, search)
				.then(resp => {
					setNews(resp.data.data);
				})
				.catch(err => {
					console.error(err);
				});
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
				<TableInputSearch
					placeholder="Buscar...."
					inputFilter={search}
					setInputFilter={handleSearch}
				/>
				<Link
					to={"/backoffice/create-news"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Novedad
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<table className="min-w-full leading-normal">
					<thead>
						<tr>
							<TableHeader>Nombre</TableHeader>
							<TableHeader>Imagen</TableHeader>
							<TableHeader>Fecha Creación</TableHeader>
							<TableHeader>Editar</TableHeader>
							<TableHeader>Borrar</TableHeader>
						</tr>
					</thead>
					<tbody>
						{!isLoading &&
							news?.map(n => {
								return (
									<tr key={n.id}>
										<TableFieldContainer className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{n.name}
											</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<p className="text-gray-900 whitespace-no-wrap">
												{n.image}
											</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<p className="text-gray-900 whitespace-no-wrap">
												{n.created_at}
											</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<Link
												to={`/backoffice/update-news/${n.id}`}
												className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
											>
												Editar
											</Link>
										</TableFieldContainer>
										<TableFieldContainer>
											<button
												className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
												onClick={() => handleDeleteNews(n.id)}
											>
												Borrar
											</button>
										</TableFieldContainer>
									</tr>
								);
							})}
						{isLoading &&
							_.times(page.limit, i => (
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
					page={page.pages}
					amountOfPages={itemsNews.totalPage}
					amountOfElements={itemsNews.total}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
				/>
			</TableContainer>
		</TablePrincipalContainer>
	);
};
export default News;
