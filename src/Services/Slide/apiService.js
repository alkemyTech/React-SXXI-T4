import { Get, Post, Put, Delete } from "../privateApiService";

const slidesEndpoint = "/slides";

const createSlide = async body => {
	return await Post(`${slidesEndpoint}`, body);
};

const getAmountOfSlides = async (search = "") => {
	const { data } = await Get(`${slidesEndpoint}?search=${search}`);
	return data.length;
};

const getSlide = async id => {
	return await Get(`${slidesEndpoint}/${id}`);
};

const getSlides = async (search = "", amountToShow = 5, page = 0) => {
	return await Get(`${slidesEndpoint}?search=${search}&limit=${amountToShow}&skip=${amountToShow * page}`);
};

const updateSlide = async (id, body) => {
	return await Put(`${slidesEndpoint}/${id}`, body);
};

const deleteSlide = async id => {
	return await Delete(`${slidesEndpoint}`, id);
};

export { createSlide, getAmountOfSlides, getSlide, getSlides, updateSlide, deleteSlide };
