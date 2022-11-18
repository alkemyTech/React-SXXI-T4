import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
	getOrganizationWelcome,
	putOrganization,
} from "Services/Organization/ApiService";
import { convertBase64 } from "utils/ConvertBase64/ConvertBase64";

export default function OrganizationForm() {
	const [dataOrganization, setDataOrganization] = useState({});
	const inputImage = useRef();
	const id = 1;
	const message = "Este campo es obligatorio.";
	const messageUrl = "Introduzca una URL valida.";

	useEffect(() => {
		getOrganizationWelcome(setDataOrganization);
	}, []);

	return (
		<div className="h-screen">
			<div
				className="w-full sm:w-full sm:mx-auto md:w-1/2 
                            lg:w-4/5 md:mx-auto flex flex-col 
                            justify-center items-center"
			>
				<Formik
					initialValues={{
						name: dataOrganization?.name || "",
						logo: dataOrganization?.logo || "",
						short_description: dataOrganization?.short_description || "",
						long_description: dataOrganization?.long_description || "",
						facebook_url: dataOrganization?.facebook_url || "",
						linkedin_url: dataOrganization?.linkedin_url || "",
						instagram_url: dataOrganization?.instagram_url || "",
						twitter_url: dataOrganization?.twitter_url || "",
					}}
					onSubmit={values => {
						putOrganization(values, id);
						Swal.fire({
							icon: "success",
							text: "Se Actualizaron los datos con exito!",
						});
					}}
					validationSchema={() =>
						yup.object().shape({
							name: yup.string().required(message),
							logo: yup.string().required(message),
							short_description: yup.string().required(message),
							long_description: yup.string().required(message),
							facebook_url: yup.string().url(messageUrl),
							linkedin_url: yup.string().url(messageUrl),
							instagram_url: yup.string().url(messageUrl),
							twitter_url: yup.string().url(messageUrl),
						})
					}
					enableReinitialize
				>
					{({ errors, setFieldValue, values, handleChange }) => (
						<Form className="w-4/5 sm:w-3/5 md:w-full md:mx-auto lg:w-3/5">
							<div className="mt-10">
								<h1 className="text-2xl font-semibold text-center pb-2 tracking-wide">
									¡Actualiza los datos de la organización!
								</h1>
							</div>

							<div className="w-full flex flex-col  gap-4">
								<div>
									<label className="font-semibold p-3">Ingresa un nombre</label>
									<input
										className="h-12 w-full border border-slate-300 rounded-lg p-4"
										name="name"
										onChange={handleChange}
										value={values.name || ""}
										placeholder="Ingrese un nombre"
									/>
									<ErrorMessage
										name="name"
										component={() => (
											<span className="text-red-400 text-xs">
												{errors.name}
											</span>
										)}
									/>
								</div>
								<div>
									<label className="font-semibold p-3">
										Ingresa una corta descripción
									</label>
									<CKEditor
										name="short_description"
										editor={ClassicEditor}
										data={values.short_description}
										onChange={(event, editor) => {
											setFieldValue("short_description", editor.getData());
										}}
									/>
									<ErrorMessage
										name="short_description"
										component={() => (
											<span className="text-red-400 text-xs">
												{errors.short_description}
											</span>
										)}
									/>
								</div>
								<div>
									<label className="font-semibold p-3">
										Ingresa una descripción
									</label>
									<input
										className="h-12 w-full border border-slate-300 rounded-lg p-4"
										name="long_description"
										onChange={handleChange}
										value={values.long_description || ""}
										placeholder="Ingrese una descripción"
									/>
									<ErrorMessage
										name="long_description"
										component={() => (
											<span className="text-red-400 text-xs">
												{errors.long_description}
											</span>
										)}
									/>
								</div>
								<div>
									<label className="font-semibold p-3">
										Ingresa la url de facebook
									</label>

									<input
										className="h-12 w-full border border-slate-300 rounded-lg p-4"
										name="facebook_url"
										onChange={handleChange}
										value={values.facebook_url || ""}
										placeholder="Ingresa tu red de facebook"
									/>
									<ErrorMessage
										name="facebook_url"
										component={() => (
											<span className="text-red-400 text-xs">
												{errors.facebook_url}
											</span>
										)}
									/>
								</div>
								<div>
									<label className="font-semibold p-3">
										Ingresa la url de linkedin
									</label>

									<input
										className="h-12 w-full border border-slate-300 rounded-lg p-4"
										name="linkedin_url"
										onChange={handleChange}
										value={values.linkedin_url || ""}
										placeholder="Ingresa tu red de linkedin"
									/>
									<ErrorMessage
										name="linkedin_url"
										component={() => (
											<span className="text-red-400 text-xs">
												{errors.linkedin_url}
											</span>
										)}
									/>
								</div>

								<div>
									<label className="font-semibold p-3">
										Ingresa la url de instagram
									</label>

									<input
										className="h-12 w-full border border-slate-300 rounded-lg p-4"
										name="instagram_url"
										onChange={handleChange}
										value={values.instagram_url || ""}
										placeholder="Ingresa tu red de instagram"
									/>
									<ErrorMessage
										name="instagram_url"
										component={() => (
											<span className="text-red-400 text-xs">
												{errors.instagram_url}
											</span>
										)}
									/>
								</div>
								<div>
									<label className="font-semibold p-3">
										Ingresa la url de twitter
									</label>

									<input
										className="h-12 w-full border border-slate-300 rounded-lg p-4"
										name="twitter_url"
										onChange={handleChange}
										value={values.twitter_url || ""}
										placeholder="Ingresa tu red de twitter"
									/>
									<ErrorMessage
										name="twitter_url"
										component={() => (
											<span className="text-red-400 text-xs">
												{errors.twitter_url}
											</span>
										)}
									/>
								</div>
								<div className="flex  justify-between">
									<img
										className="h-1/3 w-1/3  rounded-full"
										src={values.logo}
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
												Cambie el logo
											</span>
											<input
												type="file"
												name="logo"
												className="hidden"
												onChange={() =>
													convertBase64(setFieldValue, inputImage)
												}
												ref={inputImage}
												accept=".jpg, .png"
											/>
										</label>
									</div>
								</div>

								<ErrorMessage
									name="logo"
									component={() => (
										<span className="text-red-400 text-xs">{errors.logo}</span>
									)}
								/>

								<div className="w-auto my-5">
									<button
										type="submit"
										className=" px-6 py-2 bg-sky-600   tracking-wide 
									rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-lg font-medium"
									>
										Actualizar datos
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
