import React from "react";

const FormDropDownList = ({
	options,
	name,
	valueToShow,
	handleChange,
	handleBlur,
	placeholder,
}) => {
	return (
		<select
			name={name}
			className="border rounded h-12 text-gray-400 p-3 w-full"
			value={valueToShow}
			onChange={handleChange}
			onBlur={handleBlur}
		>
			<option value="" disabled>
				{placeholder}
			</option>
			{Array.isArray(options) &&
				options?.map(option => {
					return (
						<option key={option.id} value={option.id}>
							{option.name}
						</option>
					);
				})}
		</select>
	);
};

export default FormDropDownList;
