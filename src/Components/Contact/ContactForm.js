import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

export default function ContactForm() {
	// eslint-disable-next-line no-unused-vars
	const [contactMessage, setContactMessage] = useState({});
	const messages = {
		required: "Este campo es requerido.",
		email: "Debe ingresar un correo electronico valido.",
		minNum: "Debe tener al menos 8 digitos",
		maxNum: "Debe tener un maximo de 12 digitos",
		valueNum: "Debe Contener valores numericos",
		regexNum: /^[0-9]+$/,
	};
	return (
		<div className="h-screen">
			<div className="w-full mx-auto h-auto">
				<img
					src="images/logo-somosmas.png"
					className="mx-auto h-32"
					alt="logo"
				/>
			</div>

			<div className="relative flex w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3 text-xl mx-auto items-center font-medium tracking-wide">
				<div>
					<h1>¿Quieres contribuir?</h1>
				</div>
				<button
					className="w-1/3 absolute right-0  bg-red-600 text-white p-2 px-4 shadow-md tracking-wide 
									rounded-lg  mx-auto hover:bg-red-500 hover:-translate-y-1 
									transition-all duration-500  text-base font-normal"
				>
					Donar
				</button>
			</div>

			<div className="w-full sm:w-full sm:mx-auto md:w-1/2 md:mx-auto flex flex-col justify-center items-center">
				<Formik
					initialValues={{ name: "", email: "", phone: "", message: "" }}
					onSubmit={(values, { resetForm }) => {
						setContactMessage(values);
						Swal.fire({
							icon: "success",
							title: "El mensaje se envio con exito!",
						});
						resetForm(values);
					}}
					validationSchema={() =>
						yup.object().shape({
							name: yup.string().required(messages.required),
							email: yup
								.string()
								.email(messages.email)
								.required(messages.required),
							phone: yup
								.string()
								.required(messages.required)
								.matches(messages.regexNum, messages.valueNum)
								.min(8, messages.minNum)
								.max(12, messages.maxNum),
							message: yup.string().required(messages.required),
						})
					}
				>
					{({ handleBlur, errors }) => (
						<Form className="w-4/5 sm:w-3/5 md:w-full md:mx-auto lg:w-3/5">
							<div className="mt-10">
								<h1 className="text-2xl font-semibold text-center pb-2 tracking-wide">
									¡Contactate con nosotros!
								</h1>
							</div>

							<div className="w-full flex flex-col  gap-4">
								<Field
									className="h-12 w-full border border-slate-300 rounded-lg p-4"
									name="name"
									placeholder="Ingresa tu nombre"
								/>
								<ErrorMessage
									name="name"
									component={() => (
										<span className="text-red-400 text-xs">{errors.name}</span>
									)}
								/>
								<Field
									className="h-12 w-full border border-slate-300 rounded-lg p-4"
									name="email"
									placeholder="Ingresa tu correo electronico"
								/>
								<ErrorMessage
									name="email"
									component={() => (
										<span className="text-red-400 text-xs">{errors.email}</span>
									)}
								/>

								<Field
									className="h-12 w-full border border-slate-300 rounded-lg p-4"
									name="phone"
									onBlur={handleBlur}
									placeholder="Ingresa un telefono de contacto"
								/>
								<ErrorMessage
									name="phone"
									component={() => (
										<span className="text-red-400 text-xs">{errors.phone}</span>
									)}
								/>

								<Field
									as="textarea"
									className="h-28 w-full border border-slate-300 rounded-lg p-4"
									name="message"
									placeholder="Ingresa tu mensaje.."
								/>
								<ErrorMessage
									name="message"
									component={() => (
										<span className="text-red-400 text-xs">
											{errors.message}
										</span>
									)}
								/>
								<div className="w-auto mt-2">
									<button
										type="submit"
										className=" px-6 py-2 bg-sky-600   tracking-wide 
									rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-lg font-medium"
									>
										Enviar mensaje
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
