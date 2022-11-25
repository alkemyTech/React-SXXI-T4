import axios from "axios";

const baseURL = "http://ongapi.alkemy.org/api";

const config = {
	baseURL: baseURL,
	headers: {
		Group: 4, 
	},
};

const instance = axios.create(config);

const Delete = (url, id) => {
	const response = {};

	instance
		.delete(`${url}${id ? "/" + id : ""}`, getHeaders())
		.then(res => (response.data = res.data.success))
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

export default Get;
