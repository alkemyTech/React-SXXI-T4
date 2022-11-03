import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Carousel.css";

const Carousel = () => {
	const [slides, setSlides] = useState([]);

	const getSlides = async () => {
		const res = { data: {}, error: null };
		try {
			const { data } = await axios.get("https://ongapi.alkemy.org/api/slides");
			res.data = data.data;
		} catch (error) {
			res.error = error.message;
		}
		setSlides(res.data);
	};

	useEffect(() => {
		getSlides();
	}, []);

	return (
		<div>
			<div className="container">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="leftArrow w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="Display-Frame">
					{slides.map(item => (
						<div className="item" key={item.id}>
							<img src={`${item.image}`} alt={item.name} />
						</div>
					))}
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="rightArrow w-6 h-6"
				>
					<path
						fillRule="evenodd"
						d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
		</div>
	);
};

export default Carousel;
