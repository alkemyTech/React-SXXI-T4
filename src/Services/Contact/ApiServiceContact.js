import { Get, Post, Put, Delete } from "Services/privateApiService";

const contactsEndpoint = "/contacts";

const createContact = async body => {
	return await Post(`${contactsEndpoint}`, body);
};

const getContact = async id => {
	return await Get(`${contactsEndpoint}/${id || ""}`);
};

const updateContact = async (id, body) => {
	return await Put(`${contactsEndpoint}/${id}`, body);
};

const deleteContact = async id => {
	return await Delete(`${contactsEndpoint}/${id}`);
};

export { createContact, getContact, updateContact, deleteContact };
