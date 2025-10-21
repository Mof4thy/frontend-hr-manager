import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Briefcase } from 'lucide-react';
import { User } from 'lucide-react';
import { useAuth } from '../../../context/Authcontext';



const Navbar = () => {
    
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const {  useGetProfile} = useAuth()
    const { data: user } = useGetProfile()
    console.log(user.data.user.role)
    const userRole = user.data.user.role


    

    const handlenavigatetoprofile = (tab)=>{
        if(tab==="profile"){
            navigate("/profile")
        }else if(tab==="dashboard"){
            navigate("/dashboard")
        }else if(tab==="user-managment"){
            navigate("/user-managment")
        }else if(tab==="job-titles"){
            navigate("/admin/job-titles")
        }
    }

    // const isDashboard = pathname === "/dashboard"
    const isDashboard = pathname.startsWith("/dashboard")
    const isProfile = pathname.startsWith("/profile")
    const isUserManagment = pathname.startsWith("/user-managment")
    const isJobTitles = pathname.startsWith("/admin/job-titles")
    

    return (
        <div className=" fixed top-0 left-0 right-0 z-50 w-full bg-white py-5 px-4 border-b-1 border-gray-300">
            <div className=" max-w-7xl mx-auto flex  items-center">
                
                <div className="w-full flex items-center justify-between">
                    
                    <div className="flex flex-col ">
                        <h2 className=" text-sm sm:text-lg md:text-xl font-semibold">HR Dashboard</h2>
                        <h2 className="text-xs md:text-base text-gray-500 ">Manage job applications</h2>
                    </div>
                    <div className='py-2 px-2 bg-gray-200 rounded-lg flex justify-center items-center gap-2'>
                        
                        
                        <button className={`text-sm md:text-base cursor-pointer py-1 px-2 rounded-lg transition-all duration-200 ${isDashboard ? 'bg-black text-white' : 'text-black hover:bg-gray-300 '}`} onClick={()=>handlenavigatetoprofile("dashboard")}>
                            <span className='md:block hidden'>Dashboard</span>
                            <LayoutDashboard size={16} className='md:hidden block' />
                        </button>

                        <button className={`text-sm md:text-base cursor-pointer py-1 px-2 rounded-lg transition-all duration-200 ${isProfile ? 'bg-black text-white' : 'text-black hover:bg-gray-300 '}`} onClick={()=>handlenavigatetoprofile("profile")}>
                            <span className='md:block hidden'>profile</span>
                            <User size={16} className='md:hidden block' />
                        </button>

                        {/* Only show User Management tab for Admin users */}
                        {userRole === 'Admin' && (
                            <button className={`text-sm md:text-base cursor-pointer py-1 px-2 rounded-lg transition-all duration-200 ${isUserManagment ? 'bg-black text-white' : 'text-black hover:bg-gray-300 '}`} onClick={()=>handlenavigatetoprofile("user-managment")}>
                                <span className='md:block hidden'>User Managment</span>
                                <Users size={16} className='md:hidden block' />
                            </button>
                        )}

                        {/* Show Job Titles tab for all authenticated users */}
                        <button className={`text-sm md:text-base cursor-pointer py-1 px-2 rounded-lg transition-all duration-200 ${isJobTitles ? 'bg-black text-white' : 'text-black hover:bg-gray-300 '}`} onClick={()=>handlenavigatetoprofile("job-titles")}>
                            <span className='md:block hidden'>Manage Jobs</span>
                            <Briefcase size={16} className='md:hidden block' />
                        </button>

                    </div>
                    
                    <h2 className="text-md text-gray-500  hidden md:block" >Welcome back, HR Manager</h2>  

                </div>
                
            </div>
            
        </div>
    )
}   

export default Navbar