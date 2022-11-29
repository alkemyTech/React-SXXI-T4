import React from "react";

const Table = ({ children }) => {
	return (
		<div className=" sm:-mx-8  sm:px-8 py-4 overflow-x-auto">
			<div className="inline-block w-full shadow rounded-lg overflow-hidden">{children}</div>
		</div>
	);
};

export default Table;
