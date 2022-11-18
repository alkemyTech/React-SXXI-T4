import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import FormLayout from "../Layout/Layout";
import FormContainer from "../common/Form/FormContainer";
import FormContainerInput from "../common/Form/FormContainerInput";
import FormContainerImage from "../common/Form/FormContainerImage";
import Form from "../common/Form/Form";
import FormTitle from "../common/Form/FormTitle";
import InputImage from "../common/Form/InputImage";
import FormError from "../common/Form/FormError";
import FormInputText from "../common/Form/FormInputText";
import FormSubmitButton from "../common/Form/FormSubmitButton";

import {
	getTestimonials,
	postTestimonials,
	putTestimonials,
} from "../../Services/Testimonials/testimonials";

export default function CategoriesForm() {
	const [dataTestimonials, setDataTestimonials] = useState({});
	const { id } = useParams();
	const message = "Esta campo es obligatorio";
	const messageMin = "Debe contener al menos 4 caracteres";
	useEffect(() => {
		if (id) return getTestimonials(id, setDataTestimonials);
	}, []);

	const getFileExtension = filename => {
		return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
	};

	return (
		<div className="w-full flex justify-center">
			<FormLayout>
				<Formik
					initialValues={{
						name: dataTestimonials?.name || "",
						description: dataTestimonials?.description || "",
						image: dataTestimonials?.image || "",
					}}
					onSubmit={(values, { resetForm }) => {
						const result = getFileExtension(values.image);

						if (!id) {
							postTestimonials(values);
							resetForm(values);
							return;
						}

						if (!result) {
							putTestimonials(id, values);
						} else {
							const data = {
								name: values.name,
								description: values.description,
							};
							putTestimonials(id, data);
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
					{({
						errors,
						values,
						setFieldValue,
						handleChange,
						handleBlur,
						touched,
					}) => (
						<Form>
							<FormTitle>{id ? "Editar" : "Crear"} Testimonio </FormTitle>
							<FormContainer>
								<FormContainerImage>
									<InputImage
										bgImage={values.image}
										FieldName="image"
										setFieldValue={setFieldValue}
									/>
									<FormError error={errors.image} touched={touched.image} />
								</FormContainerImage>
								<FormContainerInput>
									<div className="w-full sm:col-span-2 lg:col-span-2">
										<FormInputText
											type="text"
											name="name"
											valueToShow={values.name}
											handleChange={handleChange}
											handleBlur={handleBlur}
											placeholder="Ingrese su nombre"
										/>
										<FormError error={errors.name} touched={touched.name} />
									</div>
									<div className="sm:col-span-2 lg:col-span-2">
										<CKEditor
											name="description"
											editor={ClassicEditor}
											data={values.description || ""}
											onChange={(event, editor) => {
												setFieldValue("description", editor.getData());
											}}
										/>
										<FormError
											error={errors.description}
											touched={touched.description}
										/>
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
		</div>
	);
}
