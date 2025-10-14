import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useLanguage } from "../../../context/LanguageContext"
import { useForm } from "../../../context/FormContext"
import Button from "../../../components/button"

const StepUploadDocs = ({ checkValidStep, setValidMessage }) => {
    const { t } = useLanguage()
    const { state, dispatch } = useForm()
    const fileInputRef = useRef(null)
    
    // State to track individual field errors
    const [fieldErrors, setFieldErrors] = useState({})
    const [touchedFields, setTouchedFields] = useState({})
    const [validationTriggered, setValidationTriggered] = useState(false)

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Clear CV error when file is selected
            if (fieldErrors.cv) {
                setFieldErrors(prev => {
                    const newErrors = { ...prev }
                    delete newErrors.cv
                    return newErrors
                })
            }
            
            // Just store the file locally for now
            dispatch({ type: 'set_cv_file', payload: file })
            console.log('CV file selected:', file.name)
        }
    }

    const handleRemoveCV = () => {
        dispatch({ type: 'remove_cv' })
        // Clear the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    // Handle field blur events
    const handleFieldBlur = (field) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }))
        validateSingleField(field)
    }

    // Validate a single field
    const validateSingleField = (field) => {
        let error = null

        // CV is now optional, so no validation needed
        if (field === 'cv') {
            // No validation - CV is optional
        }

        if (error) {
            setFieldErrors(prev => ({ ...prev, [field]: error }))
        } else {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const validateStep = useCallback(() => {
        setValidationTriggered(true)
        const errors = {}

        // CV is now optional - no validation needed
        // No validation for CV since it's optional

        setFieldErrors(errors)
        const hasErrors = Object.keys(errors).length > 0
        if (hasErrors) {
            setValidMessage(t('error-please-fix-errors'))
        } else {
            setValidMessage('')
        }

        return !hasErrors
    }, [setValidMessage, t])

    // Set the validation function in the parent component
    useEffect(() => {
        checkValidStep(() => validateStep)
    }, [checkValidStep, validateStep])

    

    return (
        <div className="w-full bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-shadow hover:shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-5 lg:py-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
            <div>
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                            {t('upload-documents')}
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                            {t('upload-documents-subtitle')}
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-full">
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
                
                {/* CV Upload Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                            {t('cv-upload')}
                        </h3>
                        <span className="text-gray-500 text-sm">(Optional)</span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        {t('cv-upload-instruction')}
                    </p>


                    <div className="flex flex-col gap-2">
                        <label className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                            {t('browse-files')}
                        </label>
                        <div className="flex items-center gap-2">
                        <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
                                        alert('File size must be less than 5MB');
                                        e.target.value = '';
                                        return;
                                    }
                                    handleFileUpload(e);
                                }}
                                onBlur={() => handleFieldBlur('cv')}
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-lg outline-none transition-all duration-200 ease-in-out focus:border-gray-500 focus:ring-4 focus:ring-gray-100 hover:border-gray-300 shadow-sm text-xs sm:text-sm md:text-base"
                            />
                        </div>
                        {((touchedFields.cv || validationTriggered) && fieldErrors.cv) && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">{fieldErrors.cv}</p>
                        )}

                        {/* File Selected */}
                        {state.cv.file && (
                            <div className="flex items-center gap-4 mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-2 flex-1">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div className="flex-1">
                                        <p className="text-sm text-blue-800 font-medium">
                                            {state.cv.fileName}
                                        </p>
                                        <p className="text-xs text-blue-600">
                                            File selected - will be uploaded when you submit the application
                                        </p>
                                    </div>
                                </div>
                                <Button 
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm" 
                                    onClick={handleRemoveCV}
                                >
                                    {t('remove-file')}
                                </Button>
                            </div>
                        )}
                    </div>

                    
                </div>

                
               
            </div>
        </div>
    )
}

export default StepUploadDocs
