import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../FormStyles.css";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const LoginForm = () => {
	const [loginData, setLoginData] = useState("");

	const messages = {
		messageRgx:
			/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
		messageRequired: "Este campo es requerido",
		messageEmail: "Debe contener un correo electronico valido.",
		messagePassRequired:
			"La contraseña debe contener al enos 6 caracteres, una letra, un numero y un simbolo $%#",
	};

	return (
		<div className="flex w-full bg-slate-100 justify-between items-center min-h-screen">
			<div className="w-full sm:w-1/2 md:w-1/2 flex flex-col justify-center items-center loginForm">
				<Formik
					initialValues={{ email: "", password: "" }}
					onSubmit={(values, { resetForm }) => {
						setLoginData(values);
						Swal.fire({
							position: "top-end",
							icon: "success",
							title: "¡Bienvenido!",
							text: `${loginData.email}`,
						});

						resetForm(values);
					}}
					validationSchema={() =>
						yup.object().shape({
							email: yup
								.string()
								.email(messages.messageEmail)
								.required(messages.messageRequired),
							password: yup
								.string()
								.matches(messages.messageRgx, messages.messagePassRequired)
								.required(messages.messageRequired),
						})
					}
				>
					{({ errors }) => (
						<Form className="w-4/5 sm:w-3/5 md:w-3/5 lg:w-3/5">
							<div className="w-full flex flex-col  gap-4 welcomeLogin">
								<div className="mx-auto md:hidden">
									<img src="/images/LOGO-SOMOSMAS.png" />
								</div>
								<div>
									<h4 className="md:text-left text-center text-2xl font-bold md:font-normal sm:font-semi-bold pb-5 md:pb-0">
										Bienvenido
									</h4>
									<h1 className="sefl-start text-2xl md:text-3xl sm:text-left text-center font-semibold hidden md:block">
										¡Inicia sesión en tu cuenta!
									</h1>
								</div>

								<Field
									id="fieldEmail"
									autoComplete="off"
									className="h-14 w-full border rounded-lg p-4"
									name="email"
									placeholder="Ingresa tu correo electrónico"
								/>
								<ErrorMessage
									name="email"
									component={() => (
										<span className="text-red-400 text-xs">{errors.email}</span>
									)}
								/>

								<Field
									id="fieldPassword"
									className="h-14 w-full border rounded-lg p-4"
									type="password"
									name="password"
									placeholder="Ingresa tu contraseña"
									autoComplete="off"
								/>
								<ErrorMessage
									name="password"
									component={() => (
										<span className="text-red-400 text-xs">
											{errors.password}
										</span>
									)}
								/>

								<button
									type="submit"
									className="w-full bg-red-600 p-3 mt-3 shadow tracking-wider 
									rounded-lg  mx-auto hover:bg-red-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-xl font-medium"
								>
									Inicia sesión
								</button>
							</div>
						</Form>
					)}
				</Formik>
				<div className="absolute bottom-4 flex gap-2">
					<p className="font-medium text-slate-600">¿No tienes una cuenta?</p>
					<Link className="text-red-600 font-medium" to="/register-user">
						Registrar
					</Link>
				</div>
			</div>

			<div className="loginImg">
				<img
					alt="loginForm"
					src="/images/juntosImg.jpg"
					className="max-h-screen w-full"
				/>
			</div>
		</div>
	);
};

export default LoginForm;
