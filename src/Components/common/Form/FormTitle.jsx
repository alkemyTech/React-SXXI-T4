import React from "react";

const FormTitle = ({ children }) => {
	return (
		<h2 className="text-2xl text-center m-5 font-bold text-gray-500 col-span-2">
			{children}
		</h2>
	);
};

export default FormTitle;
