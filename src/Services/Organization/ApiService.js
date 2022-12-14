import axios from "axios";
import { update, error as errorAlert } from "utils/alerts/alerts";
import { Get } from "Services/publicApiService";

const urlOrganization = "/organization";

export const getOrganization = async () => {
	const { data, error } = await Get(urlOrganization, 4);
	if (error) {
		errorAlert("Error al obtener datos de la organizacion");
	} else {
		return data;
	}
};

export const putOrganization = (values, id) => {
	axios
		.put(`https://ongapi.alkemy.org/api/organization/${id}`, values)
		.then(res => {
			update();
			console.log(res);
		})
		.catch(err => console.log(err));
};
