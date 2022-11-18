import React from "react";
// import { FaArrowCircleLeft } from "react-icons/fa";
export default function SideBar({ open }) {
	return (
		<div
			className={` ${
				open ? "w-0 md:w-20 lg:w-20 p-0  " : "w-64"
			} bg-sky-800  h-screen md:p-5 lg:p-5  pt-8 duration-300`}
		></div>
	);
}
