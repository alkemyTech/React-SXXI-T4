import React from "react";

import imageNotFound from "images/imageNotFound.png";

const CardActivity = ({ activity }) => {
	return (
		<div className="bg-white w-full h-auto rounded relative">
			<img
				src={`${activity.image || imageNotFound}`}
				className="rounded w-full h-48 object-cover object-center"
			/>
			<div className="p-2">
				<h1 className="font-semibold text-lg tracking-wide">{activity.name}</h1>
				<p className="py-2 font-normal text-sm text-slate-400">
					{activity.description}
				</p>
				<div className="py-3">
					<h5 className="absolute text-sm text-slate-400 bottom-0 right-2">
						{activity.updated_at}
					</h5>
				</div>
			</div>
		</div>
	);
};

export default CardActivity;
