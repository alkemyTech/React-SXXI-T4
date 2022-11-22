import React, { useState } from "react";
import MenuSideBar from "Components/SideBar/MenuSideBar";
import SideBar from "Components/SideBar/SideBar";

const LayoutForm = ({ children }) => {
	const [open, setOpen] = useState(true);
	return (
		<div className="bg-white md:bg-slate-300 lg:bg-slate-300 w-screen h-screen mx-auto flex-col justify-center items-center ">
			<MenuSideBar setOpen={setOpen} open={open} />
			<div className="flex">
				<SideBar open={open} />
				{children}
			</div>
		</div>
	);
};

export default LayoutForm;
