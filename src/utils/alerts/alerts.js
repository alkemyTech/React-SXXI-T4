import Swal from "sweetalert2";

export const success = () => {
	Swal.fire({
		icon: "success",
		text: "Se creó con exito!",
	});
};

export const error = message => {
	Swal.fire({
		icon: "error",
		title: "¡Operacion Cancelada!",
		text: message || "¡Intentalo nuevamente!",
	});
};

export const update = () => {
	Swal.fire({
		icon: "success",
		text: "Se actualizó con éxito!",
	});
};

export const erase = () => {
	Swal.fire({
		icon: "success",
		text: "Se borró con éxito!",
	});
};
