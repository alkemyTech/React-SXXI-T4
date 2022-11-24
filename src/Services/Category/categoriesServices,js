import { getData, getDataID, putData, postData, deleteData } from "Services/privateApiService";

const section = "categories";
const url = "https://ongapi.alkemy.org/api/categories/";

export const getCategory = (id, setData) => {
	getDataID(id, url, setData, section);
};

export const getCategories = setData => {
	getData(url, setData, section);
};

export const postCategory = values => {
	postData(url, values, section);
};

export const putCategory = (id, values) => {
	putData(id, url, values, section);
};

export const deleteCategory = (id, values) => {
	deleteData(id, url, values, section);
};
