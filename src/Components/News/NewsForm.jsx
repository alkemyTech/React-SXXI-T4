import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import "../../Components/FormStyles.css";
import { toBase64 } from "../../Helpers/toBase64";
import Swal from "sweetalert2";

const initialValues = {
	id: null,
	name: "",
	content: "",
	image: "",
	category_id: "",
};

const NewsForm = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [news, setNews] = useState(initialValues);
	const [categories, setCategories] = useState([]);
	const { id } = useParams();

	const getCurrentNews = async () => {
		if (id) {
			const res = { data: {}, error: null };
			try {
				const { data } = await axios.get(
					`https://ongapi.alkemy.org/api/news/${id}`
				);
				res.data = data.data;
				res.data.image = null;
			} catch (error) {
				Swal.fire(
					`${error} error de peticion. Pongase en contacto con el administrador. `
				);
			}
			setNews(res.data);
		}
	};

	const updateCategories = async () => {
		const res = { data: {}, error: null };
		try {
			const { data } = await axios.get(
				"https://ongapi.alkemy.org/api/categories"
			);
			res.data = data.data;
		} catch (error) {
			res.error = error.message;
		}
		setCategories(res.data);
	};

	useEffect(() => {
		updateCategories();
		getCurrentNews();
		setIsLoading(false);
	}, []);

	const required = "Todos los campos son obligatorios";

	const validations = () =>
		Yup.object().shape({
			name: Yup.string()
				.min(4, "El titulo debe contener una longitud minima de 4 caracteres")
				.required(required),
			content: Yup.string().required(required),
			image: Yup.mixed().required(required),
			category_id: Yup.number().required(required),
		});

	const handleChangeCKE = (editor, setFieldValue) => {
		setFieldValue("content", editor.getData());
	};

	const handleSubmit = async values => {
		const base64Img = await toBase64(values.image);
		values.image = base64Img;

		const { error } = values.id
			? await axios.put(
					`https://ongapi.alkemy.org/api/news/${values.id}`,
					values
			  )
			: await axios.post(`https://ongapi.alkemy.org/api/news`, values);

		if (error) {
			Swal.fire(
				`${error}: Error de peticion, pongase en contacto con el administrador. `
			);
		} else {
			setNews(initialValues);
			Swal.fire("Noticia guardada correctamente");
		}
	};

	return (
		<>
			{isLoading ? (
				<h2> Cargando...</h2>
			) : (
				<Formik
					initialValues={news}
					onSubmit={(values, actions) => {
						actions.resetForm();
						handleSubmit(values);
					}}
					validationSchema={validations}
					enableReinitialize
				>
					{({
						values,
						touched,
						errors,
						handleChange,
						handleSubmit,
						setFieldValue,
					}) => (
						<form className="form-container" onSubmit={handleSubmit}>
							<label>Titulo</label>
							<input
								className=" w-full border border-slate-300 rounded-lg p-4"
								type="text"
								name="name"
								value={values.name}
								onChange={handleChange("name")}
								placeholder={id && "Ingrese una imagen nueva para editar"}
							></input>
							{touched.name && (
								<ErrorMessage
									name="name"
									component={() => (
										<span className=" text-red-400 text-xs">{errors.name}</span>
									)}
								/>
							)}
							<label>Contenido</label>
							<CKEditor
								config={{ placeholder: "Ingrese el contenido aqui..." }}
								data={news?.content}
								editor={ClassicEditor}
								onChange={(e, editor) => handleChangeCKE(editor, setFieldValue)}
							/>
							{touched.content && (
								<ErrorMessage
									name="content"
									component={() => (
										<span className=" text-red-400 text-xs">
											{errors.content}
										</span>
									)}
								/>
							)}
							<label>Imagen</label>
							<div>
								<input
									className=" w-full border border-slate-300 rounded-lg p-4"
									type="file"
									name="image"
									accept="image/*"
									onChange={e =>
										setFieldValue("image", e.currentTarget.files[0])
									}
								/>
							</div>
							{touched.image && (
								<ErrorMessage
									name="image"
									component={() => (
										<span className=" text-red-400 text-xs">
											{errors.image}
										</span>
									)}
								/>
							)}
							<label>Categoria</label>
							<select
								className=" w-full border border-slate-300 rounded-lg p-4"
								name="category_id"
								value={values.category_id}
								onChange={handleChange("category_id")}
							>
								<option value="" disabled>
									Select category
								</option>
								{categories.map(({ id, name }) => (
									<option value={id} key={id}>
										{name}
									</option>
								))}
							</select>
							{touched.category_id && (
								<ErrorMessage
									name="category_id"
									component={() => (
										<span className=" text-red-400 text-xs">
											{errors.category_id}
										</span>
									)}
								/>
							)}
							<button className="submit-btn" type="submit">
								{values.id ? "Editar" : "Enviar"}
							</button>
						</form>
					)}
				</Formik>
			)}
		</>
	);
};

export default NewsForm;
