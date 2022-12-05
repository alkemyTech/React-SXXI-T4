import { Get, Post } from "Services/privateApiService";
import { error as err, success } from "utils/alerts/alerts";

const registerEndPoint = "/register";
const loginEndPoint = "/login";

export const signUpUser = async values => {
	const { error, data } = await Post(registerEndPoint, values);
	if (error) return err();
	if (data.success) {
		return data;
	}
};

export const signInUser = async values => {
	const { error, data } = await Get(loginEndPoint, values);
	if (error) return err();
	if (data.success) return success();
};
