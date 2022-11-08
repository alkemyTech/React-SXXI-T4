import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ErrorMessage, Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";

import "../../Components/FormStyles.css";

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
	const inputImage = useRef();
	const { id } = useParams();

	const getCurrentNews = async () => {
		if (id) {
			const res = { data: {}, error: null };
			try {
				const { data } = await axios.get(
					`https://ongapi.alkemy.org/api/news/${id}`
				);
				res.data = data.data;
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

	const convertBase64 = setFieldvalue => {
		const file = inputImage.current.files[0];
		const reader = new FileReader();
		// eslint-disable-next-line prefer-regex-literals
		const extensions = /(jpe?g|png)$/i;

		if (!extensions.test(file.type)) {
			Swal.fire({
				icon: "error",
				title: "¡Formato no valido!",
				text: "Seleccione un formato .png o .jpg.",
			});
			return;
		}

		reader.readAsDataURL(inputImage.current.files[0]);
		reader.onload = () => {
			const base64 = reader.result;
			setFieldvalue("image", base64);
		};
	};

	const required = "Todos los campos son obligatorios";

	const validations = () =>
		Yup.object().shape({
			name: Yup.string()
				.min(4, "El titulo debe contener una longitud minima de 4 caracteres")
				.required(required),
			content: Yup.string().required(required),
			image: Yup.string().required(required),
			category_id: Yup.number().required(required),
		});

	const handleChangeCKE = (editor, setFieldValue) => {
		setFieldValue("content", editor.getData());
	};

	const handleSubmit = async values => {
		const res = values.id
			? await axios.put(
					`https://ongapi.alkemy.org/api/news/${values.id}`,
					values
			  )
			: await axios.post(`https://ongapi.alkemy.org/api/news`, values);

		if (res.error) {
			Swal.fire(
				`${res.error}: Error en la peticion, pongase en contacto con el administrador. `
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
							<label>Imagen</label>
							<div className=" flex justify-between border rounded-lg p-3">
								<img
									src={values.image}
									className=" py-4 px-2 h-1/5 w-1/5"
									onError={e => {
										e.currentTarget.src =
											"https://img.icons8.com/material-outlined/512/add-image.png";
									}}
								/>
								<div className=" w-auto">
									<label className=" w-auto flex flex-col items-center px-2 py-4 bg-blue-500 text-white border rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-blue-400 ">
										<svg
											className="w-8 h-8"
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
										</svg>
										<span className=" mt-2 text-sm font-medium leading-normal">
											Subir imagen
										</span>
										<input
											type="file"
											name="image"
											className="hidden"
											accept=".jpg, .png"
											onChange={e => convertBase64(setFieldValue)}
											ref={inputImage}
										/>
									</label>
								</div>
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
