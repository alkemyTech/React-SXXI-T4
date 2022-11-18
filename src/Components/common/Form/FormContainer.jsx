import React from "react";

export default function FormContainer({ children }) {
	return (
		<div className="p-5 lg:pr-5 md:p-5 lg:flex  justify-center items-center">
			{children}
		</div>
	);
}
