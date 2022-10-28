import React, { useRef } from "react";

const FormInputPassword = ({ name,valueToShow, handleChange, handleBlur }) => {
	const inputPassword = useRef();
	const handleShowPassword = () => {
		if (inputPassword.current.type === "password") {
			inputPassword.current.type = "text";
		} else {
			inputPassword.current.type = "password";
		}
	};
	return (
		<div className="border rounded h-10 p-2 flex flex-row justify-between">
			<input
				className="w-full h-full outline-none"
				type="password"
				name={name}
				placeholder="Contraseña"
				value={valueToShow}
				onChange={handleChange}
				onBlur={handleBlur}
				ref={inputPassword}
			></input>
			<button type="button" onClick={handleShowPassword}>
				👀
			</button>
		</div>
	);
};

export default FormInputPassword;
