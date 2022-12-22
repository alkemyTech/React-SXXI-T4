import { Delete, Get, Post, Put } from "Services/privateApiService";
import { error as errorAlert, update, erase, success } from "utils/alerts/alerts";

const activityEndpoint = "/categories";

const createCategory = async body => {
	const { error } = await Post(`${activityEndpoint}`, body);
	if (error) {
		errorAlert("Error al crear categorías");
	} else {
		success();
	}
};

const getCategory = async id => {
	const { data, error } = await Get(`${activityEndpoint}/${id}`);
	if (error) {
		errorAlert("Error al obtener la categorías");
	} else {
		return data;
	}
};

const getAllCategories = async () =>{
	const { data, error } = await Get(`${activityEndpoint}`);
	if (error) {
		errorAlert("Error al obtener la categorías");
	} else {
		return data;
	}
}

const getCategories = async (search = null, amountToShow = null, page = null) => {
	const { data, error } = await Get(
		`${activityEndpoint}?search=${search}&limit=${amountToShow}&skip=${amountToShow * page}`
	);
	if (error) {
		errorAlert("Error al obtener el listado de categorías");
	} else {
		return data;
	}
};

const updateCategory = async (id, body) => {
	const { error } = await Put(`${activityEndpoint}/${id}`, body);
	if (error) {
		errorAlert("Error al modificar la categoría");
	} else {
		update();
	}
};

const getAmountOfCategories = async (search = "") => {
	const { data, error } = await Get(`${activityEndpoint}?search=${search}`);
	if (error) {
		errorAlert("Error al obtener la cantidad de categorías");
	} else {
		return data.length;
	}
};

const deleteCategory = id => {
	const { error } = Delete(`${activityEndpoint}`, id);
	if (error) {
		errorAlert("Error al eliminar la categoría");
	} else erase();
};

export { createCategory, getAmountOfCategories, getCategory, getCategories, updateCategory, deleteCategory, getAllCategories };
