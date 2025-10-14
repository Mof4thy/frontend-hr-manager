
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/Authcontext' 

const ProtectedRoute = () => {
    const {  useGetProfile } = useAuth()
    const { data: user, isLoading, isError } = useGetProfile()
    
    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }
    
    // If there's an error or no user data, but we have local auth state, trust local state
    if (isError || !user) {
        
            // No local auth state, redirect to login
            return <Navigate to="/login" replace />
        
    }
    
    // User data loaded successfully
    return <Outlet />
}


export default ProtectedRoute

