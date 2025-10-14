import React, { createContext, useContext, useState } from 'react'
import { getTranslation } from '../translations/translations'

const LanguageContext = createContext()

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en') // 'en' for English, 'ar' for Arabic
    const [direction, setDirection] = useState('ltr') // 'ltr' for left-to-right, 'rtl' for right-to-left

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en'
        const newDirection = newLanguage === 'ar' ? 'rtl' : 'ltr'
        
        setLanguage(newLanguage)
        setDirection(newDirection)
        
        // Update document language and direction
        document.documentElement.lang = newLanguage
        document.documentElement.dir = newDirection
    }

    const t = (key) => {
        return getTranslation(key, language)
    }

    const value = {
        language,
        direction,
        isArabic: language === 'ar',
        toggleLanguage,
        t
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}
