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
import FormSubmitButton from "../common/Form/FormSubmitButton";
import {yupErrorMessages,yupRegexValidation} from "../../utils/messages/formMessagesValidation"

const LoginForm = () => {
	const [loginData, setLoginData] = useState("");

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
								.email(yupErrorMessages.invalidEmail)
								.required(yupErrorMessages.required),
							password: yup
								.string()
								.matches(yupRegexValidation, yupErrorMessages.passRequired)
								.required(yupErrorMessages.required),
						})
					}
				>
					{({ errors, touched }) => (
						<Form>
							<div className="w-full flex flex-col  gap-4 welcomeLogin">
								<div className="mx-auto md:hidden">
									<img src="/images/LOGO-SOMOSMAS.png" />
								</div>
								<div>
									<FormTitle>Bienvenido</FormTitle>
									<FormTitle>¡Inicia sesión en tu cuenta!</FormTitle>
								</div>

								<FormInputText
									type="text"
									name="email"
									placeholder="Ingresa tu correo electrónico"
								/>
								<FormError error={errors.email} touched={touched.email}  />

								<FormInputPassword
									name="password"
									placeholder="Ingresa tu contraseña"
									
								/>
								<FormError error={errors.password} touched={touched.password} />

								<FormSubmitButton type="submit">Inicia sesión</FormSubmitButton>
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
