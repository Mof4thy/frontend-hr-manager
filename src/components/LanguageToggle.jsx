import { useLanguage } from '../context/LanguageContext'

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage()

    return (
        <button
            onClick={toggleLanguage}
            className="flex justify-center items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
            <span className="font-medium text-gray-700 text-sm sm:text-base whitespace-nowrap">
                {language === 'en' ? 'العربية' : 'English'}
            </span>
        </button>
    )
}

export default LanguageToggle
