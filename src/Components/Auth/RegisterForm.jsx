/* eslint-disable no-undef */
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "../FormStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { yupErrorMessages, yupRegexValidation } from "utils/messages/formMessagesValidation";
import somosmas from "Assets/images/LOGO-SOMOSMAS.png";
import imgRegister from "Assets/images/image-loginRegistrer.jpg";
import { useDispatch } from "react-redux";
import { signUp } from "store/Slices/authSlice";
import { postUserAdmin } from "Services/UsersAdmin/ApiService";

const RegisterForm = () => {
	// eslint-disable-next-line no-unused-vars
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<div className="flex w-full bg-slate-50  justify-between items-center min-h-screen">
			<div className="w-full sm:w-full sm:mx-auto md:w-1/2 md:mx-auto flex flex-col justify-center items-center">
			<div className=" absolute top-2 left-2 my-3 mx-3 font-poppins text-xl hover:scale-105 transition-all bg-sky-800 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded ">
				<Link to="/">Volver</Link>
			</div>
				<Formik
					initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
					onSubmit={(values, { resetForm }) => {
						if (values.email.slice(4) === "admin") {
							dispatch(signUp({ name: values.name, email: values.email, password: values.password }));
							navigate("/login");
						} else {
							postUserAdmin(values)
							navigate("/login");
						}
						dispatch(signUp({ name: values.name, email: values.email, password: values.password }));
						navigate("/login");
						resetForm(values);
					}}
					validationSchema={() =>
						yup.object().shape({
							name: yup.string().required(yupErrorMessages.required),
							email: yup.string().email(yupErrorMessages.invalidEmail).required(yupErrorMessages.required),
							password: yup
								.string()
								.matches(yupRegexValidation.messageRgx, yupErrorMessages.password6)
								.required(yupErrorMessages.required),
							confirmPassword: yup

								.string()
								.required(yupErrorMessages.required)
								.oneOf([yup.ref("password"), null], yupErrorMessages.comparePass),
						})
					}
				>
					{({ errors }) => (
						<Form className="w-4/5 sm:w-3/5 md:w-full md:mx-auto lg:w-3/5">
							<div className="w-full flex flex-col  gap-4">
								<div className="hidden lg:block md:hidden sm:hidden">
									<h4 className="text-base text-left">Bienvenido</h4>
									<h1 className="sefl-start text-xl md:text-3xl text-left font-semibold">
										Ingresa tus datos de registro!
									</h1>
								</div>
								<div className="mx-auto lg:hidden md:block">
									<img src={somosmas} />
								</div>
								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									name="name"
									placeholder="Ingresa tu nombre"
								/>
								<ErrorMessage
									name="name"
									component={() => <span className="text-red-400 text-xs">{errors.name}</span>}
								/>
								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									name="email"
									placeholder="Ingresa tu correo electronico"
								/>
								<ErrorMessage
									name="email"
									component={() => <span className="text-red-400 text-xs">{errors.email}</span>}
								/>

								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									type="password"
									name="password"
									placeholder="Ingresa una contraseña nueva"
								/>
								<ErrorMessage
									name="password"
									component={() => <span className="text-red-400 text-xs">{errors.password}</span>}
								/>

								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									name="confirmPassword"
									type="password"
									placeholder="Ingresa nuevamente la contraseña"
								/>
								<ErrorMessage
									name="confirmPassword"
									component={() => <span className="text-red-400 text-xs">{errors.confirmPassword}</span>}
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
					<Link to="/login" className="text-red-600 font-medium">
						Inicia sesion
					</Link>
				</div>
			</div>

			<div className="hidden lg:w-1/2 lg:block h-screen md:w-1/2 md:hidden sm:hidden">
				<img alt="loginRegister" src={imgRegister} className="h-screen w-full" />
			</div>
		</div>
	);
};

export default RegisterForm;
