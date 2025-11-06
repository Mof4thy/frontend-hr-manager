import { useForm } from "../../../context/FormContext"
import Button from "../../../components/button"
import { useLanguage } from "../../../context/LanguageContext"

const StepReview = ({ onEditStep }) => {
    const { state } = useForm()
    const { t } = useLanguage()

    const formatDate = (dateString) => {
        if (!dateString) return t('not-specified')
        const date = new Date(dateString)
        // return date.toLocaleDateString('en-GB', { 
        //     year: 'numeric', 
        //     month: 'long', 
        //     day: 'numeric' 
        // })
        return date.toLocaleDateString('en-GB' , { day: '2-digit', month: '2-digit', year: 'numeric' })
    }

    const formatLevel = (level) => {
        if (!level) return t('not-specified')
        return level.replace('_', ' ').split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    }

    return (
        <div className="w-full bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-shadow hover:shadow-xl">
            {/* Header */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 rtl-text leading-tight">
                        {t('application-review')}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg rtl-text leading-relaxed">
                        {t('review-instruction')}
                    </p>
                </div>
            </div>

            {/* Review Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="space-y-8">

                    {/* Personal Information */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 rtl-text">{t('personal-info')}</h3>
                            <Button
                                type="button"
                                onClick={() => onEditStep(1)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm text-center"
                            >
                                {t('edit')}
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="rtl-text"><span className="font-medium">{t('name')}:</span> {state.personalInfo.name || t('not-provided')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('date-of-birth')}:</span> {formatDate(state.personalInfo.dateOfBirth)}</div>
                            <div className="rtl-text"><span className="font-medium">{t('sex')}:</span> {state.personalInfo.sex || t('not-provided')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('governorate')}:</span> {state.personalInfo.governorate || t('not-provided')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('address')}:</span> {state.personalInfo.address || t('not-provided')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('national-id')}:</span> {state.personalInfo.nationalId || t('not-provided')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('nationality')}:</span> {state.personalInfo.nationality || t('not-provided')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('phone-number')}:</span> {state.personalInfo.whatsappNumber || t('not-provided')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('mobile-number')}:</span> {state.personalInfo.mobileNumber || t('not-provided')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('emergency-contact')}:</span> {state.personalInfo.emergencyNumber || t('not-provided')}</div>
                            {state.personalInfo.sex === 'ذكر' && (
                                <div className="rtl-text"><span className="font-medium">{t('military-service')}:</span> {state.personalInfo.militaryServiceStatus || t('not-provided')}</div>
                            )}
                            <div className="rtl-text"><span className="font-medium">{t('marital-status')}:</span> {state.personalInfo.socialStatus || t('not-provided')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('own-vehicle')}:</span> {state.personalInfo.hasVehicle ? t('yes') : t('no')}</div>
                            <div className="rtl-text"><span className="font-medium">{t('driving-license')}:</span> {state.personalInfo.drivingLicense || t('not-provided')}</div>
                        </div>
                    </div>

                    {/* Additional Comments */}
                    {state.comments && state.comments.trim() !== '' && (
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                                    </svg>
                                    {t('comments')}
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEditStep(1)}
                                >
                                    {t('edit')}
                                </Button>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-gray-100">
                                <p className="text-gray-900 whitespace-pre-wrap">{state.comments}</p>
                            </div>
                        </div>
                    )}

                    {/* Job Information */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 rtl-text">{t('job-info')}</h3>
                            <Button
                                type="button"
                                onClick={() => onEditStep(2)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm text-center"
                            >
                                {t('edit')}
                            </Button>
                        </div>
                        <div>
                            <span className="font-medium rtl-text">{t('applied-position')}:</span> {
                                state.appliedJob.jobTitle ? 
                                state.appliedJob.jobTitle.split('_').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ') : 
                                t('not-selected')
                            }
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 rtl-text">{t('experience')}</h3>
                            <Button
                                type="button"
                                onClick={() => onEditStep(3)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm text-center"
                            >
                                {t('edit')}
                            </Button>
                        </div>
                        
                        {/* Current Job */}
                        <div className="mb-4">
                            <h4 className="font-semibold text-blue-700 mb-2 rtl-text">{t('current-employment')}:</h4>
                            {state.currentJob.isCurrentlyEmployed ? (
                                <div className="bg-blue-50 p-3 rounded border">
                                    <div className="rtl-text"><span className="font-medium">{t('company-name')}:</span> {state.currentJob.company}</div>
                                    <div className="rtl-text"><span className="font-medium">{t('job-role')}:</span> {state.currentJob.role}</div>
                                    <div className="rtl-text"><span className="font-medium">{t('salary')}:</span> {state.currentJob.salary}</div>
                                </div>
                            ) : (
                                <div className="text-gray-600 rtl-text">{t('not-currently-employed')}</div>
                            )}
                        </div>

                        {/* Previous Experience */}
                        <div>
                            <h4 className="font-semibold text-green-700 mb-2 rtl-text">{t('previous-experience-review')}:</h4>
                            {state.experiences.length > 0 ? (
                                <div className="space-y-3">
                                    {state.experiences.map((exp, index) => (
                                        <div key={index} className="bg-green-50 p-3 rounded border">
                                            <div className="font-medium text-green-800 rtl-text">{t('experience-number')}{index + 1}</div>
                                            <div className="rtl-text"><span className="font-medium">{t('company-name')}:</span> {exp.company}</div>
                                            <div className="rtl-text"><span className="font-medium">{t('job-role')}:</span> {exp.role}</div>
                                            <div className="rtl-text"><span className="font-medium">{t('location')}:</span> {exp.location}</div>
                                            <div className="rtl-text"><span className="font-medium">{t('salary')}:</span> {exp.salary}</div>
                                            <div className="rtl-text"><span className="font-medium">{t('duration')}:</span> {formatDate(exp.fromDate)} - {formatDate(exp.toDate)}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-600 rtl-text">{t('no-previous-experience')}</div>
                            )}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 rtl-text">{t('education')}</h3>
                            <Button
                                type="button"
                                onClick={() => onEditStep(4)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm text-center"
                            >
                                {t('edit')}
                            </Button>
                        </div>
                        
                        {/* Education Status */}
                        <div className="mb-4">
                            <h4 className="font-semibold text-purple-700 mb-2 rtl-text">{t('education-status')}:</h4>
                            <div className="bg-purple-50 p-3 rounded border border-purple-200">
                                <span className="font-medium text-lg rtl-text">
                                    {state.educationStatus ? t(state.educationStatus) : t('not-provided')}
                                </span>
                            </div>
                        </div>

                        {/* Education Entries */}
                        <div>
                            <h4 className="font-semibold text-blue-700 mb-2 rtl-text">{t('educational-background')}:</h4>
                            {state.education.length > 0 ? (
                            <div className="space-y-3">
                                {state.education.map((edu, index) => (
                                    <div key={index} className="bg-white p-4 rounded border border-gray-300">
                                        <div className="font-medium text-gray-800 mb-2 rtl-text">{t('education-number')}{index + 1}</div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <div className="rtl-text"><span className="font-medium">{t('institution-name')}:</span> {edu.institution}</div>
                                            <div className="rtl-text"><span className="font-medium">{t('department-field')}:</span> {edu.department}</div>
                                            <div className="rtl-text"><span className="font-medium">{t('grade-gpa')}:</span> {edu.grade}</div>
                                            <div className="rtl-text"><span className="font-medium">{t('duration')}:</span> {formatDate(edu.fromDate)} - {formatDate(edu.toDate)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-600 rtl-text">{t('no-education-yet')}</div>
                        )}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 rtl-text">{t('skills')}</h3>
                            <Button
                                type="button"
                                onClick={() => onEditStep(5)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm text-center"
                            >
                                {t('edit')}
                            </Button>
                        </div>
                        
                        {/* Microsoft Office Skills */}
                        <div className="mb-4">
                            <h4 className="font-semibold text-blue-700 mb-2 rtl-text">{t('microsoft-office')}:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <div className="bg-blue-50 p-2 rounded">
                                    <span className="font-medium rtl-text">{t('microsoft-word')}:</span> {formatLevel(state.skills.predefined.word)}
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                    <span className="font-medium rtl-text">{t('microsoft-excel')}:</span> {formatLevel(state.skills.predefined.excel)}
                                </div>
                                <div className="bg-blue-50 p-2 rounded">
                                    <span className="font-medium rtl-text">{t('microsoft-powerpoint')}:</span> {formatLevel(state.skills.predefined.powerpoint)}
                                </div>
                            </div>
                        </div>

                        {/* Additional Skills */}
                        <div>
                            <h4 className="font-semibold text-purple-700 mb-2 rtl-text">{t('additional-skills')}:</h4>
                            {state.skills.custom.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {state.skills.custom.map((skill, index) => (
                                        <div key={index} className="bg-purple-50 p-2 rounded">
                                            <span className="font-medium">{skill.name}:</span> {formatLevel(skill.level)}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-600 rtl-text">{t('no-additional-skills')}</div>
                            )}
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 rtl-text">{t('languages')}</h3>
                            <Button
                                type="button"
                                onClick={() => onEditStep(6)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm text-center"
                            >
                                {t('edit')}
                            </Button>
                        </div>
                        
                        {/* English */}
                        <div className="mb-4">
                            <h4 className="font-semibold text-blue-700 mb-2 rtl-text">{t('english-language')}:</h4>
                            <div className="bg-blue-50 p-3 rounded">
                                <span className="font-medium text-lg rtl-text">{t('level')}:</span> {formatLevel(state.languages.english)}
                            </div>
                        </div>

                        {/* Additional Languages */}
                        <div>
                            <h4 className="font-semibold text-orange-700 mb-2 rtl-text">{t('additional-languages')}:</h4>
                            {state.languages.additional.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {state.languages.additional.map((lang, index) => (
                                        <div key={index} className="bg-orange-50 p-2 rounded">
                                            <span className="font-medium">{lang.name}:</span> {formatLevel(lang.level)}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-600 rtl-text">{t('no-additional-languages')}</div>
                            )}
                        </div>
                    </div>

                    {/* Company Relationships */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 rtl-text">{t('company-relationships')}</h3>
                            <Button
                                type="button"
                                onClick={() => onEditStep(7)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm text-center"
                            >
                                {t('edit')}
                            </Button>
                        </div>
                        {state.companyRelationships.hasRelationship ? (
                            <div className="bg-purple-50 p-4 rounded border border-purple-200">
                                <div className="font-medium text-purple-800 mb-2 rtl-text">{t('has-company-connection')}</div>
                                <div className="rtl-text"><span className="font-medium">{t('contact-name')}:</span> {state.companyRelationships.contactName}</div>
                                <div className="rtl-text"><span className="font-medium">{t('contact-position')}:</span> {state.companyRelationships.contactPosition}</div>
                            </div>
                        ) : (
                            <div className="text-gray-600 rtl-text">{t('no-company-relationships')}</div>
                        )}
                    </div>

                    {/* CV Upload */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800 rtl-text">{t('upload-documents')}</h3>
                            <Button
                                type="button"
                                onClick={() => onEditStep(8)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm text-center"
                            >
                                {t('edit')}
                            </Button>
                        </div>
                        
                        {/* CV File */}
                        <div className="mb-4">
                            <h4 className="font-semibold text-green-700 mb-2 rtl-text">{t('cv-upload')}:</h4>
                            {state.cv ? (
                                <div className="bg-green-50 p-4 rounded border border-green-200">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-green-800 rtl-text truncate">
                                                {state.cv.name}
                                            </div>
                                            <div className="text-sm text-green-600 rtl-text">
                                                {(state.cv.size / (1024 * 1024)).toFixed(2)} MB • {t('file-uploaded')}
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-red-50 p-4 rounded border border-red-200">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-red-800 rtl-text">
                                                {t('cv-required')}
                                            </div>
                                            <div className="text-sm text-red-600 rtl-text">
                                                {t('cv-upload-instruction')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Final Confirmation */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-green-800 mb-3 rtl-text">
                            {t('application-confirmation')}
                        </h3>
                        <div className="space-y-2 text-sm text-green-700">
                            <p className="rtl-text">• {t('confirmation-1')}</p>
                            <p className="rtl-text">• {t('confirmation-2')}</p>
                            <p className="rtl-text">• {t('confirmation-3')}</p>
                            <p className="rtl-text">• {t('confirmation-4')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepReview
