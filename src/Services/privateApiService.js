import axios from 'axios';

export const verifyTokenLocalStorage = () => {
    const token = localStorage.getItem("token");
    return token && { headers: { Authorization: Bearer ${token} } };
};

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


const PutData = (section) => {
    axios
    .put(`https://ongapi.alkemy.org/api/${section}`, { data: { values } }, config)
    .then(res => {
        success();
    })
    .catch(err => console.log(err));
};


export default Get