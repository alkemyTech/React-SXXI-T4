import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { yupErrorMessages } from "utils/messages/formMessagesValidation";

import { putUserAdmin, postUserAdmin } from "Services/UsersAdmin/ApiService";
import LayoutForm from "Components/Layout/LayoutForm/LayoutForm";
import FormTitle from "Components/common/Form/FormTitle";
import InputImage from "Components/common/Form/InputImage";
import Form from "Components/common/Form/Form";
import FormInputText from "Components/common/Form/FormInputText";
import FormInputPassword from "Components/common/Form/FormInputPassword";
import FormDropDownList from "Components/common/Form/FormDropDownList";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";
import FormError from "Components/common/Form/FormError";
import FormGroup from "Components/common/Form/FormGroup";

// eslint-disable-next-line no-unused-vars
const SUPPORTED_FORMATS = ["image/jpg", "image/png"];

const UserForm = () => {
	const [user, setUser] = useState({});
	const { id } = useParams();
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

	useEffect(() => {
		if (id) {
			axios
				.get(process.env.REACT_APP_API + "users/" + id)
				.then(res => {
					setUser(res.data.data);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, []);

	return (
		<LayoutForm>
			<Formik
				initialValues={{
					name: user?.name || "",
					email: user?.email || "",
					password: user?.password || "",
					profile_image: user?.profile_image || "",
					role_id: user?.role_id || "",
				}}
				onSubmit={(values, { resetForm }) => {
					if (user?.id) {
						putUserAdmin(user.id, values);
					} else {
						postUserAdmin(values);
						resetForm(values);
					}
				}}
				validationSchema={() =>
					yup.object().shape({
						name: yup
							.string()
							.min(4, yupErrorMessages.min4)
							.required(yupErrorMessages.required),
						email: yup
							.string()
							.required(yupErrorMessages.required)
							.email(yupErrorMessages.invalidEmail),
						role_id: yup.string().required(yupErrorMessages.required),
						password: yup
							.string()
							.required(yupErrorMessages.required)
							.min(8, yupErrorMessages.min8),
					})
				}
				enableReinitialize
			>
				{({
					values,
					setFieldValue,
					errors,
					touched,
					handleChange,
					handleBlur,
				}) => (
					<Form>
						<FormTitle>{user.id ? "Editar" : "Crear"} Usuario</FormTitle>
						<div className="p-5 lg:flex  justify-center items-center">
							<div className="w-full lg:w-1/5 flex justify-center items-center pb-5 lg:pb-0">
								<InputImage
									bgImage={values.profile_image}
									formikFieldName="profile_image"
									setFieldValue={setFieldValue}
								/>
								<FormError
									error={errors.profile_image}
									touched={touched.profile_image}
								/>
							</div>
							<div className="w-full lg:w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mx-auto gap-y-4 content-center">
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
									<FormError
										error={errors.password}
										touched={touched.password}
									/>
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
							</div>
						</div>
						<div className="relative p-10">
							<FormSubmitButton />
						</div>
					</Form>
				)}
			</Formik>
		</LayoutForm>
	);
};

export default UserForm;
