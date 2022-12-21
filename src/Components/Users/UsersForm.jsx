/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { yupErrorMessages } from "utils/messages/formMessagesValidation";
import { putUserAdmin, postUserAdmin, getUserAdmin } from "Services/UsersAdmin/ApiService";
import FormTitle from "Components/common/Form/FormTitle";
import InputImage from "Components/common/Form/InputImage";
import Form from "Components/common/Form/Form";
import FormInputText from "Components/common/Form/FormInputText";
import FormInputPassword from "Components/common/Form/FormInputPassword";
import FormDropDownList from "Components/common/Form/FormDropDownList";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";
import FormError from "Components/common/Form/FormError";
import FormGroup from "Components/common/Form/FormGroup";
import FormContainer from "Components/common/Form/FormContainer";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/Slices/userSlice";
// eslint-disable-next-line no-unused-vars

const UserForm = () => {
	
	const { id } = useParams();
	const dispatch = useDispatch()
	const user = useSelector(state=>state.users.userToModify)

	const rolesToSelect = [
		{
			id: 1,
			name: "Administrador",
		},
		{
			id: 2,
			name: "Usuario",
		},
	];
	useEffect(() => {
		if (id) {
			dispatch(getUser(id))
		}
	}, []);
	return (
		<>
			<Formik
				initialValues={{
					id: user?.id || "",
					name: user?.name || "",
					email: user?.email || "",
					password: user?.password || "",
					profile_image: user?.profile_image || "",
					role_id: user?.role_id || "",
				}}
				onSubmit={(values, { resetForm }) => {
					if (id) {
						putUserAdmin(id, values);
					} else {
						postUserAdmin(values);
						resetForm(values);
					}
				}}
				validationSchema={() =>
					yup.object().shape({
						name: yup.string().min(4, yupErrorMessages.min4).required(yupErrorMessages.required),
						email: yup.string().required(yupErrorMessages.required).email(yupErrorMessages.invalidEmail),
						password: yup.string().required(yupErrorMessages.required).min(8, yupErrorMessages.min8),
						role_id: yup.string().required(yupErrorMessages.required),
						profile_image: yup.string(),
					})
				}
				enableReinitialize
			>
				{({ values, setFieldValue, errors, touched, handleChange, handleBlur }) => (
					<Form>
						<div className=" flex flex-row justify-end">
							<Link
								to={"/backoffice/usuarios"}
								className=" my-3 mr-3 font-poppins text-xl hover:scale-105 transition-all bg-sky-800 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded"
							>
								<p>Volver</p>
							</Link>
						</div>
						<div className="flex justify-center items-center gap-3">
							<FormTitle>{user.id ? "Editar" : "Crear"} Usuario</FormTitle>
						</div>

						<FormContainer>
							<FormContainerImage>
								<InputImage bgImage={values.profile_image} FieldName="profile_image" setFieldValue={setFieldValue} />
								<FormError error={errors.profile_image} touched={touched.profile_image} />
							</FormContainerImage>
							<FormContainerInput>
								<FormGroup>
									<FormInputText
										type="text"
										name="name"
										valueToShow={values.name}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa tu nombre"
									/>
									<FormError error={errors.name} touched={touched.name} />
								</FormGroup>
								<FormGroup>
									<FormInputText
										type="email"
										name="email"
										valueToShow={values.email}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa tu email"
									/>
									<FormError error={errors.email} touched={touched.email} />
								</FormGroup>
								<FormGroup>
									<FormInputPassword
										name="password"
										valueToShow={values.password}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa una contraseña"
									/>
									<FormError error={errors.password} touched={touched.password} />
								</FormGroup>
								<FormGroup>
									<FormDropDownList
										options={rolesToSelect}
										name="role_id"
										valueToShow={values.role_id}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Seleccione un rol"
									/>
									<FormError error={errors.role_id} touched={touched.role_id} />
								</FormGroup>
							</FormContainerInput>
						</FormContainer>

						<div className="relative p-10">
							<FormSubmitButton />
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default UserForm;
