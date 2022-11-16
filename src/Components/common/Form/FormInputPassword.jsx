import React, { useRef, useState } from "react";

const FormInputPassword = ({
	name,
	valueToShow,
	handleChange,
	handleBlur,
	placeholder,
}) => {
	const [showPassword, setShowPassword] = useState(true);
	const inputPassword = useRef();
	const handleShowPassword = () => {
		if (inputPassword.current.type === "password") {
			inputPassword.current.type = "text";
			setShowPassword(false);
		} else {
			inputPassword.current.type = "password";
			setShowPassword(true);
		}
	};
	return (
		<div className="border rounded h-12 p-3 flex flex-row justify-between">
			<input
				className="outline-none"
				type="password"
				name={name}
				placeholder={placeholder}
				value={valueToShow}
				onChange={handleChange}
				onBlur={handleBlur}
				ref={inputPassword}
			></input>
			<button type="button" onClick={handleShowPassword}>
				{showPassword ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-eye-off w-6 h-6"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="#2c3e50"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<line x1="3" y1="3" x2="21" y2="21" />
						<path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
						<path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
					</svg>
				)}
			</button>
		</div>
	);
};

export default FormInputPassword;
