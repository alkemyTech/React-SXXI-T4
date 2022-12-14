import React from "react";
import Footer from "Components/Layout/components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
