import { Get, Post, Put, Delete } from "Services/privateApiService";
import { success, update, error as errorAlert, erase } from "utils/alerts/alerts";

const categoriesEndPoint = "/categories";

export const getCategory = async id => {
	const { data, error } = await Get(`${categoriesEndPoint}/${id}`);
	if (error) {
		errorAlert();
	} else {
		return data;
	}
};

export const getCategories = async () => {
	const { data, error } = await Get(`${categoriesEndPoint}`);
	if (error) {
		errorAlert();
	} else {
		return data;
	}
};

export const postCategory = async values => {
	const { error } = await Post(categoriesEndPoint, values);
	if (error) {
		errorAlert();
	} else {
		success();
	}
};

export const putCategory = async (id, values) => {
	const { error } = await Put(`${categoriesEndPoint}/${id}`, values);
	if (error) {
		errorAlert();
	} else {
		update();
	}
};

export const deleteCategory = async id => {
	const { error } = await Delete(`${categoriesEndPoint}/${id}`);
	if (error) {
		errorAlert();
	} else {
		erase();
	}
};
