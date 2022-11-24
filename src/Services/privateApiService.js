import axios from "axios";

const baseURL = "http://ongapi.alkemy.org/api";

const config = {
	baseURL: baseURL,
	headers: {
		Group: 04, //Aqui va el ID del equipo!!
	},
};

const instance = axios.create(config);

const Get = (url, id = null) => {
	const response = {};

	instance
		.get(`${url}${id ? "/" + id : ""}`, getHeaders())
		.then(res => (response.data = res.data))
		.catch(err => (response.error = err));

	return response;
};

const getAuthorization = () => {
	const token = localStorage.getItem("token");
	return `Bearer ${token ? token : ""}`;
};

const getHeaders = () => {
	return {
		headers: {
			Authorization: getAuthorization(),
		},
	};
};

export default Get;
