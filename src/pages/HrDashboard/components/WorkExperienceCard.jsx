import React from 'react'

const WorkExperienceCard = ({ experiences, formatDate }) => {
    if (!experiences || experiences.length === 0) return null
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Work Experience ({experiences.length})
            </h2>
            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Company</label>
                                <p className="text-gray-900 font-medium">{exp.company}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Role</label>
                                <p className="text-gray-900">{exp.role}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Location</label>
                                <p className="text-gray-900">{exp.location}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Duration</label>
                                <p className="text-gray-900">{formatDate(exp.fromDate)} - {formatDate(exp.toDate)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WorkExperienceCard


