import Swal from "sweetalert2";

export const convertBase64 = (setFieldvalue, inputImage) => {
	const file = inputImage.current.files[0];
	const reader = new FileReader();
	const extensions = /(jpe?g|png)$/i;

	if (!extensions.test(file.type)) {
		Swal.fire({
			icon: "error",
			title: "¡Formato no valido!",
			text: "Seleccione un formato .png o .jpg.",
		});
		return;
	}

	reader.readAsDataURL(inputImage.current.files[0]);
	reader.onload = () => {
		const base64 = reader.result;
		setFieldvalue("logo", base64);
	};
};
