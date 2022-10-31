import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../FormStyles.css";
import * as yup from "yup";
import logo from "../../Assets/images/LOGO-SOMOS MAS.png"
import img from "../../Assets/images/juntosImg.jpg";
const LoginForm = () => {
	const message = "Por favor, completa los campos";
	const [loginData, setLoginData] = useState("");

	const showData = () => {
		console.log(loginData);
	};

	return (
		<div className="flex w-full bg-slate-100 justify-between items-center min-h-screen">
			<div className="w-full sm:w-1/2 md:w-1/2 flex flex-col justify-center items-center loginForm">
				<Formik
					initialValues={{ email: "", password: "" }}
					onSubmit={values => {
						setLoginData(values);
						showData();
					}}
					validationSchema={() =>
						yup.object().shape({
							email: yup
								.string()
								.email("Ingrese un correo electrónico válido")
								.required(message),
							password: yup
								.string()
								.matches(
									/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
									"La contraseña debe tener una longitud mínima de 6 caraceteres, y contener al menos un número, una letra y un símbolo"
								)
								.required(message),
						})
					}
				>
					{({ errors }) => (
						<Form className="w-4/5 sm:w-3/5 md:w-3/5 lg:w-3/5">
							<div className="w-full flex flex-col  gap-4 welcomeLogin">
								<div className="mx-auto md:hidden">
									<img src={logo} />
								</div>
								<div className="">
									<h4 className="md:text-left text-center font-bold md:font-normal sm:font-semi-bold pb-10 md:pb-0">Bienvenido</h4>
									<h1 className="sefl-start text-2xl md:text-3xl sm:text-left text-center font-semibold hidden md:block">
										¡Inicia sesión en tu cuenta!
									</h1>
								</div>

								<Field
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
									className="h-14 w-full border rounded-lg p-4"
									type="password"
									name="password"
									placeholder="Ingresa tu contraseña"
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
									className="w-full bg-red-600 p-3 mt-3 shadow tracking-wide 
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
					<p className="font-medium text-slate-600">
						¿No tienes una cuenta? ¡Regístrate!
					</p>
					<a
						className="text-red-600 font-medium"
						href="/src/Components/Auth/RegisterForm.js"
					>
						Registrar
					</a>
				</div>
			</div>

			<div className="loginImg">
				<img alt="loginForm" src={img} className="max-h-screen w-full" />
			</div>
		</div>
	);
};

export default LoginForm;
