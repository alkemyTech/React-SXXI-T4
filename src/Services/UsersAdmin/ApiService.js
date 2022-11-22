import axios from "axios";
import { success, erase, error } from "utils/alerts/alerts";

export const getUserAdmin = (setUser, id) => {
	axios
		.get(process.env.REACT_APP_API + "users/" + id)
		.then(res => {
			setUser(res.data.data);
		})
		.catch(err => {
			error();
			console.log(err);
		});
};

export const getUsersAdmin = (
	setUser,
	amountToShow,
	page,
	filterTypeOfUser,
	inputFilter
) => {
	axios
		.get(
			process.env.REACT_APP_API +
				`users?limit=${amountToShow}&skip=${amountToShow * page}${
					filterTypeOfUser && "&role=" + filterTypeOfUser
				}${inputFilter.length>=2 && "&search=" + inputFilter}`
		)
		.then(res => {
			setUser(res.data.data);
		})
		.catch(err => {
			error();
			console.log(err);
		});
};
export const getAmountOfUsersAdmin = (
	setAmountOfUsers,
	filterTypeOfUser,
	inputFilter
) => {
	axios
		.get(
			process.env.REACT_APP_API +
				`users${filterTypeOfUser && "?role=" + filterTypeOfUser}${
					filterTypeOfUser ? "&" : "?"
				}${inputFilter.length>=2 && "search=" + inputFilter}`
		)
		.then(res => {
			setAmountOfUsers(res.data.data.length);
		})
		.catch(err => {
			error();
			console.log(err);
		});
};

export const putUserAdmin = (id, values) => {
	axios
		.put(`https://ongapi.alkemy.org/api/users/${id}`, {
			...values,
			group_id: 4,
		})
		.then(res => {
			success();
		})
		.catch(err => {
			error();
			console.log(err);
		});
};

export const postUserAdmin = values => {
	axios
		.post(process.env.REACT_APP_API + "users", values)
		.then(res => {
			success();
		})
		.catch(err => {
			error();
			console.log(err);
		});
};

export const deleteUserAdmin = id => {
	axios
		.delete(process.env.REACT_APP_API + "users/" + id)
		.then(res => {
			erase();
		})
		.catch(err => {
			error();
			console.log(err);
		});
};
