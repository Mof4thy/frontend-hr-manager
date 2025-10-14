import { createContext, useContext, useState } from "react"
import { login, logout, getProfile , changePassword} from "../services/authService"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../main"


const AuthContext = createContext()

const AuthProvider = ({children}) => {

    // Initialize user from localStorage immediately
    const getInitialUser = () => {
        try {
            const savedUser = localStorage.getItem('user')
            return savedUser ? JSON.parse(savedUser) : null
        } catch (error) {
            console.error('Error parsing saved user data:', error)
            localStorage.removeItem('user')
            return null
        }
    }

    const [loggedIn, setLoggedIn] = useState(() => {
        const initialUser = getInitialUser()
        return !!initialUser
    })

    const [user, setUser] = useState(getInitialUser)

    const useGetProfile = () => {
        const User = useQuery({
            queryKey: ["user"],
            queryFn: getProfile,
            retry: false,
        })
        return User
    }


    const handleLogin = async (username, password) => {
        try {
            const response = await login(username, password)
            setLoggedIn(true)
            setUser(response.data.user)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            return response.data.user
        } catch (error) {
            setLoggedIn(false)
            setUser(null)
            const message = error?.response?.data?.message || error?.message || 'Login failed'
            throw new Error(message)
        }

    }


    const handleChangePassword = async(currentPassword, newPassword, confirmPassword)=>{

        try {
            const response = await changePassword(currentPassword, newPassword, confirmPassword)
            return response.message
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }


    
    const handleLogout = async () => {
        try {
            await logout()   
            setLoggedIn(false)
            queryClient.removeQueries({ queryKey: ["user"] })
            setUser(null)
            localStorage.removeItem('user')
            
        } catch (error) {
            console.log(error)
        }

    }



    const value = {
        loggedIn,
        user,
        handleLogin,
        handleLogout,
        useGetProfile,
        handleChangePassword

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {  
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}


export default AuthProvider