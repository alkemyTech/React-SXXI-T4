import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findById } from "Services/News/NewsApiServices"
import Comment from "../Comments/Comment";
import CommentLoading from "../Comments/CommentLoading";

const NewsDetails = () => {
	const { id } = useParams("id")
	const [loading, setLoading] = useState(false)
	const [details, setDetails] = useState({})
	const getNewId = async () => {
		try {
			const res = await findById(id)
			setDetails(res.data.data)
			setLoading(true)
		}
		catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		getNewId()
	}, [])
	return (
		<div className="w-screen flex flex-col gap-7 items-center">
			<h1 className="text-4xl font-bold text-center pt-7">{details?.name}</h1>
			<div
				className="w-full h-96 bg-center bg-cover bg-no-repeat"
				style={{ backgroundImage: `url("${details?.image}")` }}
			/>
			<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
				<div className="font-light" dangerouslySetInnerHTML={{ __html: details?.content }} />
			</div>
			<div className="w-[90%] flex items-center justify-center flex-col">
				{loading ?   <Comment id={id} /> : <CommentLoading /> }
			</div>
		</div>
	);
};
export default NewsDetails;
