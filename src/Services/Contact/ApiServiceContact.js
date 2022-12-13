import { Get, Post, Put, Delete } from "Services/privateApiService";
import { success, error as errorAlert, update, erase } from "utils/alerts/alerts";

const contactsEndpoint = "/contacts";

const createContact = async body => {
	const { error } = await Post(`${contactsEndpoint}`, body);
	if (error) {
		errorAlert();
	} else {
		success();
	}
};

const getContact = async id => {
	const { data, error } = await Get(`${contactsEndpoint}/${id || ""}`);
	if (error) {
		errorAlert();
	} else {
		return data;
	}
};

const updateContact = async (id, body) => {
	const { error } = await Put(`${contactsEndpoint}/${id}`, body);
	if (error) {
		errorAlert();
	} else {
		update();
	}
};

const deleteContact = async id => {
	const { error } = await Delete(`${contactsEndpoint}/${id}`);
	if (error) {
		errorAlert();
	} else {
		erase();
	}
};

export { createContact, getContact, updateContact, deleteContact };
