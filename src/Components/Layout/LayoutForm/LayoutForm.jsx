import React from "react";

const LayoutForm = ({ children }) => {
	return (
		<div className="bg-slate-300 w-full h-screen mx-auto flex-col justify-center items-center ">
			{children}
		</div>
	);
};

export default LayoutForm;
