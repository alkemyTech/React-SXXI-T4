import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {getMembersByPageAndSearch} from "store/Slices/membersSlice"
import { getActivities } from "Services/Activity/ApiService";
import News from "Components/News";
import Carousel from "Components/Carousel/Carousel";
import Staff from "Components/Staff/Staff";
import ActivitiesListFront from "Components/Activities/ActivitiesListFront";
import WelcomeText from "./WelcomeText";
import { getNews } from "Services/Home/ApiService";

export const Home = () => {
	const dispatch = useDispatch();
	const staff = useSelector(state => state.members.list);
	const [news, setNews] = useState(null);
	const [activities, setActivities] = useState([]);

	const obtainNews = async () => {
		const data = await getNews();
		setNews(data.slice(-4).reverse());
	};

	useEffect(() => {
		dispatch(getMembersByPageAndSearch({page:0,amountOfMembers:4,search:""}))
		obtainNews();
		getActivities("", 4, 0).then(res => {
			setActivities(res);
		});
	}, []);

	return (
		<div className=" my-5 flex flex-col w-full">
			<div className="flex flex-col lg:flex-row mt-5 w-11/12 md:w-9/12 md:px-8 mx-auto gap-5">
				<WelcomeText />
				<Carousel />
			</div>

			<div className=" my-5">
				<Staff details={staff} />
			</div>
			<div className=" my-5">
				<News details={news} />
			</div>
			<div className=" my-5">
				<ActivitiesListFront details={activities} />
			</div>
		</div>
	);
};
