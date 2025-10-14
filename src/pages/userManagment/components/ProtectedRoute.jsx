
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../context/Authcontext'

const ProtectedRouteUserManagment = () => {
    
    const {  useGetProfile} = useAuth()

    const { data: user } = useGetProfile()
    console.log(user.data.user.role)
    const userRole = user.data.user.role


    // Check if user is logged in first
    if (!user) {
        return <Navigate to="/login" />
    }

    // Check if user has Admin role
    if (userRole === 'Admin') {
        return <Outlet />
    } else {
        return <Navigate to="/dashboard" />
    }
}


export default ProtectedRouteUserManagment

