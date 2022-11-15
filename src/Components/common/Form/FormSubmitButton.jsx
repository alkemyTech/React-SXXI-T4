import React from "react";

const FormSubmitButton = () => {
	return (
		<div className="w-100 justify-center items-center flex m-10">
			<button
				type="submit"
				className="w-1/3  py-2 bg-sky-600   tracking-wide 
									rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-lg font-medium"
			>
				Iniciar sesión
			</button>
		</div>
	);
};

export default FormSubmitButton;
