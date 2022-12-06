import axios from "axios";

const config = {
	baseURL: "https://ongapi.alkemy.org/public/api",
	headers: {
		Group: 4, // Aqui va el ID del equipo!!
		"content-type": "application/json",
	},
};

const instance = axios.create(config);

const Get = async (endpoint, id = null) => {
	const response = {};
	instance
		.get(`${endpoint}${id ? "/" + id : ""}`)
		.then(res => (response.data = res.data.data))
		.catch(err => (response.error = err));
	return response;
};

const Post = async (endpoint, body) => {
	const response = {};
	instance
		.post(endpoint, body)
		.then(res => (response.data = res.data))
		.catch(error => (response.error = error));
	return response;
};

const Put = async (endpoint, body) => {
	const response = {};
	await instance
		.get(`${endpoint},body`)
		.then(res => (response.data = res.data))
		.catch(err => (response.error = err));
	return response;
};

export { Get, Post, Put };
