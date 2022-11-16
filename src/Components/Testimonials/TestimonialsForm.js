import React from "react";

import * as yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { yupErrorMessages } from "../../utils/messages/formMessagesValidation";

import LayoutForm from "../";
import FormContainer from "../common/FormContainer";
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

const TestimonialsForm = ({ id }) => {

	const initialValues = {
		name: "",
		image: "",
		description: "",
	};

	const validationSchema = yup.object().shape({
		name: yup
			.string()
			.min(4, yupErrorMessages.min4)
			.required(yupErrorMessages.required),
		image: yup
			.string()
			.required(yupErrorMessages.required)
			.test("fileType", yupErrorMessages.format, value =>
				SUPPORTED_FORMATS?.map(format => value?.includes(format))
			),
		description: yup.string().required("Descripcion obligatoria")
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
			<LayoutForm>
				<Form handleSubmit={handleSubmit}>
					<FormTitle>{user?.id ? "Editar" : "Crear"} Testimonio</FormTitle>
					<FormContainer>
						<FormContainerImage>
							<FormGroup>
								<InputImage
									bgImage={values.image}
									FieldName="image"
									setFieldValue={setFieldValue}
								/>
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
									placeholder="Su nombre"
								/>
								<FormError error={errors.name} touched={touched.name} />
							</FormGroup>
							
							
							<div className="sm:col-span-2 lg:col-span-2">
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
							</div>
							<FormError
								error={errors.description}
								touched={touched.description}
							/>
						</FormContainerInput>
					</FormContainer>
					<div className="relative p-10">
						<FormSubmitButton />
					</div>
				</Form>
			</LayoutForm>
		</FormikProvider>
	);
};

export default TestimonialsForm;