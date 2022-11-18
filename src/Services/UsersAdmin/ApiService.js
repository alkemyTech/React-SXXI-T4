import axios from "axios";
import { success, update } from "Utils/alerts/alerts";

export const getUserAdmin = (setUser, id) => {
	axios
		.get("https://ongapi.alkemy.org/api/users/" + id)
		.then(res => {
			setUser(res.data.data);
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
			update();
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};

export const postUserAdmin = values => {
	axios
		.post("https://ongapi.alkemy.org/api/users", values)
		.then(res => {
			success();
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};
