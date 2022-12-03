import axios from "axios";

const url = 'https://ongapi.alkemy.org/api/organization';

const findAll = async () => {
    return await axios.get(url);
}

export { findAll }