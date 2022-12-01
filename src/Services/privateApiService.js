import axios from "axios";

const baseURL = "https://ongapi.alkemy.org/api";
const config = {
	baseURL: baseURL,
	headers: {
		Group: 4, // Aqui va el ID del equipo!!
		"content-type": "application/json",
	},
};

const instance = axios.create(config);

const Post = (endpoint, body) => {
	const response = {};
	instance
		.post(endpoint, body, getHeaders())
		.then(res => (response.data = res.data))
		.catch(error => (response.error = error));
	return response;
};

const getAuthorization = () => {
	const token = localStorage.getItem("token");
	return `Bearer ${token}`;
};

const getHeaders = () => {
	return {
		headers: {
			Authorization: getAuthorization(),
		},
	};
};

export { Post };
