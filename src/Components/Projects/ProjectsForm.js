import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const today = new Date().toISOString().slice(0, 10);

const initialValues = {
	id: null,
	title: "",
	description: "",
	image: "",
	due_date: today,
};

const ProjectsForm = ({ editProject }) => {
	const [project, setProject] = useState(editProject || initialValues);
	const { id } = useParams();
	const inputImage = useRef();

	const getCurrentProject = async () => {
		if (id || project.id !== null) {
			const res = { data: {}, error: null };
			try {
				const { data } = await axios.get(
					`https://ongapi.alkemy.org/api/projects/${id || project.id}`
				);
				res.data = data.data;
				res.data.due_date = res.data.due_date.slice(0, 10);
				res.data.image = "";
				setProject(res.data);
				console.log(res.data);
			} catch (error) {
				Swal.fire(`${error} Pongase en contacto con el administrador`);
			}
		}
	};

	useEffect(() => {
		getCurrentProject();
	}, []);

	const handleSubmit = values => {
		console.log(values);
	};

	return (
		<Formik
			initialValues={project}
			onSubmit={(values, actions) => {
				actions.resetForm();
				handleSubmit(values);
			}}
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
					<div className=" mt-10">
						<h1 className=" text-2xl font-semibold text-center pb-2 tracking-wide">
							Crear Proyecto
						</h1>
					</div>
					<div className=" w-full flex flex-col gap-4">
						<label>Nombre</label>
						<input
							className=" h-12 w-full border border-slate-300 rounded-lg p-4"
							type="text"
							name="title"
							value={values.title}
							onChange={handleChange("title")}
							placeholder="Ingrese nombre de proyecto"
						></input>
						<label>Descripcion</label>
						<input
							className=" h-12 w-full border border-slate-300 rounded-lg p-4"
							type="text"
							name="description"
							value={values.description}
							onChange={handleChange("description")}
							placeholder="Escriba la descripcion aqui"
						></input>
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
										Cambie el logo
									</span>
									<input
										type="file"
										name="image"
										className=" hidden"
										accept=".jpg, .png"
										value={values.image}
										onChange={handleChange("image")}
										ref={inputImage}
									/>
								</label>
							</div>
						</div>
						<label>Fecha de Vencimiento</label>
						<input
							className=" h-12 w-full border border-slate-300 rounded-lg p-4"
							type="date"
							name="due_date"
							value={values.due_date}
							onChange={handleChange("due_date")}
							min={today}
						/>
						<button className="submit-btn" type="submit">
							Send
						</button>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default ProjectsForm;
