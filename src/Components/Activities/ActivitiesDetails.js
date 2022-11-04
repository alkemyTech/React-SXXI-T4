import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Title } from "../Title/Title";
import { findById } from "./ActivitiesServices";

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
				<div className="container mx-auto">
					<Title title={activity.name} />
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
