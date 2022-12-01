import axios from "axios";

const url = 'https://ongapi.alkemy.org/api/comments';

const getComment = async (id) => {
    return await axios.get(`${url}?new_id=${id}`);
}

const postComment = async (id, values) =>{
    return await axios.post(id, values)
}

export { getComment , postComment}
