import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Formik } from "formik";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as Yup from "yup";

import Form from "Components/common/Form/Form";
import LayoutForm from "Components/Layout/LayoutForm/LayoutForm";
import FormContainer from "Components/common/Form/FormContainer";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormTitle from "Components/common/Form/FormTitle";
import { error as errorAler, success } from "utils/alerts/alerts";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import InputImage from "Components/common/Form/InputImage";
import FormGroup from "Components/common/Form/FormGroup";
import FormInputText from "Components/common/Form/FormInputText";
import FormError from "Components/common/Form/FormError";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";
import { yupErrorMessages } from "utils/messages/formMessagesValidation";

const initialValues = {
	id: null,
	name: "",
	description: "",
	image: "",
	order: "",
};

const SlidesForm = () => {
	const [slide, setSlide] = useState(initialValues);
	const [allSlides, setAllSlides] = useState([]);
	const { id } = useParams();
	const [currentImage, setCurrentImage] = useState("");
	const [currentOrder, setCurrentOrder] = useState(null);

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
			setCurrentOrder(res.data.order);
		}
	};

	const getAllSlides = async () => {
		const res = { data: {}, error: null };
		try {
			const { data } = await axios.get("https://ongapi.alkemy.org/api/slides");
			res.data = data.data;
		} catch (error) {
			errorAler(
				`${error} error de peticion. Pongase en contacto con el administrador. `
			);
		}
		setAllSlides(res.data);
	};
	useEffect(() => {
		getCurrentSlide();
		getAllSlides();
	}, []);

	Yup.addMethod(Yup.mixed, "OrderNotAvailable", function (errorMessage) {
		return this.test("order-not-available", errorMessage, function (value) {
			const orderExist = allSlides.find(slide => slide.order === value);
			if (id && currentOrder === value) return true;
			if (orderExist) return false;
			else return true;
		});
	});

	const validations = () =>
		Yup.object().shape({
			name: Yup.string()
				.min(4, yupErrorMessages.min4)
				.required(yupErrorMessages.required),
			order: Yup.number()
				.OrderNotAvailable("Orden ocupado")
				.required(yupErrorMessages.required),
			description: Yup.string().required(yupErrorMessages.required),
			image: Yup.string().required(yupErrorMessages.required),
		});

	const handleChangeCKE = (editor, setFieldValue) => {
		setFieldValue("description", editor.getData());
	};

	const handleSubmit = async values => {
		if (values.image === currentImage) {
			delete values.image;
		}
		const res = values.id
			? await axios.put(
					`https://ongapi.alkemy.org/api/slides/${values.id}`,
					values
			  )
			: axios.post(`https://ongapi.alkemy.org/api/slides`, values);
		if (res.error) {
			errorAler(
				`${res.error}: Error en la peticion, pongase en contacto con el administrador. `
			);
		} else {
			setSlide(initialValues);
			success();
		}
	};

	return (
		<LayoutForm>
			<Formik
				initialValues={slide}
				onSubmit={(values, actions) => {
					handleSubmit(values);
					actions.resetForm();
				}}
				validationSchema={validations}
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
								<FormError error={errors.image} touched={touched.image} />
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
									<FormError error={errors.name} touched={touched.name} />
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
									<FormError error={errors.order} touched={touched.order} />
								</FormGroup>
								<div className="sm:col-span-2 lg:col-span-2">
									<CKEditor
										name="description"
										config={{ placeholder: "Ingrese el la descripcion aqui.." }}
										data={slide?.description}
										editor={ClassicEditor}
										onChange={(e, editor) =>
											handleChangeCKE(editor, setFieldValue)
										}
									/>
									<FormError
										error={errors.description}
										touched={touched.description}
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

export default SlidesForm;
