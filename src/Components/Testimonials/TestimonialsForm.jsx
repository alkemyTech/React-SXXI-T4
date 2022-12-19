import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import FormContainer from "Components/common/Form/FormContainer";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import Form from "Components/common/Form/Form";
import FormTitle from "Components/common/Form/FormTitle";
import InputImage from "Components/common/Form/InputImage";
import FormError from "Components/common/Form/FormError";
import FormInputText from "Components/common/Form/FormInputText";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";

import { getTestimonial, postTestimonial, putTestimonial } from "Services/Testimonials/testimonials";

export default function CategoriesForm() {
	const [dataTestimonials, setDataTestimonials] = useState("");
	const { id } = useParams();
	const message = "Esta campo es obligatorio";
	const messageMin = "Debe contener al menos 4 caracteres";
	useEffect(() => {
		if (id) {
			getTestimonial(id, setDataTestimonials);
		}
	}, []);

	const getFileExtension = filename => {
		return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
	};
	return (
		<>
			<Formik
				initialValues={{
					name: dataTestimonials?.name || "",
					description: dataTestimonials?.description || "",
					image: dataTestimonials?.image || "",
				}}
				onSubmit={(values, { resetForm }) => {
					const result = getFileExtension(values.image);

					if (!id) {
						postTestimonial(values);
						resetForm(values);
						return;
					}

					if (!result) {
						putTestimonial(id, values);
					} else {
						const data = {
							name: values.name,
							description: values.description,
						};
						putTestimonial(id, data);
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
						<div className=" flex items-center justify-end ">
							<Link
								to={"/backoffice"}
								className="my-3 mr-3 font-poppins text-xl hover:scale-105 transition-all bg-sky-800 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded"
							>
								<p>Volver</p>
							</Link>
						</div>
						<div className="flex justify-center items-center gap-3">
							<FormTitle>{id ? "Editar" : "Crear"} Testimonio </FormTitle>
						</div>

						<FormContainer>
							<FormContainerImage>
								<div className="w-1/2">
									<InputImage bgImage={values.image} FieldName="image" setFieldValue={setFieldValue} />
								</div>
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
		</>
	);
}
