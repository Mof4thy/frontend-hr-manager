import { useNavigate } from 'react-router-dom'
import Input from '../../../components/Input'
import Button from '../../../components/button'
import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { exportApplicationsToExcel } from '../../../services/applicationService'
import { useParams } from 'react-router-dom'
import {getAcceptedToJoinApplications} from "../../../services/applicationService"

const ApplicationsDashboard = ({ applications, isLoading, error }) => {
    // Sample data matching the design
    const { status } = useParams()
    const [search, setSearch] = useState('')
    const [searchid, setSearchid] = useState('')
    const [filteredApplications, setFilteredApplications] = useState([])
    const [isExporting, setIsExporting] = useState(false)


    useEffect(()=>{
        setFilteredApplications(applications)
        navigate(`/dashboard`)

    }, [applications])


    // Handle status-based filtering
    useEffect(() => {
        // Don't process if applications is not loaded yet
        if (!applications || !Array.isArray(applications)) {
            setFilteredApplications([])
            return
        }

        if(status) {
            if(status === "total_applications"){
                setFilteredApplications(applications)   
            } else if(status === "pending_applications") {
                setFilteredApplications(applications.filter((application) => application.status === "pending"))
            } else if(status === "reviewed_applications") {
                setFilteredApplications(applications.filter((application) => application.status === "reviewed"))
            } else if(status === "rejected_applications") {
                setFilteredApplications(applications.filter((application) => application.status === "rejected"))
            } else if(status === "accepted_for_interview") {
                setFilteredApplications(applications.filter((application) => application.status === "accepted_for_interview"))
            } else if(status === "accepted_to_join") {
                // Don't filter here - let the API call handle it
                // This prevents filtering with stale data
            } else {
                // Fallback for any other status values
                setFilteredApplications(applications.filter((application) => application.status === status))
            }
        } else {
            setFilteredApplications(applications)   
        }
    }, [applications, status])


    // Separate useEffect for accepted_to_join API call - only when status changes
    useEffect(() => {
        if(status === "accepted_to_join") {
            getallAcceptedToJoinApplications()
        }
    }, [status]) // Only depend on status, not applications

    const getallAcceptedToJoinApplications = async()=>{
        try {
            const res = await getAcceptedToJoinApplications()
            console.log('Accepted to join API response:', res)
            setFilteredApplications(res.data.applications)
           
        } catch (error) {
            console.log('Error fetching accepted to join applications:', error)
            // On error, set empty array to prevent crashes
            setFilteredApplications([])
        }
    }




    const handleSearch = (value) => {
        setSearch(value)
        setSearchid('') 
        
        if (!applications || !Array.isArray(applications)) return
        
        if (!value.trim()) {
            setFilteredApplications(applications)
            return
        }
        
        setFilteredApplications(applications.filter((application) => 
            (application.personalInfo?.name || '').toLowerCase().includes(value.toLowerCase()) || 
            (application.personalInfo?.phoneNumber || '').toLowerCase().includes(value.toLowerCase()) || 
            (application.personalInfo?.whatsappNumber || '').toLowerCase().includes(value.toLowerCase()) || 
            (application.jobTitle || '').toLowerCase().includes(value.toLowerCase())
        ))
    }

    const handleSearchbyid = (value) =>{
        setSearchid(value)
        setSearch('') 
        
        if (!applications || !Array.isArray(applications)) return
        
        if (!value.trim()) {
            setFilteredApplications(applications)
            return
        }
        
        setFilteredApplications(applications.filter((application) =>
             application.applicationId.toString().toLowerCase().includes(value.toLowerCase())
        ))
    }

    const navigate = useNavigate()

    const handleViewApplication = (applicationId) => {
        navigate(`/applications/${applicationId}`)
    }



    // excel
    const handleExportToExcel = async () => {
        try {
            setIsExporting(true)
            console.log('Starting Excel export...')
            
            const response = await exportApplicationsToExcel()
            
            // Create blob and download
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            
            // Create download link
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            
            // Get filename from response headers or create default
            const contentDisposition = response.headers['content-disposition']
            let filename = 'HR_Applications_Export.xlsx'
            
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/)
                if (filenameMatch) {
                    filename = filenameMatch[1]
                }
            }
            
            link.download = filename
            document.body.appendChild(link)
            link.click()
            
            // Cleanup
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            
            console.log('Excel export completed successfully')
            
        } catch (error) {
            console.error('Excel export failed:', error)
            alert('Failed to export applications to Excel. Please try again.')
        } finally {
            setIsExporting(false)
        }
    }



    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
                case 'accepted_for_interview':
                    return 'bg-blue-100 text-blue-800 border-blue-200'
                case 'accepted_to_join':
                    return 'bg-green-100 text-green-800 border-green-200'
            case 'reviewed':
                return 'bg-purple-100 text-purple-800'
            case 'rejected':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!applications) {
        return <div>No applications found</div>
    }

    return (
        
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h1 className="text-xl  font-bold text-gray-900">
                        Applications ({filteredApplications.length})
                    </h1>
                    <div className="w-full flex flex-col md:flex-row md:w-2/3 gap-4">
                        <Input
                            type="text"
                            className="border-2 border-gray-300 rounded-2xl  "
                            placeholder="Search by ID"
                            value={searchid}
                            onChange={(e) => handleSearchbyid(e.target.value)}
                        />
                        <div className=" w-full flex-1  ">
                            <Input
                                type="text"
                                className="border-2 border-gray-300 rounded-2xl  w-full "
                                placeholder="Search by name or phone number or position"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleExportToExcel}
                            disabled={isExporting || applications.length === 0}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                        >
                            <Download size={16} />
                            {isExporting ? 'Exporting...' : 'Export Excel'}
                        </Button>

                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto ">
                <table className="w-full">
                    <thead className="bg-gray-200 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Candidate
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Position
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                WhatsApp Number
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Education Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Applied
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody className="bg-white divide-y divide-gray-200 ">
                        {Array.isArray(filteredApplications) && filteredApplications.map((application) => (
                            <tr key={application.applicationId} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        #{application.applicationId}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    
                                    <div className="flex flex-col">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {application.personalInfo.name}
                                        </div>
                                        {/* <div className="text-sm text-gray-500">
                                            {application.email}
                                        </div> */}
                                    </div>

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {application.jobTitle}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {application.personalInfo.whatsappNumber}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {application.educationStatus ? (
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            application.educationStatus === 'student' ? 'bg-blue-100 text-blue-800' : 
                                            application.educationStatus === 'graduate' ? 'bg-green-100 text-green-800' : 
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {application.educationStatus === 'student' ? 'Student (طالب)' : 
                                             application.educationStatus === 'graduate' ? 'Graduate (خريج)' : 
                                             application.educationStatus}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            Not specified
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                                        {application.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {new Date(application.createdAt).toLocaleDateString('en-GB')
                                        }
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button 
                                        onClick={() => handleViewApplication(application.applicationId)}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-900 transition-colors cursor-pointer">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!Array.isArray(filteredApplications) || filteredApplications.length === 0) && (
                            <tr>
                                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                    {isLoading ? 'Loading applications...' : 'No applications found'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default ApplicationsDashboard