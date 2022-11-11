import axios from "axios";


/* export const getWelcomeText = (setData) => {
	axios
		.get(`https://ongapi.alkemy.org/api/organization`)
		.then(res => {
			setData(res.data)
		})
		.catch(error => console.log(error));
};

export const putWelcomeText = value => {
	axios
		.put(`https://ongapi.alkemy.org/api/organization/4`, value)
		.then(res => console.log(res))
		.catch(err => console.log(err));
};

 */

export const getSlides = setData => {
	axios
		.get(`https://ongapi.alkemy.org/api/slides`)
		.then(res => {
			setData(res.data.data.slice(-3));
		})
		.catch(error => console.log(error));
};

export const putSlides = value => {
	
	

	axios
		.put(`https://ongapi.alkemy.org/api/slides/${value.id}`, {
			name: value.name,
			image: value.image
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));
};
