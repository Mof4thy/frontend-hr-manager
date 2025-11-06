import { createContext , useReducer, useContext   } from "react";


const FormContext = createContext();

const initialState = {

    personalInfo: {
        name: '',
        dateOfBirth: '',
        sex: '',
        governorate: '',
        address: '',
        nationalId: '',
        nationality: '',
        whatsappNumber: '',
        mobileNumber: '',
        emergencyNumber: '',
        militaryServiceStatus: '', // معاف نهائي، سبب الإعفاء النهائي، تأجيل، أدى الخدمة
        socialStatus: '', // أعزب، متزوج، أخرى
        hasVehicle: false, // هل تمتلك سيارة: نعم، لا
        drivingLicense: '', // لا يوجد، رخصة خاصة، رخصة مهنية، درجة الرخصة المهنية
    },
    appliedJob: {
        jobTitle: "",
    },
    experiences: [], // [{ company: "", role: "", years: "" }]
    currentJob: {
        isCurrentlyEmployed: false,
        company: '',
        role: '',
        salary: ''
    },
    // Skills
    skills: {
        predefined: {
            word: '', // weak, good, very_good, excellent
            excel: '', // weak, good, very_good, excellent
            powerpoint: '' // weak, good, very_good, excellent
        },
        custom: [] // [{ name: "", level: "" }]
    },
    // Languages
    languages: {
        english: '', // beginner, intermediate, advanced, fluent, native
        additional: [] // [{ name: "", level: "" }]
    },
    // Company Relationships
    companyRelationships: {
        hasRelationship: false,
        contactName: '',
        contactPosition: ''
    },
    // Education
    educationStatus: '', // student, graduate
    education: [], // [{ institution: "", department: "", grade: "", fromDate: "", toDate: "" }]
  
    // CV Upload - stores CV info and path after upload
    cv: {
        file: null,      // File object before upload
        uploaded: false, // Whether CV has been uploaded
        fileName: null,  // Original file name
        filePath: null,  // Server file path after upload
        uploadData: null // Full upload response data
    },
    
    // Additional Comments
    comments: '', // Optional comments from the applicant
   
  };



  const formReducer = (state , action) => {
    switch (action.type) {
        case "set_personal_info":
            return{...state , personalInfo: action.payload}
        case "update_personal_info":
            return{...state , personalInfo: {...state.personalInfo , ...action.payload}}
        case "set_applied_job":
            return{...state , appliedJob: action.payload}
        case "update_applied_job":
            return{...state , appliedJob: {...state.appliedJob , ...action.payload}}
        case "set_experiences":
            return{...state , experiences: action.payload}
        case "add_experience":
            return{...state , experiences: [...state.experiences, { company: '', location: '', role: '', salary: '', fromDate: '', toDate: '' }]}
        case "update_experience": {
            const updatedExperiences = [...state.experiences]
            updatedExperiences[action.payload.index] = { ...updatedExperiences[action.payload.index], ...action.payload.data }
            return{...state , experiences: updatedExperiences}
        }
        case "remove_experience":
            return{...state , experiences: state.experiences.filter((_, index) => index !== action.payload)}
        case "set_current_job":
            return{...state , currentJob: action.payload}
        case "update_current_job":
            return{...state , currentJob: {...state.currentJob , ...action.payload}}
        case "set_skills":
            return{...state , skills: action.payload}
        case "update_predefined_skill":
            return{...state , skills: {...state.skills, predefined: {...state.skills.predefined, [action.payload.skill]: action.payload.level}}}
        case "add_custom_skill":
            return{...state , skills: {...state.skills, custom: [...state.skills.custom, action.payload || { name: '', level: '', id: Date.now() + Math.random() }]}}
        case "update_custom_skill": {
            const updatedCustomSkills = [...state.skills.custom]
            updatedCustomSkills[action.payload.index] = { ...updatedCustomSkills[action.payload.index], ...action.payload.data }
            return{...state , skills: {...state.skills, custom: updatedCustomSkills}}
        }
        case "remove_custom_skill":
            return{...state , skills: {...state.skills, custom: state.skills.custom.filter((_, index) => index !== action.payload)}}
        case "update_english_level":
            return{...state , languages: {...state.languages, english: action.payload}}
        case "add_additional_language":
            return{...state , languages: {...state.languages, additional: [...state.languages.additional, action.payload || { name: '', level: '', id: Date.now() + Math.random() }]}}
        case "update_additional_language": {
            const updatedLanguages = [...state.languages.additional]
            updatedLanguages[action.payload.index] = { ...updatedLanguages[action.payload.index], ...action.payload.data }
            return{...state , languages: {...state.languages, additional: updatedLanguages}}
        }
        case "remove_additional_language":
            return{...state , languages: {...state.languages, additional: state.languages.additional.filter((_, index) => index !== action.payload)}}
        case "update_company_relationships":
            return{...state , companyRelationships: {...state.companyRelationships , ...action.payload}}
        case "update_education_status":
            return{...state , educationStatus: action.payload}
        case "set_education":
            return{...state , education: action.payload}
        case "add_education":
            return{...state , education: [...state.education, { institution: '', department: '', grade: '', fromDate: '', toDate: '' }]}
        case "update_education": {
            const updatedEducation = [...state.education]
            updatedEducation[action.payload.index] = { ...updatedEducation[action.payload.index], ...action.payload.data }
            return{...state , education: updatedEducation}
        }
        case "remove_education":
            return{...state , education: state.education.filter((_, index) => index !== action.payload)}
        case "set_cv_file":
            return{...state , cv: {...state.cv, file: action.payload, fileName: action.payload?.name}}
        case "set_cv_uploaded":
            return{...state , cv: {...state.cv, uploaded: true, filePath: action.payload.filePath, uploadData: action.payload}}
        case "remove_cv":
            return{...state , cv: {file: null, uploaded: false, fileName: null, filePath: null, uploadData: null}}
        case "reset_form":
            return {
                ...initialState,
                cv: {
                    file: null,
                    uploaded: false,
                    fileName: null,
                    filePath: null,
                    uploadData: null
                }
            }
        case "update_comments":
            return {...state, comments: action.payload}
        default:
            return state
    }
}


export const FormProvider = ({children}) => {
    const [state , dispatch] = useReducer(formReducer , initialState)
    return (
        <FormContext.Provider value={{state , dispatch}}>
            {children}
        </FormContext.Provider>
    )
}


export const useForm = () => {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error('useForm must be used within a FormProvider')
    }
    return context
}









