import axios from "axios";
import { success } from "utils/alerts/alerts";

const verifyTokenLocalStorage = () => {
	const token = localStorage.getItem("token");
	return token && { headers: { Authorization: `Bearer ${token}` } };
};

export const postData = (section, values) => {
	const config = {
		verifyTokenLocalStorage,
	};

	axios
		.post(`https://ongapi.alkemy.org/api/${section}`, { data: { values } }, config)
		.then(res => {
			console.log(res);
			success();
		})
		.catch(err => console.log(err));
};
