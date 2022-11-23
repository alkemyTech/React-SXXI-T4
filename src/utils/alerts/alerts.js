import Swal from "sweetalert2";

export const success = () => {
	Swal.fire({
		icon: "success",
		text: "¡Creación exitosa!",
	});
};

export const error = () => {
	Swal.fire({
		icon: "error",
		text: "¡Hemos encontrado un error!",
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
