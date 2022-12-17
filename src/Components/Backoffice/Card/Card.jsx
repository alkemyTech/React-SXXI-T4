import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, image, redirectTo }) => {
	return (
		<div className="w-40 md:w-52 h-52 shadow-lg rounded-lg bg-white flex flex-col justify-center items-center mx-auto gap-4">
			<h2 className="text-blue-300 font-bold">{title}</h2>
			<img className=" h-20 w-20 md:h-24 md:w-24 bg-cover" src={image} alt="image of category" />
			<Link
				className="block font-bold mx-auto shadow hover:bg-teal-700 bg-teal-600 focus:shadow-outline focus:outline-none text-white text-xs px-3 py-1 rounded"
				to={redirectTo}
			>
				Ir
			</Link>
		</div>
	);
};

export default Card;
