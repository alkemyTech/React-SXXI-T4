import { Get, Post, Put, Delete, Patch } from "./../privateApiService";

const slidesEndpoint = "/slides";

const createSlide = body => {
	return Post(`${slidesEndpoint}`, body);
};

const getAmountOfSlides = (search = "") => {
	const { data } = Get(`${slidesEndpoint}?search${search}`);
	return data.length;
};

const getSlide = id => {
	return Get(`${slidesEndpoint}/${id}`);
};

const getSlides = (search = "", amountToShow = 5, page = 0) => {
	return Get(
		`${slidesEndpoint}?search=${search}&limit=${amountToShow}&skip=${
			amountToShow * page
		}`
	);
};

const updateSlide = (id, body) => {
	return Put(`${slidesEndpoint}/${id}`, body);
};

const deleteSlide = id => {
	return Delete(`${slidesEndpoint}/${id}`);
};

export {
	createSlide,
	getAmountOfSlides,
	getSlide,
	getSlides,
	updateSlide,
	deleteSlide,
};
