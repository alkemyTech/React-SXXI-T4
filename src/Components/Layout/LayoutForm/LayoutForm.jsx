import MenuSideBar from "Components/SideBar/MenuSideBar";
import SideBar from "Components/SideBar/SideBar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const LayoutForm = ({ children }) => {
	const [open, setOpen] = useState(true);

	return (
		<div className="bg-white md:bg-slate-300 lg:bg-slate-300 w-screen h-screen mx-auto flex-col justify-center items-center ">
			<MenuSideBar setOpen={setOpen} open={open} />
			<div className="flex">
				<SideBar open={open} />
				{children}
				<Outlet />
			</div>
		</div>
	);
};

export default LayoutForm;
