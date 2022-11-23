import axios from "axios";
import { success } from "utils/alerts/alerts";

export const postData = (route, values, token) => {
	const config = {
		headers: {
			Authorization: `${token}`,
		},
	};

	axios
		.post(`https://ongapi.alkemy.org/api/${route}`, { data: { values } }, config)
		.then(res => {
			success();
		})
		.catch(err => console.log(err));
};
