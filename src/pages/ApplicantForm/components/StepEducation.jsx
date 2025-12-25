import React, { useEffect, useCallback, useState } from 'react'
import Input from "../../../components/Input"
import Select from "../../../components/Select"
import { useForm } from "../../../context/FormContext"
import Button from "../../../components/button"
import { useLanguage } from "../../../context/LanguageContext"

const StepEducation = ({ checkValidStep, setValidMessage }) => {
    const { state, dispatch } = useForm()
    const { t } = useLanguage()
    
    // State to track individual field errors
    const [fieldErrors, setFieldErrors] = useState({})
    // State to track which fields have been interacted with (touched)
    const [touchedFields, setTouchedFields] = useState({})
    // State to track if validation has been triggered (e.g., by clicking next)
    const [validationTriggered, setValidationTriggered] = useState(false)

    const handleAddEducation = () => {
        dispatch({ type: "add_education" })
    }

    const handleRemoveEducation = (index) => {
        dispatch({ type: "remove_education", payload: index })
    }

    const handleEducationChange = (index, field, value) => {
        // Clear the error for this field when user starts typing
        const fieldKey = `education_${field}_${index}`
        if (fieldErrors[fieldKey]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[fieldKey]
                return newErrors
            })
        }
        
        dispatch({
            type: "update_education",
            payload: {
                index,
                data: { [field]: value }
            }
        })
    }

    const handleEducationStatusChange = (value) => {
        dispatch({ type: 'update_education_status', payload: value })
        
        // Automatically add an education entry if none exists
        if (value && state.education.length === 0) {
            dispatch({ type: "add_education" })
        }
    }

    // Handle field blur events
    const handleFieldBlur = (field, index) => {
        const fieldKey = `education_${field}_${index}`
        setTouchedFields(prev => ({ ...prev, [fieldKey]: true }))
        validateSingleField(field, index)
    }

    const validateSingleField = (field, index) => {
        if (field === 'educationStatus') {
            // Handle education status validation
            if (!state.educationStatus || state.educationStatus.trim() === '') {
                setFieldErrors(prev => ({ ...prev, educationStatus: t('error-education-status-required') }))
            } else {
                setFieldErrors(prev => {
                    const newErrors = { ...prev }
                    delete newErrors.educationStatus
                    return newErrors
                })
            }
            return
        }
        
        const fieldKey = `education_${field}_${index}`
        const edu = state.education[index]
        if (!edu) return
        
        let error = null
        switch (field) {
            case 'institution':
                if (!edu.institution || edu.institution.trim() === '') {
                    error = t('error-institution-required')
                }
                break
            case 'department':
                if (!edu.department || edu.department.trim() === '') {
                    error = t('error-department-required')
                }
                break
            case 'grade':
                if (!edu.grade || edu.grade.trim() === '') {
                    error = t('error-grade-required')
                }
                break
            case 'fromDate':
                if (!edu.fromDate) {
                    error = t('error-education-from-date-required')
                }
                break
            case 'toDate':
                if (!edu.toDate) {
                    error = t('error-education-to-date-required')
                }
                break
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
        setValidationTriggered(true)
        const errors = {}

        // Validate education status first
        if (!state.educationStatus || state.educationStatus.trim() === '') {
            errors.educationStatus = t('error-education-status-required')
        }

        // Require at least one education entry
        if (state.education.length === 0) {
            setValidMessage(t('error-education-required'))
            return false
        }

        // Validate each education entry
        for (let i = 0; i < state.education.length; i++) {
            const edu = state.education[i]
            if (!edu.institution || edu.institution.trim() === '') {
                errors[`education_institution_${i}`] = t('error-institution-required')
            }
            if (!edu.department || edu.department.trim() === '') {
                errors[`education_department_${i}`] = t('error-department-required')
            }
            if (!edu.grade || edu.grade.trim() === '') {
                errors[`education_grade_${i}`] = t('error-grade-required')
            }
            if (!edu.fromDate) {
                errors[`education_fromDate_${i}`] = t('error-education-from-date-required')
            }
            if (!edu.toDate) {
                errors[`education_toDate_${i}`] = t('error-education-to-date-required')
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
    }, [state.education, state.educationStatus, setValidMessage, t])

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
                        {t('education-title')}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg rtl-text leading-relaxed">
                        {t('education-subtitle')}
                    </p>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="space-y-8">
                    {/* Education Status - Global */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 rtl-text">
                            {t('education-status')}
                        </h3>
                        <div className="max-w-md">
                            <Select
                                label={t('education-status')}
                                value={state.educationStatus || ''}
                                onChange={(e) => handleEducationStatusChange(e.target.value)}
                                onBlur={() => validateSingleField('educationStatus')}
                                options={[
                                    { value: 'higher-qualification', label: t('higher-qualification') },
                                    { value: 'above-intermediate-qualification', label: t('above-intermediate-qualification') },
                                    { value: 'preparatory', label: t('preparatory') },
                                    { value: 'primary', label: t('primary') },
                                    { value: 'illiterate', label: t('illiterate') },
                                    { value: 'no-qualification', label: t('no-qualification') }
                                ]}
                                required
                                error={fieldErrors.educationStatus}
                            />
                        </div>
                    </div>

                    {/* Education Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 rtl-text">
                            {t('educational-background')}
                        </h3>
                        
                        {state.education.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <div className="max-w-sm mx-auto">
                                    <h4 className="mt-4 text-lg font-medium text-gray-900 rtl-text">{t('no-education-yet')}</h4>
                                    <p className="mt-2 text-sm text-gray-500 rtl-text">
                                        {t('add-education-instruction')}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {state.education.map((education, index) => (
                                    <div key={index} className="relative">
                                        {/* Education Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-700 rtl-text">
                                                {t('education-number')}{index + 1}
                                            </h3>
                                            <Button
                                                type="button"
                                                onClick={() => handleRemoveEducation(index)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm text-center"
                                            >
                                                {t('remove')}
                                            </Button>
                                        </div>

                                        {/* Education Form */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                            <div className="md:col-span-1">
                                                <Input 
                                                    label={t('institution-name')} 
                                                    placeholder={t('enter') + ' ' + t('institution-name').toLowerCase()} 
                                                    value={education.institution || ''}
                                                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                    onBlur={() => handleFieldBlur('institution', index)}
                                                    required 
                                                    error={(touchedFields[`education_institution_${index}`] || validationTriggered) ? fieldErrors[`education_institution_${index}`] : null}
                                                />
                                            </div>
                                            
                                            <div className="md:col-span-1">
                                                <Input 
                                                    label={t('department-field')} 
                                                    placeholder={t('enter') + ' ' + t('department-field').toLowerCase()} 
                                                    value={education.department || ''}
                                                    onChange={(e) => handleEducationChange(index, 'department', e.target.value)}
                                                    onBlur={() => handleFieldBlur('department', index)}
                                                    required 
                                                    error={(touchedFields[`education_department_${index}`] || validationTriggered) ? fieldErrors[`education_department_${index}`] : null}
                                                />
                                            </div>
                                            
                                            <div className="md:col-span-1">
                                                <Input 
                                                    label={t('grade-gpa')} 
                                                    placeholder={t('enter') + ' ' + t('grade-gpa').toLowerCase()} 
                                                    value={education.grade || ''}
                                                    onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                                                    onBlur={() => handleFieldBlur('grade', index)}
                                                    required 
                                                    error={(touchedFields[`education_grade_${index}`] || validationTriggered) ? fieldErrors[`education_grade_${index}`] : null}
                                                />
                                            </div>

                                            <div className="md:col-span-1">
                                                {/* Empty div for spacing */}
                                            </div>

                                            <div className="md:col-span-1">
                                                <Input 
                                                    type="date"
                                                    label={t('from-date')} 
                                                    placeholder={t('select') + ' ' + t('from-date').toLowerCase()} 
                                                    value={education.fromDate || ''}
                                                    onChange={(e) => handleEducationChange(index, 'fromDate', e.target.value)}
                                                    onBlur={() => handleFieldBlur('fromDate', index)}
                                                    required 
                                                    error={(touchedFields[`education_fromDate_${index}`] || validationTriggered) ? fieldErrors[`education_fromDate_${index}`] : null}
                                                />
                                            </div>
                                            
                                            <div className="md:col-span-1">
                                                <Input 
                                                    type="date"
                                                    label={t('to-date')} 
                                                    placeholder={t('select') + ' ' + t('to-date').toLowerCase()} 
                                                    value={education.toDate || ''}
                                                    onChange={(e) => handleEducationChange(index, 'toDate', e.target.value)}
                                                    onBlur={() => handleFieldBlur('toDate', index)}
                                                    required   
                                                    error={(touchedFields[`education_toDate_${index}`] || validationTriggered) ? fieldErrors[`education_toDate_${index}`] : null}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                            
                        {/* Add Education Button */}
                        <div className="flex justify-center pt-6">
                            <Button 
                                type="button" 
                                onClick={handleAddEducation}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-center"
                            >
                                {state.education.length === 0 ? t('add-education') : t('add-another-education')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepEducation

