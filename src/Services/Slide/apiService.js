import { Delete, Get, Post, Put } from "Services/privateApiService";
import { success, error as errorAlert, update, erase } from "utils/alerts/alerts";

const slidesEndpoint = "/slides";

const createSlide = async body => {
	const { error } = await Post(`${slidesEndpoint}`, body);
	if (error) {
		errorAlert("Error al crear slide");
	} else {
		success();
	}
};

const getAmountOfSlides = async (search = "") => {
	const { data, error } = await Get(`${slidesEndpoint}?search=${search}`);
	if (error) {
		errorAlert("Error al obtener la cantidad de slides");
	} else {
		return data.length;
	}
};

const getSlide = async id => {
	const { data, error } = await Get(`${slidesEndpoint}/${id}`);
	if (error) {
		errorAlert(`Error al obtener el slide ${id}`);
	} else {
		return data;
	}
};

const getSlides = async (search = "", amountToShow = 5, page = 0) => {
	const { data, error } = await Get(
		`${slidesEndpoint}?search=${search}&limit=${amountToShow}&skip=${amountToShow * page}`
	);
	if (error) {
		errorAlert("Error al obtener el listado de slide");
	} else {
		return data;
	}
};

const updateSlide = async (id, body) => {
	const { error } = await Put(`${slidesEndpoint}/${id}`, body);
	if (error) {
		errorAlert("Error al actualizar el slide");
	} else {
		update();
	}
};

const deleteSlide = async id => {
	const { error } = await Delete(`${slidesEndpoint}`, id);
	if (error) {
		errorAlert("Error al eliminar el slide seleccionado");
	} else {
		erase();
	}
};

export { createSlide, getAmountOfSlides, getSlide, getSlides, updateSlide, deleteSlide };
