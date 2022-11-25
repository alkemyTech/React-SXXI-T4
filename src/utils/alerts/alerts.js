import Swal from "sweetalert2";

export const success = () => {
	Swal.fire({
		icon: "success",
		text: "Se creó con exito!",

	});
};

export const error = () => {
	Swal.fire({
		icon: "error",
		text: "¡Se ha encontrado un error!",
	});
};

export const update = () => {
	Swal.fire({
		icon: "success",
		text: "Se actualizó con éxito!",
	});
};
