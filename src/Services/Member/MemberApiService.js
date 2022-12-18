import { Put, Get, Delete, Post } from "Services/privateApiService";
import { error, success, update as updateAlert, erase } from "utils/alerts/alerts";

const url = "/members";

const findAllByPageAndSearch = async (page, amountOfMembers, search) => {
	const skip = page ? `?skip=${page * amountOfMembers}` : "?skip=0";
	const limit = amountOfMembers ? `&limit=${amountOfMembers}` : "&limit=5";
	const forSearch = search?.length > 0 ? `&search=${search}` : "";
	const res = await Get(url + skip + limit + forSearch);
	if (res.error) return error("No se pudo obtener los miembros del staff");
	else return res.data;
};

const findAllAndSearch = async search => {
	const forSearch = search ? `?search=${search}` : "";
	const res = await Get(url + forSearch);
	if (res.error) return error("No se pudo obtener los miembros del staff");
	else return res.data;
};

const findById = async id => {
	const res = await Get(`${url}/${id}`);
	if (res.error) return error("No se pudo obtener el miembro del staff");
	else return res.data;
};

const amountOfMembers = async search => {
	const forSearch = search ? `?search=${search}` : "";
	const res = await Get(url + forSearch);
	if (res.error) return error("No se pudo obtener los miembros del staff");
	else return res.data.length;
};

const create = async body => {
	const res = await Post(url, body);
	if (res.error) return error("No se pudo crear miembro del staff");
	else return success();
};

const update = async (id, body) => {
	const res = await Put(`${url}/${id}`, body);
	if (res.error) return error("No se pudo actualizar el miembro del staff");
	else return updateAlert();
};

const deleteById = async id => {
	const res = await Delete(url,id);
	if (res.error) return error("No se pudo borrar el miembro del staff");
	else return erase();
};

export { findAllByPageAndSearch, findAllAndSearch, findById, create, update, deleteById,amountOfMembers};
