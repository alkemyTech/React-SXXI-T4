import axios from 'axios';

const base_url = 'https://ongapi.alkemy.org/api';

const config = {
    headers: {
        Group: 1,             //Aqui va el ID del equipo!!
        accept: 'application/json'
    }
}

const Get = () => {
    axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

/** retorna la respuesta (error o exito) en una promesa  */
const create = async (body, relative_path) => {
    return await axios.post(`${url}/${relative_path}`, body, config);
}

export { Get, create }