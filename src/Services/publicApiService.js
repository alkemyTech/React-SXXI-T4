import axios from "axios";

const config = {
	headers: {
		Group: 4
    }
};

const url = "https://ongapi.alkemy.org/public/api";

const Get = id => {
	axios
		.get(`${url}${id?"/"+ id :""}`, config)
		.then(res => console.log(res.data))
		.catch(err => console.log(err));
};

export default Get;
