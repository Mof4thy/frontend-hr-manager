import { useParams, useNavigate } from 'react-router-dom'
import { getApplicationDetails, updateApplicationStatus } from '../../services/applicationService'
import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import PersonalInfoCard from './components/PersonalInfoCard'
import ContactInfoCard from './components/ContactInfoCard'
import VehicleLicenseCard from './components/VehicleLicenseCard'
import CvDocumentCard from './components/CvDocumentCard'
import CurrentEmploymentCard from './components/CurrentEmploymentCard'
import WorkExperienceCard from './components/WorkExperienceCard'
import EducationCard from './components/EducationCard'
import SkillsCard from './components/SkillsCard'
import LanguagesCard from './components/LanguagesCard'
import CompanyRelationshipsCard from './components/CompanyRelationshipsCard'

import useApplications from '../../hooks/useApplications'



const ApplicationDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [applicationDetails, setApplicationDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { refetch } = useApplications()

    /**
     * Fetch application details
     */
    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                setLoading(true)
                const response = await getApplicationDetails(id)
                setApplicationDetails(response.data.application)
            } catch (err) {
                setError('Failed to load application details')
                console.error('Error fetching application details:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchApplicationDetails()
    }, [id ])



    /**
     * Update application status
     */
    const handleStatusChange = async (newStatus) => {
        try {
           const response = await updateApplicationStatus(id, newStatus)
           console.log('Status update response:', response)
            setApplicationDetails(prev => ({ ...prev, status: response.data.status }))
            
            // Refetch applications list
            refetch()
    
            // Invalidate and refetch application statistics
            await queryClient.invalidateQueries(['applicationStats'])
            
        } catch (err) {
            console.error('Error updating status:', err)
        }
    }

    
    /**
     * Get status color
     */
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'reviewed':
                return 'bg-purple-100 text-purple-800 border-purple-200'
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    /**
     * Format date
     */
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified'
        return new Date(dateString).toLocaleDateString('en-GB')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">{error}</div>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    if (!applicationDetails) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600 text-xl">Application not found</div>
            </div>
        )
    }

    const { personalInfo, currentJob, experiences, education, skills, languages, companyRelationships } = applicationDetails

    return (
       <>

            <div className="bg-white w-full rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors hover:cursor-pointer"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Dashboard
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(applicationDetails.status)}`}>
                            {applicationDetails.status}
                        </span>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-start justify-between ">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {personalInfo?.name || 'Unknown Applicant'}
                        </h1>
                        <p className="text-xl text-gray-600 mb-2">
                            {applicationDetails.jobTitle}
                        </p>
                        <p className="text-sm text-gray-500">
                            Applied on {formatDate(applicationDetails.createdAt)}
                        </p>
                    </div>
                    
                    {/* Status Update Buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleStatusChange('reviewed')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                        >
                            Mark as Reviewed
                        </button>
                        <button
                            onClick={() => handleStatusChange('accepted')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => handleStatusChange('rejected')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>


            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                
                {/* Left Column - Personal Info & Contact */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* Personal Information */}
                    <PersonalInfoCard personalInfo={personalInfo} formatDate={formatDate} />

                    {/* Contact Information */}
                    <ContactInfoCard personalInfo={personalInfo} />

                    {/* Vehicle & License */}
                    <VehicleLicenseCard personalInfo={personalInfo} />

                    {/* CV Document */}
                    <CvDocumentCard cvPath={applicationDetails?.cvPath} />

                </div>

                {/* Right Column - Professional Info */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Current Employment */}
                    <CurrentEmploymentCard currentJob={currentJob} />

                    {/* Work Experience */}
                    <WorkExperienceCard experiences={experiences} formatDate={formatDate} />

                     {/* Education */}
                     <EducationCard education={education} formatDate={formatDate} educationStatus={applicationDetails.educationStatus} />

                    {/* Skills */}
                    <SkillsCard skills={skills} />

                    {/* Languages */}
                    <LanguagesCard languages={languages} />

                    {/* Company Relationships */}
                    <CompanyRelationshipsCard companyRelationships={companyRelationships} />

                </div>
            </div>
     
       </>
    )
}

export default ApplicationDetails   