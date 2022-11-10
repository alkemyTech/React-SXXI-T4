import React from "react";

const LayoutForm = ({ children }) => {
	return (
		<div className="w-full bg-slate-50 mx-auto h-screen  flex items-center justify-center">
			{children}
		</div>
	);
};

export default LayoutForm;
