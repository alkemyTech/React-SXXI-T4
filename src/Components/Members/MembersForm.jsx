import React from "react";

import * as yup from "yup"
import { useFormik } from "formik";
import  Form  from "../common/Form/Form";
import FormTitle from "../common/Form/FormTitle"
import InputImage from "../common/Form/InputImage"
import FormError from "../common/Form/FormError"
import FormSubtitle from "../common/Form/FormSubtitle"
import FormInputText from "../common/Form/FormInputText"
import FormSubmitButton from "../common/Form/FormSubmitButton"

const MembersForm = () => {
	const initialValues = {
		name: "",
		image: "",
		facebookUrl: "",
		linkedinUrl: "",
		description: "",
	};

	const regexURL =
		"/^((ftp|http|https)://)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(.[a-zA-Z]+)+((/)[w#]+)*(/w+?[a-zA-Z0-9_]+=w+(&[a-zA-Z0-9_]+=w+)*)?$/gm";

	const validationSchema = yup.object().shape({
		name: yup
			.string()
			.min(4, "Minimo 4 caracteres")
			.required("Nombre obligatorio"),
		image: yup.string().required("Imagen obligatoria"),
		description: yup.string().required("Descripcion obligatoria"),
		facebookUrl: yup
			.string()
			.required("Link obligatorio")
			.matches(regexURL, "URL invalido"),
		linkedinUrl: yup
			.string()
			.required("Link obligatorio")
			.matches(regexURL, "URL invalido"),
	});

	const onSubmit = () => {
		console.log(values);
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});
	const {
		handleSubmit,
		errors,
		handleChange,
		handleBlur,
		values,
		touched,
		setFieldValue,
	} = formik;

	return (
		<Form handleSubmit={handleSubmit}>
			<FormTitle>Crear/Editar Miembro</FormTitle>
			<InputImage
				bgImage={values.image}
				formikFieldName="image"
				setFieldValue={setFieldValue}
			/>
			<FormError error={errors.image} touched={touched.image} />
			<FormSubtitle>Nombre</FormSubtitle>
			<FormInputText
				type="text"
				name="name"
				valueToShow={values.name}
				handleChange={handleChange}
				handleBlur={handleBlur}
				placeholder="Juan Perez"
			/>
			<FormError error={errors.name} touched={touched.name} />
			<FormSubtitle>Facebook URL</FormSubtitle>
			<FormInputText
				type="text"
				name="facebookUrl"
				valueToShow={values.facebookUrl}
				handleChange={handleChange}
				handleBlur={handleBlur}
				placeholder="www.facebook.com/JuanPerez"
			/>
			<FormError error={errors.facebookUrl} touched={touched.facebookUrl} />
			<FormSubtitle>Linkedin URL</FormSubtitle>
			<FormInputText
				type="text"
				name="linkedinUrl"
				valueToShow={values.linkedinUrl}
				handleChange={handleChange}
				handleBlur={handleBlur}
				placeholder="www.linkedin.com/JuanPerez"
			/>
			<FormError error={errors.linkedinUrl} touched={touched.linkedinUrl} />
			<FormSubmitButton>Enviar</FormSubmitButton>
		</Form>
	);
};

export default MembersForm;
