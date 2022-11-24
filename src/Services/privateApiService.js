import axios from "axios";

const config = {
	headers: {
		Group: 04, //Aqui va el ID del equipo!!
	},
};

const Get = async (url, id = null) => {
	const response = {};
	try {
		const { data } = await axios.get(
			`${url}${id ? "/" + id : ""}`,
			getHeaders()
		);
		response.data = data;
	} catch (error) {
		response.error = error;
	}
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
