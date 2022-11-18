import Swal from "sweetalert2";
export const convertBase64 = (setFieldValue, FieldName, value, id) => {
	const reader = new FileReader();
	const extensions = /(jpe?g|png)$/i;
	if (!extensions.test(value.files[0].type)) {
		Swal.fire({
			icon: "error",
			title: "¡Formato no valido!",
			text: "Seleccione un formato .png o .jpg.",
		});
		return;
	}

if(id) {
    reader.readAsDataURL(value.files[0]);
    reader.onload = () => {
        const base64 = reader.result;
        setFieldValue(`slides[${id}].image`, base64);
    };
return;
}

	reader.readAsDataURL(value.files[0]);
	reader.onload = () => {
		const codeBase64 = reader.result;
		setFieldValue(FieldName, codeBase64);
	};
};