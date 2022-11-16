import React, { useRef } from "react";
import { convertBase64 } from "../../../utils/ConvertBase64/ConvertBase64";

const InputImage = ({ bgImage, FieldName, setFieldValue }) => {
	const inputImage = useRef();

	return (
		<>
			<div className="flex justify-center items-center gap-3  lg:ml-0  lg:flex-col lg:items-center lg:justify-center lg:space-y-5">
				<img
					className="h-auto w-2/6 lg:w-3/6 border-1  rounded-full"
					src={bgImage || "https://images-ext-2.discordapp.net/external/6ulAMx1V10CIaXeq3tX1eHslMwU8yBZl2AGZ4RllfZ4/https/img.icons8.com/material-outlined/512/add-image.png"}
				/>
				<div className="  bg-grey-lighter rounded-full">
					<label className="w-auto flex flex-col items-center p-3 bg-white text-blue rounded-full shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
						<svg
							className="w-6 h-6 rounded-full"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
						</svg>

						<input
							type="file"
							name="profile_image"
							className="hidden"
							onChange={e => convertBase64(setFieldValue, FieldName, e.target)}
							ref={inputImage}
							accept=".jpg, .png"
						/>
					</label>
				</div>
			</div>
			{/* <p className=" text-xs text-center">{fileName}</p> */}
		</>
	);
};

export default InputImage;
