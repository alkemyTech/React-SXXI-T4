import axios from "axios";

export const getOrganization = setData => {
	axios
		.get(`https://ongapi.alkemy.org/api/organization`)
		.then(res => {
			setData(res.data.data);
		})
		.catch(error => console.log(error));
};

export const putOrganization = (values, id) => {
	axios
		.put(`https://ongapi.alkemy.org/api/organization/${id}`, values)
		.then(res => console.log(res))
		.catch(err => console.log(err));
};
