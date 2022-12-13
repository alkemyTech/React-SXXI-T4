import axios from "axios";

import { Get, Post, Put } from "Services/privateApiService";
import { error as errorAlert, update, success } from "utils/alerts/alerts";

const homeEndpoint = "/organization";
const newsEndpoint = "/news";
const slideEndpoint = "/slides";

const getSlides = async () => {
	const { data, error } = await Get(`${slideEndpoint}`);
	if (error) {
		errorAlert("Error al obtener los slides");
	} else {
		return data;
	}
};

const getNews = async () => {
	const { data, error } = await Get(newsEndpoint);
	if (error) {
		errorAlert("Error al extraer las novedades");
	} else {
		return data;
	}
};

const putSlides = value => {
	console.log(value.id);
	axios
		.put(`https://ongapi.alkemy.org/api/slides/${value.id}`, value)
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

const getHome = async id => {
	const { data, error } = await Get(`${homeEndpoint}/${id || ""}`);
	if (error) {
		errorAlert("Error al obtener los datos de Home");
	} else {
		return data;
	}
};

const postHome = async body => {
	const { error } = await Post(`${homeEndpoint}`, body);
	if (error) {
		errorAlert("Error al crear Home");
	} else {
		success();
	}
};

const putHome = async (id, body) => {
	const { error } = await Put(`${homeEndpoint}/${id}`, body);
	if (error) {
		errorAlert("Error al modificar los datos de Home");
	} else {
		update();
	}
};

export { getHome, getNews, getSlides, putSlides, putHome, postHome };
