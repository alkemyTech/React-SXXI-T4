import React from "react";
import { convertBase64 } from "utils/ConvertBase64/ConvertBase64";

const InputImage = ({ bgImage, FieldName, setFieldValue, rounded }) => {
	return (
		<>
			<div className="flex justify-center items-center gap-3  lg:ml-0  lg:flex-col lg:items-center lg:justify-center lg:space-y-5">
				<img
					className={`border-1 w-[150px] h-[150px] ${rounded==="rounded" && "rounded-full"}  object-cover overflow-hidden`}
					src={bgImage || "/images/user.png"}
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
							name="image"
							className="hidden"
							onChange={e => convertBase64(setFieldValue, FieldName, e.target)}
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
