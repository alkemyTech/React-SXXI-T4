import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../Title/Title";
import { findById } from "Services/ActivitiesServices";

const ActivityDetails = props => {
	const { id } = useParams();
	const [activity, setActivity] = useState(null);
	useEffect(() => {
		findById(id)
			.then(resp => setActivity(resp.data.data))
			.catch(err => console.error(err));
	}, []);
	return (
		<>
			{activity ? (
				<div className="w-screen h-screen flex flex-col gap-7 items-center">
					<Title text={activity.name} />
					<h3 className="antialiased hover:subpixel-antialiased">Description</h3>
					<p>{activity.description.replace("<*>", "")}</p>
					{activity.description}
					<img src={activity.image} />
				</div>
			) : (
				<Title title={"Empty title"} />
			)}
		</>
	);
};

export { ActivityDetails };
