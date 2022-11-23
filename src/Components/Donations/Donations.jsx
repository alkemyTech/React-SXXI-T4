import React from "react";
import Title from "../Title/Title";

const Donation = ({ textBody }) => {
	const title = "Donations";
	return (
		<>
			<div className="w-screen h-screen flex flex-col gap-7 items-center">
				<Title text={title} />
				{!textBody && <span>loading body....</span>}
				{textBody && (
					<div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/5">
						<div className="font-light text-justify">{textBody}</div>
                        <div className="font-light text-justify">Donar con: </div>
						<br />
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Mercado Pago
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export { Donation };
