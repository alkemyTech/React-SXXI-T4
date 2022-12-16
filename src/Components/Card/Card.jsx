import ContentActivities from "Components/Activities/ContentActivities";
import React from "react";
import "./Card.css";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";

const Card = data => {
	const divStyle = {
		backgroundColor: `${data.color}`,
	};

	return (
		<div className="relative  shadow-md w-60 h-[280px] md:h-[400px] rounded-lg overflow-hidden mx-auto hover:scale-105 transition-all">
			<div className="h-[180px] md:h-[200px]">
				<img
					className="object-cover object-top w-full h-[180px] md:h-[200px]"
					src={data.image}
					onError={e => {
						e.currentTarget.src =
							"https://images-ext-2.discordapp.net/external/6ulAMx1V10CIaXeq3tX1eHslMwU8yBZl2AGZ4RllfZ4/https/img.icons8.com/material-outlined/512/add-image.png?width=490&height=490";
					}}
				/>
			</div>

			<div className="cardText h-[60px] md:h-[100px]">
				<div className="font-semibold text-center text-lg text-slate-800 w-11/12 mx-auto">
					<h1>{  data.title.toUpperCase()}</h1>
				</div>

				<div className="font-normal hidden md:block text-left text-sm text-slate-700 overflow-y-auto h-0 md:h-80 w-11/12 mx-auto cardDescription">
					<ContentActivities content={data.description} />
				</div>

			</div>
			{data.facebook === "" ||
				data.facebook === undefined ||
				data.facebook === null ||
				data.linkedin === "" ||
				data.linkedin === null ||
				data.linkedin === undefined ? (
				<div style={divStyle} className="cardMedia"></div>
			) : (
				<div className="cardMedia pb-2 h-[30px]">
					{data.iconMode === "dark" ? (
						<div className="cardMedia">
							<a href={`${data.facebook}`} target="_blank" rel="noreferrer">
								<FaFacebookSquare size={30} className="text-sky-700 hover:text-sky-600" />
							</a>
							<a href={`${data.linkedin}`} target="_blank" rel="noreferrer">
								<FaLinkedin size={30} className="text-sky-800 hover:text-sky-600" />
							</a>
						</div>
					) : (
						<div className="flex justify-around items-center pb-2  w-full h-[30px]">
							<a href={`${data.facebook}`} target="_blank" rel="noreferrer">
								<FaFacebookSquare size={30} className="text-sky-700 hover:text-sky-600" />
							</a>
							<a href={`${data.linkedin}`} target="_blank" rel="noreferrer">
								<FaLinkedin size={30} className="text-sky-800 hover:text-sky-600" />
							</a>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Card;
