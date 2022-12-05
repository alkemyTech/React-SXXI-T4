import { Delete, Get, Post, Put } from "Services/privateApiService";
import { error as errorAlert, update, erase, success } from "utils/alerts/alerts";

const activityEndpoint = "/activities";

const createActivity = async body => {
	const { error } = await Post(`${activityEndpoint}`, body);
	if (error) {
		errorAlert("Error al crear Actividad");
	} else {
		success();
	}
};

const getActivity = async id => {
	const { data, error } = await Get(`${activityEndpoint}/${id}`);
	if (error) {
		errorAlert("Error al obtener la actividad");
	} else {
		console.log(data);
		return data;
	}
};

const getActivities = async (search = null, amountToShow = null, page = null) => {
	const { data, error } = await Get(`${activityEndpoint}?search=${search}&limit=${amountToShow}&skip=${amountToShow * page}`);
	if (error) {
		errorAlert("Error al obtener el listado de actividades");
	} else {
		return data;
	}
};

const updateActivity = async (id, body) => {
	const { error } = await Put(`${activityEndpoint}/${id}`, body);
	if (error) {
		errorAlert("Error al modificar la actividad");
	} else {
		update();
	}
};

const getAmountOfActivities = async (search = "") => {
	const { data, error } = await Get(`${activityEndpoint}?search=${search}`);
	if (error) {
		errorAlert("Error al obtener la cantidad de actividades");
	} else {
		return data.length;
	}
};

const deleteActivity = async id => {
	const { error } = await Delete(`${activityEndpoint}`, id);
	if (error) {
		errorAlert("Error al eliminar la actividad");
	} else erase();
};

export { createActivity, getAmountOfActivities, getActivity, getActivities, updateActivity, deleteActivity };
