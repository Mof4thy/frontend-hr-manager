import { Outlet } from "react-router-dom"
import Navbar from "../pages/HrDashboard/components/Navbar"


const Layout = ()=>{
    
    return(
        <>
        <div className='w-full min-h-screen  bg-gray-200 pt-25'>
            <Navbar/>
            <div className='max-w-7xl mx-auto py-10 space-y-5 flex flex-col items-center lg:max-w-7xl pt-2 sm:pt-4 lg:pt-6 gap-2 sm:gap-4 md:gap-6 pb-4 sm:pb-8 px-2 sm:px-4 lg:px-6'>
                <Outlet/>
            </div>
        </div>
        </>
    )

}

export default Layout