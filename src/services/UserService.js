import axios from "./custom-axios"

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const postCreateUer = (name, job) => {
    return axios.post('/api/users', { name, job })
}

const putUpDataUser = (name, job) => {
    return axios.put('/api/users/', { name, job })
}

export { fetchAllUser, postCreateUer, putUpDataUser }  