import React from "react";

const NewsDetails = ({ details }) => {
	return (
		<div className="w-screen h-screen flex flex-col gap-7 items-center">
			<h1 className="text-4xl font-bold text-center pt-7">Novedades</h1>
			<div
				className="w-full h-96 bg-center bg-cover bg-no-repeat"
				style={{ backgroundImage: `url("${details.image}")` }}
			/>
			<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
				<h2 className="text-xl sm:text-2xl font-bold">{details.name}</h2>
				<div className="font-light" dangerouslySetInnerHTML={{ __html: details.content }} />
			</div>
		</div>
	);
};

export default NewsDetails;
