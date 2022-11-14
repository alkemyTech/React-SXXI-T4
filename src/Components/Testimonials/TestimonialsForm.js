import React, { useEffect, useState /* , useRef */ } from "react";
import { Formik/* , ErrorMessage */ } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FormSubtitle from "../common/Form/FormSubtitle";
import FormSubmitButton from "../common/Form/FormSubmitButton.jsx";
import InputImage from "../common/Form/InputImage.jsx";
import FormTitle from "../common/Form/FormTitle.jsx";
import FormInputText from "../common/Form/FormInputText.jsx";
import FormError from "../common/Form/FormError.jsx";
import Form from "../common/Form/Form";
import { yupErrorMessages } from "../../utils/messages/formMessagesValidation";

export default function TestimonialsForm() {
	const [dataTestimonials, setDataTestimonials] = useState({});
	

	const { id } = useParams(); /* 
	const inputImage = useRef(); */
	useEffect(() => {
		if (id) {
			axios
				.get(`https://ongapi.alkemy.org/api/testimonials/${id}`)
				.then(res => setDataTestimonials(res.data.data))
				.catch(error => console.log(error));
		}
	}, []);

	/* const convertBase64 = setFieldvalue => {
		const reader = new FileReader();
		reader.readAsDataURL(inputImage.current.files[0]);
		reader.onload = () => {
			const base64 = reader.result;
			setFieldvalue("image", base64);
		};
	}; */
	return (
		<div className="h-screen">
			<div className="w-full sm:w-full sm:mx-auto md:w-1/2 lg:w-4/5 md:mx-auto flex flex-col justify-center items-center">
				<Formik
					initialValues={{
						name: "",
						description: "",
						image: "",
					}}
					onSubmit={(values, { resetForm }) => {
						if (!id) {
							axios
								.post(`https://ongapi.alkemy.org/api/testimonials`, values)
								.then(res => console.log(res))
								.catch(err => console.log(err));
						} else {
							axios
								.put(`https://ongapi.alkemy.org/api/testimonials/${id}`, values)
								.then(res => console.log(res))
								.catch(err => console.log(err));
						}
						resetForm();
					}}
					validationSchema={() =>
						yup.object().shape({
							name: yup.string().required(yupErrorMessages.required),
							description: yup.string().required(yupErrorMessages.required),
							image: yup
								.string()
								.required()
								.oneOf(["image/png", "image/jpg"], yupErrorMessages.format),
						})
					}
				>
					{({ errors, setFieldValue, values, handleChange, handleBlur, touched }) => (
						<Form>
							<div className="mt-10">
								<FormTitle>
									{id ? "Actualiza el " : "Crea un "} testimonio
								</FormTitle>
							</div>

							<div className="w-full flex flex-col  gap-4">
								<FormSubtitle>Su nombre: </FormSubtitle>
								<FormInputText
									type="text"
									name="name"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Ingrese su nombre"
								/>
								<FormError
									error={errors.name}
									touched={touched}
								/>
								<FormSubtitle>Su testimonio: </FormSubtitle>
								<CKEditor
									name="description"
									editor={ClassicEditor}
									data={dataTestimonials.description || values.description}
									onChange={(event, editor) => {
										setFieldValue("description", editor.getData());
									}}
									onBlur={(event, editor) => {}}
									onFocus={(event, editor) => {}}
								/>

								<FormError
									error={errors.description}
									touched={touched}
								/>
								<InputImage 
									bgImage={values.image} 
									formikFieldName={values.image}
									setFieldValue={values.image}

								/>

								<FormError
									name="image"
									error={errors.image}
								/>

								<div className="w-auto mt-2">
									<FormSubmitButton
										type="submit"
										className=" px-6 py-2 bg-sky-600   tracking-wide 
									rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-lg font-medium"
									>
										{!id ? "Subir testimonio" : "Actualizar testimonio"}
									</FormSubmitButton>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
