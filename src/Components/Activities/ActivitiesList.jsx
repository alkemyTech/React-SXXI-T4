import React, { useState, useEffect } from "react";

import Title from "Components/Title/Title";
import CardActivity from "Components/Card/CardActivity";

const ActivitiesList = () => {
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		
	}, []);

	return (
		<div className="flex justify-center p-5">
			<div className="bg-slate-100 w-full sm:w-full md:w-4/5 lg:w-4/5 shadow-xl rounded ">
				<Title title="Novedades" />
				<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
					{activities?.map(activity => (
						<CardActivity
							key={"activityCard" + activity.id}
							activity={activity}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ActivitiesList;