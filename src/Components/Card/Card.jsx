import ContentActivities from "Components/Activities/ContentActivities";
import React from "react";
import "./Card.css";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Card = ({type, facebook,linkedin,image,description,title}) => {
	return (
		<>
			<div
				className={`mx-auto w-60 ${
					type === "version1" ? "h-60 relative" : "h-80"
				} flex flex-col justify-start items-center rounded-lg overflow-hidden border shadow-md`}
			>
				{type === "version2" ? (
					<>
						<div className="w-full h-2/5 flex justify-center items-center">
							<img
								className="w-full h-full object-cover"
								src={image}
								onError={e => {
									e.currentTarget.src =
										"https://images-ext-2.discordapp.net/external/6ulAMx1V10CIaXeq3tX1eHslMwU8yBZl2AGZ4RllfZ4/https/img.icons8.com/material-outlined/512/add-image.png?width=490&height=490";
								}}
							/>
						</div>

						<div className="h-1/2 w-11/12 text-center flex flex-col items-center gap-3 mt-3">
							<h1 className="text-md font-bold w-full break-word text-start">{title}</h1>

							<div className="h-24 w-full text-start text-sm overflow-y-scroll flexp">
								<ContentActivities content={description} />
							</div>
						</div>
					</>
				) : (
					<>
						<img
							className="w-full h-full object-cover"
							src={image}
							onError={e => {
								e.currentTarget.src =
									"https://images-ext-2.discordapp.net/external/6ulAMx1V10CIaXeq3tX1eHslMwU8yBZl2AGZ4RllfZ4/https/img.icons8.com/material-outlined/512/add-image.png?width=490&height=490";
							}}
						/>

						<div className="absolute top-1 text-white text-center">
							<h2 className="text-xl font-bold drop-shadow-2xl">{title}</h2>
							<ContentActivities content={description} />
						</div>
					</>
				)}
				{facebook &&
					linkedin && (
						<div className={`w-full p-3 ${type==="version1"?"absolute bottom-2":"relative"}`}>
							<div className="absolute flex justify-around w-full bottom-2 left-0">
								<a href={facebook}>
									<FaFacebook size={30} className="text-blue-600" />
								</a>
								<a href={linkedin}>
									<FaLinkedin size={30} className="text-sky-600" />
								</a>
							</div>
						</div>
					)}
			</div>
		</>
	);
};

export default Card;
