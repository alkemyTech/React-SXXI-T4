import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import Form from "Components/common/Form/Form";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";
import FormGroup from "Components/common/Form/FormGroup";
import LayoutForm from "Components/Layout/LayoutForm/LayoutForm";
import FormTitle from "Components/common/Form/FormTitle";
import FormContainer from "Components/common/Form/FormContainer";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import InputImage from "Components/common/Form/InputImage";
import FormError from "Components/common/Form/FormError";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormInputText from "Components/common/Form/FormInputText";

const today = new Date().toISOString().slice(0, 10);

const initialValues = {
	id: null,
	title: "",
	description: "",
	image: "",
	due_date: today,
};

const ProjectsForm = ({ editProject }) => {
	const [project, setProject] = useState(editProject || initialValues);
	const { id } = useParams();

	const getCurrentProject = async () => {
		if (id || project.id !== null) {
			const res = { data: {}, error: null };
			try {
				const { data } = await axios.get(
					`https://ongapi.alkemy.org/api/projects/${id || project.id}`
				);
				res.data = data.data;
				res.data.due_date = res.data.due_date.slice(0, 10);
				res.data.image = "";
				setProject(res.data);
				console.log(res.data);
			} catch (error) {
				Swal.fire(`${error} Pongase en contacto con el administrador`);
			}
		}
	};

	useEffect(() => {
		getCurrentProject();
	}, []);

	const handleSubmit = values => {
		console.log(values);
	};

	return (
		<LayoutForm>
			<Formik
				initialValues={project}
				onSubmit={(values, actions) => {
					actions.resetForm();
					handleSubmit(values);
				}}
				enableReinitialize
			>
				{({
					values,
					touched,
					errors,
					handleBlur,
					handleChange,
					setFieldValue,
				}) => (
					<Form>
						<FormTitle>{values.id ? "Editar" : "Crear"} Proyecto</FormTitle>
						<FormContainer>
							<FormContainerImage>
								<InputImage
									bgImage={values.image || "/images/backoffice-project.png"}
									FieldName="image"
									setFieldValue={setFieldValue}
								/>
								<FormError error={errors.image} touched={touched.image} />
							</FormContainerImage>
							<FormContainerInput>
								<FormGroup>
									<FormInputText
										type="text"
										name="title"
										valueToShow={values.title}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa el nombre del proyecto"
									/>
								</FormGroup>
								<FormGroup>
									<input
										className="border rounded-md h-12 p-3 w-full"
										type="date"
										name="due_date"
										value={values.due_date}
										onChange={handleChange("due_date")}
										onBlur={handleBlur}
										min={today}
									/>
								</FormGroup>
								<div className="sm:col-span-2 lg:col-span-2">
									<FormInputText
										type="text"
										name="description"
										valueToShow={values.description}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Ingresa la descripcion"
									/>
								</div>
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

export default ProjectsForm;
