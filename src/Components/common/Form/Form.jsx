import React from "react";
import { Form } from "formik";
const FormLayout = ({ children }) => {
	return (
		<div className=" mx-auto w-full h-full flex justify-center items-center">
			<Form className=" lg:shadow rounded-md  w-full sm:w-4/5 md:w-11/12 lg:w-4/5  bg-white py-7 mt-10">
				{children}
			</Form>
		</div>
	);
};

export default FormLayout;
