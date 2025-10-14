import React, { useEffect, useCallback, useState } from 'react'
import Input from "../../../components/Input"
import CheckboxGroup from "../../../components/CheckboxGroup"
import { useForm } from "../../../context/FormContext"
import Button from "../../../components/button"
import { useLanguage } from "../../../context/LanguageContext"

const StepSkills = ({ checkValidStep, setValidMessage }) => {
    const { state, dispatch } = useForm()
    const { t } = useLanguage()
    
    // State to track individual field errors
    const [fieldErrors, setFieldErrors] = useState({})
    // State to track which fields have been interacted with (touched)
    const [touchedFields, setTouchedFields] = useState({})
    // State to track if validation has been triggered (e.g., by clicking next)
    const [validationTriggered, setValidationTriggered] = useState(false)

    // Skill level options
    const skillLevels = [
        { value: 'ضعيف', label: t('weak') },
        { value: 'جيد', label: t('good') },
        { value: 'جيد جداً', label: t('very-good') },
        { value: 'ممتاز', label: t('excellent') }
    ]

    // Predefined skills
    const predefinedSkills = [
        { key: 'word', label: t('microsoft-word') },
        { key: 'excel', label: t('microsoft-excel') },
        { key: 'powerpoint', label: t('microsoft-powerpoint') }
    ]

    const handlePredefinedSkillChange = (skill, level) => {
        // Clear the error for this field when user starts selecting
        if (fieldErrors[skill]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[skill]
                return newErrors
            })
        }
        
        dispatch({
            type: "update_predefined_skill",
            payload: { skill, level }
        })
    }

    const handleAddCustomSkill = () => {
        dispatch({ 
            type: "add_custom_skill", 
            payload: { name: '', level: '', id: Date.now() + Math.random() }
        })
    }

    const handleRemoveCustomSkill = (index) => {
        dispatch({ type: "remove_custom_skill", payload: index })
    }

    const handleCustomSkillChange = (index, field, value) => {
        // Clear the error for this field when user starts typing
        const fieldKey = `custom_skill_${field}_${index}`
        if (fieldErrors[fieldKey]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[fieldKey]
                return newErrors
            })
        }
        
        dispatch({
            type: "update_custom_skill",
            payload: {
                index,
                data: { [field]: value }
            }
        })
    }

    // Handle field blur events
    const handleFieldBlur = (field, index = null) => {
        const fieldKey = index !== null ? `custom_skill_${field}_${index}` : field
        setTouchedFields(prev => ({ ...prev, [fieldKey]: true }))
        validateSingleField(field, index)
    }

    // Validate a single field
    const validateSingleField = (field, index = null) => {
        const fieldKey = index !== null ? `custom_skill_${field}_${index}` : field
        let error = null

        if (index === null) {
            // Predefined skills validation
            if (field === 'word' && (!state.skills.predefined.word || state.skills.predefined.word.trim() === '')) {
                error = t('error-word-proficiency-required')
            } else if (field === 'excel' && (!state.skills.predefined.excel || state.skills.predefined.excel.trim() === '')) {
                error = t('error-excel-proficiency-required')
            } else if (field === 'powerpoint' && (!state.skills.predefined.powerpoint || state.skills.predefined.powerpoint.trim() === '')) {
                error = t('error-powerpoint-proficiency-required')
            }
        } else {
            // Custom skills validation
            const skill = state.skills.custom[index]
            if (!skill) return
            
            if (field === 'name' && (!skill.name || skill.name.trim() === '')) {
                error = t('error-skill-name-required')
            } else if (field === 'level' && (!skill.level || skill.level.trim() === '')) {
                error = t('error-skill-level-required')
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
        
        // Check if all predefined skills are selected
        const { word, excel, powerpoint } = state.skills.predefined
        
        if (!word || word.trim() === '') {
            errors.word = t('error-word-proficiency-required')
        }
        if (!excel || excel.trim() === '') {
            errors.excel = t('error-excel-proficiency-required')
        }
        if (!powerpoint || powerpoint.trim() === '') {
            errors.powerpoint = t('error-powerpoint-proficiency-required')
        }

        // Validate custom skills (if any exist)
        for (let i = 0; i < state.skills.custom.length; i++) {
            const skill = state.skills.custom[i]
            if (!skill.name || skill.name.trim() === '') {
                errors[`custom_skill_name_${i}`] = t('error-skill-name-required')
            }
            if (!skill.level || skill.level.trim() === '') {
                errors[`custom_skill_level_${i}`] = t('error-skill-level-required')
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
    }, [state.skills, setValidMessage, t])

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
                        {t('skills-title')}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg rtl-text leading-relaxed">
                        {t('skills-subtitle')}
                    </p>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="space-y-8">
                    
                    {/* Predefined Skills Section */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4 rtl-text">
                            {t('microsoft-office')}
                        </h3>
                        <p className="text-sm text-blue-700 mb-6 rtl-text">
                            {t('office-skills-instruction')}
                        </p>
                        
                        <div className="grid grid-cols-1 gap-6">
                            {predefinedSkills.map((skill) => (
                                <div key={skill.key} className="bg-white p-4 rounded-lg border border-blue-100">
                                    <CheckboxGroup
                                        label={skill.label}
                                        selectedValue={state.skills.predefined[skill.key] || ''}
                                        onChange={(value) => handlePredefinedSkillChange(skill.key, value)}
                                        onBlur={() => handleFieldBlur(skill.key)}
                                        options={skillLevels}
                                        required={true}
                                        error={(touchedFields[skill.key] || validationTriggered) ? fieldErrors[skill.key] : null}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Custom Skills Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 rtl-text">
                            {t('additional-skills')}
                        </h3>
                        <p className="text-sm text-gray-600 mb-6 rtl-text">
                            {t('additional-skills-instruction')}
                        </p>
                        
                        {state.skills.custom.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <div className="max-w-sm mx-auto">
                                    <h4 className="mt-4 text-lg font-medium text-gray-900 rtl-text">{t('no-additional-skills')}</h4>
                                    <p className="mt-2 text-sm text-gray-500 rtl-text">
                                        {t('add-skills-instruction')}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {state.skills.custom.map((skill, index) => (
                                    <div key={skill.id || `custom-skill-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-md font-semibold text-gray-700 rtl-text">
                                                {t('additional-skill-number')}{index + 1}
                                            </h4>
                                            <Button
                                                type="button"
                                                onClick={() => handleRemoveCustomSkill(index)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm text-center"
                                            >
                                                {t('remove')}
                                            </Button>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <Input 
                                                    label={t('skill-name')} 
                                                    placeholder={t('skill-name-placeholder')} 
                                                    value={skill.name || ''}
                                                    onChange={(e) => handleCustomSkillChange(index, 'name', e.target.value)}
                                                    onBlur={() => handleFieldBlur('name', index)}
                                                    required 
                                                    error={(touchedFields[`custom_skill_name_${index}`] || validationTriggered) ? fieldErrors[`custom_skill_name_${index}`] : null}
                                                />
                                            </div>
                                            
                                            <div>
                                                <CheckboxGroup
                                                    label={t('proficiency-level')}
                                                    selectedValue={skill.level || ''}
                                                    onChange={(value) => handleCustomSkillChange(index, 'level', value)}
                                                    onBlur={() => handleFieldBlur('level', index)}
                                                    options={skillLevels}
                                                    required={true}
                                                    error={(touchedFields[`custom_skill_level_${index}`] || validationTriggered) ? fieldErrors[`custom_skill_level_${index}`] : null}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                            
                        {/* Add Custom Skill Button */}
                        <div className="flex justify-center pt-6">
                            <Button 
                                type="button" 
                                onClick={handleAddCustomSkill}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-center"
                            >
                                {state.skills.custom.length === 0 ? t('add-additional-skill') : t('add-another-skill')}
                            </Button>
                        </div>
                    </div>

                    {/* Skills Summary */}
                    {(state.skills.predefined.word || state.skills.predefined.excel || state.skills.predefined.powerpoint || state.skills.custom.length > 0) && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-4 rtl-text">
                                {t('skills-summary')}
                            </h3>
                            
                            {/* Predefined Skills Summary */}
                            <div className="mb-4">
                                <h4 className="font-medium text-green-700 mb-2 rtl-text">{t('microsoft-office')}:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {predefinedSkills.map((skill) => (
                                        state.skills.predefined[skill.key] && (
                                            <div key={skill.key} className="bg-white p-2 rounded border border-green-100">
                                                <span className="text-sm font-medium text-gray-700">{skill.label}: </span>
                                                <span className="text-sm text-green-600 capitalize">
                                                    {state.skills.predefined[skill.key].replace('_', ' ')}
                                                </span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>

                            {/* Custom Skills Summary */}
                            {state.skills.custom.length > 0 && (
                                <div>
                                    <h4 className="font-medium text-green-700 mb-2 rtl-text">{t('additional-skills')}:</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {state.skills.custom.map((skill, index) => (
                                            skill.name && skill.level && (
                                                <div key={index} className="bg-white p-2 rounded border border-green-100">
                                                    <span className="text-sm font-medium text-gray-700">{skill.name}: </span>
                                                    <span className="text-sm text-green-600 capitalize">
                                                        {skill.level.replace('_', ' ')}
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

export default StepSkills

