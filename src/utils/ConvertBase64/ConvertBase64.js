import Swal from "sweetalert2";
export const convertBase64 = (setFieldValue, FieldName, value) => {
	const reader = new FileReader();
	const extensions = /(jpe?g|png)$/i;
	if (!extensions.test(value.files[0].type)) {
		Swal.fire({
			icon: "error",
			title: "¡Formato no válido!",
			text: "Seleccione un formato .png o .jpg.",
		});
		return;
	}

	reader.onload = () => {
		const codeBase64 = reader.result;
		setFieldValue(FieldName, codeBase64);
	};
	reader.readAsDataURL(value.files[0]);
};
