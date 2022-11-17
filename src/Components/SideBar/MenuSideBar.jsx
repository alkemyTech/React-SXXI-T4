/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const MenuSideBar = ({ setOpen, open }) => {
	return (
		<div className="fixed top-0 w-full flex">
			<div className=" w-full p-3  bg-sky-800 ">
				<button
					className={` cursor-pointer p-2 
								border-2 rounded-md  ${!open && "rotate-180"}`}
					onClick={() => setOpen(!open)}
				>
					<FaBars />
				</button>
			</div>
		</div>
	);
};
export default MenuSideBar;
