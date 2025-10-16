import React, { useEffect, useCallback, useState } from 'react'
import Input from "../../../components/Input"
import Select from "../../../components/Select"
import CheckboxGroup from "../../../components/CheckboxGroup"
import { useForm } from "../../../context/FormContext"
import { useLanguage } from "../../../context/LanguageContext"

const StepPersonal = ({ checkValidStep, setValidMessage }) =>{

    const { state, dispatch } = useForm()
    const { t } = useLanguage()
    
    // State to track individual field errors
    const [fieldErrors, setFieldErrors] = useState({})
    // State to track which fields have been interacted with (touched)
    const [touchedFields, setTouchedFields] = useState({})
    // State to track if validation has been triggered (e.g., by clicking next)
    const [validationTriggered, setValidationTriggered] = useState(false)

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
            case 'placeOfBirth':
                if (!personalInfo.placeOfBirth || personalInfo.placeOfBirth.trim() === '') {
                    error = t('error-place-of-birth-required')
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
        const fieldsToValidate = [
            'name', 'dateOfBirth', 'placeOfBirth', 'address', 'nationalId', 
            'nationality', 'phoneNumber', 'mobileNumber', 'emergencyNumber',
            'militaryServiceStatus', 'socialStatus'
        ]
        
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
                case 'placeOfBirth':
                    if (!personalInfo.placeOfBirth || personalInfo.placeOfBirth.trim() === '') {
                        error = t('error-place-of-birth-required')
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

    const socialStatusOptions = [
        { value: 'أعزب', label: t('single') || 'Single' },
        { value: 'متزوج', label: t('married') || 'Married' },
        { value: 'مطلق', label: t('divorced') || 'Divorced' },
        { value: 'أرمل', label: t('widowed') || 'Widowed' },
    ]

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
                    </div>

                    {/* Place of Birth */}
                    <div>
                        <Input 
                            label={t('place-of-birth')} 
                            type="text"
                            value={state.personalInfo.placeOfBirth || ''} 
                            onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                            onBlur={() => handleFieldBlur('placeOfBirth')}
                            placeholder={t('enter') + ' ' + t('place-of-birth').toLowerCase()}
                            required
                            error={(touchedFields.placeOfBirth || validationTriggered) ? fieldErrors.placeOfBirth : null}
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

                    {/* Military Service Status */}
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

                    {/* Social Status */}
                    <div className="md:col-span-2">
                        <CheckboxGroup
                            label={t('marital-status')}
                            options={socialStatusOptions}
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
                </form>
            </div>
        </div>
    )
}

export default StepPersonal