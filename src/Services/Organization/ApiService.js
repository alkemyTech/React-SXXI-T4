import axios from "axios";

export const getOrganization = (setWelcomeText) => {
	axios
		.get(`https://ongapi.alkemy.org/api/organization/4`)
		.then(res => {
			setWelcomeText(res.data.data);
		})
		.catch(error => console.log(error));
};

export const putOrganizationWelcomeText = (welcomeText, name) => {

	axios
		.put(`https://ongapi.alkemy.org/api/organization/4`,  {
            name: name,
			welcome_text: welcomeText
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));
};
