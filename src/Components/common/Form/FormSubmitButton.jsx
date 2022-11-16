import React from "react";

const FormSubmitButton = () => {
	return (
		<div className="absolute w-1/5 bottom-1 right-5">
			<button
				type="submit"
				className="w-full  py-2 bg-sky-800   tracking-wide 
									rounded-lg  hover:bg-sky-700 hover:-translate-y-1 
									font-poppins transition-all duration-500 text-white text-lg font-medium"
			>
				Enviar
			</button>
		</div>
	);
};

export default FormSubmitButton;
