/* eslint-disable react/prop-types */
import React from "react";
import Title from "Components/Title/Title";
import Card from "Components/Card/Card";

export default function News({ data }) {
	return (
		<div className="flex justify-center p-5">
			<div className="bg-slate-100 w-full sm:w-full md:w-4/5 lg:w-4/5 shadow-xl rounded ">
				<Title title="Novedades" />
				<div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-auto w-full">
					{data?.map(datos => (
						<Card
							key={datos.id}
							title={datos.name}
							image={datos.image}
							description={datos.content}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
