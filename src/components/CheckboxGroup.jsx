import React from 'react'

const CheckboxGroup = ({ label, options, selectedValue, onChange, onBlur, required = false, error }) => {
    // Generate a unique ID for this checkbox group to avoid conflicts
    const groupId = React.useId ? React.useId() : `checkbox-group-${Math.random().toString(36).substr(2, 9)}`
    
    return (
        <div className="flex flex-col gap-2 sm:gap-3">
            <label className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1 rtl-text">
                {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
                {options.map((option, index) => (
                    <label 
                        key={`${groupId}-${option.value}`} 
                        className={`
                            flex items-center gap-2 sm:gap-3 cursor-pointer
                            px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 
                            transition-all duration-200 ease-in-out
                            hover:shadow-sm
                            ${selectedValue === option.value 
                                ? 'border-gray-600 bg-gray-50 text-gray-800' 
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                            }
                        `}
                    >
                        <input
                            type="radio"
                            name={`${groupId}-${label}`}
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            className={`
                                w-3 h-3 sm:w-4 sm:h-4 cursor-pointer
                                text-gray-600 bg-white border-2 border-gray-300
                                focus:ring-4 focus:ring-gray-100
                                transition-all duration-200
                            `}
                            required={required}
                        />
                        <span className="text-xs sm:text-sm md:text-base font-medium select-none rtl-text">
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
            {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
        </div>
    )
}

export default CheckboxGroup
