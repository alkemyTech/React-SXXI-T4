import { Get, Post } from "Services/privateApiService";
import { error, success } from "utils/alerts/alerts";

const registerEndPoint = "/register";
const loginEndPoint = "/login";

export const registerUser = async values => {
	const res = await Post(registerEndPoint, values);
	if (res.error) return error();

	if (res.data.status.code === "200") {
		return success();
	}
};

export const loginUser = async values => {
	const res = await Get(loginEndPoint, values);
	if (res.error) return error();

	if (res.data.status.code === "200") {
		console.log(res);
		return success();
	}
};
