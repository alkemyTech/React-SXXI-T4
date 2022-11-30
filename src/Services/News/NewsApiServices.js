import axios from "axios";

const url = 'https://ongapi.alkemy.org/api/news';

const findAllByPageAndSearch = async (page, search) => {
    const skip = page?.skip ? `?skip=${page.skip}` : '?skip=0';
    const limit = page?.limit ? `&limit=${page.limit}` : '&limit=5';
    const forSearch = search?.length > 0 ? `&search=${search}` : ''; 
    return await axios.get(url + skip + limit + forSearch);
}

const findAllAndSearch = async (search) => {
    const forSearch = search? `?search=${search}` : '';
    return await axios.get(url + forSearch);
}

const findById = async (id) => {
    return await axios.get(`${url}/${id}`);
}

const create = async (news) => {
    return await axios.post(url, news);
}

const update = async (id, news) => {
    return await axios.put(`${url}/${id}`, news);
}

const deleteById = async (id) => {
    return await axios.delete(`${url}/${id}`);
}

export { findAllByPageAndSearch, findAllAndSearch, findById, create, update, deleteById }
