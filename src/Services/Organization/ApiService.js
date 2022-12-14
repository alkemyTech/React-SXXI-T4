import axios from "axios";
import { update,error as errorAlert } from "utils/alerts/alerts";
import { Get } from "Services/publicApiService";

const urlOrganization = "/organization"

export const getOrganization = async (setData) => {
	const response = {};
	await Get(urlOrganization,4)
	.then(({data})=>{
		setData(data)
	})
	.catch(({error})=>{
		response.error=error;
		errorAlert("Error al obtener datos de la organizacion");
	})
	return response;
};
export const putOrganization = values => {
  axios
    .put(`https://ongapi.alkemy.org/api/organization/${idGroup}`, values)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};
