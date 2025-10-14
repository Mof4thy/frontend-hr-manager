import React, { useEffect, useCallback, useState } from 'react'
import Input from "../../../components/Input"
import CheckboxGroup from "../../../components/CheckboxGroup"
import { useForm } from "../../../context/FormContext"
import { useLanguage } from "../../../context/LanguageContext"

const StepRelationships = ({ checkValidStep, setValidMessage }) => {
    const { state, dispatch } = useForm()
    const { t } = useLanguage()
    
    // State to track individual field errors
    const [fieldErrors, setFieldErrors] = useState({})
    // State to track which fields have been interacted with (touched)
    const [touchedFields, setTouchedFields] = useState({})
    // State to track if validation has been triggered (e.g., by clicking next)
    const [validationTriggered, setValidationTriggered] = useState(false)

    const handleRelationshipStatusChange = (value) => {
        // Clear the error for this field when user starts selecting
        if (fieldErrors.hasRelationship) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.hasRelationship
                return newErrors
            })
        }
        
        const hasRelationship = value === 'yes'
        dispatch({
            type: "update_company_relationships",
            payload: { 
                hasRelationship,
                // Clear contact data if no relationship
                ...(hasRelationship ? {} : { contactName: '', contactPosition: '' })
            }
        })
    }

    const handleContactChange = (field, value) => {
        // Clear the error for this field when user starts typing
        if (fieldErrors[field]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
        
        dispatch({
            type: "update_company_relationships",
            payload: { [field]: value }
        })
    }

    // Handle field blur events
    const handleFieldBlur = (field) => {
        setTouchedFields(prev => ({ ...prev, [field]: true }))
        validateSingleField(field)
    }

    // Validate a single field
    const validateSingleField = (field) => {
        let error = null

        if (field === 'hasRelationship') {
            if (state.companyRelationships.hasRelationship === undefined || state.companyRelationships.hasRelationship === null) {
                error = t('error-relationship-status-required')
            }
        } else if (field === 'contactName') {
            if (state.companyRelationships.hasRelationship && (!state.companyRelationships.contactName || state.companyRelationships.contactName.trim() === '')) {
                error = t('error-contact-name-required')
            }
        } else if (field === 'contactPosition') {
            if (state.companyRelationships.hasRelationship && (!state.companyRelationships.contactPosition || state.companyRelationships.contactPosition.trim() === '')) {
                error = t('error-contact-position-required')
            }
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

        // Check if relationship status is selected
        if (state.companyRelationships.hasRelationship === undefined || state.companyRelationships.hasRelationship === null) {
            errors.hasRelationship = t('error-relationship-status-required')
        }

        // If has relationship, validate contact fields
        if (state.companyRelationships.hasRelationship) {
            if (!state.companyRelationships.contactName || state.companyRelationships.contactName.trim() === '') {
                errors.contactName = t('error-contact-name-required')
            }
            if (!state.companyRelationships.contactPosition || state.companyRelationships.contactPosition.trim() === '') {
                errors.contactPosition = t('error-contact-position-required')
            }
        }

        setFieldErrors(errors)
        const hasErrors = Object.keys(errors).length > 0
        if (hasErrors) {
            setValidMessage(t('error-please-fix-errors'))
        } else {
            setValidMessage('')
        }

        return !hasErrors
    }, [state.companyRelationships, setValidMessage, t])

    // Set the validation function in the parent component
    useEffect(() => {
        checkValidStep(() => validateStep)
    }, [checkValidStep, validateStep])
    

    return (
        <div className="w-full bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-shadow hover:shadow-xl">
            {/* Header */}
            <div className="p-2 sm:p-3 md:p-4 lg:p-6 border-b border-gray-100">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 rtl-text leading-tight">
                        {t('company-relationships')}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg rtl-text leading-relaxed">
                        {t('company-relationships-subtitle')}
                    </p>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="space-y-8">
                    
                    {/* Relationship Status Section */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg font-semibold text-purple-800 mb-4 rtl-text">
                            {t('company-connections')}
                        </h3>
                        <p className="text-sm text-purple-700 mb-6 rtl-text">
                            {t('company-connections-instruction')}
                        </p>
                        
                        <div className="bg-white p-4 rounded-lg border border-purple-100">
                            <CheckboxGroup
                                label={t('know-someone-company')}
                                options={[
                                    { value: 'yes', label: t('yes-know-someone') },
                                    { value: 'no', label: t('no-know-anyone') }
                                ]}
                                selectedValue={state.companyRelationships.hasRelationship ? 'yes' : 'no'}
                                onChange={handleRelationshipStatusChange}
                                onBlur={() => handleFieldBlur('hasRelationship')}
                                required={true}
                                error={(touchedFields.hasRelationship || validationTriggered) ? fieldErrors.hasRelationship : null}
                            />
                        </div>
                    </div>

                    {/* Contact Details Section - Only show if has relationship */}
                    {state.companyRelationships.hasRelationship && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-blue-800 mb-4 rtl-text">
                                {t('contact-information')}
                            </h3>
                            <p className="text-sm text-blue-700 mb-6 rtl-text">
                                {t('contact-information-instruction')}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="bg-white p-4 rounded-lg border border-blue-100">
                                    <Input 
                                        label={t('contact-name')} 
                                        placeholder={t('contact-name-placeholder')} 
                                        value={state.companyRelationships.contactName || ''}
                                        onChange={(e) => handleContactChange('contactName', e.target.value)}
                                        onBlur={() => handleFieldBlur('contactName')}
                                        required 
                                        error={(touchedFields.contactName || validationTriggered) ? fieldErrors.contactName : null}
                                    />
                                </div>
                                
                                <div className="bg-white p-4 rounded-lg border border-blue-100">
                                    <Input 
                                        label={t('contact-position')} 
                                        placeholder={t('contact-position-placeholder')} 
                                        value={state.companyRelationships.contactPosition || ''}
                                        onChange={(e) => handleContactChange('contactPosition', e.target.value)}
                                        onBlur={() => handleFieldBlur('contactPosition')}
                                        required 
                                        error={(touchedFields.contactPosition || validationTriggered) ? fieldErrors.contactPosition : null}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-800">
                                    <strong>Note:</strong> This information helps us understand your connection to our organization and may be used during the interview process.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Information Section */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 rtl-text">
                            {t('why-we-ask')}
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p className="rtl-text">• {t('transparency-point')}</p>
                            <p className="rtl-text">• {t('process-integrity-point')}</p>
                            <p className="rtl-text">• {t('reference-verification-point')}</p>
                            <p className="rtl-text">• {t('team-dynamics-point')}</p>
                        </div>
                    </div>

                    {/* Summary Section */}
                    {state.companyRelationships.hasRelationship && state.companyRelationships.contactName && state.companyRelationships.contactPosition && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-4 rtl-text">
                                {t('connection-summary')}
                            </h3>
                            
                            <div className="bg-white p-4 rounded-lg border border-green-100">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-600 rtl-text">{t('contact-name')}:</span>
                                        <p className="text-lg font-semibold text-green-700 rtl-text">{state.companyRelationships.contactName}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-600 rtl-text">{t('position-label')}:</span>
                                        <p className="text-lg font-semibold text-green-700 rtl-text">{state.companyRelationships.contactPosition}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!state.companyRelationships.hasRelationship && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2 rtl-text">
                                {t('no-company-connections-title')}
                            </h3>
                            <p className="text-sm text-gray-600 rtl-text">
                                {t('no-connections-message')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StepRelationships

