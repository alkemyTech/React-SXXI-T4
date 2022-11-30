import React from "react";
import Title from "../Title/Title";

const Thanks = () => {
	const title = "Gracias por su colaboración";
	const message =
		'La Organización "Somos Más" agradece profundamente su colaboración.';
	return (
		<>
			<div className="w-screen h-screen flex flex-col gap-7 items-center">
				<Title text={title} />
				<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
					<div className="font-light text-justify">{message}</div>
					<div className="font-light text-justify">Donar con: </div>
				</div>
			</div>
		</>
	);
};

export { Thanks };
