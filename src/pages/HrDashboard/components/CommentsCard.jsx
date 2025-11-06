import React from 'react'

const CommentsCard = ({ comments }) => {
    // Only render if there are comments
    if (!comments || comments.trim() === '') {
        return null
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                </svg>
                Additional Comments
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {comments}
                </p>
            </div>
        </div>
    )
}

export default CommentsCard
