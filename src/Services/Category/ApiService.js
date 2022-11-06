import axios from "axios";

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
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

export const putCategory = (id, values) => {
	axios
		.put(`https://ongapi.alkemy.org/api/categories/${id}`, values)
		.then(res => console.log(res))
		.catch(err => console.log(err));
};
