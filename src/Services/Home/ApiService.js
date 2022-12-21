import axios from "axios";
import { Get } from "Services/publicApiService";
import { error as errorAlert } from "utils/alerts/alerts";

const newsEndPoint = "/news";
const membersEndpoint = "/members";
const slidesEndpoint = "/slides";

const getSlides = async () => {
	const { data, error } = await Get(slidesEndpoint);
	if (error) {
		errorAlert("Error al extraer los slides");
	} else {
		return data;
	}
};

const putSlides = value => {
	console.log(value.id);
	axios
		.put(`${slidesEndpoint}/${value.id}`, value)
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

const getNews = async () => {
	const { data, error } = await Get(newsEndPoint);
	if (error) {
		errorAlert("Error al extraer las novedades");
	} else {
		return data;
	}
};

const getMembers = async () => {
	const { data, error } = await Get(membersEndpoint);
	if (error) {
		errorAlert("Error al extraer las novedades");
	} else {
		return data;
	}
};

export { getNews, getMembers, getSlides, putSlides };
