import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

import Form from "Components/common/Form/Form";
import FormTitle from "Components/common/Form/FormTitle";
import FormContainer from "Components/common/Form/FormContainer";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import InputImage from "Components/common/Form/InputImage";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormGroup from "Components/common/Form/FormGroup";
import FormInputText from "Components/common/Form/FormInputText";
import FormDropDownList from "Components/common/Form/FormDropDownList";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";
import FormError from "Components/common/Form/FormError";

const initialValues = {
	id: null,
	name: "",
	content: "",
	image: "",
	category_id: "",
};

const NewsForm = () => {
	const [news, setNews] = useState(initialValues);
	const [categories, setCategories] = useState([]);
	const { id } = useParams();
	const [currentImage, setCurrentImage] = useState("");

	const getCurrentNews = async () => {
		if (id) {
			const res = { data: {}, error: null };
			try {
				const { data } = await axios.get(`https://ongapi.alkemy.org/api/news/${id}`);
				res.data = data.data;
			} catch (error) {
				Swal.fire(`${error} error de peticion. Pongase en contacto con el administrador. `);
			}
			setNews(res.data);
			setCurrentImage(res.data.image);
		}
	};

	const updateCategories = async () => {
		const res = { data: {}, error: null };
		try {
			const { data } = await axios.get("https://ongapi.alkemy.org/api/categories");
			res.data = data.data;
		} catch (error) {
			res.error = error.message;
		}
		setCategories(res.data);
	};

	useEffect(() => {
		updateCategories();
		getCurrentNews();
	}, []);

	const required = "Todos los campos son obligatorios";

	const validations = () =>
		Yup.object().shape({
			name: Yup.string().min(4, "El titulo debe contener una longitud minima de 4 caracteres").required(required),
			content: Yup.string().required(required),
			image: Yup.string().required(required),
			category_id: Yup.number().required(required),
		});

	const handleChangeCKE = (editor, setFieldValue) => {
		setFieldValue("content", editor.getData());
	};

	const handleSubmit = async values => {
		if (values.image === currentImage) {
			delete values.image;
		}
		const res = values.id
			? await axios.put(`https://ongapi.alkemy.org/api/news/${values.id}`, values)
			: await axios.post(`https://ongapi.alkemy.org/api/news`, values);
		if (res.error) {
			Swal.fire(`${res.error}: Error en la peticion, pongase en contacto con el administrador. `);
		} else {
			setNews(initialValues);
			Swal.fire("Noticia guardada correctamente");
		}
	};

	return (
		<>
			<Formik
				initialValues={news}
				onSubmit={(values, actions) => {
					handleSubmit(values);
					actions.resetForm();
				}}
				validationSchema={validations}
				enableReinitialize
			>
				{({ values, touched, errors, handleBlur, handleChange, setFieldValue }) => (
					<Form>
						<FormTitle>{values.id ? "Editar" : "Crear"} Noticia</FormTitle>
						<FormContainer>
							<FormContainerImage>
								<InputImage
									bgImage={values.image || "/images/news.png"}
									FieldName="image"
									setFieldValue={setFieldValue}
								/>
								<FormError error={errors.image} touched={touched.image} />
							</FormContainerImage>
							<FormContainerInput>
								<FormGroup>
									<FormInputText
										type="text"
										name="name"
										valueToShow={values.name}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa el titulo de la noticia"
									/>
									<FormError error={errors.name} touched={touched.name} />
								</FormGroup>
								<FormGroup>
									<FormDropDownList
										options={categories}
										name="category_id"
										valueToShow={values.category_id}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Seleccione una categoria"
									/>
									<FormError error={errors.category_id} touched={touched.category_id} />
								</FormGroup>
								<div className="sm:col-span-2 lg:col-span-2">
									<CKEditor
										config={{ placeholder: "Ingrese el contenido aqui..." }}
										data={news?.content}
										editor={ClassicEditor}
										onChange={(e, editor) => handleChangeCKE(editor, setFieldValue)}
									/>
									<FormError error={errors.content} touched={touched.content} />
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
};

export default NewsForm;
