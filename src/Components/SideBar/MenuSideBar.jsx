/* eslint-disable no-unused-vars */
import Progress from "Components/common/Loader/Progress";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const MenuSideBar = ({ setOpen, open }) => {
	return (
		<>
			<div className="fixed top-0 w-full flex">
				<div className=" w-full p-3  bg-sky-800 ">
					<button
						className={` cursor-pointer p-2 ml-3
								border-2 rounded-md  ${!open && "rotate-180"}`}
						onClick={() => setOpen(!open)}
					>
						<FaBars className="text-white" />
					</button>
				</div>
			</div>
			<Progress percent={15} milliseconds={4000} />
		</>
	);
};
export default MenuSideBar;
