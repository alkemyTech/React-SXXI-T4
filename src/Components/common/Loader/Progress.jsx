/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

export default function Progress({ percent, milliseconds }) {
	const [width, setWidth] = useState(percent);

	useEffect(() => {
		if (width < 100) {
			setTimeout(() => {
				// eslint-disable-next-line no-return-assign
				setWidth(pre => (pre += 5));
			}, milliseconds);
		} else {
			setWidth(0);
		}
	}, [width]);

	return (
		<div
			className={`h-1  bg-sky-600 transition-all duration-200`}
			style={{ width: `${width}%` }}
		></div>
	);
}
