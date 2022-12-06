import axios from "axios";
const idGroup = 4;

export const getOrganization = setData => {
  axios
    .get(`https://ongapi.alkemy.org/api/organization/${idGroup}`)
    .then(res => {
      setData(res.data.data);
    })
    .catch(error => console.log(error));
};
export const putOrganization = values => {
  axios
    .put(`https://ongapi.alkemy.org/api/organization/${idGroup}`, values)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));
};
