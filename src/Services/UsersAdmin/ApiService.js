import axios from "axios";
import Swal from "sweetalert2";

export const putUserAdmin = (id, values) => {
	axios
		.put(process.env.REACT_APP_API + "users/" + id, values)
		.then(() => {
			Swal.fire("Usuario modificado correctamente!");
		})
		.catch(err => {
			console.log(err);
			Swal.fire("Error al modificar usuario :C intente con otro email");
		});
};

export const postUserAdmin = values => {
	axios
		.post(process.env.REACT_APP_API + "users", values)
		.then(() => {
			Swal.fire("Usuario creado correctamente!");
		})
		.catch(err => {
			console.log(err);
			Swal.fire("Error al crear usuario :C intente con otro email");
		});
};
