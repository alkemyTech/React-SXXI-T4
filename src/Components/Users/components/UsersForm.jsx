import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

import Form from "../../common/Form/Form";
import FormTitle from "../../common/Form/FormTitle";
import InputImage from "../../common/Form/InputImage";
import FormSubtitle from "../../common/Form/FormSubtitle";
import FormInputText from "../../common/Form/FormInputText";
import FormInputPassword from "../../common/Form/FormInputPassword";
import FormDropDownList from "../../common/Form/FormDropDownList";
import FormSubmitButton from "../../common/Form/FormSubmitButton";
import FormError from "../../common/Form/FormError";

const UserForm = ({ user }) => {
	const inputImage = useRef();

	const initialValues = {
		name: user ? user.name : "",
		email: user ? user.email : "",
		password: user ? user.password : "",
		profile_image: user ? user.profile_image : "",
		role_id: user ? user.role_id : "",
	};

	const rolesToSelect = [
		{
			value: 1,
			name: "Administrador",
		},
		{
			value: 2,
			name: "Usuario",
		},
	];

	const validationSchema = yup.object().shape({
		name: yup
			.string()
			.min(4, "Minimo 4 caracteres")
			.required("Nombre obligatorio"),
		email: yup.string().required("Email obligatorio").email("Email invalido"),
		role_id: yup.string().required("Rol obligatorio"),
		password: yup
			.string()
			.required("Contraseña obligatoria")
			.min(8, "Minimo 8 caracteres"),
		profile_image: yup.string().required("Imagen obligatoria"),
	});

	const onSubmit = () => {
		if (user?.id) {
			axios
				.put(process.env.REACT_APP_API + "users/" + user.id, values)
				.then(() => {
					Swal.fire("Usuario modificado correctamente!");
				})
				.catch(err => {
					console.log(err);
					Swal.fire("Error al modificar usuario :C intente con otro email");
				});
		} else {
			axios
				.post(process.env.REACT_APP_API + "users", values)
				.then(() => {
					Swal.fire("Usuario creado correctamente!");
				})
				.catch(err => {
					console.log(err);
					Swal.fire("Error al crear usuario :C intente con otro email");
				});
		}
		resetForm();
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});
	const {
		handleSubmit,
		errors,
		handleChange,
		handleBlur,
		values,
		touched,
		setFieldValue,
		resetForm,
	} = formik;

	return (
		<Form
			className="  flex flex-col justify-center align-middle w-11/12 md:w-3/4 lg:w-2/4 h-screen gap-3 mx-auto"
			handleSubmit={handleSubmit}
		>
			<FormTitle className="text-2xl text-center font-bold text-gray-500">
				Crear/Editar Usuario
			</FormTitle>
			<InputImage
				bgImage={values.profile_image}
				reference={inputImage}
				formikFieldName="profile_image"
				setFieldValue={setFieldValue}
			/>
			<FormError error={errors.profile_image} touched={touched.profile_image} />
			<FormSubtitle>Nombre</FormSubtitle>
			<FormInputText
				type="text"
				name="name"
				valueToShow={values.name}
				handleChange={handleChange}
				handleBlur={handleBlur}
				placeholder="Nombre"
			/>
			<FormError error={errors.name} touched={touched.name} />
			<FormSubtitle>Email</FormSubtitle>
			<FormInputText
				type="email"
				name="email"
				valueToShow={values.email}
				handleChange={handleChange}
				handleBlur={handleBlur}
				placeholder="Email"
			/>
			<FormError error={errors.email} touched={touched.email} />
			<FormSubtitle>Contraseña</FormSubtitle>
			<FormInputPassword
				name="password"
				valueToShow={values.password}
				handleChange={handleChange}
				handleBlur={handleBlur}
			/>
			<FormError error={errors.password} touched={touched.password} />
			<FormSubtitle>Rol</FormSubtitle>
			<FormDropDownList
				options={rolesToSelect}
				name="role_id"
				valueToShow={values.role_id}
				handleChange={handleChange}
				handleBlur={handleBlur}
				placeholder="Seleccione un rol"
			/>
			<FormError error={errors.role_id} touched={touched.role_id} />
			<FormSubmitButton>Enviar</FormSubmitButton>
		</Form>
	);
};

export default UserForm;
