import React from "react";
import Footer from "./Footer";
import Header from "../../Campaigns/Toys/Header";

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
