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

const Get = async (endpoint, id = null) => {
	const response = {};
	await instance
		.get(`${endpoint}${id ? "/" + id : ""}`, getHeaders())
		.then(res => (response.data = res.data.data))
		.catch(err => (response.error = err));
	return response;
};

const Post = async (endpoint, body) => {
	const response = {};
	await instance
		.post(endpoint, body, getHeaders())
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

const Patch = async (endpoint, body) => {
	const response = {};
	await instance
		.patch(`${endpoint}`, body, getHeaders())
		.then(res => (response.data = res.data))
		.catch(err => (response.error = err));
	return response;
};

const Delete = async endpoint => {
	const response = {};
	await instance
		.delete(`${endpoint}`, getHeaders())
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

export { Get, Post, Put, Patch, Delete };
