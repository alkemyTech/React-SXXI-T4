import React from "react";

const TableDropDownList = ({ options, name, setOnChange }) => {
	return (
		<div className="relative">
			<select
				className="h-full rounded border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				onChange={e => setOnChange(e.target.value)}
			>
				{name === "categories" && <option value="all">All</option>}
				{options?.map(option => {
					return (
						<option key={option.id || name + option.value} value={option.value}>
							{option.name}
						</option>
					);
				})}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				<svg
					className="fill-current h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
				>
					<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
				</svg>
			</div>
		</div>
	);
};

export default TableDropDownList;