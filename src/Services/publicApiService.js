import axios from "axios";

const baseURL = "https://ongapi.alkemy.org/api";

const instance = axios.create(config);

const config = {
	baseURL: baseURL,
	headers: {
		Group: 4, // Aqui va el ID del equipo!!
		"content-type": "application/json",
	},
};

const getHeaders = () => {
	return {
		headers: {
			"content-type": "application/json",
		},
	};
};

const url = "https://ongapi.alkemy.org/public/api";

const Post = (relativeUrl, body) => {
	const response = {};
	instance
		.post(relativeUrl, body, getHeaders)
		.then(res => (response.data = res.data))
		.catch(error => (response.error = error));
	return response;
};

const Get = id => {
	axios
		.get(`${url}${id?"/"+ id :""}`, config)
		.then(res => console.log(res.data))
		.catch(err => console.log(err));
};

export { Get, Post }