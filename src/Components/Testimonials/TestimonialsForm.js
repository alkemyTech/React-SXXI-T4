import '../FormStyles.css';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import './TestimonialsForm.css'

import Form from "../common/Form/Form";
import FormTitle from "../common/Form/FormTitle";
import InputImage from "../common/Form/InputImage";
import FormSubtitle from "../common/Form/FormSubtitle";
import FormInputText from "../common/Form/FormInputText";
import FormSubmitButton from "../common/Form/FormSubmitButton";
import FormError from "../common/Form/FormError";


const TestimonialForm = (testimonial) => {
    const initialValues = {
		name: testimonial ? testimonial.name : "",
		description: testimonial ? testimonial.description : "",
		image: testimonial ? testimonial.image : ""
	};

    const validationSchema = yup.object().shape({
		name: yup
			.string()
			.min(4, "Mínimo 4 caracteres")
			.required("Nombre obligatorio"),
        description: yup.string().required("Descripción obligatoria"),
		image: yup.string().required("Imagen obligatoria").oneOf(["image/png", "image/jpg"],
        "El formato de la imagen tiene que ser jpg o png"),
	});


    const onSubmit = () => {
		if (testimonial?.id) {
			axios.put(process.env.REACT_APP_API + "testimonial/" + testimonial.id, values)
				.then(() => {
					console.log("¡Testimonio modificado correctamente!");
				})
				.catch(err => {
					console.log("Error al modificar testimonio."+err);			
				});
		} else {
			axios
				.post(process.env.REACT_APP_API + "testimonial", values)
				.then(() => {
					console.log("¡Testimonio creado correctamente!");
				})
				.catch(err => {
					console.log("Hubo un error al intentar crear el testimonio"+err);
				});
		}


        console.log(testimonial.description)
		resetForm();
	};


    const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});


    const {
		handleSubmit,
		errors,
		handleChange,
		handleBlur,
		values,
		touched,
		setFieldValue,
		resetForm,
	} = formik;


    return (
        <Form handleSubmit={handleSubmit}>
			<FormTitle>Crear/Editar Testimonio</FormTitle>
			<InputImage
				bgImage={values.image}
				formikFieldName="image"
				setFieldValue={setFieldValue}
                className="w-1"
			/>

            <h1 className="font-bold text-xl">asdassad</h1>
			<FormError error={errors.profile_image} touched={touched.image} />
			<FormSubtitle>Nombre</FormSubtitle>
			<FormInputText
				type="text"
				name="name"
				valueToShow={values.name}
				handleChange={handleChange}
				handleBlur={handleBlur}
				placeholder=""
			/>
			<FormError error={errors.name} touched={touched.name} />
			
			<FormSubtitle>Descripción</FormSubtitle>
			<FormInputText
				name="text"
				valueToShow={values.description}
				handleChange={handleChange}
				handleBlur={handleBlur}
				placeholder=""
			/>
			<FormError error={errors.description} touched={touched.description} />
			<FormSubmitButton>Enviar</FormSubmitButton>
		</Form>

    );
}
 
export default TestimonialForm;