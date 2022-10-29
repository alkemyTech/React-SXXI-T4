import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "../FormStyles.css";

const RegisterForm = () => {
	// const [userLogin, setUserLogin] = useState({});

	const navigate = useNavigate();

	const validationSchema = yup.object().shape({
		email: yup.string().required("Este campo de obligatorio"),
		password: yup
			.string()
			.matches(
				/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
				"La contraseña debe tener al menos una letra, un numero y simbolo, mas 6 caracteres"
			),
		confirmPassword: yup
			.string()
			.required("Please confirm your password")
			.oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
	});

	const { handleSubmit, errors, touched, getFieldProps } = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		onSubmit: values => {
			console.log(values);
		},
		validationSchema,
	});
	console.log("hola");
	return (
		<div className="flex w-full justify-between items-center min-h-screen">
			<div className="flex flex-col w-1/2 ">
				<form noValidate className="form-container" onSubmit={handleSubmit}>
					<div>
						<h4 className="text-base text-left">Bienvenido</h4>
						<h1 className="sefl-start text-3xl text-left font-semibold">
							Inicia sesion con tu cuenta!
						</h1>
					</div>
					<input
						className="h-14 border rounded-lg p-4"
						{...getFieldProps("email")}
						placeholder="Ingresa tu correo electronico"
					></input>
					{errors.email && touched.email && (
						<span className="text-red-400 text-xs">{errors.email}</span>
					)}

					<input
						className="h-14 border rounded-lg p-4"
						{...getFieldProps("password")}
						placeholder="Ingresa una contraseña nueva"
					></input>
					{errors.password && touched.password && (
						<span className="text-red-400 text-xs">{errors.password}</span>
					)}

					<input
						className="h-14 border rounded-lg p-4"
						{...getFieldProps("confirmPassword")}
						placeholder="Ingresa nuevamente la contraseña"
					></input>
					{errors.confirmPassword && touched.confirmPassword && (
						<span className="text-red-400 text-xs">
							{errors.confirmPassword}
						</span>
					)}

					<button
						className="bg-red-500 shadow rounded-lg mt-2 p-2 h-14 text-white font-normal text-2xl"
						type="submit"
					>
						Registrate
					</button>
				</form>
				<div className="absolute bottom-1 left-1/4">
					<p>
						Ya tienes cuenta?
						<a onClick={() => navigate("/login-user", { replace: true })}>
							Inicia sesión
						</a>{" "}
					</p>
				</div>
			</div>
			<div className="w-1/2">
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
