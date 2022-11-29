import axios from "axios";

const baseURL = "http://ongapi.alkemy.org/api";

const config = {
	baseURL: baseURL,
	headers: {
		Group: 04, //Aqui va el ID del equipo!!
	},
};

const instance = axios.create(config);

const Get = (endpoint, id = null) => {
	const response = {};
	instance
		.get(`${endpoint}${id ? "/" + id : ""}`, getHeaders())
		.then(res => (response.data = res.data))
		.catch(err => (response.error = err));
	return response;
};

const Post = (endpoint, body) => {
	const response = {};
	instance
		.post(endpoint, body, getHeaders())
		.then(res => (response.data = res.data))
		.catch(err => (response.error = err));
	return response;
};

const Put = (endpoint, body) => {
	const response = {};
	instance
		.patch(`${endpoint}`, body, getHeaders())
		.then(res => (response.data = res.data))
		.catch(err => (response.error = err));
	return response;
};

const Patch = (endpoint, body) => {
	const response = {};
	instance
		.patch(`${endpoint}`, body, getHeaders())
		.then(res => (response.data = res.data))
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
	return `Bearer ${token ? token : ""}`;
};

const getHeaders = () => {
	return {
		headers: {
			Authorization: getAuthorization(),
		},
	};
};

export { Get, Post, Put, Patch, Delete };
