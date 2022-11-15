import axios from "axios";
import { success } from "Utils/alerts/alerts";

export const getUserAdmin = (setUser, id) => {
	axios
		.get(process.env.REACT_APP_API + "users/" + id)
		.then(res => {
			setUser(res.data.data);
			success();
		})
		.catch(err => {
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
			console.log(err);
		});
};

export const postUserAdmin = values => {
	axios
		.post(process.env.REACT_APP_API + "users", values)
		.then(res => {
			success();
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};
