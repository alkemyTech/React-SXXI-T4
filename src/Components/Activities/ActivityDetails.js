import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findById } from "../../Services/ActivitiesServices";
import Title from "../Title/Title";
import ContentActivities from "./ContentActivities";

const ActivityDetails = props => {
	const { id } = useParams();
	const [activity, setActivity] = useState(null);
	useEffect(() => {
		findById(id)
			.then(resp => {
				console.log(resp.data.data);
				setActivity(resp.data.data);
			})
			.catch(err => console.error(err));
	}, []);

	return (
		<>
			{activity && (
				<div className="w-screen h-screen flex flex-col gap-7 items-center">
					<Title text={activity.name} />
					<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
						<ContentActivities content={activity.description} />
					</div>
					<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
						<img src={activity.image} />
					</div>
				</div>
			)}
			{ !activity && (
				<Title text={"No hay actividad"} />
			)}
		</>
	);
};

export { ActivityDetails };
