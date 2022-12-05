import { Get, Post, Put } from "Services/privateApiService";

const homeEndpoint = "/organization";

const getHome = async id => {
	return await Get(`${homeEndpoint}/${id || ""}`);
};

const postHome = async body => {
	return await Post(`${homeEndpoint}`, body);
};

const putHome = async (id, body) => {
	return await Put(`${homeEndpoint}/${id}`, body);
};

export { postHome, getHome, putHome };