import { Get, Post, Put } from "Services/privateApiService";
import { success, error } from "utils/alerts/alerts";

const testimonialsEndPoint = "/testimonials";

export const getTestimonial = async (id, setData) => {
	const res = await Get(testimonialsEndPoint, id);
	if (res.error) {
		error();
	} else {
		setData(res.data);
	}
};

export const postTestimonial = async values => {
	const res = await Post(testimonialsEndPoint, values);
	if (res.error) {
		error();
	} else {
		success();
	}
};


export const putTestimonial = async (id, values) => {
	const res = await Put(`${testimonialsEndPoint}/${id}`, values);
	if (res.error) {
		error();
	} else {
		success();
	}
};
