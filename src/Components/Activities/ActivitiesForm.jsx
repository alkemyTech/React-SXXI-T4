import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import Form from "../common/Form/Form";
import FormContainer from "../common/Form/FormContainer";
import FormContainerImage from "../common/Form/FormContainerImage";
import FormContainerInput from "../common/Form/FormContainerInput";
import FormError from "../common/Form/FormError";
import FormGroup from "../common/Form/FormGroup";
import FormInputText from "../common/Form/FormInputText";
import FormSubmitButton from "../common/Form/FormSubmitButton";
import FormTitle from "../common/Form/FormTitle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputImage from "../common/Form/InputImage";
import { getActivity, updateActivity } from "Services/Activity/ApiService";
import { activityCreate } from "store/Slices/activitiesSlice";
import { useDispatch } from "react-redux";

const ActivitiesForm = () => {
	const [activity, setActivity] = useState({});
	const { id } = useParams();
	const message = "Esta campo es obligatorio";
	const messageMin = "Debe contener al menos 4 caracteres";
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const obtainActivity = async () => {
		if (id) {
			const data = await getActivity(id);
			setActivity(data);
		}
	};

	useEffect(() => {
		obtainActivity();
	}, []);
	const ActivitySchema = yup.object().shape({
		name: yup.string().min(4, messageMin).required(message),
		description: yup.string().required(message),
		image: yup.string().required(message),
	});

	const handleSubmitFormik = (values, resetForm) => {
		if (id) {
			delete values.image;
			updateActivity(id, values);
			navigate("/backoffice/actividades");
		} else {
			dispatch(activityCreate(values));
			navigate("/backoffice/actividades");
		}
	};
	return (
		<>
			<Formik
				initialValues={{
					id: activity?.id || "",
					name: activity?.name || "",
					description: activity?.description || "",
					image: activity?.image || "",
				}}
				onSubmit={(values, { resetForm }) => handleSubmitFormik(values, resetForm)}
				validationSchema={ActivitySchema}
				enableReinitialize
			>
				{({ errors, values, setFieldValue, handleChange, handleBlur, touched }) => (
					<Form>
						<FormTitle>
							{id && "Update Activity"}
							{!id && "Create Activity"}
						</FormTitle>
						<FormContainer>
							<FormContainerImage>
								<InputImage bgImage={values.image} FieldName="image" setFieldValue={setFieldValue} />
								<FormError />
							</FormContainerImage>
							<FormContainerInput>
								<FormGroup style="sm:col-span-2 lg:col-span-2">
									<FormInputText
										type="text"
										name="name"
										valueToShow={values.name || ""}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa el nombre de la actividad"
									/>
									<FormError error={errors.name} touched={touched.name} />
								</FormGroup>
								<div className="sm:col-span-2 lg:col-span-2">
									<CKEditor
										name="description"
										editor={ClassicEditor}
										data={values.description || ""}
										onChange={(event, editor) => {
											setFieldValue("description", editor.getData());
										}}
									/>
									<FormError error={errors.description} touched={touched.description} />
								</div>
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
export default ActivitiesForm;
