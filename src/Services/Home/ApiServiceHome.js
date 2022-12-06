import { Get, Post, Put } from "Services/privateApiService";
import { error as errorAlert, update, success } from "utils/alerts/alerts";

const homeEndpoint = "/organization";

const getHome = async id => {
	const { data, error } = await Get(`${homeEndpoint}/${id || ""}`);
	if (error) {
		errorAlert("Error al obtener los datos de Home");
	} else {
		return data;
	}
};

const postHome = async body => {
	const { error } = await Post(`${homeEndpoint}`, body);
	if (error) {
		errorAlert("Error al crear Home");
	} else {
		success();
	}
};

const putHome = async (id, body) => {
	const { error } = await Put(`${homeEndpoint}/${id}`, body);
	if (error) {
		errorAlert("Error al modificar los datos de Home");
	} else {
		update();
	}
};

export { postHome, getHome, putHome };
