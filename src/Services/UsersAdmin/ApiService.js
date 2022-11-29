import axios from "axios";
import { success, erase, error, update } from "utils/alerts/alerts";

export const getUserAdmin = (setUser, id) => {
	axios
		.get("https://ongapi.alkemy.org/api/users/" + id)
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
			"https://ongapi.alkemy.org/api/" +
				`users?limit=${amountToShow}&skip=${amountToShow * page}${
					filterTypeOfUser && "&role=" + filterTypeOfUser
				}${inputFilter && "&search=" + inputFilter}`
		)
		.then(res => {
			console.log(res.data.data);
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
			"https://ongapi.alkemy.org/api/" +
				`users${filterTypeOfUser && "?role=" + filterTypeOfUser}${
					filterTypeOfUser ? "&" : "?"
				}${inputFilter && "search=" + inputFilter}`
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
			update();
			console.log(res);
		})
		.catch(err => {
			error();
			console.log(err);
		});
};

export const postUserAdmin = values => {
	axios
		.post("https://ongapi.alkemy.org/api/users", values)
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
