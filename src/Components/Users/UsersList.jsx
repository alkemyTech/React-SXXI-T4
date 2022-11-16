import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";

import "react-loading-skeleton/dist/skeleton.css";

import {
	getUsersAdmin,
	getAmountOfUsersAdmin,
	deleteUserAdmin,
} from "Services/UsersAdmin/ApiService";

import TablePrincipalContainer from "Components/common/Table/TablePrincipalContainer";
import TableContainerFilters from "Components/common/Table/TableContainerFilters";
import TableFieldContainer from "Components/common/Table/TableFieldContainer";
import TableContainer from "Components/common/Table/TableContainer";
import TableTitle from "Components/common/Table/TableTitle";
import TableDropDownList from "Components/common/Table/TableDropDownList";
import TableInputSearch from "Components/common/Table/TableInputSearch";
import TableHeader from "Components/common/Table/TableHeader";
import TablePagination from "Components/common/Table/TablePagination";

const UsersList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [amountToShow, setAmountToShow] = useState(5);
	const [inputFilter, setInputFilter] = useState("");
	const [amountOfUsers, setAmountOfUsers] = useState(0);
	const [filterTypeOfUser, setFilterTypeOfUser] = useState("");

	useEffect(() => {
		setIsLoading(true);
		const debounce = setTimeout(() => {
			getUsersAdmin(
				setUsers,
				amountToShow,
				page,
				filterTypeOfUser,
				inputFilter
			);
			setIsLoading(false);
		}, 300);
		return () => clearTimeout(debounce);
	}, [amountToShow, page, filterTypeOfUser, inputFilter]);
	useEffect(() => {
		const debounce = setTimeout(() => {
			setPage(0);
			getAmountOfUsersAdmin(setAmountOfUsers, filterTypeOfUser, inputFilter);
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
				deleteUserAdmin(id);
				setInputFilter(inputFilter + " ");
			}
		});
	};

	return (
		<TablePrincipalContainer>
			<TableTitle title={"Usuarios"} />
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
						{ value: 1, name: "Administrador" },
						{ value: 2, name: "Usuario" },
					]}
					name="role_id"
					setOnChange={setFilterTypeOfUser}
				/>

				<TableInputSearch
					placeholder="Buscar por nombre"
					inputFilter={inputFilter}
					setInputFilter={setInputFilter}
				/>
				<Link
					to={"/backoffice/user/"}
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Crear Usuario
				</Link>
			</TableContainerFilters>
			<TableContainer>
				<table className="min-w-full leading-normal">
					<thead>
						<tr>
							<TableHeader>Nombre</TableHeader>
							<TableHeader>Email</TableHeader>
							<TableHeader>Editar</TableHeader>
							<TableHeader>Borrar</TableHeader>
						</tr>
					</thead>
					<tbody>
						{!isLoading &&
							users?.map(user => {
								return (
									<tr key={user.id}>
										<TableFieldContainer className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
											<p className="text-gray-900 whitespace-no-wrap">
												{user.name}
											</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<p className="text-gray-900 whitespace-no-wrap">
												{user.email}
											</p>
										</TableFieldContainer>
										<TableFieldContainer>
											<Link
												to={"/backoffice/user/" + user.id}
												className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
											>
												Editar
											</Link>
										</TableFieldContainer>
										<TableFieldContainer>
											<button
												className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
												onClick={() => handleDeleteUser(user.id)}
											>
												Eliminar
											</button>
										</TableFieldContainer>
									</tr>
								);
							})}
						{isLoading &&
							_.times(amountToShow, () => (
								<tr>
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
					page={page + 1}
					amountOfPages={Math.floor(amountOfUsers / amountToShow + 1)}
					amountOfUsers={amountOfUsers}
					handleNextPage={handleNextPage}
					handlePreviusPage={handlePreviusPage}
				/>
			</TableContainer>
		</TablePrincipalContainer>
	);
};
export default UsersList;
