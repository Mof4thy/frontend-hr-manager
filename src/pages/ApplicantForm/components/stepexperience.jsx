import React, { useEffect, useCallback, useState } from 'react'
import Input from "../../../components/Input"
import { useForm } from "../../../context/FormContext"
import Button from "../../../components/button"
import CheckboxGroup from "../../../components/CheckboxGroup"
import { useLanguage } from "../../../context/LanguageContext"

const StepExperience = ({ checkValidStep, setValidMessage }) => {
    const { state, dispatch } = useForm()
    const { t } = useLanguage()
    
    // State to track individual field errors
    const [fieldErrors, setFieldErrors] = useState({})
    // State to track which fields have been interacted with (touched)
    const [touchedFields, setTouchedFields] = useState({})
    // State to track if validation has been triggered (e.g., by clicking next)
    const [validationTriggered, setValidationTriggered] = useState(false)

    const handleAddExperience = () => {
        dispatch({ type: "add_experience" })
    }

    const handleRemoveExperience = (index) => {
        dispatch({ type: "remove_experience", payload: index })
    }

    const handleExperienceChange = (index, field, value) => {
        // Clear the error for this field when user starts typing
        const fieldKey = `experience_${field}_${index}`
        if (fieldErrors[fieldKey]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[fieldKey]
                return newErrors
            })
        }
        
        dispatch({
            type: "update_experience",
            payload: {
                index,
                data: { [field]: value }
            }
        })
    }

    const handleCurrentJobChange = (field, value) => {
        // Clear the error for this field when user starts typing
        const fieldKey = `current${field.charAt(0).toUpperCase() + field.slice(1)}`
        if (fieldErrors[fieldKey]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[fieldKey]
                return newErrors
            })
        }
        
        dispatch({
            type: "update_current_job",
            payload: { [field]: value }
        })
    }

    const handleEmploymentStatusChange = (value) => {
        // Clear the error for this field when user starts selecting
        if (fieldErrors.employmentStatus) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.employmentStatus
                return newErrors
            })
        }
        
        const isEmployed = value === 'yes'
        dispatch({
            type: "update_current_job",
            payload: { 
                isCurrentlyEmployed: isEmployed,
                // Clear current job data if not employed
                ...(isEmployed ? {} : { company: '', role: '', salary: '' })
            }
        })
    }

    // Handle field blur events (when user leaves the field)
    const handleFieldBlur = (field, index = null) => {
        const fieldKey = index !== null ? `${field}_${index}` : field
        // Mark field as touched
        setTouchedFields(prev => ({ ...prev, [fieldKey]: true }))
        
        // Validate this specific field if it has been touched
        validateSingleField(field, index)
    }

    // Validate a single field
    const validateSingleField = (field, index = null) => {
        const fieldKey = index !== null ? `${field}_${index}` : field
        let error = null

        if (field === 'employmentStatus') {
            if (state.currentJob.isCurrentlyEmployed === undefined || state.currentJob.isCurrentlyEmployed === null) {
                error = t('error-employment-status-required')
            }
        } else if (field === 'currentCompany') {
            if (state.currentJob.isCurrentlyEmployed && (!state.currentJob.company || state.currentJob.company.trim() === '')) {
                error = t('error-current-company-required')
            }
        } else if (field === 'currentRole') {
            if (state.currentJob.isCurrentlyEmployed && (!state.currentJob.role || state.currentJob.role.trim() === '')) {
                error = t('error-current-role-required')
            }
        } else if (field.startsWith('experience_') && index !== null) {
            const exp = state.experiences[index]
            if (!exp) return
            
            const fieldName = field.replace('experience_', '')
            switch (fieldName) {
                case 'company':
                    if (!exp.company || exp.company.trim() === '') {
                        error = t('error-experience-company-required')
                    }
                    break
                case 'role':
                    if (!exp.role || exp.role.trim() === '') {
                        error = t('error-experience-role-required')
                    }
                    break
                case 'fromDate':
                    if (!exp.fromDate) {
                        error = t('error-experience-from-date-required')
                    }
                    break
                case 'toDate':
                    if (!exp.toDate) {
                        error = t('error-experience-to-date-required')
                    }
                    break
            }
        }

        if (error) {
            setFieldErrors(prev => ({ ...prev, [fieldKey]: error }))
        } else {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[fieldKey]
                return newErrors
            })
        }
    }

    const validateStep = useCallback(() => {
        // Mark validation as triggered (when next button is clicked)
        setValidationTriggered(true)
        
        const errors = {}

        // Check if employment status is selected
        if (state.currentJob.isCurrentlyEmployed === undefined || state.currentJob.isCurrentlyEmployed === null) {
            errors.employmentStatus = t('error-employment-status-required')
        }

        // If currently employed, validate current job fields
        if (state.currentJob.isCurrentlyEmployed) {
            if (!state.currentJob.company || state.currentJob.company.trim() === '') {
                errors.currentCompany = t('error-current-company-required')
            }
            if (!state.currentJob.role || state.currentJob.role.trim() === '') {
                errors.currentRole = t('error-current-role-required')
            }
        }

        // Validate previous experience entries (if any exist)
        for (let i = 0; i < state.experiences.length; i++) {
            const exp = state.experiences[i]
            if (!exp.company || exp.company.trim() === '') {
                errors[`experience_company_${i}`] = t('error-experience-company-required')
            }
            if (!exp.role || exp.role.trim() === '') {
                errors[`experience_role_${i}`] = t('error-experience-role-required')
            }
            if (!exp.fromDate) {
                errors[`experience_fromDate_${i}`] = t('error-experience-from-date-required')
            }
            if (!exp.toDate) {
                errors[`experience_toDate_${i}`] = t('error-experience-to-date-required')
            }
        }

        // Update field errors state
        setFieldErrors(errors)
        
        // Set general validation message for parent component
        const hasErrors = Object.keys(errors).length > 0
        if (hasErrors) {
            setValidMessage(t('error-please-fix-errors'))
        } else {
            setValidMessage('')
        }

        return !hasErrors
    }, [state.currentJob, state.experiences, setValidMessage, t])

    // Set the validation function in the parent component
    useEffect(() => {
        checkValidStep(() => validateStep)
    }, [checkValidStep, validateStep])
    
    // Don't validate automatically on form data changes - only validate when triggered


    return (
        <div className="w-full bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-shadow hover:shadow-xl">
            {/* Header */}
            <div className="p-2 sm:p-3 md:p-4 lg:p-6 border-b border-gray-100">
                <div className="text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 rtl-text leading-tight">
                        {t('work-experience')}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg rtl-text leading-relaxed">
                        {t('work-experience-subtitle')}
                    </p>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="space-y-8">
                    {/* Current Employment Section */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4 rtl-text">
                            {t('current-employment')}
                        </h3>
                        
                        <div className="space-y-4">
                            <CheckboxGroup
                                label={t('currently-employed')}
                                options={[
                                    { value: 'yes', label: t('yes-employed') },
                                    { value: 'no', label: t('no-employed') }
                                ]}
                                selectedValue={state.currentJob.isCurrentlyEmployed ? 'yes' : 'no'}
                                onChange={handleEmploymentStatusChange}
                                onBlur={() => handleFieldBlur('employmentStatus')}
                                required={true}
                                error={(touchedFields.employmentStatus || validationTriggered) ? fieldErrors.employmentStatus : null}
                            />

                            {state.currentJob.isCurrentlyEmployed && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 p-4 bg-white rounded-lg border border-blue-100">
                                    <div>
                                        <Input 
                                            label={t('current-company')} 
                                            placeholder={t('enter') + ' ' + t('current-company').toLowerCase()} 
                                            value={state.currentJob.company || ''}
                                            onChange={(e) => handleCurrentJobChange('company', e.target.value)}
                                            onBlur={() => handleFieldBlur('currentCompany')}
                                            required 
                                            error={(touchedFields.currentCompany || validationTriggered) ? fieldErrors.currentCompany : null}
                                        />
                                    </div>
                                    
                                    <div>
                                        <Input 
                                            label={t('current-role')} 
                                            placeholder={t('enter') + ' ' + t('current-role').toLowerCase()} 
                                            value={state.currentJob.role || ''}
                                            onChange={(e) => handleCurrentJobChange('role', e.target.value)}
                                            onBlur={() => handleFieldBlur('currentRole')}
                                            required 
                                            error={(touchedFields.currentRole || validationTriggered) ? fieldErrors.currentRole : null}
                                        />
                                    </div>
                                    
                                    <div>
                                        <Input 
                                            label={t('current-salary')} 
                                            placeholder={t('enter') + ' ' + t('current-salary').toLowerCase()} 
                                            value={state.currentJob.salary || ''}
                                            onChange={(e) => handleCurrentJobChange('salary', e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Previous Experience Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 rtl-text">
                            {t('previous-experience')}
                        </h3>
                        
                        {state.experiences.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <div className="max-w-sm mx-auto">
                                    <h4 className="mt-4 text-lg font-medium text-gray-900 rtl-text">{t('no-experience-yet')}</h4>
                                    <p className="mt-2 text-sm text-gray-500 rtl-text">
                                        {t('add-experience-instruction')}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {state.experiences.map((experience, index) => (
                        <div key={index} className="relative">
                            {/* Experience Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-700 rtl-text">
                                    {t('experience-number')}{index + 1}
                                </h3>
                                <Button
                                    type="button"
                                    onClick={() => handleRemoveExperience(index)}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm text-center"
                                >
                                    {t('remove')}
                                </Button>
                            </div>

                            {/* Experience Form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                <div className="md:col-span-1">
                                                <Input 
                                                    label={t('company-name')} 
                                                    placeholder={t('enter') + ' ' + t('company-name').toLowerCase()} 
                                                    value={experience.company || ''}
                                                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                                    onBlur={() => handleFieldBlur(`experience_company`, index)}
                                                    required 
                                                    error={(touchedFields[`experience_company_${index}`] || validationTriggered) ? fieldErrors[`experience_company_${index}`] : null}
                                                />
                                </div>
                                
                                <div className="md:col-span-1">
                                    <Input 
                                        label={t('location')} 
                                        placeholder={t('enter') + ' ' + t('location').toLowerCase()} 
                                        value={experience.location || ''}
                                        onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                                        required 
                                    />
                                </div>
                                
                                <div className="md:col-span-1">
                                                <Input 
                                                    label={t('job-role')} 
                                                    placeholder={t('enter') + ' ' + t('job-role').toLowerCase()} 
                                                    value={experience.role || ''}
                                                    onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                                                    onBlur={() => handleFieldBlur(`experience_role`, index)}
                                                    required 
                                                    error={(touchedFields[`experience_role_${index}`] || validationTriggered) ? fieldErrors[`experience_role_${index}`] : null}
                                                />
                                </div>
                                
                                <div className="md:col-span-1">
                                    <Input 
                                        label={t('salary')} 
                                        placeholder={t('enter') + ' ' + t('salary').toLowerCase()} 
                                        value={experience.salary || ''}
                                        onChange={(e) => handleExperienceChange(index, 'salary', e.target.value)}
                                        required 
                                    />
                                </div>

                                <div className="md:col-span-1">
                                                <Input 
                                                    type="date"
                                                    label={t('from-date')} 
                                                    placeholder={t('select') + ' ' + t('from-date').toLowerCase()} 
                                                    value={experience.fromDate || ''}
                                                    onChange={(e) => handleExperienceChange(index, 'fromDate', e.target.value)}
                                                    onBlur={() => handleFieldBlur(`experience_fromDate`, index)}
                                                    required 
                                                    error={(touchedFields[`experience_fromDate_${index}`] || validationTriggered) ? fieldErrors[`experience_fromDate_${index}`] : null}
                                                />
                                </div>
                                
                                <div className="md:col-span-1">
                                                <Input 
                                                    type="date"
                                                    label={t('to-date')} 
                                                    placeholder={t('select') + ' ' + t('to-date').toLowerCase()} 
                                                    value={experience.toDate || ''}
                                                    onChange={(e) => handleExperienceChange(index, 'toDate', e.target.value)}
                                                    onBlur={() => handleFieldBlur(`experience_toDate`, index)}
                                                    required   
                                                    error={(touchedFields[`experience_toDate_${index}`] || validationTriggered) ? fieldErrors[`experience_toDate_${index}`] : null}
                                                />
                                </div>
                            </div>
                                </div>
                            ))}
                            </div>
                        )}
                            
                        {/* Add Experience Button */}
                        <div className="flex justify-center pt-6">
                            <Button 
                                type="button" 
                                onClick={handleAddExperience}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-center"
                            >
                                {state.experiences.length === 0 ? t('add-work-experience') : t('add-another-experience')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepExperience