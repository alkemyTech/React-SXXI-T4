import React from "react";
import { Form } from "formik";
const FormLayout = ({ children }) => {
	return (
		<Form className=" place-content-center lg:shadow rounded-md w-full sm:w-4/5 md:w-11/12 lg:w-4/5  bg-white py-7">
			{children}
		</Form>
	);
};

export default FormLayout;
