import StepJob from './components/StepJob'
import StepPersonal from './components/StepPersonal'
import { useState } from 'react'
import Button from '../../components/button'
import StepExperience from './components/stepexperience'
import StepEducation from './components/StepEducation'
import StepSkills from './components/StepSkills'
import StepLanguages from './components/StepLanguages'
import StepRelationships from './components/StepRelationships'
import StepReview from './components/StepReview'
import LanguageToggle from '../../components/LanguageToggle'
import { useLanguage } from '../../context/LanguageContext'
import StepUploadDocs from './components/StepUploadDocs'
import { useForm } from '../../context/FormContext'
import logo from '../../assets/Logo3.png'

import { uploadCV, submitApplication } from '../../services/applicationService'


const ApplicantForm = () => {
    const { t, isArabic } = useLanguage()
    const { state, dispatch } = useForm()
    // const { state, dispatch } = useForm()

    const [checkValidStep, setCheckValidStep] = useState(null)
    const [validMessage, setValidMessage] = useState('')

    const [errorMessage, seterrordMessage] = useState('')

    
    
    const [currentStep, setCurrentStep] = useState(1)

    const totalSteps = `9`
    const sections = [
        t('personal-info'),
        t('job-info'),
        t('experience'),
        t('education'),
        t('skills'),
        t('languages'),
        t('company-relationships'),
        t('upload-docs'),
        t('review-application-title'),
    ]

    const handleNextStep = () => {
        setValidMessage('')
        seterrordMessage(null)
        if (currentStep < totalSteps) {
            const isValid = checkValidStep()
            if (isValid) {
                setCurrentStep(currentStep + 1) 
            } else {
                seterrordMessage("برجاء ادخال جميع البيانات المطلوبة")
            }   
        }
    }
    
    const handlePreviousStep = () => {
        setValidMessage('') 
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }


    const handleSubmit = async () => {    
        setValidMessage('')
        console.log("data entered >> ", state)
        
        try {
            let cvPath = null
            
            // Upload CV first if it exists
            if (state.cv.file) {
                console.log('Uploading CV file...')
                const cvUploadResponse = await uploadCV(state.cv.file)
                
                if (cvUploadResponse.success) {
                    cvPath = cvUploadResponse.data.filePath
                    console.log('CV uploaded successfully, path:', cvPath)
                } else {
                    alert('CV upload failed: ' + cvUploadResponse.message)
                    return
                }
            }
            
            // Prepare application data with CV path
            const applicationData = {
                ...state,
                cvPath: cvPath,
                cv: undefined // Remove the file object from the data
            }
            
            
            // Submit the application
            const response = await submitApplication(applicationData)
            console.log('Application submission response:', response)
            
            if(response.success) {
                alert('Application submitted successfully!')
                localStorage.setItem('formData', JSON.stringify(state))
                dispatch({ type: 'reset_form' })
                setCurrentStep(1)
            } else {
                alert('Application submission failed: ' + response.message)
            }
            
        } catch (error) {
            console.error('Submission error:', error)
            alert('Submission failed: ' + (error.response?.data?.message || error.message))
        }
    }

    const handleEditStep = (stepNumber) => {
        setValidMessage('')
        setCurrentStep(stepNumber)
    }

    return (
        <div className='flex flex-col items-center min-h-screen max-w-full lg:max-w-7xl pt-2 sm:pt-4 lg:pt-6 mx-auto gap-2 sm:gap-4 md:gap-6 pb-4 sm:pb-8 px-2 sm:px-4 lg:px-0'> 

            {/* Header Section */}
            <div className='flex flex-col items-center w-full text-center p-4 sm:p-6 md:p-8 gap-2 sm:gap-4 border-b border-gray-200 bg-white shadow-sm rounded-t-lg'>
                {/* Language Toggle - Top Right */}
                <div className="flex justify-end w-full">
                    <LanguageToggle />
                </div>
                
                {/* Main Title Section - Centered */}
                <div className="text-center">
                    <h2 className='text-gray-800 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight'>
                        {t('form-title')}
                    </h2>
                    <p className='text-gray-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 leading-relaxed'>
                        {t('form-subtitle')}
                    </p>
                </div>
            </div>

            <div className='w-full p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50 rounded-b-lg sm:rounded-b-xl shadow-lg'>

                {/* Company Logo Section */}
                <div className='w-full flex justify-center items-center pb-3 sm:pb-4 md:pb-6 lg:pb-8'>
                    <div className='relative '>
                        <img 
                            src={logo} 
                            alt="Al Rayah Market Logo" 
                            className='h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain  transition-transform scale-110'
                        />
                    </div>
                </div>
            

                {/* Steps Title */}
                <h3 className="text-black text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-left rtl-text leading-tight">
                    {t('step')} {currentStep} : {sections[currentStep-1]}
                </h3>


                {/* Steps Content */}
                <div>   
                    {currentStep === 1 && <StepPersonal checkValidStep={setCheckValidStep} setValidMessage={setValidMessage} />}
                    {currentStep === 2 && <StepJob checkValidStep={setCheckValidStep} setValidMessage={setValidMessage} />}
                    {currentStep === 3 && <StepExperience checkValidStep={setCheckValidStep} setValidMessage={setValidMessage} />}
                    {currentStep === 4 && <StepEducation checkValidStep={setCheckValidStep} setValidMessage={setValidMessage} />}
                    {currentStep === 5 && <StepSkills checkValidStep={setCheckValidStep} setValidMessage={setValidMessage} />}
                    {currentStep === 6 && <StepLanguages checkValidStep={setCheckValidStep} setValidMessage={setValidMessage} />}
                    {currentStep === 7 && <StepRelationships checkValidStep={setCheckValidStep} setValidMessage={setValidMessage} />}
                    {currentStep === 8 && <StepUploadDocs checkValidStep={setCheckValidStep} setValidMessage={setValidMessage} />}
                    {currentStep === 9 && <StepReview onEditStep={handleEditStep} />}

                </div>

                <div className='w-full flex flex-col '>
                    
                    {errorMessage && <div className='flex justify-end  mt-5 text-red-500'> {errorMessage} </div> }

                        {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-4 sm:pt-6 md:pt-8 gap-2 sm:gap-4">
                        <Button
                            type="button"
                            onClick={handlePreviousStep}
                            disabled={currentStep === 1}
                            className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-medium transition-all duration-200 text-center text-sm sm:text-base ${
                                currentStep === 1
                                    ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg transform hover:scale-105'
                            }`}
                        >
                            {t('previous')}
                        </Button>

                        <div className="text-xs sm:text-sm md:text-base text-gray-500 font-medium px-2 text-center">
                            {t('step')} {currentStep} {isArabic ? 'من' : 'of'} {totalSteps}
                        </div>

                        {currentStep < totalSteps - 1 ? (
                            <Button
                                type="button"
                                onClick={handleNextStep}
                                className="bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 text-center px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                            >
                                {t('next')}
                            </Button>
                        ) : currentStep === totalSteps - 1 ? (
                            <Button
                                type="button"
                                onClick={handleNextStep}
                                className="bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 text-center px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                            >
                                {t('review-application')}
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 text-center px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                            >
                                {t('submit-application')}
                            </Button>
                        )}
                    </div>

                </div>
                
            </div>
        </div>
    )
}

export default ApplicantForm