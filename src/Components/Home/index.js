import React from "react";
import News from "./News";
import Slider from "./Slider";
import Staff from "./Staff";
import Testimonials from "./Testimonials";
import WelcomeText from "./WelcomeText";

export const Home = () => {
	return (
		<div className=" flex flex-col w-full">
			<div className=" flex flex-row justify-start align-items-center">
				<div className=" w-1/2">
					<WelcomeText />
				</div>
				<div className=" w-1/2">
					<Slider />
				</div>
			</div>
			<Staff />
			<Testimonials />
			<News />
		</div>
	);
};
