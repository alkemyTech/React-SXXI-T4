import React from "react";
import LazyImage from "Components/common/LazyImage/LazyImage";
import imageError from "Assets/images/blog-img-02.jpg"

const NewsDetails = ({ details }) => {
	return (
		<div className="w-screen h-screen flex flex-col gap-7 items-center">
			<h1 className="text-4xl font-bold text-center pt-7">{details?.name}</h1>
			<LazyImage
				src={details?.image}
				srcError={imageError}
				classToApply={"w-full h-96 bg-center bg-cover bg-no-repeat"}
			/>
			<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
				<div className="font-light" dangerouslySetInnerHTML={{ __html: details?.content }} />
			</div>
		</div>
	);
};

export default NewsDetails;
