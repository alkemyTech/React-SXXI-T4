/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { yupErrorMessages } from "utils/messages/formMessagesValidation";
/* import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; */

import {
	putUserAdmin,
	postUserAdmin,
	getUserAdmin,
} from "Services/UsersAdmin/ApiService";
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
import FormContainer from "Components/common/Form/FormContainer";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import FormContainerInput from "Components/common/Form/FormContainerInput";
// eslint-disable-next-line no-unused-vars
const SUPPORTED_FORMATS = ["image/jpg", "image/png"];

const UserForm = () => {
	const [user, setUser] = useState({});
	const { id } = useParams();
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
			getUserAdmin(setUser, id);
		}
	}, []);

	console.log(user);
	return (
		<LayoutForm>
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
					console.log(values);

					if (user?.id) {
						console.log("Actualiza!");
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
						password: yup
							.string()
							.required(yupErrorMessages.required)
							.min(8, yupErrorMessages.min8),
						role_id: yup.string().required(yupErrorMessages.required),
						profile_image: yup.string(),
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
						<FormContainer>
							<FormContainerImage>
								<InputImage
									bgImage={values.profile_image}
									FieldName="profile_image"
									setFieldValue={setFieldValue}
								/>
								<FormError
									error={errors.profile_image}
									touched={touched.profile_image}
								/>
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
								{/* <div className="sm:col-span-2 lg:col-span-2">
									<CKEditor
										name="description"
										editor={ClassicEditor}
										data={""}
										onChange={(event, editor) => {
											editor.getData();
										}}
									/>
									<FormError error={errors.role_id} touched={touched.role_id} />
								</div> */}
							</FormContainerInput>
						</FormContainer>

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
