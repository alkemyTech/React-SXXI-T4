import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

const InputImage = ({ bgImage, formikFieldName, setFieldValue }) => {
	const inputImage = useRef();
	const [fileName, setFileName] = useState("");

	const fileTypes = [
		"image/png",
		"image/jpg",
	  ];

	function validFileType(file) {
		return fileTypes.includes(file.type);
	  }

	const imageHandleChange = () => {
		if (inputImage?.current?.files[0] && validFileType(inputImage?.current?.files[0])) {
			const reader = new FileReader();
			setFileName(inputImage.current.files[0].name);
			reader.readAsDataURL(inputImage.current.files[0]);
			reader.addEventListener("load", () => {
				const url = reader.result;
				setFieldValue(formikFieldName, url);
			});
		}else{
			Swal.fire("Selecciona una imagen jpg o png")
		}
	};
	return (
		<>
			<div className="flex items-center justify-center w-full">
				<label
					htmlFor="dropzone-file"
					className={`flex flex-col items-center justify-center w-32 h-32 border-2 rounded-full border-gray-300 border-dashed hover:border-solid  cursor-pointer bg-gray-50  hover:bg-gray-100 bg-cover`}
					style={{ backgroundImage: `url('${bgImage}')` }}
				>
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<svg
							className="w-10 h-10 mb-3 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							></path>
						</svg>
					</div>
					<input
						name="profile_image"
						type="file"
						accept=".jpg, .png"
						onChange={imageHandleChange}
						ref={inputImage}
						id="dropzone-file"
						hidden
					/>
				</label>
			</div>
			<p className=" text-xs text-center">{fileName}</p>
		</>
	);
};

export default InputImage;
