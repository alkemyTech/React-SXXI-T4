import React from "react";

const Table = ({ children }) => {
	return (
		<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
			<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
				{children}
			</div>
		</div>
	);
};

export default Table;
