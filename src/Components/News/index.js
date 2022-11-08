/* eslint-disable react/prop-types */
import React from "react";
import Title from "../Title/Title";
import Card from "../Card/Card";

export default function News({ data }) {
	return (
		<div className="flex justify-center p-5">
			<div className="bg-slate-100 w-full sm:w-full md:w-4/5 lg:w-4/5 shadow-xl rounded ">
				<Title title="Novedades" />
				<div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
					{data.map(datos => (
						<Card key={datos.id} data={datos} />
					))}
				</div>
			</div>
		</div>
	);
}
