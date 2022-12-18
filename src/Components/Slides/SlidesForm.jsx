import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { Formik } from "formik";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as Yup from "yup";
import Form from "Components/common/Form/Form";
import FormContainer from "Components/common/Form/FormContainer";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormTitle from "Components/common/Form/FormTitle";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import InputImage from "Components/common/Form/InputImage";
import FormGroup from "Components/common/Form/FormGroup";
import FormInputText from "Components/common/Form/FormInputText";
import FormError from "Components/common/Form/FormError";
import FormSubmitButton from "Components/common/Form/FormSubmitButton";
import { yupErrorMessages } from "utils/messages/formMessagesValidation";
import { getSlide } from "Services/Slide/apiService";
import { useDispatch, useSelector } from "react-redux";
import { createOne, obtainSlides, updateOne } from "store/Slices/slidesSlice";

const initialValues = {
	id: null,
	name: "",
	description: "",
	image: "",
	order: "",
};

const SlidesForm = () => {
	const dispatch = useDispatch();
	const allSlides = useSelector(state => state.slides.list);
	const [slide, setSlide] = useState(initialValues);
	const { id } = useParams();
	const [currentImage, setCurrentImage] = useState("");
	const [currentOrder, setCurrentOrder] = useState(null);

	const navigate = useNavigate();

	const getCurrentSlide = async () => {
		if (id) {
			const data = await getSlide(id);
			setSlide(data);
			setCurrentImage(data.image);
			setCurrentOrder(data.order);
		}
	};

	useEffect(() => {
		getCurrentSlide();
		if (allSlides.length === 0) {
			dispatch(obtainSlides());
		}
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
			name: Yup.string().min(4, yupErrorMessages.min4).required(yupErrorMessages.required),
			order: Yup.number()
				.OrderNotAvailable("Orden ocupado")
				.required(yupErrorMessages.required)
				.positive("Debe ser mayor a 0"),
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
		values.id ? await dispatch(updateOne(values)) : dispatch(createOne(values));

		setSlide(initialValues);
		navigate("/backoffice/slides");
	};

	return (
		<Formik
			initialValues={slide}
			onSubmit={(values, actions) => {
				handleSubmit(values);
				actions.resetForm();
			}}
			validationSchema={validations}
			enableReinitialize
		>
			{({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
				<Form>
					<div className=" flex flex-row justify-end">
						<Link
							to={"/backoffice/slides"}
							className=" my-3 mr-3 font-poppins text-xl hover:scale-105 transition-all bg-sky-800 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded"
						>
							<p>Volver</p>
						</Link>
					</div>
					<div className="flex justify-center items-center gap-3">
						<FormTitle>{values.id ? "Editar" : "Crear"} Slide </FormTitle>
					</div>

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
									onChange={(e, editor) => handleChangeCKE(editor, setFieldValue)}
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
	);
};

export default SlidesForm;
