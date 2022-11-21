import Navbar from "Components/Layout/components/Navbar";
import React from "react";
import News from "./News";
import Slider from "./Slider";
import Staff from "./Staff";
import Testimonials from "./Testimonials";
import WelcomeText from "./WelcomeText";

export const Home = () => {
	return (
		<div className=" flex flex-col w-full">
			<Navbar />
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
