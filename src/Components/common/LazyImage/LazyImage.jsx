import React, { Suspense } from "react";
import { Skeleton } from "@mui/material";

const imgCache = {
	__cache: {},
	read(src) {
		if (!this.__cache[src]) {
			this.__cache[src] = new Promise(resolve => {
				const img = new Image();
				img.onload = () => {
					this.__cache[src] = true;
					resolve(this.__cache[src]);
				};
				img.src = src;
			}).then(img => {
				this.__cache[src] = true;
			});
		}
		if (this.__cache[src] instanceof Promise) {
			throw this.__cache[src];
		}
		return this.__cache[src];
	},
};

const SuspenseImg = ({ src, srcError, classToApply, styleToApply }) => {
	imgCache.read(src);
	return (
		<img
			src={src}
			className={classToApply}
			style={styleToApply}
			onError={e => {
				e.currentTarget.src = srcError;
			}}
		/>
	);
};

const LazyImage = ({ src, srcError, classToApply, styleToApply }) => {
	return (
		<>
			<Suspense
				fallback={
					<div className={classToApply} style={styleToApply}>
						<Skeleton variant="rectangular" height="100%" />
					</div>
				}
			>
				<SuspenseImg src={src} srcError={srcError} classToApply={classToApply} styleToApply={styleToApply} />
			</Suspense>
		</>
	);
};

export default LazyImage;
