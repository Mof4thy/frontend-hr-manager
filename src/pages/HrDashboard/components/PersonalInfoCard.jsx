import React from 'react'

const PersonalInfoCard = ({ personalInfo, formatDate }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
            </h2>
            <div className="space-y-3">
                <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-900">{personalInfo?.name || 'Not provided'}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-gray-900">{formatDate(personalInfo?.dateOfBirth)}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900">{personalInfo?.gender || 'Not provided'}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Governorate</label>
                    <p className="text-gray-900">{personalInfo?.governorate || 'Not provided'}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{personalInfo?.address || 'Not provided'}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">National ID</label>
                    <p className="text-gray-900">{personalInfo?.nationalId || 'Not provided'}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Nationality</label>
                    <p className="text-gray-900">{personalInfo?.nationality || 'Not provided'}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Marital Status</label>
                    <p className="text-gray-900 capitalize">{personalInfo?.socialStatus || 'Not provided'}</p>
                </div>
                {personalInfo?.gender === 'ذكر' && (
                    <div>
                        <label className="text-sm font-medium text-gray-500">Military Service</label>
                        <p className="text-gray-900 capitalize">{personalInfo?.militaryServiceStatus?.replace('_', ' ') || 'Not provided'}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PersonalInfoCard


