import axios from "axios";
import { success, update } from "../../utils/alerts/alerts";

export const getTestimonials = (id, setData) => {
	axios
		.get(`https://ongapi.alkemy.org/api/testimonials/${id}`)
		.then(res => {
			setData(res.data.data);
		})
		.catch(error => console.log(error));
};

export const postTestimonials = values => {
	axios
		.post(`https://ongapi.alkemy.org/api/testimonials`, values)
		.then(res => {
			console.log(res);
			success();
		})
		.catch(err => console.log(err));
};

export const putTestimonials = (id, values) => {
	axios
		.put(`https://ongapi.alkemy.org/api/testimonials/${id}`, values)
		.then(res => {
			console.log(res);
			update();
		})
		.catch(err => console.log(err));
};