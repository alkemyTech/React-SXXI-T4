import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {suscribed} from "utils/alerts/alerts"

const FormNewsletter = () => {
	const [showNewsletter, setShowNewsletter] = useState(false);

	const isRegistered = localStorage.getItem("registeredNewsletter");

	useEffect(() => {
		if (isRegistered) {
			setShowNewsletter(false);
		} else {
			setShowNewsletter(true);
		}
	},[isRegistered]);

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		onSubmit: values => {
			localStorage.setItem("registeredNewsletter", "yes");
			resetForm();
			suscribed();
		},
		validationSchema: yup.object({
			email: yup.string().email("Email invalido").required("Campo obligatorio"),
		}),
	});

	const { handleSubmit, errors, touched, handleBlur, handleChange, resetForm, values } = formik;

	return (
		<>
			{showNewsletter && (
				<form className="flex flex-col w-64 sm:w-1/2 my-4 mx-auto gap-4 items-center max-w-lg" onSubmit={handleSubmit}>
					<label>Recibe nuestras propuestas!</label>
					<input
						name="email"
						type="email"
						className="border rounded py-1 w-full"
						onChange={handleChange}
						onBlur={handleBlur}
						onSubmit={resetForm}
						placeholder="Email"
						value={values.email}
					/>
					<input
						type="submit"
						className="bg-red-600 hover:bg-red-700 rounded text-white font-bold py-1 w-full sm:w-40 self-center disabled:opacity-25"
						disabled={errors.email&&touched.email}
					/>
				</form>
			)}
		</>
	);
};

export default FormNewsletter;
