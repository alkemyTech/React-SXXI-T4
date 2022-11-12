import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage, Form, FieldArray } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { getSlides, putSlides } from "../../Services/Home/ApiService";
import { getOrganization, putOrganizationWelcomeText } from "../../Services/Organization/ApiService";

export default function CategoriesForm() {
	const [dataSlide, setDataSlide] = useState([]);
	const [dataWelcomeText, setWelcomeText] = useState({});

	const message = "Este campo es obligatorio";

	useEffect(() => {
		getSlides(setDataSlide);
		getOrganization(setWelcomeText)
		
	}, []);


	const convertBase64 = (setFieldValue, value, id) => {
		console.log(value.files[0]);
		const reader = new FileReader();
		const extensions = /(jpe?g|png)$/i;

		if (!extensions.test(value.files[0].type)) {
			Swal.fire({
				icon: "error",
				title: "¡Formato no válido!",
				text: "Seleccione un formato .png o .jpg.",
			});
			return;
		}

		reader.readAsDataURL(value.files[0]);
		reader.onload = () => {
			const base64 = reader.result;
			setFieldValue(`slides[${id}].image`, base64);
		};
	};

	return (
		<div className="h-screen w-full">
			<div className="w-full sm:w-full sm:mx-auto md:w-3/5 lg:w-4/5 md:mx-auto flex  justify-center items-center">
				<Formik
					initialValues={{
						welcome_text: dataWelcomeText.welcome_text || "",
						slides: [
							{
								id: dataSlide[0]?.id || "",
								name: dataSlide[0]?.name || "",
								image: dataSlide[0]?.image || "",
							},
							{
								id: dataSlide[1]?.id || "",
								name: dataSlide[1]?.name || "",
								image: dataSlide[1]?.image || "",
							},
							{
								id: dataSlide[2]?.id || "",
								name: dataSlide[2]?.name || "",
								image: dataSlide[2]?.image || "",
							},
						],
					}}
					onSubmit={(values) => {
						putOrganizationWelcomeText(values.welcome_text,  dataWelcomeText.name);
						values.slides.map((data) => putSlides(data))

						Swal.fire({
							icon: "success",
							text: "Se Actualizaron los datos con éxito!",
						});
					}}
					validationSchema={() =>
						yup.object().shape({
							welcome_text: yup
								.string()
								.required(message)
								.min(20, "Deben ser al menos 20 caracteres"),
						})
					}
					enableReinitialize
				>
					{({ setFieldValue, handleChange, values, errors, handleBlur }) => (
						<Form className="w-full sm:w-3/5 md:w-full md:mx-auto lg:w-3/5">
							<div className="mt-10">
								<h1 className="text-2xl font-semibold text-center pb-2 tracking-wide">
									Actualizar los datos de INICIO
								</h1>
							</div>

							<div className="py-4">
								<input
									className="h-12 w-full border border-slate-300 rounded-lg p-4"
									name="welcome_text"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.welcome_text || ""}
									placeholder="Ingresa un mensaje de Bienvenida"
								/>
								<ErrorMessage
									name="welcome_text"
									component={() => (
										<span className="text-red-400 text-xs">
											{errors.welcome_text}
										</span>
									)}
								/>
							</div>
							<FieldArray name="slides">
								{FieldArrayProps => {
									const { form } = FieldArrayProps;
									return (
										<div>
											{form.values.slides?.map((data, index) => {
												return (
													<div
														className="w-full flex flex-col  gap-4"
														key={index}
													>
														<input
															className="h-12 w-full border border-slate-300 rounded-lg p-4"
															name={`slides[${index}].name`}
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.slides[index].name || ""}
															placeholder="Ingresa el nombre"
														/>
														<ErrorMessage
															name={`slides[${index}].name`}
															component={() => (
																<span className="text-red-400 text-xs">
																	errors
																</span>
															)}
														/>

														<div className="flex  justify-between">
															<img
																className="h-auto w-3/6 border-0  rounded-lg"
																src={data.image}
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
																		Cambie imagen
																	</span>
																	<input
																		type="file"
																		name={`slides[${index}].image`}
																		className="hidden"
																		onChange={e =>
																			convertBase64(
																				setFieldValue,
																				e.target,
																				index
																			)
																		}
																		
																		accept=".jpg, .png"
																	/>
																</label>
															</div>
														</div>

														<ErrorMessage
															name="image"
															component={() => (
																<span className="text-red-400 text-xs">
																	errors
																</span>
															)}
														/>
													</div>
												);
											})}
										</div>
									);
								}}
							</FieldArray>

							<div className="w-auto mt-2">
								<button
									type="submit"
									className=" px-6 py-2 bg-sky-600   tracking-wide 
														rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
													transition-all duration-500 text-white text-lg font-medium"
								>
									Actualizar datos
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
