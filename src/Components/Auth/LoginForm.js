import React, { useState } from "react";
import { Formik } from "formik";
import "../FormStyles.css";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FormInputText from "../common/Form/FormInputText";
import FormError from "../common/Form/FormError";
import FormInputPassword from "../common/Form/FormInputPassword";
import Form from "../common/Form/Form";
import FormTitle from "../common/Form/FormTitle";
import FormContainerInput from "../common/Form/FormContainerInput";
import {
	yupErrorMessages,
	yupRegexValidation,
} from "../../utils/messages/formMessagesValidation";
import LayoutForm from "../Layout/LayoutForm/LayoutForm";

const LoginForm = () => {
	const [loginData, setLoginData] = useState("");

	return (
		<div className="w-100 flex">
			<div className="basis-1/2">
				<LayoutForm>
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
									.email(yupErrorMessages.invalidEmail)
									.required(yupErrorMessages.required),
								password: yup
									.string()
									.matches(yupRegexValidation, yupErrorMessages.required)
									.required(yupErrorMessages.required)
							})
						}
					>
						{({ errors, touched }) => (
							<Form>
								<div className="place-content-center grid justify-items-center">
									<img
										className="place-content-center grid justify-items-center"
										src="/images/LOGO-SOMOSMAS.png"
									/>
								</div>
								<FormTitle>Bienvenido</FormTitle>
								<FormTitle>¡Inicia sesión en tu cuenta!</FormTitle>

								<FormContainerInput>
									<FormInputText
										type="text"
										name="email"
										placeholder="Ingresa tu correo electrónico"
									/>
									<FormError error={errors.email} touched={touched.email} />

									<FormInputPassword
										name="password"
										placeholder="Ingresa tu contraseña"
									/>
									<FormError
										error={errors.password}
										touched={touched.password}
									/>
								</FormContainerInput>

								<div className="w-100 justify-center items-center flex m-10">
									<button
										type="submit"
										className="w-1/3  py-2 bg-sky-600   tracking-wide 
									rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-lg font-medium"
									>
										Iniciar sesión
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</LayoutForm>
				<div className="absolute bottom-4 flex gap-4">
					<p className="font-medium text-slate-600">¿No tienes una cuenta?</p>
					<Link className="text-red-600 font-medium" to="/register-user">
						Registrar
					</Link>
				</div>
			</div>

			<div className="loginImg basis-1/2 ">
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
