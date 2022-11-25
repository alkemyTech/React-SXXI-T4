import axios from "axios";

const baseURL = "http://ongapi.alkemy.org/api";

const config = {
	baseURL: baseURL,
	headers: {
		Group: 4,
		"content-type": "application/json",
	},
};

const instance = axios.create(config);

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

export default Get;
