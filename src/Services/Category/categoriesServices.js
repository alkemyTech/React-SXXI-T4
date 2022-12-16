import { Get, Post, Put, Delete } from "Services/privateApiService";

const categoriesEndPoint = "/categories";

export const getCategory = id => {
	Get(categoriesEndPoint, id);
};

export const postCategory = async values => {
	const res = await Post(categoriesEndPoint, values);

	console.log(res);
};

export const putCategory = (id, values) => {
	Put(`${categoriesEndPoint}/${id}`, values);
};

export const deleteCategory = id => {
	Delete(categoriesEndPoint, id);
};
