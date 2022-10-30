import React from "react";

const NewsDetails = ({ details }) => {
	return (
		<div className="w-screen h-screen">
			<h1 className="text-3xl font-bold text-center">Novedades</h1>
			<img src={details.image} />
			<div
				className={`w-full h-96 bg-center bg-auto bg-[url('${details.image}')]`}
			/>
			<h2>{details.name}</h2>
			<div dangerouslySetInnerHTML={{ __html: details.content }} />
		</div>
	);
};

export default NewsDetails;
