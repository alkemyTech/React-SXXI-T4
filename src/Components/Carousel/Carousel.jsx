import React, { useState, useEffect } from "react";
import "./Carousel.css";
import Spinner from "Components/common/Loader/Spinner/Spiner";
import { getSlides } from "Services/Home/ApiService";

const Carousel = () => {
	const [slides, setSlides] = useState([]);
	const [sliderPosition, setSliderPosition] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	const cleanSlidesArray = array => {
		const cleanArray = array.filter(item => item.image !== null);
		return cleanArray;
	};

	const obtainSlides = async () => {
		const data = await getSlides();
		setSlides(cleanSlidesArray(data));
		setIsLoading(false);
	};

	useEffect(() => {
		obtainSlides();
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			handlerNext();
		}, 5000);
		return () => {
			clearTimeout(timer);
		};
	});

	const handlerPrevious = () => {
		let newPos = sliderPosition;
		if (newPos > 0) {
			newPos = newPos - 1;
		}
		setSliderPosition(newPos);
		translateSlides(newPos);
	};

	const handlerNext = () => {
		let newPos = sliderPosition;
		if (newPos < slides.length - 1) {
			newPos = newPos + 1;
		} else if (sliderPosition === slides.length - 1) {
			newPos = 0;
		}

		setSliderPosition(newPos);
		translateSlides(newPos);
	};

	const translateSlides = newPos => {
		const toTranslate = -100 * newPos;
		for (let i = 0; i < slides.length; i++) {
			const elem = document.getElementById(`item${i}`);
			elem.style.transform = `translateX(${toTranslate}%)`;
		}
	};
	return (
		<div>
			<div className="container rounded-lg">
				<div className="leftArrow" onClick={handlerPrevious}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
						<path
							fillRule="evenodd"
							d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div className="displayFrame">
					{isLoading && (
						<div className="flex justify-center items-center h-full w-full">
							<Spinner />
						</div>
					)}
					{slides.map((item, index) => (
						<div className="item" id={`item${index}`} key={item.id}>
							<img src={`${item.image}`} alt={item.name} />
							<div className="text">
								<div className="title">{item.name}</div>
								<div className="description" dangerouslySetInnerHTML={{ __html: item.description }}></div>
							</div>
						</div>
					))}
				</div>
				<div className=" rightArrow" onClick={handlerNext}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
						<path
							fillRule="evenodd"
							d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
