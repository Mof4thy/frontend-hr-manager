import React from 'react'

const EducationCard = ({ education, formatDate, educationStatus }) => {
    if (!education || education.length === 0) return null
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Education ({education.length})
            </h2>
            
            {/* Education Status */}
            {educationStatus && (
                <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <label className="text-sm font-medium text-gray-500">Education Status</label>
                    <p className="text-gray-900 font-medium">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            educationStatus === 'student' ? 'bg-blue-100 text-blue-800' : 
                            educationStatus === 'graduate' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {educationStatus === 'student' ? 'Student (طالب)' : 
                             educationStatus === 'graduate' ? 'Graduate (خريج)' : 
                             educationStatus || 'Not specified'}
                        </span>
                    </p>
                </div>
            )}
            
            <div className="space-y-4">
                {education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Institution</label>
                                <p className="text-gray-900 font-medium">{edu.institution}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Department</label>
                                <p className="text-gray-900">{edu.department}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Grade</label>
                                <p className="text-gray-900">{edu.grade}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Duration</label>
                                <p className="text-gray-900">{formatDate(edu.fromDate)} - {formatDate(edu.toDate)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EducationCard


