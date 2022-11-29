import axios from "axios";

const url = "https://ongapi.alkemy.org/api/activities";

const findById = async id => {
	return await axios.get(`${url}/${id}`);
};

const findAll = async () => {
	return await axios.get(url);
};

const create = async (body) => {
	return await axios.post(url, body);
}

const update = async (id, body) => {
	return await axios.put(`${url}/${id}`, body);
}

const deleteById = async (id) => {
	return await axios.delete(`${url}/${id}`);
}

export { findById, findAll, create, update, deleteById};
