import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";
import {MdOutlineArrowBackIos} from "react-icons/md"
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
import { deleteById, findAllAndSearch, findAllByPageAndSearch } from "Services/Member/MemberApiService";

const Members = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [members, setMembers] = useState([]);
	const [page, setPage] = useState({
		skip: 0,
		limit: 5,
		pages: 1,
	});
	const [itemsMembers, setItemsMembers] = useState({
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
						setItemsMembers({
							total: data.length,
							totalPage: 1,
						});
					} else {
						if (data.length % page.limit === 0) {
							setItemsMembers({
								total: data.length,
								totalPage: data.length / page.limit,
							});
						} else {
							setItemsMembers({
								total: data.length,
								totalPage: Math.trunc(data.length / page.limit) + 1,
							});
						}
					}
				})
				.catch(err => console.error(err));
			findAllByPageAndSearch(page, search)
				.then(resp => {
					setMembers(resp.data.data);
				})
				.catch(err => {
					console.error(err);
				});
		}
	}, [isLoading, search, page]);

	const handlePreviusPage = () => {
		if (page.pages > 1 && page.skip <= itemsMembers.total) {
			setPage({ ...page, skip: page.skip - page.limit, pages: page.pages - 1 });
			setIsLoading(true);
		}
	};

	const handleNextPage = () => {
		if (page.pages * page.limit < itemsMembers.total) {
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
		setPage({ ...page, skip: 0, pages: 1 });
		setSearch(value);
		setIsLoading(true);
	};

	const handleDeleteMembers = id => {
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
				<TableTitle title={"Miembros"} />
				<Link
					to={"/backoffice"}
					className="flex items-center justify-end my-3 text-xl text-sky-800 hover:scale-105 transition-all"
				>
					<MdOutlineArrowBackIos />
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
					to={"/backoffice/miembros/crear"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Miembro
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<table className="min-w-full leading-normal">
					<thead>
						<tr>
							<TableHeader>Nombre</TableHeader>
							<TableHeader>Imagen</TableHeader>
							<TableHeader>Editar</TableHeader>
							<TableHeader>Borrar</TableHeader>
						</tr>
					</thead>
					<tbody>
						{!isLoading &&
							members?.map(n => {
								return (
									<tr key={n.id}>
										<TableFieldContainer className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">{n.name}</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<p className="text-gray-900 whitespace-no-wrap">{n.image}</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<Link to={`/backoffice/miembros/editar/${n.id}`}>
												<FaRegEdit size={30} className=" text-yellow-500" />
											</Link>
										</TableFieldContainer>
										<TableFieldContainer>
											<button onClick={() => handleDeleteMembers(n.id)}>
												<FaRegTrashAlt size={30} className="text-red-600" />
											</button>
										</TableFieldContainer>
									</tr>
								);
							})}
						{isLoading &&
							_.times(page.limit, i => (
								<tr key={"skeletonMemberList" + i}>
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
					amountOfPages={itemsMembers.totalPage}
					amountOfElements={itemsMembers.total}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
					title="Miembros"
				/>
			</TableContainer>
		</TablePrincipalContainer>
	);
};
export default Members;
