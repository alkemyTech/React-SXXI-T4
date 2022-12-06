import React, { useState, useEffect } from "react";

import { findAllByPageAndSearch as getMembers } from "Services/Member/MemberApiService";
import { findAllAndSearch as getNews } from "Services/News/NewsApiServices";
import { error } from "utils/alerts/alerts";

import News from "Components/News";
import Carousel from "Components/Carousel/Carousel";
import Staff from "Components/Staff/Staff";
import WelcomeText from "./WelcomeText";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Home = () => {
	const { isLoggedIn } = useSelector(state => state.user);

	if (!isLoggedIn) {
		return <Navigate to="/login-user" />;
	}
	return (
		<div className=" flex flex-col w-full">
			<div className="flex flex-col lg:flex-row mt-5 w-11/12 md:w-9/12 md:px-8 mx-auto gap-5">
			<WelcomeText />
			<Carousel />
			</div>
			
			<Staff details={staff} />
			<News details={news} />
		</div>
	);
};
