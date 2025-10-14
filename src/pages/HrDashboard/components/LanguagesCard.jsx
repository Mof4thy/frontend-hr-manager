import React from 'react'

const LanguagesCard = ({ languages }) => {
    if (!languages) return null
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Language Proficiency
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {languages.english && (
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">English</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">English</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm capitalize">
                                {languages.english}
                            </span>
                        </div>
                    </div>
                )}
                {languages.additional && languages.additional.length > 0 && (
                    <div>
                        <h3 className="font-medium text-gray-900 mb-3">Additional Languages</h3>
                        <div className="space-y-2">
                            {languages.additional.map((lang, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-gray-700">{lang.name}</span>
                                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm capitalize">
                                        {lang.level}
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

export default LanguagesCard


