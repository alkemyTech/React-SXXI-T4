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
			console.log(res);
			success();
		})
		.catch(err => console.log(err));
};

export const putCategory = (id, values) => {
	axios
		.put(`https://ongapi.alkemy.org/api/categories/${id}`, values)
		.then(res => {
			console.log(res);
			update();
		})
		.catch(err => console.log(err));
};

export const getCategories = (
	setCategory,
	amountToShow,
	page,
	filterTypeOfCategory,
	inputFilter
) => {
	axios
		.get(
			"https://ongapi.alkemy.org/api/" +
				`categories?limit=${amountToShow}&skip=${amountToShow * page}${
					filterTypeOfCategory && "&role=" + filterTypeOfCategory
				}${inputFilter && "&search=" + inputFilter}`
		)
		.then(res => {
			console.log(res.data.data);
			setCategory(res.data.data);
		})
		.catch(err => {
			error();
			console.log(err);
		});
};
export const getAmountOfCategories = (
	setAmountOfCategory,
	filterTypeOfCategory,
	inputFilter
) => {
	axios
		.get(
			"https://ongapi.alkemy.org/api/" +
				`categories${filterTypeOfCategory && "?role=" + filterTypeOfCategory}${
					filterTypeOfCategory ? "&" : "?"
				}${inputFilter && "search=" + inputFilter}`
		)
		.then(res => {
			setAmountOfCategory(res.data.data.length);
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
