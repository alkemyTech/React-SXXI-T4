import axios from "axios";

export const getUserAdmin = (setUser, id) => {
	axios
		.get(process.env.REACT_APP_API + "users/" + id)
		.then(res => {
			setUser(res.data.data);
		})
		.catch(err => {
			console.log(err);
		});
};

export const putUserAdmin = (id, values) => {
	axios
		.put(`https://ongapi.alkemy.org/api/users/${id}`, { name: "hola" })
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};

export const postUserAdmin = values => {
	console.log(values.profile_image);
	axios
		.post(process.env.REACT_APP_API + "users", values)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};
