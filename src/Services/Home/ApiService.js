import axios from "axios";

const url = "https://ongapi.alkemy.org/api/slides";

export const getSlides = async () => {
	return await axios.get(url);
};

export const putSlides = value => {
	console.log(value.id);
	axios
		.put(`https://ongapi.alkemy.org/api/slides/${value.id}`, value)
		.then(res => console.log(res))
		.catch(err => console.log(err));
};
