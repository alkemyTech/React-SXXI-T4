import axios from "axios";

const config = {
	baseURL: "https://ongapi.alkemy.org/public/api",
	headers: {
		Group: 4, // Aqui va el ID del equipo!!
		"content-type": "application/json",
	},
};

const instance = axios.create(config);

const Post = async (endpoint, body) => {
	const response = {};
	await instance
		.post(endpoint, body)
		.then(res => (response.data = res.data))
		.catch(error => (response.error = error));
	return response;
};

const Get = async (endpoint, id) => {
	const response = {};
	await instance
		.get(`${endpoint}${id ? "/" + id : ""}`)
		.then(res => (response.data = res.data.data))
		.catch(error => (response.error = error));
	return response;
};

export { Get, Post };
