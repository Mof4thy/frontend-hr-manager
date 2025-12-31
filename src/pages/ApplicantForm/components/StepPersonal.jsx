import React, { useEffect, useCallback, useState } from 'react'
import Input from "../../../components/Input"
import Select from "../../../components/Select"
import CheckboxGroup from "../../../components/CheckboxGroup"
import { useForm } from "../../../context/FormContext"
import { useLanguage } from "../../../context/LanguageContext"
import { governorateOptions, areaOptions } from "../../../data/staticData"

const StepPersonal = ({ checkValidStep, setValidMessage }) =>{

    const { state, dispatch } = useForm()
    const { t } = useLanguage()
    
    // State to track individual field errors
    const [fieldErrors, setFieldErrors] = useState({})
    // State to track which fields have been interacted with (touched)
    const [touchedFields, setTouchedFields] = useState({})
    // State to track if validation has been triggered (e.g., by clicking next)
    const [validationTriggered, setValidationTriggered] = useState(false)

    // Calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return null
        
        const today = new Date()
        const birthDate = new Date(dateOfBirth)
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        
        return age
    }

    // Handle input changes for individual fields
    const handleInputChange = (field, value) => {
        // Clear the error for this field when user starts typing
        if (fieldErrors[field]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
        
        // Special handling for gender field changes
        if (field === 'gender') {
            const currentMaritalStatus = state.personalInfo.socialStatus
            
            // Clear marital status if it's incompatible with the new gender
            if (value === 'ذكر' && currentMaritalStatus === 'أرملة') {
                // Male selected but has female widowed status - clear it
                dispatch({
                    type: "update_personal_info",
                    payload: { [field]: value, socialStatus: '' }
                })
                return
            } else if (value === 'أنثى' && currentMaritalStatus === 'أرمل') {
                // Female selected but has male widowed status - clear it
                dispatch({
                    type: "update_personal_info",
                    payload: { [field]: value, socialStatus: '' }
                })
                return
            }
        }
        
        // Special handling for comments field
        if (field === 'comments') {
            dispatch({
                type: "update_comments",
                payload: value
            })
            return
        }
        
        // Special handling for date of birth - calculate and store age
        if (field === 'dateOfBirth') {
            const calculatedAge = calculateAge(value)
            dispatch({
                type: "update_personal_info",
                payload: { [field]: value, age: calculatedAge }
            })
            return
        }
        
        dispatch({
            type: "update_personal_info",
            payload: { [field]: value }
        })
    }

    // Handle field blur events (when user leaves the field)
    const handleFieldBlur = (field) => {
        // Mark field as touched
        setTouchedFields(prev => ({ ...prev, [field]: true }))
        
        // Validate this specific field if it has been touched
        validateSingleField(field)
    }

    // Validate a single field
    const validateSingleField = (field) => {
        const personalInfo = state.personalInfo
        let error = null

        switch (field) {
            case 'name':
                if (!personalInfo.name || personalInfo.name.trim() === '') {
                    error = t('error-name-required')
                } else if (personalInfo.name.length < 3) {
                    error = t('error-name-min-length')
                }
                break
            case 'dateOfBirth':
                if (!personalInfo.dateOfBirth) {
                    error = t('error-date-of-birth-required')
                }
                break
            case 'gender':
                if (!personalInfo.gender) {
                    error = t('error-gender-required')
                }
                break
            case 'governorate':
                if (!personalInfo.governorate || personalInfo.governorate.trim() === '') {
                    error = t('error-governorate-required')
                }
                break
            case 'area':
                if (!personalInfo.area) {
                    error = t('error-area-required')
                }
                break
            case 'address':
                if (!personalInfo.address || personalInfo.address.trim() === '') {
                    error = t('error-address-required')
                }
                break
            case 'nationalId':
                if (!personalInfo.nationalId || personalInfo.nationalId.trim() === '') {
                    error = t('error-national-id-required')
                } else if (personalInfo.nationalId.length !== 14) {
                    error = t('error-national-id-length')
                }
                break
            case 'nationality':
                if (!personalInfo.nationality || personalInfo.nationality.trim() === '') {
                    error = t('error-nationality-required')
                }
                break
            case 'whatsappNumber':
                if (!personalInfo.whatsappNumber || personalInfo.whatsappNumber.trim() === '') {
                    error = t('error-phone-number-required')
                } else if (personalInfo.whatsappNumber.length !== 11) {
                    error = t('error-phone-number-length')
                }
                break
            case 'mobileNumber':
                if (!personalInfo.mobileNumber || personalInfo.mobileNumber.trim() === '') {
                    error = t('error-mobile-number-required')
                } else if (personalInfo.mobileNumber.length !== 11) {
                    error = t('error-mobile-number-length')
                }
                break
            case 'emergencyNumber':
                if (personalInfo.emergencyNumber && personalInfo.emergencyNumber.length !== 11) {
                    error = t('error-emergency-number-length')
                }
                break
            case 'email':
                // Email is optional, only validate format if provided
                if (personalInfo.email && personalInfo.email.trim() !== '') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailRegex.test(personalInfo.email)) {
                        error = t('error-email-invalid')
                    }
                }
                break
            case 'militaryServiceStatus':
                if (!personalInfo.militaryServiceStatus) {
                    error = t('error-military-service-required')
                }
                break
            case 'socialStatus':
                if (!personalInfo.socialStatus) {
                    error = t('error-marital-status-required')
                }
                break
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
        // Mark validation as triggered (when next button is clicked)
        setValidationTriggered(true)
        
        const personalInfo = state.personalInfo
        const errors = {}
        
        // Validate all fields using the same logic as validateSingleField
        let fieldsToValidate = [
            'name', 'dateOfBirth', 'gender', 'governorate', 'area', 'address', 'nationalId', 
            'nationality', 'phoneNumber', 'mobileNumber', 'emergencyNumber',
            'socialStatus'
        ]
        
        // Add email to validation only if it has a value (for format validation)
        if (personalInfo.email && personalInfo.email.trim() !== '') {
            fieldsToValidate.push('email')
        }
        
        // Add military service validation only for males
        if (personalInfo.gender === 'ذكر') {
            fieldsToValidate.push('militaryServiceStatus')
        }
        
        fieldsToValidate.forEach(field => {
            let error = null
            
            switch (field) {
                case 'name':
                    if (!personalInfo.name || personalInfo.name.trim() === '') {
                        error = t('error-name-required')
                    } else if (personalInfo.name.length < 3) {
                        error = t('error-name-min-length')
                    }
                    break
                case 'dateOfBirth':
                    if (!personalInfo.dateOfBirth) {
                        error = t('error-date-of-birth-required')
                    }
                    break
                case 'gender':
                    if (!personalInfo.gender) {
                        error = t('error-gender-required')
                    }
                    break
                case 'governorate':
                    if (!personalInfo.governorate || personalInfo.governorate.trim() === '') {
                        error = t('error-governorate-required')
                    }
                    break
                case 'area':
                    if (!personalInfo.area) {
                        error = t('error-area-required')
                    }
                    break
                case 'address':
                    if (!personalInfo.address || personalInfo.address.trim() === '') {
                        error = t('error-address-required')
                    }
                    break
                case 'nationalId':
                    if (!personalInfo.nationalId || personalInfo.nationalId.trim() === '') {
                        error = t('error-national-id-required')
                    } else if (personalInfo.nationalId.length !== 14) {
                        error = t('error-national-id-length')
                    }
                    break
                case 'nationality':
                    if (!personalInfo.nationality || personalInfo.nationality.trim() === '') {
                        error = t('error-nationality-required')
                    }
                    break
                case 'whatsappNumber':
                    if (!personalInfo.whatsappNumber || personalInfo.whatsappNumber.trim() === '') {
                        error = t('error-phone-number-required')
                    } else if (personalInfo.whatsappNumber.length !== 11) {
                        error = t('error-phone-number-length')
                    }
                    break
                case 'mobileNumber':
                    if (!personalInfo.mobileNumber || personalInfo.mobileNumber.trim() === '') {
                        error = t('error-mobile-number-required')
                    } else if (personalInfo.mobileNumber.length !== 11) {
                        error = t('error-mobile-number-length')
                    }
                    break
                case 'emergencyNumber':
                    if (personalInfo.emergencyNumber && personalInfo.emergencyNumber.length !== 11) {
                        error = t('error-emergency-number-length')
                    }
                    break
                case 'email':
                    // Email is optional, only validate format if provided
                    if (personalInfo.email && personalInfo.email.trim() !== '') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        if (!emailRegex.test(personalInfo.email)) {
                            error = t('error-email-invalid')
                        }
                    }
                    break
                case 'militaryServiceStatus':
                    if (!personalInfo.militaryServiceStatus) {
                        error = t('error-military-service-required')
                    }
                    break
                case 'socialStatus':
                    if (!personalInfo.socialStatus) {
                        error = t('error-marital-status-required')
                    }
                    break
            }
            
            if (error) {
                errors[field] = error
            }
        })
        
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
    }, [state.personalInfo, setValidMessage, t])

    // Set the validation function in the parent component
    useEffect(() => {
        checkValidStep(() => validateStep)
    }, [checkValidStep, validateStep])
    
    // Don't validate automatically on form data changes - only validate when triggered


    // Options for dropdowns and checkboxes
    const militaryStatusOptions = [
        { value: 'معفي نهائياً', label: t('permanently-exempt') || 'Permanently Exempt' },
        { value: 'مؤجل', label: t('deferred') || 'Deferred' },
        { value: 'أدى الخدمة', label: t('completed-service') || 'Completed Service' },
        { value: 'معفي مؤقتاً', label: t('temporarily-exempt') || 'Temporarily Exempt' }
    ]

    // Area options with translated "Other" option
    const areaOptionsWithOther = areaOptions.map(option => 
        option.value === 'أخرى' 
            ? { ...option, label: t('other') || 'Other' }
            : option
    )

    // Dynamic social status options based on gender
    const getSocialStatusOptions = () => {
        const baseOptions = [
            { value: 'أعزب', label: t('single') || 'Single' },
            { value: 'متزوج', label: t('married') || 'Married' },
            { value: 'مطلق', label: t('divorced') || 'Divorced' }
        ]
        
        // Add gender-specific widowed option
        if (state.personalInfo.gender === 'ذكر') {
            baseOptions.push({ value: 'أرمل', label: t('widowed-male') || 'Widowed' })
        } else if (state.personalInfo.gender === 'أنثى') {
            baseOptions.push({ value: 'أرملة', label: t('widowed-female') || 'Widowed' })
        } else {
            // Default to generic widowed if gender not selected yet
            baseOptions.push({ value: 'أرمل', label: t('widowed') || 'Widowed' })
        }
        
        return baseOptions
    }

    const hasVehicleOptions = [
        { value: 'نعم', label: t('yes') },
        { value: 'لا', label: t('no') }
    ]

    const drivingLicenseOptions = [
        { value: 'لا يوجد', label: t('no-license') || 'No License' },
        { value: 'رخصة خاصة', label: t('private-license') || 'Private License' },
        { value: 'رخصة مهنية - مستوى 1', label: t('professional-license-level-1') || 'Professional License - Level 1' },
        { value: 'رخصة مهنية - مستوى 2', label: t('professional-license-level-2') || 'Professional License - Level 2' },
        { value: 'رخصة مهنية - مستوى 3', label: t('professional-license-level-3') || 'Professional License - Level 3' },
        { value: 'رخصة دراجة نارية', label: t('motorcycle-license') || 'Motorcycle License' }
    ]

    return (
        <div className="w-full bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-shadow hover:shadow-xl">
            
            {/* Form Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    
                    {/* Name */}
                    <div className="md:col-span-2">
                        <Input 
                            label={t('name')} 
                            type="text"
                            value={state.personalInfo.name || ''} 
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            onBlur={() => handleFieldBlur('name')}
                            placeholder={t('enter') + ' ' + t('name').toLowerCase()}
                            required
                            error={(touchedFields.name || validationTriggered) ? fieldErrors.name : null}
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>                       
                        <Input 
                            type="date"
                            label={t('date-of-birth')} 
                            value={state.personalInfo.dateOfBirth || ''} 
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            onBlur={() => handleFieldBlur('dateOfBirth')}
                            required
                            error={(touchedFields.dateOfBirth || validationTriggered) ? fieldErrors.dateOfBirth : null}
                        />
                        {/* Display calculated age */}
                        {state.personalInfo.dateOfBirth && (
                            <div className="mt-2 text-sm text-gray-600">
                                <span className="font-medium">{t('age')}:</span> {calculateAge(state.personalInfo.dateOfBirth)} {t('years-old')}
                            </div>
                        )}
                    </div>

                    {/* Gender */}
                    <div>
                        <CheckboxGroup
                            label={t('gender')}
                            options={[
                                { value: 'ذكر', label: t('male') },
                                { value: 'أنثى', label: t('female') }
                            ]}
                            selectedValue={state.personalInfo.gender || ''}
                            onChange={(value) => handleInputChange('gender', value)}
                            onBlur={() => handleFieldBlur('gender')}
                            required
                            error={(touchedFields.gender || validationTriggered) ? fieldErrors.gender : null}
                        />
                    </div>

                    {/* Governorate */}
                    <div>
                        <Select
                            label={t('governorate')}
                            value={state.personalInfo.governorate || ''}
                            onChange={(e) => handleInputChange('governorate', e.target.value)}
                            onBlur={() => handleFieldBlur('governorate')}
                            options={governorateOptions}
                            required
                            error={(touchedFields.governorate || validationTriggered) ? fieldErrors.governorate : null}
                        />
                    </div>

                    {/* Area */}
                    <div>
                        <Select
                            label={t('area')}
                            value={state.personalInfo.area || ''}
                            onChange={(e) => handleInputChange('area', e.target.value)}
                            onBlur={() => handleFieldBlur('area')}
                            options={areaOptionsWithOther}
                            required
                            error={(touchedFields.area || validationTriggered) ? fieldErrors.area : null}
                        />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <Input 
                            label={t('address')} 
                            type="text"
                            value={state.personalInfo.address || ''} 
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            onBlur={() => handleFieldBlur('address')}
                            placeholder={t('enter') + ' ' + t('address').toLowerCase()}
                            required
                            error={(touchedFields.address || validationTriggered) ? fieldErrors.address : null}
                        />
                    </div>

                    {/* National ID */}
                    <div>
                        <Input 
                            label={t('national-id')} 
                            type="number"
                            value={state.personalInfo.nationalId || ''} 
                            onChange={(e) => handleInputChange('nationalId', e.target.value)}
                            onBlur={() => handleFieldBlur('nationalId')}
                            placeholder={t('enter') + ' ' + t('national-id').toLowerCase()}
                            required
                            error={(touchedFields.nationalId || validationTriggered) ? fieldErrors.nationalId : null}
                        />
                    </div>

                    {/* Nationality */}
                    <div>
                        <Input 
                            label={t('nationality')} 
                            type="text"
                            value={state.personalInfo.nationality || ''} 
                            onChange={(e) => handleInputChange('nationality', e.target.value)}
                            onBlur={() => handleFieldBlur('nationality')}
                            placeholder={t('enter') + ' ' + t('nationality').toLowerCase()}
                            required
                            error={(touchedFields.nationality || validationTriggered) ? fieldErrors.nationality : null}
                        />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                        <Input 
                            type="tel"
                            label={t('phone-number')} 
                            value={state.personalInfo.whatsappNumber || ''} 
                            onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                            onBlur={() => handleFieldBlur('whatsappNumber')}
                            placeholder={t('enter') + ' ' + t('phone-number').toLowerCase()}
                            required
                            error={(touchedFields.whatsappNumber || validationTriggered) ? fieldErrors.whatsappNumber : null}
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <Input 
                            type="tel"
                            label={t('mobile-number')} 
                            value={state.personalInfo.mobileNumber || ''} 
                            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                            onBlur={() => handleFieldBlur('mobileNumber')}
                            placeholder={t('enter') + ' ' + t('mobile-number').toLowerCase()}
                            required
                            error={(touchedFields.mobileNumber || validationTriggered) ? fieldErrors.mobileNumber : null}
                        />
                    </div>

                    {/* Emergency Number */}
                    <div className="md:col-span-1">
                        <Input 
                            type="tel"
                            label={t('emergency-contact')} 
                            value={state.personalInfo.emergencyNumber || ''} 
                            onChange={(e) => handleInputChange('emergencyNumber', e.target.value)}
                            onBlur={() => handleFieldBlur('emergencyNumber')}
                            placeholder={t('enter') + ' ' + t('emergency-contact').toLowerCase()}
                            error={(touchedFields.emergencyNumber || validationTriggered) ? fieldErrors.emergencyNumber : null}
                        />
                    </div>

                    {/* Email Address */}
                    <div className="md:col-span-1">
                        <Input 
                            type="email"
                            label={t('email')} 
                            value={state.personalInfo.email || ''} 
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onBlur={() => handleFieldBlur('email')}
                            placeholder={t('enter') + ' ' + t('email').toLowerCase()}
                            error={(touchedFields.email || validationTriggered) ? fieldErrors.email : null}
                        />
                    </div>

                    {/* Military Service Status - Only for Males */}
                    {state.personalInfo.gender === 'ذكر' && (
                        <div className="md:col-span-2">
                            <CheckboxGroup
                                label={t('military-service')}
                                options={militaryStatusOptions}
                                selectedValue={state.personalInfo.militaryServiceStatus || ''}
                                onChange={(value) => handleInputChange('militaryServiceStatus', value)}
                                onBlur={() => handleFieldBlur('militaryServiceStatus')}
                                required
                                error={(touchedFields.militaryServiceStatus || validationTriggered) ? fieldErrors.militaryServiceStatus : null}
                            />
                        </div>
                    )}

                    {/* Social Status */}
                    <div className="md:col-span-2">
                        <CheckboxGroup
                            label={t('marital-status')}
                            options={getSocialStatusOptions()}
                            selectedValue={state.personalInfo.socialStatus || ''}
                            onChange={(value) => handleInputChange('socialStatus', value)}
                            onBlur={() => handleFieldBlur('socialStatus')}
                            required
                            error={(touchedFields.socialStatus || validationTriggered) ? fieldErrors.socialStatus : null}
                        />
                    </div>

                    {/* Has Vehicle */}
                    <div>
                        <CheckboxGroup
                            label={t('own-vehicle')}
                            options={hasVehicleOptions}
                            selectedValue={state.personalInfo.hasVehicle || ''}
                            onChange={(value) => handleInputChange('hasVehicle', value)}
                        />
                    </div>

                    {/* Driving License */}
                    <div>
                        <Select
                            label={t('driving-license')}
                            value={state.personalInfo.drivingLicense || ''}
                            onChange={(e) => handleInputChange('drivingLicense', e.target.value)}
                            options={drivingLicenseOptions}
                        />
                    </div>

                    {/* Additional Comments */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('comments')} <span className="text-gray-400">({t('optional')})</span>
                        </label>
                        <p className="text-sm text-gray-500 mb-3">
                            {t('comments-subtitle')}
                        </p>
                        <textarea
                            value={state.comments || ''}
                            onChange={(e) => handleInputChange('comments', e.target.value)}
                            placeholder={t('comments-placeholder')}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical min-h-[100px] max-h-[200px]"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StepPersonal