import React from 'react'

const CurrentEmploymentCard = ({ currentJob }) => {
    if (!currentJob) return null
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                Current Employment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p className="text-gray-900">{currentJob.isCurrentlyEmployed ? 'Currently Employed' : 'Not Currently Employed'}</p>
                </div>
                {currentJob.isCurrentlyEmployed && (
                    <>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Company</label>
                            <p className="text-gray-900">{currentJob.company || 'Not provided'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Role</label>
                            <p className="text-gray-900">{currentJob.role || 'Not provided'}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default CurrentEmploymentCard


