import { Get, Post, Put, Delete } from "Services/privateApiService";

const categoriesEndPoint = "/categories";

export const getCategory = id => {
	Get(categoriesEndPoint, id);
};

export const postCategory = values => {
	Post(categoriesEndPoint, values);
};

export const putCategory = (id, values) => {
	Put(`${categoriesEndPoint}/${id}`, values);
};

export const deleteCategory = id => {
	Delete(categoriesEndPoint, id);
};
