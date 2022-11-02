import React from "react";

const FormSubmitButton = ({children}) => {
	return (
		<button className="w-full sm:w-auto block uppercase mx-auto shadow font-bold bg-green-800 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded mt-4" type="submit">
			{children}
		</button>
	);
};

export default FormSubmitButton;
