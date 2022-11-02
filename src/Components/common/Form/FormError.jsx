import React from "react";

const FormError = ({ error, touched }) => {
	if (error && touched) {
		return <p className="text-red-800 text-center text-xs -m-2">*{error}</p>;
	}else{
        return null 
		
    }
};

export default FormError;
