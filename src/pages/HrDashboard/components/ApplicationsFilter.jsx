import { useState } from 'react'
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react'
import { 
    governorateOptions, 
    areaOptions, 
    genderOptions, 
    educationStatusOptions, 
    getFilterOptions,
    getLabelByValue 
} from '../../../data/staticData'

const ApplicationsFilter = ({ onFilterChange }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [filters, setFilters] = useState({
        area: '',
        governorate: '',
        gender: '',
        educationStatus: '',
        minAge: '',
        maxAge: ''
    })

    // Get filter options with "All" option
    const governorateFilterOptions = getFilterOptions(governorateOptions)
    const areaFilterOptions = getFilterOptions(areaOptions)
    const genderFilterOptions = getFilterOptions(genderOptions)
    const educationFilterOptions = getFilterOptions(educationStatusOptions)

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const clearFilters = () => {
        const clearedFilters = {
            area: '',
            governorate: '',
            gender: '',
            educationStatus: '',
            minAge: '',
            maxAge: ''
        }
        setFilters(clearedFilters)
        onFilterChange(clearedFilters)
    }

    const hasActiveFilters = Object.values(filters).some(v => v !== '')

    const activeFilterCount = Object.values(filters).filter(v => v !== '').length

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Filter Header - Always Visible */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 transition-all duration-200"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Filter size={18} className="text-indigo-600" />
                    </div>
                    <span className="font-semibold text-gray-800">Filter Applications</span>
                    {activeFilterCount > 0 && (
                        <span className="px-2.5 py-0.5 bg-indigo-600 text-white text-xs font-medium rounded-full">
                            {activeFilterCount} active
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                clearFilters()
                            }}
                            className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <X size={14} />
                            Clear
                        </button>
                    )}
                    {isExpanded ? (
                        <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                        <ChevronDown size={20} className="text-gray-500" />
                    )}
                </div>
            </button>

            {/* Filter Content - Expandable */}
            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Governorate Filter */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                المحافظة (Governorate)
                            </label>
                            <select
                                value={filters.governorate}
                                onChange={(e) => handleFilterChange('governorate', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer"
                            >
                                {governorateFilterOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Area Filter */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                المنطقة (Area)
                            </label>
                            <select
                                value={filters.area}
                                onChange={(e) => handleFilterChange('area', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer"
                            >
                                {areaFilterOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Gender Filter */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                النوع (Gender)
                            </label>
                            <select
                                value={filters.gender}
                                onChange={(e) => handleFilterChange('gender', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer"
                            >
                                {genderFilterOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Education Status Filter */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                المؤهل الدراسي (Education)
                            </label>
                            <select
                                value={filters.educationStatus}
                                onChange={(e) => handleFilterChange('educationStatus', e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer"
                            >
                                {educationFilterOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Min Age Filter */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                الحد الأدنى للعمر (Min Age)
                            </label>
                            <input
                                type="number"
                                min="18"
                                max="65"
                                value={filters.minAge}
                                onChange={(e) => handleFilterChange('minAge', e.target.value)}
                                placeholder="18"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>

                        {/* Max Age Filter */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">
                                الحد الأقصى للعمر (Max Age)
                            </label>
                            <input
                                type="number"
                                min="18"
                                max="65"
                                value={filters.maxAge}
                                onChange={(e) => handleFilterChange('maxAge', e.target.value)}
                                placeholder="65"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Active Filters Summary */}
                    {hasActiveFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm text-gray-600">Active filters:</span>
                                {filters.governorate && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                                        Governorate: {filters.governorate}
                                        <button onClick={() => handleFilterChange('governorate', '')} className="hover:text-indigo-900">
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                {filters.area && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                                        Area: {filters.area}
                                        <button onClick={() => handleFilterChange('area', '')} className="hover:text-emerald-900">
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                {filters.gender && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                        Gender: {filters.gender}
                                        <button onClick={() => handleFilterChange('gender', '')} className="hover:text-purple-900">
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                {filters.educationStatus && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
                                        Education: {getLabelByValue(educationStatusOptions, filters.educationStatus)}
                                        <button onClick={() => handleFilterChange('educationStatus', '')} className="hover:text-cyan-900">
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                                {(filters.minAge || filters.maxAge) && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                        Age: {filters.minAge || '18'} - {filters.maxAge || '65'}
                                        <button onClick={() => { handleFilterChange('minAge', ''); handleFilterChange('maxAge', ''); }} className="hover:text-amber-900">
                                            <X size={12} />
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ApplicationsFilter
