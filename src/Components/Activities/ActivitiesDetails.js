import LazyImage from "Components/common/LazyImage/LazyImage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivity } from "Services/Activity/ApiService";
import Title from "../Title/Title";
import imageError from "Assets/images/blog-img-02.jpg";

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
					<h1 className="my-10 text-4xl font-bold text-center pt-7">{activity?.name}</h1>
					<div className="w-11/12 flex flex-col lg:flex-row sm:justify-between sm:w-3/4 sm:gap-5">
						<LazyImage
							classToApply={"lg:w-1/2 h-96 bg-center bg-cover bg-no-repeat object-cover"}
							srcError={imageError}
							src={activity.image}
						/>
						<div
							className=" my-5 sm:my-0 lg:w-1/2 font-light"
							dangerouslySetInnerHTML={{ __html: activity.description }}
						/>
					</div>
				</div>
			) : (
				<Title title={"Empty title"} />
			)}
		</>
	);
};

export { ActivityDetails };
