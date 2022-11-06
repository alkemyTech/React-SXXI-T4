import axios from "axios";

export const getOrganization = setData => {
	axios
		.get(`https://ongapi.alkemy.org/api/organization`)
		.then(res => {
			setData(res.data.data);
		})
		.catch(error => console.log(error));
};

export const putOrganization = values => {
	axios
		.put(`https://ongapi.alkemy.org/api/organization/1`, values)
		.then(res => console.log(res))
		.catch(err => console.log(err));
};
