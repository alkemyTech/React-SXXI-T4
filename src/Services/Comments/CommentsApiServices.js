import axios from "axios";

const url = 'https://ongapi.alkemy.org/api/comments';

const getComment = async (id) => {
    return await axios.get(`${url}?new_id=${id}`);
}

export { getComment }
