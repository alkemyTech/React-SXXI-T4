import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const FormNewsletter = () => {
	const [showNewsletter, setShowNewsletter] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("registeredNewsletter")) {
			setShowNewsletter(false);
		} else {
			setShowNewsletter(true);
		}
	}, []);

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		onSubmit: values => {
			localStorage.setItem("registeredNewsletter", "yes");
			resetForm();
		},
		validationSchema: yup.object({
			email: yup.string().email("Email invalido").required("Campo obligatorio"),
		}),
	});

	const {
		handleSubmit,
		errors,
		touched,
		handleBlur,
		handleChange,
		resetForm,
		values,
	} = formik;

	return (
		<>
			{showNewsletter && (
				<form className="flex flex-col w-64 gap-2 my-2" onSubmit={handleSubmit}>
					<label>Recibe nuestras propuestas!</label>
					<input
						name="email"
						type="email"
						className="border rounded py-1"
						onChange={handleChange}
						onBlur={handleBlur}
						onSubmit={resetForm}
						placeholder="Email"
						value={values.email}
					/>
					<input
						type="submit"
						className="bg-red-600 hover:bg-red-700 rounded text-white font-bold py-1"
					/>
					{errors.email && touched.email && (
						<div className="text-xs text-red-600">{errors.email}</div>
					)}
				</form>
			)}
		</>
	);
};

export default FormNewsletter;
