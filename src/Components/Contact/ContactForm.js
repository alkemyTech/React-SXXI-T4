import React from "react";

export default function ContactForm() {
	return (
		<div className="h-screen">
			<div className="w-full mx-auto h-auto">
				<img
					src="images/logo-somosmas.png"
					className="mx-auto h-36"
					alt="logo"
				/>
			</div>
			<div className="pl-4 text-xl font-medium tracking-wide">
				<h1>¿Quieres contribuir?</h1>
			</div>
			<div className="pl-4 w-auto">
				<button
					className="w-auto bg-red-500 text-white p-2 px-4 mt-3 shadow-md tracking-wide 
									rounded-lg  mx-auto hover:bg-red-500 hover:-translate-y-1 
									transition-all duration-500  text-base font-normal"
				>
					Donar
				</button>
			</div>
		</div>
	);
}
