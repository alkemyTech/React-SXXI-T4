import axios from "axios";
import { update } from "utils/alerts/alerts";
export const getOrganization = setData => {
	axios
		.get(`https://ongapi.alkemy.org/api/organization`)
		.then(res => {
			setData(res.data.data);
		})
		.catch(error => console.log(error));
};
export const putOrganizationWelcomeText = (welcomeText, name) => {

	axios
		.put(`https://ongapi.alkemy.org/api/organization/4`,  {
            name: name,
			welcome_text: welcomeText
		})

	}


	export const putOrganization = (values, id) => {
	axios
		.put(`https://ongapi.alkemy.org/api/organization/${id}`, values)
		.then(res => {
			update();
			console.log(res);
		})
		.catch(err => console.log(err));
}
