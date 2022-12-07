import React from "react";

const TableDropDownList = ({ options, name, setOnChange }) => {
	return (
		<div>
			<select
				className=" h-10 rounded border block w-full bg-white border-gray-400 text-gray-700 pl-2  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				onChange={e => setOnChange(e.target.value)}
			>
				{options?.map(option => {
					return (
						<option key={name + option.value} value={option.value}>
							{option.name}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default TableDropDownList;
