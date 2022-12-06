import { Get } from "Services/publicApiService";

const relativeUrl = '/news';

const findAllByPageAndSearch = (page, search) => {
    const skip = page?.skip ? `?skip=${page.skip}` : '?skip=0';
    const limit = page?.limit ? `&limit=${page.limit}` : '&limit=5';
    const forSearch = search?.length > 0 ? `&search=${search}` : '';
    return Get(relativeUrl + skip + limit + forSearch);
}

const findAllAndSearch = async (search) => {
    const forSearch = search? `?search=${search}` : '';
    return await Get(relativeUrl + forSearch);
}

const findById = async (id) => {
    return await Get(`${relativeUrl}/${id}`);
}

const create = async (news) => {
    return await Get(relativeUrl, news);
}

const update = async (id, news) => {
    return await Get(`${relativeUrl}/${id}`, news);
}

const deleteById = async (id) => {
    return await Get(`${relativeUrl}/${id}`);
}

export { findAllByPageAndSearch, findAllAndSearch, findById, create, update, deleteById }
