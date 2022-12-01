import React, { useState, useEffect } from "react";
import { findAllAndSearch } from "Services/News/NewsApiServices";
import { error } from "utils/alerts/alerts";
import Title from "Components/Title/Title";
import Card from "Components/Card/Card";
import Spinner from "Components/common/Loader/Spinner/Spinner";

export default function News() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		findAllAndSearch()
			.then(res => {
				setNews(res.data.data);
			})
			.catch(() => {
				error("Error al obtener los datos!");
			});
	}, []);
	return (
		<>
			<div className="flex justify-center p-5">
				<div className="bg-slate-100 w-full sm:w-full md:w-4/5 lg:w-4/5 shadow-xl rounded ">
					<Title text="Novedades" />
					{news.length>0 && (
						<div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-auto w-full">
							{news?.map(newDetail => (
								<Card
									key={newDetail.id}
									title={newDetail.name}
									image={newDetail.image}
									description={newDetail.content}
								/>
							))}
						</div>
					)}
					{news.length===0 && (
						<div className="flex justify-center">
							<Spinner />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
