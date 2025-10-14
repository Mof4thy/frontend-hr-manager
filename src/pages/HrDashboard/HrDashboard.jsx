import Button from '../../components/button'
import Navbar from './components/Navbar'
import StatusCard from './components/statusCard'
import ApplicationsDashboard from './components/applicationsDashboard'
import useApplications from '../../hooks/useApplications'
import useApplicationStats from '../../hooks/useApplicationStats'
import { FileText, Clock, CheckCircle, XCircle, Users } from 'lucide-react'


// import { getAllApplications } from '../../services/applicationService'

const HrDashboard = () => {

    const { data: applications, isLoading, error } = useApplications()
    const { data: stats } = useApplicationStats()

    const statsData = stats?.data || {}
    const byStatus = statsData.byStatus || {}

    return (            
        <>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
                <StatusCard 
                    title="Total Applications"
                    count={statsData.totalApplications}
                    description="All submitted applications"
                    color="blue"
                    icon={Users}
                />
                <StatusCard 
                    title="Pending"
                    count={byStatus.pending}
                    description="Awaiting review"
                    color="yellow"
                    icon={Clock}
                />
                <StatusCard 
                    title="Reviewed"
                    count={byStatus.reviewed}
                    description="Under review"
                    color="purple"
                    icon={FileText}
                />
                <StatusCard 
                    title="Accepted"
                    count={byStatus.accepted}
                    description="Approved applications"
                    color="green"
                    icon={CheckCircle}
                />
                <StatusCard 
                    title="Rejected"
                    count={byStatus.rejected}
                    description="Declined applications"
                    color="red"
                    icon={XCircle}
                />
            </div>

            <ApplicationsDashboard applications={applications?.data?.applications || []} isLoading={isLoading} error={error} />
        </>
    )
}

export default HrDashboard 