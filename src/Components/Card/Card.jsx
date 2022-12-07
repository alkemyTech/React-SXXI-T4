import ContentActivities from "Components/Activities/ContentActivities";
import React from "react";
import "./Card.css";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";

const Card = data => {
	const divStyle = {
		backgroundColor: `${data.color}`,
	};

	return (
		<div className="relative  shadow-md w-60 h-auto   rounded-lg overflow-hidden mx-auto">
			<div className="h-52">
				<img
					className="object-cover object-top h-52 w-full"
					src={data.image}
					onError={e => {
						e.currentTarget.src =
							"https://images-ext-2.discordapp.net/external/6ulAMx1V10CIaXeq3tX1eHslMwU8yBZl2AGZ4RllfZ4/https/img.icons8.com/material-outlined/512/add-image.png?width=490&height=490";
					}}
				/>
			</div>

			<div className="cardText">
				<div className="font-semibold text-lg text-left w-full text-slate-800">
					<h1>{data.title}</h1>
				</div>
				<div className="font-normal text-left text-sm w-full text-slate-700">
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
				<div className="cardMedia">
					{data.iconMode === "dark" ? (
						<div className="cardMedia">
							<a href={`${data.facebook}`} target="_blank" rel="noreferrer">
								<FaFacebookSquare size={35} className="text-sky-700" />
								{/* <img src="images/facebookBlack.png" /> */}
							</a>
							<a href={`${data.linkedin}`} target="_blank" rel="noreferrer">
								<FaLinkedin size={35} className="text-sky-800" />
							</a>
						</div>
					) : (
						<div className="flex justify-around items-center w-full h-full">
							<a href={`${data.facebook}`} target="_blank" rel="noreferrer">
								<FaFacebookSquare size={35} className="text-sky-700" />
								{/* <img src="images/facebookWhite.png" /> */}
							</a>
							<a href={`${data.linkedin}`} target="_blank" rel="noreferrer">
								<FaLinkedin size={35} className="text-sky-800" />
							</a>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Card;
