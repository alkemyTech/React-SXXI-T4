import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { findById } from "Services/News/NewsApiServices";
import { error } from "utils/alerts/alerts";
import Spinner from "Components/common/Loader/Spinner/Spinner";

const NewsDetails = () => {
	const [details, setDetails] = useState(null);
	const { id } = useParams();
	useEffect(() => {
		findById(id)
			.then(res => {
				setDetails(res.data.data);
			})
			.catch(() => {
				error("No se ha encontrado la noticia.");
			});
	}, []);
	return (
		<div className="w-screen h-screen flex flex-col gap-7 items-center justify-center">
			{!details && <Spinner />}
			{details && (
				<>
					<h1 className="text-4xl font-bold text-center pt-7">{details?.name}</h1>
					<div
						className="w-full h-96 bg-center bg-cover bg-no-repeat"
						style={{ backgroundImage: `url("${details?.image}")` }}
					/>
					<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
						<div className="font-light" dangerouslySetInnerHTML={{ __html: details?.content }} />
					</div>
				</>
			)}
		</div>
	);
};

export default NewsDetails;
