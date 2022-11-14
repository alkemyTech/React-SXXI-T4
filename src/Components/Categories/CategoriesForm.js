import React, { useEffect, useState, useRef } from "react";
import { Formik, ErrorMessage, Form } from "formik";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Swal from "sweetalert2";
import {
	getCategory,
	postCategory,
	putCategory,
} from "../../Services/Category/ApiService";
import { convertBase64 } from "../../Utils/ConvertBase64/ConvertBase64";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CategoriesForm() {
	const [dataCategory, setDataCategory] = useState({});

	const message = "Esta campo es obligatorio";
	const messageMin = "Debe contener al menos 4 caracteres";
	const { id } = useParams();
	const referencia = useRef();
	useEffect(() => {
		// eslint-disable-next-line no-const-assign
		if (id) {
			getCategory(id, setDataCategory);
		}
	}, []);
	return (
		<div className="h-screen">
			<div className="w-full sm:w-full sm:mx-auto md:w-1/2 lg:w-4/5 md:mx-auto flex flex-col justify-center items-center">
				<Formik
					initialValues={{
						name: dataCategory?.name || "",
						description: dataCategory?.description || "",
						image: dataCategory?.image || "",
					}}
					onSubmit={(values, { resetForm }) => {
						if (!id) {
							postCategory(values);
							Swal.fire({
								icon: "success",
								text: "Se creo la categoria con exito!",
							});
							resetForm(values);
						} else {
							putCategory(id, values);
							Swal.fire({
								icon: "success",
								text: "Se Actualizaron los datos con exito!",
							});
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
					{({ errors, values, setFieldValue, handleChange, handleBlur }) => (
						<Form className="w-4/5 sm:w-3/5 md:w-full md:mx-auto lg:w-3/5">
							<div className="mt-10">
								<h1 className="text-2xl font-semibold text-center pb-2 tracking-wide">
									{id ? "¡Actualiza la " : "¡Crea una "} categoria!
								</h1>
							</div>

							<div className="w-full flex flex-col  gap-4">
								<input
									className="h-12 w-full border border-slate-300 rounded-lg p-4"
									name="name"
									onChange={handleChange}
									value={values.name || ""}
									onBlur={handleBlur}
									placeholder="Ingresa el nombre de la categoria"
								/>
								<ErrorMessage
									name="name"
									component={() => (
										<span className="text-red-400 text-xs">{errors.name}</span>
									)}
								/>
								<CKEditor
									name="description"
									editor={ClassicEditor}
									data={values.description}
									onChange={(event, editor) => {
										setFieldValue("description", editor.getData());
									}}
								/>

								<ErrorMessage
									name="description"
									component={() => (
										<span className="text-red-400 text-xs">
											{errors.description}
										</span>
									)}
								/>
								<div className="flex  justify-between">
									<img
										className="h-auto w-3/6 border-0  rounded-lg"
										src={values.image}
									/>
									<div className="w-auto  bg-grey-lighter">
										<label className="w-auto flex flex-col items-center px-2 py-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
											<svg
												className="w-8 h-8"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
											>
												<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
											</svg>
											<span className="mt-2 text-sm font-medium leading-normal">
												{id ? "Cambie una " : "Cargue una "} imagen
											</span>
											<input
												type="file"
												name="image"
												className="hidden"
												onChange={e => {
													convertBase64(setFieldValue, e.target);
												}}
												ref={referencia}
												accept=".jpg, .png"
											/>
										</label>
									</div>
								</div>

								<ErrorMessage
									name="image"
									component={() => (
										<span className="text-red-400 text-xs">{errors.image}</span>
									)}
								/>

								<div className="w-auto mt-2">
									<button
										type="submit"
										className=" px-6 py-2 bg-sky-600   tracking-wide 
									rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-lg font-medium"
									>
										{!id ? "Crear categoria" : "Actualizar datos"}
									</button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
