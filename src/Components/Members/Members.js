import React, { useState, useEffect } from "react";
import _ from "lodash"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
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
import { deleteMember, getMembersByPageAndSearch, getAmountOfMembers } from "store/Slices/membersSlice";

const Members = () => {
	const dispatch = useDispatch();
	const members = useSelector(state => state.members.list);
	const amountOfMembers = useSelector(state => state.members.amount);
	const isLoading = useSelector(state => state.members.isLoading);
	const [page, setPage] = useState(0);
	const [amountToShow, setAmountToShow] = useState(5);
	const [inputFilter, setInputFilter] = useState("");

	useEffect(() => {
		const debounce = setTimeout(() => {
			dispatch(getMembersByPageAndSearch({ amountOfMembers: amountToShow, page, search: inputFilter }));
		}, 300);
		return () => clearTimeout(debounce);
	}, [amountToShow, page, inputFilter]);

	useEffect(() => {
		const debounce = setTimeout(() => {
			dispatch(getAmountOfMembers(inputFilter));
		}, 300);
		return () => clearTimeout(debounce);
	}, [amountToShow, inputFilter]);

	const handlePreviusPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (page < Math.floor(amountOfMembers / amountToShow)) setPage(page + 1);
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
				dispatch(deleteMember(id));
				setInputFilter(inputFilter + " ");
			}
		});
	};

	return (
		<TablePrincipalContainer>
			<div className="flex justify-between items-center">
				<TableTitle title={"Miembros"} />
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
					setOnChange={setAmountToShow}
				/>
				<TableInputSearch placeholder="Buscar...." inputFilter={inputFilter} setInputFilter={setInputFilter} />
				<Link
					to={"/backoffice/miembros/crear"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Miembro
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<div className="min-w-full leading-normal">
					<div className="hidden md:flex w-full justify-between">
						<TableHeader>Nombre</TableHeader>
						<TableHeader>Imagen</TableHeader>
						<TableHeader></TableHeader>
						<TableHeader></TableHeader>
					</div>
					<div className="flex md:hidden">
						<TableHeader>Miembros</TableHeader>
					</div>
					<div>
						{!isLoading &&
							members?.map(n => {
								return (
									<div key={n.id} className="w-full md:flex md:justify-around border-b border-gray-200">
										<div className="w-full flex flex-col md:w-1/2 md:flex-row">
											<div className="w-1/2 pl-5">
												<p className="text-gray-900 whitespace-no-wrap">{n.name}</p>
											</div>
											<div className="w-1/2 pl-5">
												<p className="text-gray-900 whitespace-no-wrap">{n.image}</p>
											</div>
										</div>
										<div className="w-full grid grid-cols-2 md:flex md:justify-end items-center md:w-1/2">
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
										</div>
									</div>
								);
							})}
						{isLoading &&
							_.times(amountToShow, (i)=> {
								return (
									<TableFieldContainer key={"skeletonList"+i} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
										<Skeleton width={"100%"} height={"30px"} />
									</TableFieldContainer>
								);
							})}
					</div>
				</div>
				<TablePagination
					page={page + 1}
					amountOfPages={Math.floor(amountOfMembers / amountToShow + 1)}
					amountOfElements={amountOfMembers}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
					title="Miembros"
				/>
			</TableContainer>
		</TablePrincipalContainer>
	);
};
export default Members;
