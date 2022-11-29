import React from "react";

const TableFieldContainer = ({ children }) => {
	return (
		<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
			{children}
		</td>
	);
};

export default TableFieldContainer;
