import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "../FormStyles.css";
import Swal from "sweetalert2";

const RegisterForm = () => {
	// eslint-disable-next-line no-unused-vars
	const [userLogin, setUserLogin] = useState({});

	const message = "Esta campo es obligatorio";
	console.log("hola");
	return (
		<div className="flex w-full bg-slate-100 lg:bg-white justify-between items-center min-h-screen">
			<div className="w-full sm:w-1/2 md:w-1/2 flex flex-col justify-center items-center">
				<Formik
					initialValues={{ email: "", password: "", confirmPassword: "" }}
					onSubmit={values => {
						setUserLogin(values);
						Swal.fire({
							icon: "success",
							text: "Tu registro fue exitoso!",
						});
					}}
					validationSchema={() =>
						yup.object().shape({
							email: yup.string().email().required(message),
							password: yup
								.string()
								.matches(
									/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
									"La contraseña debe tener al menos una letra, un numero y simbolo, mas 6 caracteres"
								)
								.required(message),
							confirmPassword: yup
								.string()
								.required(message)
								.oneOf(
									[yup.ref("password"), null],
									"Las contraseñas deben coincidir"
								),
						})
					}
				>
					{({ errors }) => (
						<Form className="w-4/5 sm:w-3/5 md:w-3/5 lg:w-3/5">
							<div className="w-full flex flex-col  gap-4">
								<div className="hidden sm:block">
									<h4 className="text-base text-left">Bienvenido</h4>
									<h1 className="sefl-start text-2xl md:text-3xl text-left font-semibold">
										Ingresa tus datos de registro!
									</h1>
								</div>
								<div className="mx-auto lg:hidden">
									<img src="images/logo-somosmas.png" />
								</div>
								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
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
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									type="password"
									name="password"
									placeholder="Ingresa una contraseña nueva"
								/>
								<ErrorMessage
									name="password"
									component={() => (
										<span className="text-red-400 text-xs">
											{errors.password}
										</span>
									)}
								/>

								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									name="confirmPassword"
									type="password"
									placeholder="Ingresa nuevamente la contraseña"
								/>
								<ErrorMessage
									name="confirmPassword"
									component={() => (
										<span className="text-red-400 text-xs">
											{errors.confirmPassword}
										</span>
									)}
								/>

								<button
									type="submit"
									className="w-full bg-red-600 p-3 mt-3 shadow tracking-wide 
									rounded-lg  mx-auto hover:bg-red-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-xl font-medium"
								>
									Registrarme
								</button>
							</div>
						</Form>
					)}
				</Formik>
				<div className="absolute bottom-4 flex gap-2">
					<p className="font-medium text-slate-600">Ya tienes cuenta?</p>
					<button className="text-red-600 font-medium">
						Inicia sesion
					</button>{" "}
				</div>
			</div>

			<div className="hidden lg:w-1/2 md:w-1/2 sm:block">
				<img
					alt="loginRegister"
					src="images/image-loginRegister.jpg"
					className="max-h-screen w-full"
				/>
			</div>
		</div>
	);
};

export default RegisterForm;
