/* eslint-disable no-unused-vars */
import axios from "axios";

const baseURL = "https://ongapi.alkemy.org/api";

const config = {
	baseURL,
};

const instance = axios.create(config);

const Patch = async (endpoint, body) => {
	const response = {};
	await instance.patch(`${endpoint}`, body, getHeaders()).then(res => (response.data = res.data));
};

const Put = async (endpoint, body) => {
	const response = {};
	await instance
		.put(`${endpoint}`, body, getHeaders())
		.then(res => (response.data = res.data))
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

const Get = async (endpoint, id) => {
	const response = {};
	await instance
		.get(`${endpoint}/${id || ""}`)
		.then(res => (response.data = res.data.data))
		.catch(err => (response.error = err));
	return response;
};

const Delete = (endpoint, id) => {
	let response = {};

	instance
		.delete(`${endpoint}/${id}`, getHeaders())
		.then(res => (response = res.data))
		.catch(err => console.log(err));

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
