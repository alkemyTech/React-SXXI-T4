/* eslint-disable react/prop-types */
import React from "react";

export default function CardNews({ data }) {
	return (
		<div className="bg-white w-full h-auto rounded relative">
			<img src={`/images/${data.image}`} className="rounded w-auto h-auto" />
			<div className="p-2">
				<h1 className="font-semibold text-lg tracking-wide">{data.name}</h1>
				<p className="py-2 font-normal text-sm text-slate-400">
					{data.content}
				</p>
				<div className="py-3">
					<h5 className="absolute text-sm text-slate-400 bottom-0 right-2">
						{data.fecha}
					</h5>
				</div>
			</div>
		</div>
	);
}
