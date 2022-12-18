import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActivities } from "Services/Activity/ApiService";
import Title from "Components/Title/Title";
import Spinner from "Components/common/Loader/Spinner/Spiner";
import Card from "Components/Card/Card";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ActivitiesListFront = ({ details }) => {
	const [activities, setActivities] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!details) {
			getActivities("", 50, 0).then(res => {
				setActivities(res);
				setIsLoading(false);
			});
		} else {
			setActivities(details);
			setIsLoading(false);
		}
	}, [details]);

	return (
		<div className="mt-3">
			{details && (
				<div className="mx-auto w-8/12 flex justify-between items-center">
					<h2 className="font-semibold text-slate 700 text-xl font-poppins">Actividades</h2>
					<Link to="/actividades" className="flex justify-center items-center">
						Ver mas <MdOutlineKeyboardArrowRight />
					</Link>
				</div>
			)}
			{isLoading && (
				<div className="w-full h-full flex justify-center items-center">
					<Spinner />
				</div>
			)}
			<div
				className={`${
					!details && !isLoading && "bg-slate-100 shadow-xl rounded"
				} w-full sm:w-full md:w-4/5 lg:w-9/12 mx-auto`}
			>
				{!details && !isLoading && <Title text="Actividades" />}
				<ul className="p-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9">
					{activities.map(activiy => (
						<li key={"activiy" + activiy.id}>
							<Link to={"/actividades/"+activiy.id}>
								<Card title={activiy.name} image={activiy.image} description={activiy.description} />
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ActivitiesListFront;
