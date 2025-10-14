import React from 'react'

const VehicleLicenseCard = ({ personalInfo }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Vehicle & License
            </h2>
            <div className="space-y-3">
                <div>
                    <label className="text-sm font-medium text-gray-500">Owns Vehicle</label>
                    <p className="text-gray-900">{personalInfo?.hasVehicle ? 'Yes' : 'No'}</p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Driving License</label>
                    <p className="text-gray-900 capitalize">{personalInfo?.drivingLicense?.replace(/-/g, ' ') || 'Not provided'}</p>
                </div>
            </div>
        </div>
    )
}

export default VehicleLicenseCard


