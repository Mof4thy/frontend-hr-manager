import React from 'react'

const SkillsCard = ({ skills }) => {
    if (!skills) return null
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Skills & Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Predefined Skills */}
                {skills.predefined && (
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">Microsoft Office Skills</h3>
                        <div className="space-y-2">
                            {Object.entries(skills.predefined).map(([skill, level]) => (
                                <div key={skill} className="flex justify-between items-center">
                                    <span className="text-gray-700 capitalize">{skill}</span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
                                        {level?.replace('_', ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Custom Skills */}
                {skills.custom && skills.custom.length > 0 && (
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">Additional Skills</h3>
                        <div className="space-y-2">
                            {skills.custom.map((skill, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-gray-700">{skill.name}</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize">
                                        {skill.level?.replace('_', ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SkillsCard


