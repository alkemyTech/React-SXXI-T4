import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Formik } from "formik";
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
import { findById, create, update } from "Services/News/NewsApiServices";
import { getCategories } from "Services/Category/ApiService";
import { FileExtension } from "utils/GetFileExtension/FileExtension";

const NewsForm = () => {
	const [news, setNews] = useState();
	const [categories, setCategories] = useState([]);
	const required = "Todos los campos son obligatorios";
	const { id } = useParams();

	useEffect(() => {
		if(id){
			findById(id, setNews)
		}
		getCategories(setCategories);
	}, []);

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

	return (
		<>
			<Formik
				initialValues={{
					name: news?.name || "",
					content: news?.content || "",
					image: news?.image || "",
					category_id: news?.category_id || "",
				}}
				onSubmit={(values, { resetForm }) => {
					const result = FileExtension(values.image);
					if (!id) {
						create(values);
						resetForm(values);
						return;
					}
					if (!result) {
						update(id, values);
					} else {
						const data = { name: values.name, content: values.content, category_id: values.category_id };
						update(id, data);
					}
				}}
				validationSchema={validations}
				enableReinitialize
			>
				{({ values, touched, errors, handleBlur, handleChange, setFieldValue }) => (
					<Form>
						<FormTitle>{id ? "Editar" : "Crear"} Noticia</FormTitle>
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
										name="content"
										config={{ placeholder: "Ingrese el contenido aqui..." }}
										data={values.content || ""}
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
