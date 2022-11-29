import axios from "axios";
import { success, update, error, erase } from "utils/alerts/alerts";

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

export const getCategories = setCategory => {
	axios
		.get("https://ongapi.alkemy.org/api/categories")
		.then(res => {
			setCategory(res.data.data.slice(-5));
		})
		.catch(err => {
			error();
			console.log(err);
		});
};

export const deleteCategory = id => {
	axios
		.delete("https://ongapi.alkemy.org/api/categories/" + id)
		.then(res => {
			erase();
		})
		.catch(err => {
			error();
			console.log(err);
		});
};
