import { UserPlus } from 'lucide-react';
import Button from '../../components/button';
import { useState } from 'react';
import AddUserModal from '../userManagment/components/AddUserModal'
import { getAllUsers, deleteUser, getPermissions } from '../../services/usersService'
import { useQuery } from '@tanstack/react-query'
import UserCard from '../userManagment/components/userCard'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../context/Authcontext'

const UserManagment = () => {

    const queryClient = useQueryClient();
    const { user: currentUser } = useAuth();


    const { data: users, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
        staleTime: 1000 * 60 * 3, // 3 minutes - users data is fresh for 3 minutes
        gcTime: 1000 * 60 * 10,   // 10 minutes - keep in cache for 10 minutes
    })

    const { data: permissions } = useQuery({
        queryKey: ['permissions'],
        queryFn: getPermissions,
        staleTime: 1000 * 60 * 30, // 30 minutes - permissions rarely change
        gcTime: 1000 * 60 * 60,    // 1 hour - keep permissions in cache longer
    })

    // console.log(permissions.data)


    const [addUserModal, setAddUserModal] = useState(false)
    const [confirmDeletemodal, setConfirmDeletemodal] = useState(false)
    const [userIdToDelete, setUserIdToDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState('')
    // const [editmodal, setEditmodal] = useState(false)



    // add user
    const handleAddUser = () => {
        if(!addUserModal){
            setAddUserModal(true)
        }
    }

    // close add user modal
    const handleCloseAddUser = () => {
        setAddUserModal(false)
    }



    // delete user
    const handleDelete = (userId) => {
        if(!confirmDeletemodal){
            setConfirmDeletemodal(true)
            setUserIdToDelete(userId)
        }
    }

    // confirm delete user
    const handleConfirmDelete = async () => {
        setIsDeleting(true)
        setDeleteError('') // Clear any previous errors
        
        try {
            const res = await deleteUser(userIdToDelete)
            
            // Check if the response indicates success
            if (res.success === false) {
                setDeleteError(res.message || 'Failed to delete user')
                return // Don't close modal, show error instead
            }
            
            // Success case
            setConfirmDeletemodal(false)
            setUserIdToDelete(null)
            console.log('user deleted successfully')
            queryClient.invalidateQueries(['users'])

        } catch (error) {
            console.error('Error deleting user:', error)
            
            // Handle different types of errors
            if (error.response?.data?.message) {
                setDeleteError(error.response.data.message)
            } else if (error.message) {
                setDeleteError(error.message)
            } else {
                setDeleteError('An unexpected error occurred while deleting the user')
            }
        } finally {
            setIsDeleting(false)
        }
    }

    // cancel delete user
    const handleCancelDelete = () => {
        setConfirmDeletemodal(false)
        setUserIdToDelete(null)
        setDeleteError('') // Clear any error when canceling
        console.log('user not deleted')
    }



    return (
        <div className="w-full flex flex-col items-center justify-center gap-8  ">
            <div className='w-full flex flex-col sm:flex-row   sm:items-center sm:justify-between gap-4'>
                
                <div className='flex flex-col gap-1'>
                    <h1 className='text-xl sm:text-3xl font-bold'>User Managment</h1>
                    <p className='text-gray-500'>Manage HR team members and their permissions</p>
                </div>

                <Button
                    className= " flex items-center justify-center gap-2"
                    onClick={handleAddUser}
                >
                    <UserPlus size={16} />
                    Add User
                </Button>
            </div>
            

             <div className='w-full flex flex-col  gap-4 border-1 border-gray-400 shadow-lg p-6 rounded-xl bg-white'>
                
                <h1 className=' '>HR Team Members ({users?.data?.users.length})</h1>

                {isLoading && <div className='w-full h-full flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
                </div>}
                {isError && <div className='w-full h-full flex items-center justify-center'>
                    <div className='text-red-500'>Error loading users</div>
                </div>}

                
                 {users?.data?.users.map((user) => (
                     <UserCard 
                         key={user.userId} 
                         user={user} 
                         currentUser={currentUser} 
                         handleDelete={handleDelete} 
                     />
                 ))}
                
                

            </div>

            {confirmDeletemodal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4'>
                    <div className='flex flex-col gap-2 bg-white p-4 rounded-lg border border-gray-300 max-w-md w-full'>
                        <h2 className='text-2xl font-bold'>Confirm Delete</h2>
                        <p className='text-gray-500'>Are you sure you want to delete this user?</p>
                        
                        {/* Error message display */}
                        {deleteError && (
                            <div className='bg-red-50 border border-red-200 rounded-lg p-3 mt-2'>
                                <div className='flex items-center gap-2'>
                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <p className='text-red-700 text-sm font-medium'>{deleteError}</p>
                                </div>
                            </div>
                        )}
                        
                        <div className='flex justify-center gap-2 mt-4'>
                            <button 
                                className='bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50' 
                                onClick={handleCancelDelete}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button 
                                className='bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50' 
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

                <AddUserModal 
                    isOpen={addUserModal}
                    onClose={handleCloseAddUser}
                    permissions={permissions}
                />

        </div>
    )


}
export default UserManagment;