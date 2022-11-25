import axios from 'axios'

const baseURL = "http://ongapi.alkemy.org/api"

const config = {
    baseURL: baseURL,
    headers: {
        Group: 4                //Aqui va el ID del equipo!!
    }
}


const instance = axios.create(config)

const Put = (url, id, values) =>{

    const resp = {}

    instance.get(`${url}${id ? "/"+id : ""}`, getHeaders(), values)
    .then(res => (resp.data = res.data))
    .catch(err => resp.error = err)

    return resp
}

const getAuthorization = () =>{
    const token = localStorage.getItem("token")
    return `Baerer ${token ? token:""}`
}

const getHeaders = () =>{
    return {
        headers:{ Authorization: getAuthorization() }
    }
}

export default Put