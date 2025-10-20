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
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
                <StatusCard 
                    title="Total_Applications"
                    count={statsData.totalApplications}
                    description="All submitted applications"
                    color="gray"
                    icon={Users}
                />
                <StatusCard 
                    title="Pending_Applications"
                    count={byStatus.pending}
                    description="Awaiting review"
                    color="yellow"
                    icon={Clock}
                />
                <StatusCard 
                    title="Reviewed_Applications"
                    count={byStatus.reviewed}
                    description="Under review"
                    color="purple"
                    icon={FileText}
                />
                <StatusCard 
                    title="Rejected_Applications"
                    count={byStatus.rejected}
                    description="Declined applications"
                    color="red"
                    icon={XCircle}
                />
                <StatusCard 
                    title="Accepted_for_Interview"
                    count={byStatus.accepted_for_interview}
                    description="Approved applications"
                    color="blue"
                    icon={CheckCircle}
                />
                <StatusCard 
                    title="Accepted_to_Join"
                    count={byStatus.accepted_to_join}
                    description="Accepted to join"
                    color="green"
                    icon={CheckCircle}
                />
            </div>

            <ApplicationsDashboard applications={applications?.data?.applications || []} isLoading={isLoading} error={error} />
        </>
    )
}

export default HrDashboard 