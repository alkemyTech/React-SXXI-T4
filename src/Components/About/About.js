import React, { useEffect, useState } from "react";
import { findAll } from "./AboutServices";
import Title from "../Title/Title";
import Spinner from "Components/common/Loader/Spinner/Spiner";
import {error} from "utils/alerts/alerts"

const About = () => {
	const [about, setUs] = useState(null);
	const [shortLongDescription, setShortLongDescripcion] = useState({
		type: true,
		short: "Ver menos",
		long: "Ver mas",
	});

	useEffect(() => {
		findAll()
			.then(resp => {
				setUs(resp.data.data);
			})
			.catch(() => error("Error al obtener los datos!"));
	}, []);

	const shortLong = () => {
		setShortLongDescripcion({ ...shortLongDescription, type: !shortLongDescription.type });
	};

	return (
		<>
			{!about && (
				<div className="w-full h-full flex justify-center items-center">
					<Spinner />
				</div>
			)}
			{about && (
				<div className="w-screen h-screen flex flex-col gap-7 items-center">
					<Title text={about.name} />
					{shortLongDescription.type && (
						<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
							<div className="font-light text-justify" dangerouslySetInnerHTML={{ __html: about.short_description }} />
						</div>
					)}
					{!shortLongDescription.type && (
						<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
							<div className="font-light text-justify" dangerouslySetInnerHTML={{ __html: about.long_description }} />
						</div>
					)}
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={shortLong}>
						{shortLongDescription.type ? shortLongDescription.long : shortLongDescription.short}
					</button>
				</div>
			)}
		</>
	);
};

export { About };
