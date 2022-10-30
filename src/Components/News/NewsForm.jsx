import React, { useEffect, useState } from "react";

import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Formik } from "formik";
import * as Yup from "yup";

import "../../Components/FormStyles.css";

const initialValues = {
	id: null,
	title: "",
	content: "",
	image: "",
	categoryId: "",
};

const NewsForm = () => {
	const [news, setNews] = useState(initialValues);
	const [categories, setCategories] = useState([]);

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
	}, []);

	const validations = () =>
		Yup.object().shape({
			title: Yup.string().required(),
			content: Yup.string().required(),
			image: Yup.mixed().required(),
			categoryId: Yup.number().required(),
		});

	const handleChangeCKE = (editor, setFieldValue) => {
		setFieldValue("content", editor.getData());
	};

	const handleSubmit = (values, errors) => {
		console.log(values);
	};

	console.log(setNews);

	return (
		<Formik
			initialValues={news}
			onSubmit={(values, actions) => {
				actions.resetForm();
				handleSubmit(values);
			}}
			validationSchema={validations}
		>
			{({ values, handleChange, handleSubmit, setFieldValue }) => (
				<form className="form-container" onSubmit={handleSubmit}>
					<label>Titulo</label>
					<input
						className="input-field"
						type="text"
						name="title"
						value={values.title}
						onChange={handleChange("title")}
					></input>
					<label>Contenido</label>
					<CKEditor
						config={{ placeholder: "Ingrese el contenido aqui..." }}
						data={news?.content}
						editor={ClassicEditor}
						onChange={(e, editor) => handleChangeCKE(editor, setFieldValue)}
					/>
					<label>Imagen</label>
					<div className="input-field">
						<input
							type="file"
							name="image"
							accept="image/*"
							onChange={e => setFieldValue("image", e.currentTarget.files[0])}
						/>
					</div>
					<label>Categoria</label>
					<select
						className="select-field"
						name="categoryId"
						value={values.categoryId}
						onChange={handleChange("categoryId")}
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
					<button className="submit-btn" type="submit">
						{values.id ? "Editar" : "Enviar"}
					</button>
				</form>
			)}
		</Formik>
	);
};

export default NewsForm;
