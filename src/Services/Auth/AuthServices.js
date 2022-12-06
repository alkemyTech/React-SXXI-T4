import { Get, Post } from "Services/privateApiService";

const registerEndPoint = "/register";
const loginEndPoint = "/login";
const authEndPoint = "/auth/me";

export const signUpUser = async values => {
	const { data } = await Post(registerEndPoint, values);
	return data;
};

export const authMe = () => {
	return Get(authEndPoint);
};

export const signInUser = async values => {
	const { data } = await Post(loginEndPoint, values);

	return data;
};

export const logout = () => {
	localStorage.removeItem("user");
};
