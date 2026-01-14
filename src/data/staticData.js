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
    // Cairo Areas
    { value: 'وسط البلد', label: 'وسط البلد' },
    { value: 'المعادي', label: 'المعادي' },
    { value: 'مصر الجديدة', label: 'مصر الجديدة' },
    { value: 'الزمالك', label: 'الزمالك' },
    { value: 'مدينة نصر', label: 'مدينة نصر' },
    { value: 'شبرا', label: 'شبرا' },
    { value: 'عين شمس', label: 'عين شمس' },
    { value: 'المطرية', label: 'المطرية' },
    { value: 'حلوان', label: 'حلوان' },
    { value: 'المرج', label: 'المرج' },
    { value: 'السلام', label: 'السلام' },
    { value: 'النزهة', label: 'النزهة' },
    { value: 'الزيتون', label: 'الزيتون' },
    { value: 'حدائق القبة', label: 'حدائق القبة' },
    { value: 'روض الفرج', label: 'روض الفرج' },
    { value: 'شبرا الخيمة', label: 'شبرا الخيمة' },
    { value: 'السيدة زينب', label: 'السيدة زينب' },
    { value: 'الدرب الأحمر', label: 'الدرب الأحمر' },
    { value: 'باب الشعرية', label: 'باب الشعرية' },
    { value: 'الوايلي', label: 'الوايلي' },
    { value: 'منشأة ناصر', label: 'منشأة ناصر' },
    { value: 'البساتين', label: 'البساتين' },
    { value: 'دار السلام', label: 'دار السلام' },
    { value: 'طره', label: 'طره' },
    { value: '15 مايو', label: '15 مايو' },
    // Giza Areas
    { value: 'المهندسين', label: 'المهندسين' },
    { value: 'الدقي', label: 'الدقي' },
    { value: 'الجيزة', label: 'الجيزة' },
    { value: 'العجوزة', label: 'العجوزة' },
    { value: 'الهرم', label: 'الهرم' },
    { value: 'فيصل', label: 'فيصل' },
    { value: 'حدائق الأهرام', label: 'حدائق الأهرام' },
    { value: 'العمرانية', label: 'العمرانية' },
    { value: 'إمبابة', label: 'إمبابة' },
    { value: 'الوراق', label: 'الوراق' },
    { value: 'بولاق الدكرور', label: 'بولاق الدكرور' },
    { value: 'أوسيم', label: 'أوسيم' },
    { value: 'كرداسة', label: 'كرداسة' },
    // New Cities
    { value: 'التجمع الخامس', label: 'التجمع الخامس' },
    { value: 'التجمع الأول', label: 'التجمع الأول' },
    { value: 'التجمع الثالث', label: 'التجمع الثالث' },
    { value: 'القاهرة الجديدة', label: 'القاهرة الجديدة' },
    { value: 'الرحاب', label: 'الرحاب' },
    { value: 'مدينتي', label: 'مدينتي' },
    { value: 'الشروق', label: 'الشروق' },
    { value: 'بدر', label: 'بدر' },
    { value: 'العبور', label: 'العبور' },
    { value: 'العاشر من رمضان', label: 'العاشر من رمضان' },
    { value: 'الشيخ زايد', label: 'الشيخ زايد' },
    { value: 'أكتوبر', label: 'أكتوبر' },
    { value: 'العاصمة الإدارية', label: 'العاصمة الإدارية' },
    { value: 'المستقبل سيتي', label: 'المستقبل سيتي' },

    // Other
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

