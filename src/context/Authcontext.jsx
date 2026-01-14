import { createContext, useContext, useState, useEffect } from "react"
import { login, logout, getProfile , changePassword} from "../services/authService"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../main"


const AuthContext = createContext()

// Session expiration time in milliseconds (244 hours)
const SESSION_EXPIRATION_MS = 244 * 60 * 60 * 1000

const AuthProvider = ({children}) => {

    // Check if session has expired
    const isSessionExpired = () => {
        const loginTime = localStorage.getItem('loginTime')
        if (!loginTime) return true
        
        const elapsed = Date.now() - parseInt(loginTime, 10)
        return elapsed > SESSION_EXPIRATION_MS
    }

    // Clear expired session data
    const clearSession = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('loginTime')
    }

    // Initialize user from localStorage immediately
    const getInitialUser = () => {
        try {
            // Check if session has expired
            if (isSessionExpired()) {
                clearSession()
                return null
            }
            
            const savedUser = localStorage.getItem('user')
            return savedUser ? JSON.parse(savedUser) : null
        } catch (error) {
            console.error('Error parsing saved user data:', error)
            clearSession()
            return null
        }
    }

    const [loggedIn, setLoggedIn] = useState(() => {
        const initialUser = getInitialUser()
        return !!initialUser
    })

    const [user, setUser] = useState(getInitialUser)

    // Check session expiration on mount and periodically
    useEffect(() => {
        const checkSession = () => {
            if (loggedIn && isSessionExpired()) {
                console.log('Session expired, logging out...')
                setLoggedIn(false)
                setUser(null)
                queryClient.removeQueries({ queryKey: ["user"] })
                clearSession()
            }
        }

        // Check immediately on mount
        checkSession()

        // Check every 5 minutes
        const interval = setInterval(checkSession, 5 * 60 * 1000)

        return () => clearInterval(interval)
    }, [loggedIn])

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
            localStorage.setItem('loginTime', Date.now().toString())
            return response.data.user
        } catch (error) {
            setLoggedIn(false)
            setUser(null)
            clearSession()
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
        } catch (error) {
            console.log(error)
        } finally {
            // Always clear local state and storage, even if API call fails
            setLoggedIn(false)
            queryClient.removeQueries({ queryKey: ["user"] })
            setUser(null)
            clearSession()
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