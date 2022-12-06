import React from "react";
import News from "./News";
import Slider from "./Slider";
import Staff from "./Staff";
import Testimonials from "./Testimonials";
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
			<div className=" flex flex-col justify-start align-items-center">
				<div className=" h-80">
					<Slider />
				</div>
				<div className=" h-40">
					<WelcomeText />
				</div>
			</div>
			<Staff />
			<Testimonials />
			<News />
		</div>
	);
};
