import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { FileExtension } from "utils/GetFileExtension/FileExtension";
import {
	getOrganization,
	putOrganization,
} from "Services/Organization/ApiService";
import LayoutForm from "Components/Layout/LayoutForm/LayoutForm";
import Form from "Components/common/Form/Form";
import FormContainer from "Components/common/Form/FormContainer";
import FormTitle from "Components/common/Form/FormTitle";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import InputImage from "Components/common/Form/InputImage";
import FormError from "Components/common/Form/FormError";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormGroup from "Components/common/Form/FormGroup";
import FormInputText from "Components/common/Form/FormInputText";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";
import { yupErrorMessages } from "utils/messages/formMessagesValidation";

export default function OrganizationForm() {
	const [dataOrganization, setDataOrganization] = useState({});
	const id = 1;
	useEffect(() => {
		getOrganization(setDataOrganization);
	}, []);

	return (
		<LayoutForm>
			<Formik
				initialValues={{
					name: dataOrganization?.name || "",
					logo: dataOrganization?.logo || "",
					short_description: dataOrganization?.short_description || "",
					long_description: dataOrganization?.long_description || "",
					facebook_url: dataOrganization?.facebook_url || "",
					linkedin_url: dataOrganization?.linkedin_url || "",
					instagram_url: dataOrganization?.instagram_url || "",
					twitter_url: dataOrganization?.twitter_url || "",
				}}
				onSubmit={values => {
					const result = FileExtension(values.logo);

					if (!result) {
						putOrganization(values, id);
					} else {
						const data = {
							name: values.name,
							short_description: values.short_description,
							long_description: values.long_description,
							facebook_url: values.facebook_url,
							linkedin_url: values.linkedin_url,
							instagram_url: values.instagram_url,
							twitter_url: values.twitter_url,
						};
						putOrganization(data, id);
					}

					putOrganization(values, id);
				}}
				validationSchema={() =>
					yup.object().shape({
						name: yup.string().required(yupErrorMessages.required),
						logo: yup.string().required(yupErrorMessages.required),
						short_description: yup.string().required(yupErrorMessages.required),
						long_description: yup.string().required(yupErrorMessages.required),
						facebook_url: yup
							.string()
							.url(yupErrorMessages.urlValida)
							.required(yupErrorMessages.required),
						linkedin_url: yup
							.string()
							.url(yupErrorMessages.urlValida)
							.required(yupErrorMessages.required),
						instagram_url: yup
							.string()
							.url(yupErrorMessages.urlValida)
							.required(yupErrorMessages.required),
						twitter_url: yup
							.string()
							.url(yupErrorMessages.urlValida)
							.required(yupErrorMessages.required),
					})
				}
				enableReinitialize
			>
				{({
					errors,
					setFieldValue,
					values,
					handleChange,
					touched,
					handleBlur,
				}) => (
					<Form>
						<FormTitle>Los datos de tu organizacion</FormTitle>
						<FormContainer>
							<FormContainerImage>
								<InputImage
									bgImage={values.logo}
									FieldName="logo"
									setFieldValue={setFieldValue}
								/>
								<FormError error={errors.logo} touched={touched.logo} />
							</FormContainerImage>
							<FormContainerInput>
								<FormGroup>
									<FormInputText
										type="text"
										name="name"
										valueToShow={values.name}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa el nombre de la Organizacion"
									/>
									<FormError error={errors.name} touched={touched.name} />
								</FormGroup>
								<FormGroup>
									<FormInputText
										type="text"
										name="long_description"
										valueToShow={values.long_description}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa una descripcion"
									/>
									<FormError
										error={errors.long_description}
										touched={touched.long_description}
									/>
								</FormGroup>
								<div className="sm:col-span-2 lg:col-span-2">
									<CKEditor
										name="short_description"
										editor={ClassicEditor}
										data={values.short_description || ""}
										onChange={(event, editor) => {
											setFieldValue("short_description", editor.getData());
										}}
									/>
									<FormError
										error={errors.short_description}
										touched={touched.short_description}
									/>
								</div>
								<FormGroup>
									<FormInputText
										type="text"
										name="facebook_url"
										valueToShow={values.facebook_url}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa la cuenta de facebook"
									/>
									<FormError
										error={errors.facebook_url}
										touched={touched.facebook_url}
									/>
								</FormGroup>
								<FormGroup>
									<FormInputText
										type="text"
										name="linkedin_url"
										valueToShow={values.linkedin_url}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa la cuenta de linkedin"
									/>
									<FormError
										error={errors.linkedin_url}
										touched={touched.linkedin_url}
									/>
								</FormGroup>
								<FormGroup>
									<FormInputText
										type="text"
										name="instagram_url"
										valueToShow={values.instagram_url}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa la cuenta de instagram"
									/>
									<FormError
										error={errors.instagram_url}
										touched={touched.instagram_url}
									/>
								</FormGroup>
								<FormGroup>
									<FormInputText
										type="text"
										name="twitter_url"
										valueToShow={values.twitter_url}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa la cuenta de twitter"
									/>
									<FormError
										error={errors.twitter_url}
										touched={touched.twitter_url}
									/>
								</FormGroup>
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
}
