import React from "react";

export default function FormContainerImage({ children }) {
	return (
		<div className="w-full lg:w-1/5 flex justify-center items-center pb-5 lg:pb-0">
			{children}
		</div>
	);
}
