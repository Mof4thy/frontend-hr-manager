import api from './Api'

const API_URL = import.meta.env.VITE_API_URL 

// Separate CV upload function
const uploadCV = async (file) => {
    const formData = new FormData()
    formData.append('cv', file)
    
    console.log('Uploading CV:', file.name)
    
    const response = await api.post(`${API_URL}/uploads/cv`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    
    console.log('CV upload response:', response.data)
    return response.data
}


// Clean JSON application submission
const submitApplication = async (application) => {
    console.log('Submitting application:', application)
    const response = await api.post(`${API_URL}/applications/submit`, application, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    console.log('Application submission response:', response.data)
    return response.data
}

const getAllApplications = async () => {
    const response = await api.get(`${API_URL}/applications`)
    console.log('All applications:', response.data)

    return response.data
}

const getApplicationDetails = async (id) => {
    const response = await api.get(`${API_URL}/applications/${id}`)
    console.log('Application details:', response.data)
    return response.data
}


const updateApplicationStatus = async (id, status) => {
    const response = await api.put(`${API_URL}/applications/${id}/status`, { status })
    return response.data
}

const getApplicationStatistics = async () => {
    const response = await api.get(`${API_URL}/applications/stats`)
    return response.data
}   

const exportApplicationsToExcel = async () => {
    const response = await api.get(`${API_URL}/applications/export/excel`, {
        responseType: 'blob' // Important: tells axios to handle binary data
    })
    return response
}

export { uploadCV, submitApplication, getAllApplications, getApplicationDetails, updateApplicationStatus, getApplicationStatistics, exportApplicationsToExcel }
