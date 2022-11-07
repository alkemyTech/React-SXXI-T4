import axios from "axios";

const url = "https://ongapi.alkemy.org/api/activities";

const findById = async id => {
	return await axios.get(`${url}/${id}`);
};

const findAll = async () => {
	return await axios.get(url);
};

export { findById, findAll};
