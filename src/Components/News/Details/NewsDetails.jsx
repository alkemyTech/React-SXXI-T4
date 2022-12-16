import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { findById } from "Services/News/NewsApiServices";
import LazyImage from "Components/common/LazyImage/LazyImage";
import imageError from "Assets/images/blog-img-02.jpg";

const NewsDetails = () => {
	const [details, setDetails] = useState(null);
	const { id } = useParams();

	const obtainNews = async () => {
		const data = await findById(id);
		setDetails(data);
	};

	useEffect(() => {
		obtainNews();
	}, []);
	return (
		<div className="w-screen h-screen flex flex-col gap-7 items-center justify-center">
			<>
				<h1 className="text-4xl font-bold text-center pt-7">{details?.name}</h1>
				<div className="w-11/12 sm:flex sm:justify-between sm:w-3/4 sm:gap-5">
					<LazyImage
						src={details?.image}
						srcError={imageError}
						classToApply={"w-full h-96 bg-center bg-cover bg-no-repeat"}
					/>
					<div className=" my-5 sm:my-0 sm:w-1/2 font-light" dangerouslySetInnerHTML={{ __html: details?.content }} />
				</div>
			</>
		</div>
	);
};

export default NewsDetails;
