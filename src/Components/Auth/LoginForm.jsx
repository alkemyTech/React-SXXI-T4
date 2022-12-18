import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { yupErrorMessages, yupRegexValidation } from "utils/messages/formMessagesValidation";
import blogImg02 from "Assets/images/blog-img-02.jpg";
import { addUser, signIn } from "store/Slices/authSlice";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { error } from "utils/alerts/alerts";
import somosmas from "Assets/images/LOGO-SOMOSMAS.png";
import { getAllUsersAdmin } from "Services/UsersAdmin/ApiService";

const LoginForm = () => {
	const [userToLogin, setUserToLogin] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoggedIn } = useSelector(state => state.user);

	useEffect(() => {
		getAllUsersAdmin(setUserToLogin);
	}, []);

	if (isLoggedIn) {
		return <Navigate to="/" />;
	}
	return (
		<div className="flex w-full bg-slate-50  justify-between items-center min-h-screen">
			<div className="w-full sm:w-full sm:mx-auto md:w-1/2 md:mx-auto flex flex-col justify-center items-center">
				<Formik
					initialValues={{ email: "", password: "" }}
					onSubmit={(values, { resetForm }) => {
						if (values.email.substr(0, 5) === "admin") {
							dispatch(signIn({ email: values.email, password: values.password })).then(e => {
								if (e.payload.data.user.role_id === 1) {
									navigate("/backoffice");
								}
							});
						} else {
							const user = userToLogin.find(
								element => element.email === values.email && element.password === values.password
							);
							if (user) {
								dispatch(addUser(user));
								navigate("/");
							}
						}
					}}
					validationSchema={() =>
						yup.object().shape({
							email: yup.string().email(yupErrorMessages.invalidEmail).required(yupErrorMessages.required),
							password: yup
								.string()
								.matches(yupRegexValidation.messageRgx, yupErrorMessages.password6)
								.required(yupErrorMessages.required),
						})
					}
				>
					{({ errors }) => (
						<Form className="w-4/5 sm:w-3/5 md:w-full md:mx-auto lg:w-3/5">
							<div className="w-full flex flex-col  gap-4">
								<div className="hidden lg:block md:hidden sm:hidden">
									<h4 className="text-base text-left">Bienvenido</h4>
									<h1 className="sefl-start text-2xl md:text-3xl text-left font-semibold">¡Ingresá a tu cuenta!</h1>
								</div>
								<div className="mx-auto lg:hidden md:block">
									<img src={somosmas} />
								</div>
								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									name="email"
									placeholder="Ingresa tu correo electrónico"
								/>
								<ErrorMessage
									name="email"
									component={() => <span className="text-red-400 text-xs">{errors.email}</span>}
								/>

								<Field
									className="h-14 w-full border border-slate-300 rounded-lg p-4"
									type="password"
									name="password"
									placeholder="Ingresa tu contraseña"
								/>
								<ErrorMessage
									name="password"
									component={() => <span className="text-red-400 text-xs">{errors.password}</span>}
								/>

								<button
									type="submit"
									className="w-full bg-red-600 p-3 mt-3 shadow tracking-wide 
									rounded-lg  mx-auto hover:bg-red-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-xl font-medium"
								>
									Ingresá
								</button>
							</div>
						</Form>
					)}
				</Formik>
				<div className="absolute bottom-4 flex gap-2">
					<p className="font-medium text-slate-600">¿No tienes cuenta?</p>
					<Link to="/register-user" className="text-red-600 font-medium">
						Registrarte
					</Link>
				</div>
			</div>

			<div className="hidden lg:w-1/2 lg:block h-screen md:w-1/2 md:hidden sm:hidden">
				<img alt="loginRegister" src={blogImg02} className="h-screen w-full imgLogin" />
			</div>
		</div>
	);
};

export default LoginForm;
