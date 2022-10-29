import React from "react";

import * as yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Form from "../common/Form/Form";
import FormTitle from "../common/Form/FormTitle";
import InputImage from "../common/Form/InputImage";
import FormError from "../common/Form/FormError";
import FormSubtitle from "../common/Form/FormSubtitle";
import FormInputText from "../common/Form/FormInputText";
import FormSubmitButton from "../common/Form/FormSubmitButton";

const MembersForm = () => {
	const initialValues = {
		name: "",
		image: "",
		facebookUrl: "",
		linkedinUrl: "",
		description: "",
	};

	const validationSchema = yup.object().shape({
		name: yup
			.string()
			.min(4, "Minimo 4 caracteres")
			.required("Nombre obligatorio"),
		image: yup.string().required("Imagen obligatoria"),
		description: yup.string().required("Descripcion obligatoria"),
		facebookUrl: yup
			.string()

			.url("URL invalido")
			.required("Link obligatorio"),
		linkedinUrl: yup
			.string()

			.url("URL invalido")
			.required("Link obligatorio"),
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
		setFieldTouched,
	} = formik;

	return (
		<FormikProvider value={formik}>
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
					placeholder="https://www.facebook.com/JuanPerez"
				/>
				<FormError error={errors.facebookUrl} touched={touched.facebookUrl} />
				<FormSubtitle>Linkedin URL</FormSubtitle>
				<FormInputText
					type="text"
					name="linkedinUrl"
					valueToShow={values.linkedinUrl}
					handleChange={handleChange}
					handleBlur={handleBlur}
					placeholder="https://www.linkedin.com/JuanPerez"
				/>
				<FormError error={errors.linkedinUrl} touched={touched.linkedinUrl} />
				<FormSubtitle>Descripcion</FormSubtitle>
				<Field name="description">
					{({ field, form }) => (
						<CKEditor
							editor={ClassicEditor}
							data={field.value}
							onChange={(event, editor) =>
								setFieldValue("description", editor.getData())
							}
							onBlur={(event, editor) =>
								setFieldTouched("description", editor.getData())
							}
						/>
					)}
				</Field>
				<FormError error={errors.description} touched={touched.description} />
				<FormSubmitButton>Enviar</FormSubmitButton>
			</Form>
		</FormikProvider>
	);
};

export default MembersForm;
