const { default: axios } = require("axios");

const getUser = (userId, setUser) => {
	axios
		.get(`https://ongapi.alkemy.org/api/users/${userId}`)
		.then(res => {
			setUser(res.data.data);
		})
		.catch(err => console.log(err));
};

export {getUser}