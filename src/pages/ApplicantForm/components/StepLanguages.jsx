import React, { useEffect, useCallback, useState } from 'react'
import Input from "../../../components/Input"
import CheckboxGroup from "../../../components/CheckboxGroup"
import { useForm } from "../../../context/FormContext"
import Button from "../../../components/button"
import { useLanguage } from "../../../context/LanguageContext"

const StepLanguages = ({ checkValidStep, setValidMessage }) => {
    const { state, dispatch } = useForm()
    const { t } = useLanguage()
    
    // State to track individual field errors
    const [fieldErrors, setFieldErrors] = useState({})
    // State to track which fields have been interacted with (touched)
    const [touchedFields, setTouchedFields] = useState({})
    // State to track if validation has been triggered (e.g., by clicking next)
    const [validationTriggered, setValidationTriggered] = useState(false)

    // Language proficiency levels
    const languageLevels = [
        { value: 'مبتدئ', label: t('beginner') },
        { value: 'متوسط', label: t('intermediate') },
        { value: 'متقدم', label: t('advanced') },
        { value: 'طلق', label: t('fluent') },
        { value: 'لغة أم', label: t('native') }
    ]

    const handleEnglishLevelChange = (level) => {
        // Clear the error for this field when user starts selecting
        if (fieldErrors.english) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.english
                return newErrors
            })
        }
        
        dispatch({
            type: "update_english_level",
            payload: level
        })
    }

    const handleAddAdditionalLanguage = () => {
        dispatch({ 
            type: "add_additional_language", 
            payload: { name: '', level: '', id: Date.now() + Math.random() }
        })
    }

    const handleRemoveAdditionalLanguage = (index) => {
        dispatch({ type: "remove_additional_language", payload: index })
    }

    const handleAdditionalLanguageChange = (index, field, value) => {
        // Clear the error for this field when user starts typing
        const fieldKey = `additional_language_${field}_${index}`
        if (fieldErrors[fieldKey]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[fieldKey]
                return newErrors
            })
        }
        
        dispatch({
            type: "update_additional_language",
            payload: {
                index,
                data: { [field]: value }
            }
        })
    }

    // Handle field blur events
    const handleFieldBlur = (field, index = null) => {
        const fieldKey = index !== null ? `additional_language_${field}_${index}` : field
        setTouchedFields(prev => ({ ...prev, [fieldKey]: true }))
        validateSingleField(field, index)
    }

    // Validate a single field
    const validateSingleField = (field, index = null) => {
        const fieldKey = index !== null ? `additional_language_${field}_${index}` : field
        let error = null

        if (field === 'english') {
            if (!state.languages.english || state.languages.english.trim() === '') {
                error = t('error-english-level-required')
            }
        } else if (index !== null) {
            const lang = state.languages.additional[index]
            if (!lang) return
            
            if (field === 'name' && (!lang.name || lang.name.trim() === '')) {
                error = t('error-language-name-required')
            } else if (field === 'level' && (!lang.level || lang.level.trim() === '')) {
                error = t('error-language-level-required')
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
        setValidationTriggered(true)
        const errors = {}

        // Check if English proficiency is selected
        if (!state.languages.english || state.languages.english.trim() === '') {
            errors.english = t('error-english-level-required')
        }

        // Validate additional languages (if any exist)
        for (let i = 0; i < state.languages.additional.length; i++) {
            const lang = state.languages.additional[i]
            if (!lang.name || lang.name.trim() === '') {
                errors[`additional_language_name_${i}`] = t('error-language-name-required')
            }
            if (!lang.level || lang.level.trim() === '') {
                errors[`additional_language_level_${i}`] = t('error-language-level-required')
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
    }, [state.languages, setValidMessage, t])

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
                        {t('language-proficiency')}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg rtl-text leading-relaxed">
                        {t('language-proficiency-subtitle')}
                    </p>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="space-y-8">
                    
                    {/* English Level Section */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4 rtl-text">
                            {t('english-proficiency')}
                        </h3>
                        <p className="text-sm text-blue-700 mb-6 rtl-text">
                            {t('english-proficiency-instruction')}
                        </p>
                        
                        <div className="bg-white p-4 rounded-lg border border-blue-100">
                            <CheckboxGroup
                                label={t('english-level')}
                                selectedValue={state.languages.english || ''}
                                onChange={handleEnglishLevelChange}
                                onBlur={() => handleFieldBlur('english')}
                                options={languageLevels}
                                required={true}
                                error={(touchedFields.english || validationTriggered) ? fieldErrors.english : null}
                            />
                        </div>
                    </div>

                    {/* Additional Languages Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 rtl-text">
                            {t('additional-languages')}
                        </h3>
                        <p className="text-sm text-gray-600 mb-6 rtl-text">
                            {t('additional-languages-instruction')}
                        </p>
                        
                        {state.languages.additional.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <div className="max-w-sm mx-auto">
                                    <h4 className="mt-4 text-lg font-medium text-gray-900 rtl-text">{t('no-additional-languages')}</h4>
                                    <p className="mt-2 text-sm text-gray-500 rtl-text">
                                        {t('add-languages-instruction')}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {state.languages.additional.map((language, index) => (
                                    <div key={language.id || `additional-language-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-md font-semibold text-gray-700 rtl-text">
                                                {t('language-number')}{index + 1}
                                            </h4>
                                            <Button
                                                type="button"
                                                onClick={() => handleRemoveAdditionalLanguage(index)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm text-center"
                                            >
                                                {t('remove')}
                                            </Button>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <Input 
                                                    label={t('language-name')} 
                                                    placeholder={t('language-name-placeholder')} 
                                                    value={language.name || ''}
                                                    onChange={(e) => handleAdditionalLanguageChange(index, 'name', e.target.value)}
                                                    onBlur={() => handleFieldBlur('name', index)}
                                                    required 
                                                    error={(touchedFields[`additional_language_name_${index}`] || validationTriggered) ? fieldErrors[`additional_language_name_${index}`] : null}
                                                />
                                            </div>
                                            
                                            <div>
                                                <CheckboxGroup
                                                    label={t('proficiency-level')}
                                                    selectedValue={language.level || ''}
                                                    onChange={(value) => handleAdditionalLanguageChange(index, 'level', value)}
                                                    onBlur={() => handleFieldBlur('level', index)}
                                                    options={languageLevels}
                                                    required={true}
                                                    error={(touchedFields[`additional_language_level_${index}`] || validationTriggered) ? fieldErrors[`additional_language_level_${index}`] : null}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                            
                        {/* Add Additional Language Button */}
                        <div className="flex justify-center pt-6">
                            <Button 
                                type="button" 
                                onClick={handleAddAdditionalLanguage}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-center"
                            >
                                {state.languages.additional.length === 0 ? t('add-additional-language') : t('add-another-language')}
                            </Button>
                        </div>
                    </div>

                    {/* Languages Summary */}
                    {(state.languages.english || state.languages.additional.length > 0) && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-4">
                                Language Summary
                            </h3>
                            
                            {/* English Summary */}
                            {state.languages.english && (
                                <div className="mb-4">
                                    <h4 className="font-medium text-green-700 mb-2">English:</h4>
                                    <div className="bg-white p-3 rounded border border-green-100">
                                        <span className="text-lg font-medium text-gray-700">English: </span>
                                        <span className="text-lg text-green-600 capitalize font-semibold">
                                            {state.languages.english}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Additional Languages Summary */}
                            {state.languages.additional.length > 0 && (
                                <div>
                                    <h4 className="font-medium text-green-700 mb-2">Additional Languages:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {state.languages.additional.map((language, index) => (
                                            language.name && language.level && (
                                                <div key={index} className="bg-white p-3 rounded border border-green-100">
                                                    <span className="text-sm font-medium text-gray-700">{language.name}: </span>
                                                    <span className="text-sm text-green-600 capitalize font-semibold">
                                                        {language.level}
                                                    </span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StepLanguages

