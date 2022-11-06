import axios from "axios";

const url = "https://ongapi.alkemy.org/api/activities";

const findById = async (id) => {
	return await axios.get(`${url}/${id}`);
};

const findAll = async () => {
	return await axios.get(url);
};

const create = async (activity) => {
	return await axios.post(url, activity);
}

const update = async (activity) => {
	return await axios.put(url, activity);
}

const deleteById = async (id) => {
	return await axios.delete(`${url}/${id}`);
}

export { findById, findAll, create, update, deleteById };
