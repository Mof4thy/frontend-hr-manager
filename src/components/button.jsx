const button = ({ type, onClick, children, className, disabled }) => {
    const standardClassName = `
        bg-gray-700 text-white 
        px-2 py-2 md:px-4 md:py-2 
        rounded-md hover:cursor-pointer
        text-xs sm:text-sm md:text-base
        font-medium
        transition-colors duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}
    `

    return (
        <button 
            onClick={onClick} 
            className={`${standardClassName} ${className || ''}`} 
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default button
