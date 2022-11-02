import React from "react";

const Form = ({ children, handleSubmit }) => {
	return (
		<form
			className="  flex flex-col justify-center align-middle w-11/12 md:w-3/4 lg:w-2/4 h-screen gap-3 mx-auto"
			onSubmit={handleSubmit}
		>
			{children}
		</form>
	);
};

export default Form;
