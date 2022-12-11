import React from "react";

const FormSubmitButton = () => {
	return (
		<div className="  w-full bottom-1 flex justify-center right-6">
			<button
				type="submit"
				className="w-[45%]
							md:w-[20%]
							font-poppins py-2 bg-sky-800   tracking-wide 
									rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
									transition-all duration-500 text-white text-lg font-medium"
			>
				Enviar
			</button>
		</div>
	);
};
export default FormSubmitButton;
