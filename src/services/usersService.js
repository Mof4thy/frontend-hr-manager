import api from './Api'



const createUser = async (user) => {
    const response = await api.post('/auth/hr-users', user)
    return response.data
}

const getPermissions = async () => {
    const response = await api.get('/auth/roles')
    return response.data
}


const getAllUsers = async () => {
    const response = await api.get('/auth/hr-users')
    return response.data
}

const updateUser = async (id, user) => {
    const response = await api.put(`/auth/hr-users/${id}`, user)
    return response.data
}

const deleteUser = async (id) => {
    const response = await api.delete(`/auth/hr-users/${id}`)
    return response.data
}

export { getAllUsers, createUser, updateUser, deleteUser, getPermissions }

