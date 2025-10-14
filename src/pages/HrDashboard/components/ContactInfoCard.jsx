import React from 'react'

const ContactInfoCard = ({ personalInfo }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 01.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Information
            </h2>
            <div className="space-y-3">
                <div>
                    <label className="text-sm font-medium text-gray-500">WhatsApp Number</label>
                    <p className="text-gray-900">{personalInfo?.whatsappNumber || 'Not provided'}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Mobile Number</label>
                    <p className="text-gray-900">{personalInfo?.mobileNumber || 'Not provided'}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
                    <p className="text-gray-900">{personalInfo?.emergencyNumber || 'Not provided'}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactInfoCard


