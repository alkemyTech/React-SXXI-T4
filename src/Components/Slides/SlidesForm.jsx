import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Formik } from "formik";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import Form from "Components/common/Form/Form";
import LayoutForm from "Components/Layout/LayoutForm/LayoutForm";
import FormContainer from "Components/common/Form/FormContainer";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormTitle from "Components/common/Form/FormTitle";
import { error as errorAler } from "utils/alerts/alerts";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import InputImage from "Components/common/Form/InputImage";
import FormGroup from "Components/common/Form/FormGroup";
import FormInputText from "Components/common/Form/FormInputText";

const initialValues = {
	id: null,
	name: "",
	description: "",
	image: "",
	order: null,
};

const SlidesForm = () => {
	const [slide, setSlide] = useState(initialValues);
	const { id } = useParams();
	const [currentImage, setCurrentImage] = useState("");

	const getCurrentSlide = async () => {
		if (id) {
			const res = { data: {}, error: null };
			try {
				const { data } = await axios.get(
					`https://ongapi.alkemy.org/api/slides/${id}`
				);
				res.data = data.data;
			} catch (error) {
				errorAler(
					`${error} error de peticion. Pongase en contacto con el administrador. `
				);
			}
			setSlide(res.data);
			setCurrentImage(res.data.image);
		}
    };

	useEffect(() => {
		getCurrentSlide();
	}, []);

	const handleChangeCKE = (editor, setFieldValue) => {
		setFieldValue("description", editor.getData());
	};

	const handleSubmit = async values => {
		console.log(values);
		console.log(currentImage);
	};

	return (
		<LayoutForm>
			<Formik
				initialValues={slide}
				onSubmit={(values, actions) => {
					handleSubmit(values);
					actions.resetForm();
				}}
				enableReinitialize
			>
				{({
					values,
					errors,
					touched,
					handleBlur,
					handleChange,
					setFieldValue,
				}) => (
					<Form>
						<FormTitle>{values.id ? "Editar" : "Crear"} Slide </FormTitle>
						<FormContainer>
							<FormContainerImage>
								<InputImage
									bgImage={values.image || "/images/backoffice-slides.png"}
									FieldName="image"
									setFieldValue={setFieldValue}
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
										placeholder="Ingresa el titulo del slide"
									/>
								</FormGroup>
								<FormGroup>
									<FormInputText
										type="number"
										name="order"
										valueToShow={values.order}
										handleChange={handleChange}
										handleBlur={handleBlur}
										placeholder="Orden del slide"
									/>
								</FormGroup>
								<div className="sm:col-span-2 lg:col-span-2">
									<CKEditor
										name="description"
										editor={ClassicEditor}
										data={""}
										onChange={(e, editor) =>
											handleChangeCKE(editor, setFieldValue)
										}
									/>
								</div>
							</FormContainerInput>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</LayoutForm>
	);
};

export default SlidesForm;
