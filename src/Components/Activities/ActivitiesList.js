import React, { useEffect, useState } from "react";
import "../CardListStyles.css";
import { findAll } from "./ActivitiesServices";

const ActivitiesList = () => {

	const [activities, setActivities] = useState([]);

	useEffect(() => {
		findAll()
			.then(resp => setActivities(resp.data.data))
			.catch(err => console.error(err));
	}, []);

	return (
		<>
			<div>
				<h1>Listado Actividades</h1>
				<ul className="list-container">
					{activities.length > 0 ? (
						activities.map(activity => {
							return (
								<li className="card-info" key={activity.id}>
									<h3>{activity.name}</h3>
									<p>{activity.description}</p>
								</li>
							);
						})
					) : (
						<p>No hay actividades</p>
					)}
				</ul>
			</div>
		</>
	);
};

export { ActivitiesList };
