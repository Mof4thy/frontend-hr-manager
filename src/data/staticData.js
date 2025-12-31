// Static data for governorates, areas, and education status
// This file serves as a single source of truth for dropdown options across the application

// All Egyptian Governorates
export const governorateOptions = [
    { value: 'القاهرة', label: 'القاهرة' },
    { value: 'الجيزة', label: 'الجيزة' },
    { value: 'الإسكندرية', label: 'الإسكندرية' },
    { value: 'الدقهلية', label: 'الدقهلية' },
    { value: 'البحر الأحمر', label: 'البحر الأحمر' },
    { value: 'البحيرة', label: 'البحيرة' },
    { value: 'الفيوم', label: 'الفيوم' },
    { value: 'الغربية', label: 'الغربية' },
    { value: 'الإسماعيلية', label: 'الإسماعيلية' },
    { value: 'المنوفية', label: 'المنوفية' },
    { value: 'المنيا', label: 'المنيا' },
    { value: 'القليوبية', label: 'القليوبية' },
    { value: 'الوادي الجديد', label: 'الوادي الجديد' },
    { value: 'السويس', label: 'السويس' },
    { value: 'أسوان', label: 'أسوان' },
    { value: 'أسيوط', label: 'أسيوط' },
    { value: 'بني سويف', label: 'بني سويف' },
    { value: 'بورسعيد', label: 'بورسعيد' },
    { value: 'دمياط', label: 'دمياط' },
    { value: 'الشرقية', label: 'الشرقية' },
    { value: 'جنوب سيناء', label: 'جنوب سيناء' },
    { value: 'كفر الشيخ', label: 'كفر الشيخ' },
    { value: 'مطروح', label: 'مطروح' },
    { value: 'الأقصر', label: 'الأقصر' },
    { value: 'قنا', label: 'قنا' },
    { value: 'شمال سيناء', label: 'شمال سيناء' },
    { value: 'سوهاج', label: 'سوهاج' }
]

// Area options
export const areaOptions = [
    { value: 'وسط البلد', label: 'وسط البلد' },
    { value: 'المعادي', label: 'المعادي' },
    { value: 'مصر الجديدة', label: 'مصر الجديدة' },
    { value: 'الزمالك', label: 'الزمالك' },
    { value: 'المهندسين', label: 'المهندسين' },
    { value: 'الدقي', label: 'الدقي' },
    { value: 'الجيزة', label: 'الجيزة' },
    { value: 'شبرا', label: 'شبرا' },
    { value: 'مدينة نصر', label: 'مدينة نصر' },
    { value: 'التجمع الخامس', label: 'التجمع الخامس' },
    { value: 'الشيخ زايد', label: 'الشيخ زايد' },
    { value: 'أكتوبر', label: 'أكتوبر' },
    { value: 'العبور', label: 'العبور' },
    { value: 'القاهرة الجديدة', label: 'القاهرة الجديدة' },
    { value: 'أخرى', label: 'أخرى' }
]

// Education status options
export const educationStatusOptions = [
    { value: 'higher-qualification', label: 'مؤهل عالي', labelKey: 'higher-qualification' },
    { value: 'above-intermediate-qualification', label: 'مؤهل فوق متوسط', labelKey: 'above-intermediate-qualification' },
    { value: 'preparatory', label: 'إعدادية', labelKey: 'preparatory' },
    { value: 'primary', label: 'ابتدائية', labelKey: 'primary' },
    { value: 'illiterate', label: 'محو أمية', labelKey: 'illiterate' },
    { value: 'no-qualification', label: 'بدون مؤهل', labelKey: 'no-qualification' }
]

// Gender options
export const genderOptions = [
    { value: 'ذكر', label: 'ذكر', labelKey: 'male' },
    { value: 'أنثى', label: 'أنثى', labelKey: 'female' }
]

// Helper function to get options with "All" option for filters
export const getFilterOptions = (options, allLabel = 'الكل') => {
    return [{ value: '', label: allLabel }, ...options]
}

// Helper function to get label by value
export const getLabelByValue = (options, value) => {
    const option = options.find(opt => opt.value === value)
    return option ? option.label : value
}

// Helper function to get translated label (for use with translation function)
export const getTranslatedOptions = (options, t) => {
    return options.map(option => ({
        ...option,
        label: option.labelKey ? t(option.labelKey) : option.label
    }))
}

