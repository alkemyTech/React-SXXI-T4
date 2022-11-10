import React from "react";
import { Form } from "formik";
const FormLayout = ({ children }) => {
	return (
		<Form className=" shadow rounded-md  w-4/5 relative bg-white py-10">
			{children}
		</Form>
	);
};

export default FormLayout;
