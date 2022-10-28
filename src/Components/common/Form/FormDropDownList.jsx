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
			className="border rounded h-10 text-gray-400 px-2"
			value={valueToShow}
			onChange={handleChange}
			onBlur={handleBlur}
		>
			<option value="" disabled>
				{placeholder}
			</option>
			{Array.isArray(options)&&options?.map(option => {
				return (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				);
			})}
		</select>
	);
};

export default FormDropDownList;
