import { Get, Post, Put, Delete } from "Services/privateApiService";
import { success, error } from "utils/alerts/alerts";

const newsEndPoint = "/news";

const findAllByPageAndSearch = async (page, search) => {
	const skip = page?.skip ? `?skip=${page.skip}` : "?skip=0";
	const limit = page?.limit ? `&limit=${page.limit}` : "&limit=5";
	const forSearch = search?.length > 0 ? `&search=${search}` : "";
	const response = await Get(newsEndPoint + skip + limit + forSearch);
	if (response.error) return error();
};

const findAllAndSearch = async search => {
	const forSearch = search ? `?search=${search}` : "";
	const response = await Get(newsEndPoint + forSearch);
	if (response.error) return error();
	else return response.data;
};

const findById = async id => {
	const response = await Get(newsEndPoint, id);
	if (response.error) {
		error();
	} else {
		return response.data;
	}
};

const create = async news => {
	const response = await Post(newsEndPoint, news);
	if (response.error) return error();

	success();
};

const update = async (id, news) => {
	const response = await Put(`${newsEndPoint}/${id}`, news);
	if (response.error) return error();

	success();
};

const deleteById = async id => {
	const response = await Delete(`${newsEndPoint}/${id}`);
	if (response.error) return error();

	success();
};

export { findAllByPageAndSearch, findAllAndSearch, findById, create, update, deleteById };
