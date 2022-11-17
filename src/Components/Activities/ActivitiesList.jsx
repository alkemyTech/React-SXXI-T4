import React, { useState, useEffect } from "react";

import { findAll } from "Services/ActivitiesServices";

import Title from "Components/Title/Title";
import Card from "Components/Card/Card";

const ActivitiesList = () => {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		findAll()
			.then(resp => setActivities(resp.data.data))
			.catch(err => console.error(err));
	}, []);

	return (
		<div className="flex justify-center p-5">
			<div className="bg-slate-100 w-full sm:w-full md:w-4/5 lg:w-4/5 shadow-xl rounded ">
				<Title text="Actividades" />
				<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 place-items-center">
					{activities?.map(activity => (
						<Card
							key={"activityCard" + activity.id}
							title={activity.name}
							image={activity.image}
							description={activity.description}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ActivitiesList;
