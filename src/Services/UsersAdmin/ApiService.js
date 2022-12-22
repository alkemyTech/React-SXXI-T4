import axios from "axios";
import { success, error, update, erase } from "utils/alerts/alerts";
import { Put } from "Services/privateApiService";


export const getUserAdmin =	async (id) => {
	const {data, error } = await axios
		.get("https://ongapi.alkemy.org/api/users/" + id)
		if(error){
			error()
		}
		else{
			return data.data
		}
};

export const getUsersAdmin = async (amountToShow, page, filterTypeOfUser, inputFilter) => {
	const {data, error }= await axios
		.get(
			"https://ongapi.alkemy.org/api/" +
				`users?limit=${amountToShow}&skip=${amountToShow * page}${filterTypeOfUser && "&role=" + filterTypeOfUser}${
					inputFilter.length >= 2 && "&search=" + inputFilter
				}`
		)
		if(error){
			error()
		}
		else{
			return data.data
		}
		
};
export const getAllUsersAdmin = setUser => {
	axios
		.get("https://ongapi.alkemy.org/api/users")
		.then(res => {
			setUser(res.data.data);
		})
		.catch(() => {
			error();
		});
};
export const getAmountOfUsersAdmin = async (filterTypeOfUser, inputFilter) => {
	const {data, error} = await axios
		.get(
			"https://ongapi.alkemy.org/api/" +
				`users${filterTypeOfUser && "?role=" + filterTypeOfUser}${filterTypeOfUser ? "&" : "?"}${
					inputFilter.length >= 2 && "search=" + inputFilter
				}`
		)
		if(error){
			error()
		}
		else{
			return data.data.length
		}
};

export const putUserAdmin = (id, values) => {
	Put(`https://ongapi.alkemy.org/api/users/${id}`, values).then(() => {
		update();
	})
};

export const postUserAdmin = async values => {
	const {data, error} = await axios
		.post("https://ongapi.alkemy.org/api/users", values)
		if(error){
			error()
		}
		else{
			success()
			return data.data
		}
};

export const deleteUserAdmin = async (id) => {
	const {error } = axios
		.delete( "https://ongapi.alkemy.org/api/users/" + id)
		if(error){
			error()
		}
		else{
			erase()
		}
};
