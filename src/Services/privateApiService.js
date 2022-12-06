import axios from "axios";

const config = {
	baseURL: "https://ongapi.alkemy.org/api",
	headers: {
		Group: 4, // Aqui va el ID del equipo!!
		"content-type": "application/json",
	},
};

const instance = axios.create(config);

const Post = async (endpoint, body) => {
	const response = {};
	await instance
		.post(endpoint, body, getHeaders())
		.then(res => (response.data = res.data))
		.catch(error => (response.error = error));
	return response;
};

const Patch = async (endpoint, body) => {
	const response = {};
	await instance
		.patch(`${endpoint}`, body, getHeaders())
		.then(res => (response.data = res.data))
		.catch(err => (response.error = err));
	return response;
};

const Put = async (endpoint, body) => {
	const response = {};
	await instance
		.put(`${endpoint}`, body, getHeaders())
		.then(res => (response.data = res.data))
		.catch(err => (response.error = err));
	return response;
};

const Get = async (endpoint, id = null) => {
	const response = {};
	await instance
		.get(`${endpoint}${id ? "/" + id : ""}`, getHeaders())
		.then(res => (response.data = res.data.data))
		.catch(err => (response.error = err));
	return response;
};

const Delete = (endpoint, id) => {
	const response = {};
	instance
		.delete(`${endpoint}/${id}`, getHeaders())
		.then(res => (response.data = res.data))
		.catch(err => (response.error = err));

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

export { Put, Get, Delete, Patch, Post };
