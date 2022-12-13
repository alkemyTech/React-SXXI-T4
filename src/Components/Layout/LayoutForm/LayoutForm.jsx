import MenuSideBar from "Components/SideBar/MenuSideBar";
import SideBar from "Components/SideBar/SideBar";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const LayoutForm = ({ children }) => {
	const [open, setOpen] = useState(true);

	const navigate = useNavigate();
	const { isLoggedIn } = useSelector(state => state.user);

	useEffect(() => {
		if (!isLoggedIn) {
			return navigate("/login-user");
		}
	}, [isLoggedIn]);

	return (
		<div className="bg-white  w-full h-screen mx-auto flex-col justify-center items-center ">
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
