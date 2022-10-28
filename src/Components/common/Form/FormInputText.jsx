import React from "react";

const FormInputText = ({type,name,valueToShow,handleChange,handleBlur,placeholder}) => {
	return (
		<input
			className="border rounded h-10 p-3"
			type={type}
			name={name}
			value={valueToShow}
			onChange={handleChange}
			onBlur={handleBlur}
			placeholder={placeholder}
		></input>
	);
};

export default FormInputText;
