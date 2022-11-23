/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";

import Form from "Components/common/Form/Form";
import FormContainer from "Components/common/Form/FormContainer";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormError from "Components/common/Form/FormError";
import FormGroup from "Components/common/Form/FormGroup";
import FormInputText from "Components/common/Form/FormInputText";
import FormLayout from "Components/Layout/LayoutForm/LayoutForm";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";
import FormTitle from "Components/common/Form/FormTitle";

import { getCategory, postCategory, putCategory } from "Services/Category/ApiService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputImage from "Components/common/Form/InputImage";
import { FileExtension } from "utils/GetFileExtension/FileExtension";
export default function CategoriesForm() {
	const [dataCategory, setDataCategory] = useState({});
	const { id } = useParams();
	const section = "categories";
	const message = "Esta campo es obligatorio";
	const messageMin = "Debe contener al menos 4 caracteres";
	useEffect(() => {
		// eslint-disable-next-line no-const-assign
		if (id) return getCategory(id, setDataCategory);
	}, []);

	return (
		<FormLayout>
			<Formik
				initialValues={{
					name: dataCategory?.name || "",
					description: dataCategory?.description || "",
					image: dataCategory?.image || "",
				}}
				onSubmit={(values, { resetForm }) => {
					const result = FileExtension(values.image);

					if (!id) {
						postCategory(values);
						resetForm(values);
						return;
					}

					if (!result) {
						putCategory(id, values);
					} else {
						const data = { name: values.name, description: values.description };
						putCategory(id, data);
					}
				}}
				validationSchema={() =>
					yup.object().shape({
						name: yup.string().min(4, messageMin).required(message),
						description: yup.string().required(message),
						image: yup.string().required(message),
					})
				}
				enableReinitialize
			>
				{({ errors, values, setFieldValue, handleChange, handleBlur, touched }) => (
					<Form>
						<FormTitle>{id ? "Editar" : "Crear"} Categoria</FormTitle>
						<FormContainer>
							<FormContainerImage>
								<InputImage
									bgImage={values.image}
									FieldName="image"
									setFieldValue={setFieldValue}
								/>
								<FormError />
							</FormContainerImage>
							<FormContainerInput>
								<FormGroup style="sm:col-span-2 lg:col-span-2">
									<FormInputText
										type="text"
										name="name"
										valueToShow={values.name}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa el nombre de la categoria"
									/>
									<FormError error={errors.name} touched={touched.name} />
								</FormGroup>
								<div className="sm:col-span-2 lg:col-span-2">
									<CKEditor
										name="description"
										editor={ClassicEditor}
										data={values.description || ""}
										onChange={(event, editor) => {
											setFieldValue("description", editor.getData());
										}}
									/>
									<FormError error={errors.description} touched={touched.description} />
								</div>
							</FormContainerInput>
						</FormContainer>
						<div className="relative p-10">
							<FormSubmitButton />
						</div>
					</Form>
				)}
			</Formik>
		</FormLayout>
	);
}
