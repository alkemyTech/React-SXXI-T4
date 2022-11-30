import React from "react";

import * as yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { yupErrorMessages } from "utils/messages/formMessagesValidation";

import FormContainer from "Components/common/Form/FormContainer";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import FormGroup from "Components/common/Form/FormGroup";
import Form from "Components/common/Form/Form";
import FormTitle from "Components/common/Form/FormTitle";
import InputImage from "Components/common/Form/InputImage";
import FormError from "Components/common/Form/FormError";
import FormInputText from "Components/common/Form/FormInputText";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";

const SUPPORTED_FORMATS = ["image/jpg", "image/png"];

const MembersForm = ({ user }) => {
	const initialValues = {
		name: "",
		image: "",
		facebookUrl: "",
		linkedinUrl: "",
		description: "",
	};

	const validationSchema = yup.object().shape({
		name: yup.string().min(4, yupErrorMessages.min4).required(yupErrorMessages.required),
		image: yup
			.string()
			.required(yupErrorMessages.required)
			.test("fileType", yupErrorMessages.format, value => SUPPORTED_FORMATS?.map(format => value?.includes(format))),
		description: yup.string().required("Descripcion obligatoria"),
		facebookUrl: yup.string().url("URL invalido").required("Link obligatorio"),
		linkedinUrl: yup.string().url("URL invalido").required("Link obligatorio"),
	});

	const onSubmit = () => {
		console.log(values);
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});
	const { handleSubmit, errors, handleChange, handleBlur, values, touched, setFieldValue, setFieldTouched } = formik;

	return (
		<FormikProvider value={formik}>
			<>
				<Form handleSubmit={handleSubmit}>
					<FormTitle>{user?.id ? "Editar" : "Crear"} Miembro</FormTitle>
					<FormContainer>
						<FormContainerImage>
							<FormGroup>
								<InputImage bgImage={values.image} FieldName="image" setFieldValue={setFieldValue} />
								<FormError error={errors.image} touched={touched.image} />
							</FormGroup>
						</FormContainerImage>
						<FormContainerInput>
							<FormGroup>
								<FormInputText
									type="text"
									name="name"
									valueToShow={values.name}
									handleChange={handleChange}
									handleBlur={handleBlur}
									placeholder="Juan Perez"
								/>
								<FormError error={errors.name} touched={touched.name} />
							</FormGroup>
							<FormGroup>
								<FormInputText
									type="text"
									name="facebookUrl"
									valueToShow={values.facebookUrl}
									handleChange={handleChange}
									handleBlur={handleBlur}
									placeholder="https://www.facebook.com/JuanPerez"
								/>
								<FormError error={errors.facebookUrl} touched={touched.facebookUrl} />
							</FormGroup>
							<FormGroup>
								<FormInputText
									type="text"
									name="linkedinUrl"
									valueToShow={values.linkedinUrl}
									handleChange={handleChange}
									handleBlur={handleBlur}
									placeholder="https://www.linkedin.com/JuanPerez"
								/>
								<FormError error={errors.linkedinUrl} touched={touched.linkedinUrl} />
							</FormGroup>
							<div className="sm:col-span-2 lg:col-span-2">
								<Field name="description">
									{({ field, form }) => (
										<CKEditor
											editor={ClassicEditor}
											data={field.value}
											onChange={(event, editor) => setFieldValue("description", editor.getData())}
											onBlur={(event, editor) => setFieldTouched("description", editor.getData())}
										/>
									)}
								</Field>
							</div>
							<FormError error={errors.description} touched={touched.description} />
						</FormContainerInput>
					</FormContainer>
					<div className="relative p-10">
						<FormSubmitButton />
					</div>
				</Form>
			</>
		</FormikProvider>
	);
};

export default MembersForm;
