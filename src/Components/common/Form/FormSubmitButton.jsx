import React from "react";

const FormSubmitButton = () => {
	return (
		<div className="absolute w-1/5 bottom-1 right-5">
			<button
				type="submit"
				className="w-full font-poppins py-2 bg-sky-800   tracking-wide 
									rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-lg font-medium"
			>
				Enviar
			</button>
		</div>
	);
};
export default FormSubmitButton;
