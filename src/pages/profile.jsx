import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import { useEffect, useRef, useState } from 'react'
import Input from '../components/Input'
import { Lock, X } from 'lucide-react'

const Profile = ()=>{
    
    const changepassmodalref = useRef()

    const { handleLogout, useGetProfile, handleChangePassword } = useAuth()
    const navigate = useNavigate()

    const handleLogoutClick = async () => {
        try {
            await handleLogout()
            navigate('/login')
        } catch (error) {
            console.log(error)
        }   
    }


    const { data: user , isLoading , isError } = useGetProfile()
    const [userData, setUserData] = useState(null)

    useEffect(()=>{
        
        const userData = user?.data?.user
        setUserData(userData)
        
    },[user])



    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)


    const ChangePassword = async () => {
        if(currentPassword === '' || newPassword === '' || confirmPassword === ''){
            setError('All fields are required')
            return
        }

        if(newPassword !== confirmPassword){
            setError('Passwords do not match')
            return
        }

        setLoading(true)        
        try {
            const response = await handleChangePassword(currentPassword, newPassword, confirmPassword)
            console.log(response)
            if(response){
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
                setSuccess(true)
            }
            setError(response.message)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(error.message)
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setSuccess(false)
        }
    }   

    return(
        <>
            {isLoading && <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>}
            {isError && <div className="w-full h-full flex items-center justify-center">
                <div className="text-red-500">Error loading profile</div>
            </div>}
            
            {userData && (
            <div className="w-full flex flex-col items-center justify-center gap-8">
                
                <div className=" flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <h2 className="text-4xl text-slate-950 font-bold">HR Profile</h2>
                        <h4 className="text-lg text-gray-500">Manage your account information and settings</h4>
                    </div>

                </div>

                <div className=' w-full flex flex-col md:flex-row gap-6 '>

                    <div className='flex-1 border-1 border-gray-400 shadow-lg p-6 rounded-2xl bg-white flex flex-col justify-center gap-4'>

                        <h2 className='text-lg'>Personal Information</h2>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-6 ">
                            {/* Left column */}
                            <div className="flex flex-col gap-4 md:gap-8  flex-1">
                                <div className="flex flex-col">
                                    <h4 className="text-lg font-bold">Full Name:</h4>
                                    <h4 className="text-md font-semibold">{userData.fullName}</h4>
                                </div>

                                <div className="flex flex-col">
                                    <h4 className="text-lg font-bold">Email Address:</h4>
                                    <h4 className="text-md font-semibold">{userData.email}</h4>
                                </div>

                                
                                <div className="flex flex-col">
                                    <h4 className="text-lg font-bold">User Name :</h4>
                                    <h4 className="text-md font-semibold">{userData.username}</h4>
                                </div>

                            </div>

                            <div className="flex flex-col gap-4 md:gap-8 flex-1">
                                <div className="flex flex-col w-fit">
                                    <h4 className="text-lg font-bold">Role</h4>
                                    <h4 className="text-sm py-1 px-3 bg-slate-900 text-white rounded-lg">
                                        {userData.role}
                                    </h4>
                                </div>

                                <div className="flex flex-col">
                                        <h4 className="text-lg font-bold">Is Active</h4>
                                        <h4 className="text-md">{userData.isActive ? 'Active' : 'Inactive'}</h4>
                                </div>
                                <Button className="w-fit flex justify-center items-center" onClick={()=>{changepassmodalref.current.showModal()}}>
                                    <Lock size={16} className='mr-2' />
                                    change password
                                </Button>
                            </div>

                            <div className="flex flex-col gap-4 md:gap-8 flex-1 justify-between">
                               
                                <button className='w-fit py-2 px-4 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600' onClick={handleLogoutClick}>Logout</button>
                                
                                
                                
                            </div>

                            
                        </div>
                        


                        <dialog ref={changepassmodalref}
                            className='bg-white p-6 rounded-lg shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            {/* change password */}
                            <div className='flex flex-col gap-4'>
                                
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-lg font-bold'>Change Password</h3>
                                        <X onClick={()=> {changepassmodalref.current.close() ; setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); setError('');}} size={25} className='text-red-500 hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-full p-1' />
                                </div>
                                

                                <div className='flex flex-col gap-4 '>
                                    <Input type='password' placeholder='Current Password' value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} />
                                    <Input type='password' placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                                    <Input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                                    {error && <div className="text-red-500">{error}</div>}
                                    {success && <div className="text-green-500">Password changed successfully</div>}

                                </div>

                                <Button className='w-full bg-green-700 text-white hover:bg-green-800' onClick={ChangePassword}>
                                   {loading && 
                                        <div className="flex items-center justify-center ">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                        </div>
                                    }
                                    {!loading && 'Confirm'}
                                </Button>

                            </div>
                            
    
                        </dialog>


                    </div>
                </div>


            </div>
            )}
            
        </>
    )


}


export default Profile  