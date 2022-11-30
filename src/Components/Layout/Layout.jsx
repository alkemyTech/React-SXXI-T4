import React from "react";
import Footer from "Components/Layout/components/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
	return (
		<>
			{ children }
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
