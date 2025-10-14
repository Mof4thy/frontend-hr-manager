import { useState } from 'react'

const Input = ({ type = "text", placeholder, label, className = '', value, onChange, onBlur, required, error }) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPasswordType = type === "password"
    const inputType = isPasswordType && showPassword ? "text" : type

    const standardClassName = `
        w-full px-3 py-2 sm:px-4 sm:py-2 
        bg-white text-gray-900 
        border-b-2 border-gray-200 
        outline-none 
        transition-all duration-200 ease-in-out
        focus:border-gray-500 
        hover:border-gray-300
        placeholder:text-gray-400
        shadow-sm
        text-xs sm:text-sm md:text-base
        ${isPasswordType ? 'pr-10 sm:pr-12' : ''}
    `

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="flex flex-col gap-1 sm:gap-2">
            {label && <label className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1 rtl-text">
                {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>}

            <div className="relative">
                <input 
                    type={inputType}
                    placeholder={placeholder}
                    className={`${standardClassName} ${className}`}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    required={required}
                    max={14}
                    min={11}
                />
                {isPasswordType && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4"
                    >
                        {showPassword ? (
                            // Eye slash icon (hide password)
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                        ) : (
                            // Eye icon (show password)
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
        </div>
    )
}

export default Input