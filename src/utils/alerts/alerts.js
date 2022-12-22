import Swal from "sweetalert2";

export const success = () => {
	Swal.fire({
		icon: "success",
		text: "Operación exitosa!",

	});
};

export const error = message => {
	Swal.fire({
		icon: "error",
		title: "¡Operacion Cancelada!",
		text: message || "¡Hemos encontrado un error!",

	});
};

export const update = () => {
	Swal.fire({
		icon: "success",
		text: "¡Se actualizó con éxito!",
	});
};

export const info = () => {
	Swal.fire({
		icon: "success",
		text: "Su mensaje se envio con exito, pronto nos contactaremos!",
	});
};

export const erase = () => {
	Swal.fire({
		icon: "success",
		text: "Se borró con éxito!",
	});
};

export const suscribed = () => {
	Swal.fire({
		icon: "success",
		text: "¡Suscrito exitosamente!",

	});
};