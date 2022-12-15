/* eslint-disable no-unused-vars */
import React from "react";
import Progress from "Components/common/Loader/Progress";
import { FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { userLogout } from "store/Slices/authSlice";
import { Navigate } from "react-router-dom";

const MenuSideBar = ({ setOpen, open }) => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(userLogout());
	};
	return (
		<>
			<div className="fixed top-0 w-full flex">
				<div className="flex justify-between items-center w-full p-3  bg-sky-800 ">
					<button
						className={` cursor-pointer p-2 ml-2
								border-2 rounded-md  ${!open && "rotate-180"}`}
						onClick={() => setOpen(!open)}
					>
						<FaBars className="text-white" />
					</button>
					<button onClick={() => handleLogout()}>
						<FiLogOut size={30} className="text-white" />
					</button>
				</div>
			</div>
			<Progress percent={15} milliseconds={4000} />
		</>
	);
};
export default MenuSideBar;
