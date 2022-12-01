import axios from "axios";

export const getSlides = setData => {
	axios
		.get(`https://ongapi.alkemy.org/api/slides`)
		.then(res => {
			setData(res.data.data.slice(-3));
		})
		.catch(error => console.log(error));
};

export const putSlides = value => {
	console.log(value.id);
	axios
		.put(`https://ongapi.alkemy.org/api/slides/${value.id}`, value)
		.then(res => console.log(res))
		.catch(err => console.log(err));
};
