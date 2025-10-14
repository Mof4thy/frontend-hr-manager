import { useLanguage } from '../context/LanguageContext'

const Select = ({ label, value, onChange, onBlur, options, required = false, className = '', error }) => {
    const { t } = useLanguage()
    const standardClassName = `
        w-full px-3 py-2 sm:px-4 sm:py-3 
        bg-white text-gray-900 
        border-2 border-gray-200 
        rounded-lg 
        outline-none 
        transition-all duration-200 ease-in-out
        focus:border-gray-500 focus:ring-4 focus:ring-gray-100
        hover:border-gray-300
        shadow-sm
        text-xs sm:text-sm md:text-base
        cursor-pointer
        appearance-none
        bg-no-repeat
        bg-right
        pr-8 sm:pr-10
    `

    return (
        <div className="flex flex-col gap-1 sm:gap-2 relative">
            <label className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1 rtl-text">
                {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <select 
                    value={value} 
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`${standardClassName} ${className}`}
                    required={required}
                >
                    <option value="" disabled className="text-gray-400 overflow-y-hidden">{t('select')}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value} className="text-gray-900">
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
        </div>
    )
}

export default Select
