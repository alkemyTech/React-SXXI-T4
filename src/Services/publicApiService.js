import axios from "axios";

const baseURL = "https://ongapi.alkemy.org/api";

const config = {
	baseURL,
	headers: {
		"content-type": "application/json",
	},
}

const instance = axios.create(config);

const Post = async (relativeUrl, body) => {
	const response = {};
	await instance
		.post(relativeUrl, body)
		.then(res => (response.data = res.data))
		.catch(error => (response.error = error));
	return response;
};

const Get = async (relativeUrl) => {
	const response = {};
	await instance
		.get(relativeUrl)
		.then(res => (response.data = res.data))
		.catch(error => (response.error = error));
	return response;
};

export { Get, Post }