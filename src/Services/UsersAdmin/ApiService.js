import axios from "axios";
import Swal from "sweetalert2";
export const getUserAdmin = (setUser, id) => {
	axios
		.get(process.env.REACT_APP_API + "users/" + id)
		.then(res => {
			console.log(res);
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
			Swal.fire({
				icon: "success",
				text: "Se actualizo el usuario con exito!",
			});

			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};

export const postUserAdmin = values => {
	axios
		.post(process.env.REACT_APP_API + "users", values)
		.then(res => {
			Swal.fire({
				icon: "success",
				text: "Se creo el usuario con exito!",
			});
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};
