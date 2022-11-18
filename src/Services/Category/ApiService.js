import axios from "axios";
import { success, update } from "utils/alerts/alerts";

export const getCategory = (id, setData) => {
	axios
		.get(`https://ongapi.alkemy.org/api/categories/${id}`)
		.then(res => {
			setData(res.data.data);
		})
		.catch(error => console.log(error));
};

export const postCategory = values => {
	axios
		.post(`https://ongapi.alkemy.org/api/categories`, values)
		.then(res => {
			success();
		})
		.catch(err => console.log(err));
};

export const putCategory = (id, values) => {
	axios
		.put(`https://ongapi.alkemy.org/api/categories/${id}`, values)
		.then(res => {
			update();
		})
		.catch(err => console.log(err));
};
