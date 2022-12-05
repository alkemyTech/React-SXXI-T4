import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivity } from "Services/Activity/ApiService";
import Title from "../Title/Title";

const ActivityDetails = props => {
	const { id } = useParams();
	const [activity, setActivity] = useState(null);

	const obtainActivity = async () => {
		const data = await getActivity(id);
		setActivity(data);
	};

	useEffect(() => {
		obtainActivity();
	}, []);
	return (
		<>
			{activity ? (
				<div className="w-screen h-screen flex flex-col gap-7 items-center">
					<Title text={activity.name} />
					<h3 className="antialiased hover:subpixel-antialiased">Description</h3>
					<div className="font-light text-justify w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5" dangerouslySetInnerHTML={{ __html: activity.description }} />
					<img className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5" src={activity.image} />
				</div>
			) : (
				<Title title={"Empty title"} />
			)}
		</>
	);
};

export { ActivityDetails };
