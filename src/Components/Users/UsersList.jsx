import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "@mui/material/Skeleton";
import _ from "lodash";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import { MdOutlineArrowBackIos } from "react-icons/md";
import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";
import TableContainer from "Components/common/Table/TableContainer";
import TableTitle from "Components/common/Table/TableTitle";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TableInputSearch from "Components/common/Table/TableInputSearch";
import TableHeader from "Components/common/Table/TableHeader";
import TablePagination from "Components/common/Table/TablePagination";

import {useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser, amount } from "store/Slices/userSlice"

const UsersList = () => {

	const dispatch = useDispatch()
	const amountOfUsers = useSelector(state=>state.users.amount)
	const isLoading = useSelector(state=>state.users.isLoading)
	const users = useSelector(state=>state.users.users)

	const [page, setPage] = useState(0);
	const [amountToShow, setAmountToShow] = useState(5);
	const [inputFilter, setInputFilter] = useState("");

	const [filterTypeOfUser, setFilterTypeOfUser] = useState("");

	useEffect(() => {
		const debounce = setTimeout(() => {
			dispatch(getAllUsers({amountToShow, page, filterTypeOfUser, inputFilter}))
		}, 300);
		return () => clearTimeout(debounce);
	}, [amountToShow, page, filterTypeOfUser, inputFilter]);

	useEffect(() => {
		const debounce = setTimeout(() => {
			setPage(0);
			dispatch(amount( {filterTypeOfUser, inputFilter}))
		}, 300);
		return () => clearTimeout(debounce);
	}, [filterTypeOfUser, amountToShow, inputFilter]);

	const handlePreviusPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const handleNextPage = () => {
		if (page < Math.floor(amountOfUsers / amountToShow)) setPage(page + 1);
	};
	const handleDeleteUser = id => {
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
				dispatch(deleteUser(id))
				setInputFilter(inputFilter + " ");
			}
		});
	};

	return (
		<TablePrincipalContainer>
			<div className="flex justify-between items-center">
				<TableTitle title={"Usuarios"} />
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
					setOnChange={setAmountToShow}
				/>
				<TableDropDownList
					options={[
						{ value: "", name: "Todos" },
						{ value: 1, name: "Usuario Administrador" },
						{ value: 2, name: "Usuario Regular" },
					]}
					name="role_id"
					setOnChange={setFilterTypeOfUser}
				/>

				<TableInputSearch placeholder="Buscar por nombre" inputFilter={inputFilter} setInputFilter={setInputFilter} />
				<Link
					to={"/backoffice/usuarios/crear"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Usuario
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<div className="min-w-full leading-normal">
					<div className="hidden md:flex w-full justify-between">
						<TableHeader>Nombre</TableHeader>
						<TableHeader>Email</TableHeader>
						<TableHeader></TableHeader>
						<TableHeader></TableHeader>
					</div>
					<div className="flex md:hidden">
						<TableHeader>Usuarios</TableHeader>
					</div>
					<div>
						{!isLoading &&
							users?.map(user => {
								return (
									<div key={user.id} className="w-full md:flex md:justify-around border-b border-gray-200">
										<div className="w-full flex flex-col md:w-1/2 md:flex-row">
											<TableFieldContainer className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
												<p className="text-gray-900">{user.name}</p>
											</TableFieldContainer>
											<TableFieldContainer>
												<p className="text-gray-900">{user.email}</p>
											</TableFieldContainer>
										</div>
										<div className="w-full grid grid-cols-2 md:flex md:justify-end items-center md:w-1/2">
											<div className="px-5 py-5 bg-white text-sm flex justify-center">
												<Link to={"/backoffice/usuarios/editar/" + user.id}>
													<FaRegEdit size={30} className=" text-yellow-500" />
												</Link>
											</div>
											<TableFieldContainer>
												<button onClick={() => handleDeleteUser(user.id)}>
													<FaRegTrashAlt size={30} className="text-red-600" />
												</button>
											</TableFieldContainer>
										</div>
									</div>
								);
							})}
						{isLoading &&
							_.times(amountToShow, i => (
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
					page={page + 1}
					amountOfPages={Math.floor(amountOfUsers / amountToShow + 1)}
					amountOfElements={amountOfUsers}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
					title="Usuarios"
				/>
			</TableContainer>
		</TablePrincipalContainer>
	);
};
export default UsersList;
