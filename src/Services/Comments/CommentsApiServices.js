import axios from "axios";

const getComment = (id, setData) => {
axios
	.get(`https://ongapi.alkemy.org/api/comments?new_id=${id}`)
	.then(res => {
		setData(res.data.data);

		console.log(res.data.data);
	})
	.catch(err => console.log(err));
	
};

const postComment = async (id, values) => {
	return await axios.post(id, values);
};

export { getComment, postComment };
