import axios from "./custom-axios"

//Read
const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}
//Create
const postCreateUer = (name, job) => {
    return axios.post('/api/users', { name, job })
}
//Update
const putUpDataUser = (name, job) => {
    return axios.put('/api/users/', { name, job })
}
//delete
const DeleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

export { fetchAllUser, postCreateUer, putUpDataUser, DeleteUser }  