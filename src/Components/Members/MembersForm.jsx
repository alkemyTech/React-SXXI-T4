import React, { useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberById, createMember, editMember } from "store/Slices/membersSlice";
import * as yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { yupErrorMessages } from "utils/messages/formMessagesValidation";

import FormContainer from "Components/common/Form/FormContainer";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import FormGroup from "Components/common/Form/FormGroup";
import Form from "Components/common/Form/Form";
import FormTitle from "Components/common/Form/FormTitle";
import InputImage from "Components/common/Form/InputImage";
import FormError from "Components/common/Form/FormError";
import FormInputText from "Components/common/Form/FormInputText";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";

const SUPPORTED_FORMATS = ["image/jpg", "image/png"];

const MembersForm = ({ showCKEditor }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();
	const member = useSelector(state => state.members.edit);
	const enableReinitialize = true;

	const initialValues = {
		name: member?.name || "",
		image: member?.image || "",
		facebookUrl: member?.facebookUrl || "",
		linkedinUrl: member?.linkedinUrl || "",
		description: member?.description || "",
	};

	useEffect(() => {
		if (id) {
			dispatch(getMemberById(id));
		}
	}, []);

	const validationSchema = yup.object().shape({
		name: yup.string().min(4, yupErrorMessages.min4).required(yupErrorMessages.required),
		image: yup
			.string()
			.required(yupErrorMessages.required)
			.test("fileType", yupErrorMessages.format, value => SUPPORTED_FORMATS?.map(format => value?.includes(format))),
		description: yup.string().required(yupErrorMessages.required),
		facebookUrl: yup.string().url("URL invalido").required(yupErrorMessages.required),
		linkedinUrl: yup.string().url("URL invalido").required(yupErrorMessages.required),
	});

	const onSubmit = () => {
		if (!id) {
			dispatch(createMember(values));
		} else {
			dispatch(editMember({ id, values }));
		}
		navigate("/backoffice/miembros");
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
		enableReinitialize,
	});
	const { handleSubmit, errors, handleChange, handleBlur, values, touched, setFieldValue, setFieldTouched } = formik;

	return (
		<FormikProvider value={formik}>
			<>
				<Form handleSubmit={handleSubmit}>
					<FormTitle>{id ? "Editar" : "Crear"} Miembro</FormTitle>
					<FormContainer>
						<FormContainerImage>
							<FormGroup>
								<InputImage
									bgImage={values.image}
									FieldName="image"
									setFieldValue={setFieldValue}
									handleChange={handleChange}
								/>
								<FormError error={errors.image} touched={touched.image} />
							</FormGroup>
						</FormContainerImage>
						<FormContainerInput>
							<FormGroup>
								<FormInputText
									type="text"
									name="name"
									valueToShow={values.name}
									handleChange={handleChange}
									handleBlur={handleBlur}
									placeholder="Juan Perez"
								/>
								<FormError error={errors.name} touched={touched.name} />
							</FormGroup>
							<FormGroup>
								<FormInputText
									type="text"
									name="facebookUrl"
									valueToShow={values.facebookUrl}
									handleChange={handleChange}
									handleBlur={handleBlur}
									placeholder="https://www.facebook.com/JuanPerez"
								/>
								<FormError error={errors.facebookUrl} touched={touched.facebookUrl} />
							</FormGroup>
							<FormGroup>
								<FormInputText
									type="text"
									name="linkedinUrl"
									valueToShow={values.linkedinUrl}
									handleChange={handleChange}
									handleBlur={handleBlur}
									placeholder="https://www.linkedin.com/JuanPerez"
								/>
								<FormError error={errors.linkedinUrl} touched={touched.linkedinUrl} />
							</FormGroup>
							<div className="sm:col-span-2 lg:col-span-2">
								{!showCKEditor && (
									<>
										<Field name="description">
											{({ field, form }) => (
												<CKEditor
													editor={ClassicEditor}
													data={field.value}
													onChange={(event, editor) => setFieldValue("description", editor.getData())}
													onBlur={(event, editor) => setFieldTouched("description", editor.getData())}
												/>
											)}
										</Field>
										<FormError error={errors.description} touched={touched.description} />
									</>
								)}
								{showCKEditor && (
									<FormGroup>
										<FormInputText
											type="text"
											name="description"
											valueToShow={values.description}
											handleChange={handleChange}
											handleBlur={handleBlur}
											placeholder="Escribe aqui tu descripcion"
										/>
										<FormError error={errors.description} touched={touched.description} />
									</FormGroup>
								)}
							</div>
						</FormContainerInput>
					</FormContainer>
					<div className="relative p-10">
						<FormSubmitButton />
					</div>
				</Form>
			</>
		</FormikProvider>
	);
};

export default MembersForm;
