import { MoreHorizontal, Edit, Trash } from 'lucide-react'
import { useState } from 'react'



const UserCard = ({ user, handleDelete }) => {
    const [viewmore, setViewmore] = useState(false)

    return(

        <>
        <div className='w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm'>
                
                <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                        <h3 className='text-xl font-bold text-gray-900 mb-1'>{user.fullName}</h3>
                        <p className='text-gray-600 mb-3'>{user.email}</p>
                        
                        <div className='flex flex-wrap items-center gap-2 mb-3'>
                            <span className='px-3 py-1 bg-black text-white text-sm rounded-full'>{user.isActive ? 'Active' : 'Inactive'}</span>
                            <span className='px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full'>{user.role}</span>
                        </div>
                        
                    </div>
                    
                    <div className=' relative flex items-center gap-2 ml-4'>
                        <button onClick={()=> setViewmore(!viewmore)} className='p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
                            <MoreHorizontal size={16} />
                        </button>

                        {viewmore && (
                            <div className='absolute flex flex-col p-0.5 top-10 right-0 border border-gray-300 bg-white rounded-lg w-fit whitespace-nowrap'>
                                <button className=' text-black rounded-lg p-2 hover:bg-gray-100 transition-colors flex items-center cursor-pointer gap-2'>
                                    <Edit size={16} />
                                    edit User
                                </button>
                                <button onClick={()=> handleDelete(user.userId)} className='text-red-500 rounded-lg p-2 hover:bg-gray-100 transition-colors flex items-center cursor-pointer gap-2'>
                                    <Trash size={16} />
                                    Delete User
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        
        
        </>

    )


}


export default UserCard