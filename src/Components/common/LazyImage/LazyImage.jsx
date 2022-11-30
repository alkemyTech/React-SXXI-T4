import React, { useState } from "react";

import Skeleton from "@mui/material/Skeleton";

const LazyImage = ({ src, srcError, classToApply, styleToApply }) => {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			{isLoading && (
				<>
					<div className={classToApply} style={styleToApply}>
						<Skeleton variant="rectangular" height="100%" />
					</div>
				</>
			)}
			<img
				src={src || srcError}
				style={{ ...styleToApply, display: isLoading && "none" }}
				className={classToApply}
				onLoad={() => setIsLoading(false)}
				onError={e => {
					e.currentTarget.src = srcError;
				}}
			/>
		</>
	);
};

export default LazyImage;
