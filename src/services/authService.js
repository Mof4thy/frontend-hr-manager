import api from './Api'
import { queryClient } from '../main.jsx'


const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password })
    return response.data
    
}

const logout = async () => {
    queryClient.removeQueries({ queryKey: ["user"] })
    const response = await api.post('/auth/logout')
    return response.data
}

const getProfile = async () => {
    const response = await api.get('/auth/profile')
    return response.data
}

const changePassword = async (currentPassword, newPassword, confirmPassword)=>{
    const response = await api.put('/auth/change-password', { currentPassword, newPassword, confirmPassword })
    return response.data

}

export { login, logout, getProfile, changePassword }