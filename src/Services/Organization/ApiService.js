import axios from "axios";

export const getOrganization = (setWelcomeText) => {
	axios
		.get(`https://ongapi.alkemy.org/api/organization/4`)
		.then(res => {
			setWelcomeText(res.data.data);
		})
		.catch(error => console.log(error));
};

export const putOrganizationWelcomeText = (value) => {

	axios
		.put(`https://ongapi.alkemy.org/api/organization/4`,  {
            id: value.id,
			welcome_text: value.welcome_text,
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));
};
