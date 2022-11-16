import React from "react";

const FormError = ({ error, touched }) => {
	if (error && touched) {
		return <p className="text-red-600 p-1 text-center text-xs">*{error}</p>;
	} else {
		return null;
	}
};

export default FormError;
