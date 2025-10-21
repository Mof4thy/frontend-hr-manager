import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HrDashboard from './pages/HrDashboard/HrDashboard'
import ApplicantForm from './pages/ApplicantForm/ApplicantForm'
import { FormProvider } from './context/FormContext'
import { LanguageProvider } from './context/LanguageContext'
import Login from './pages/Login'
import ApplicationDetails from './pages/HrDashboard/ApplicationDetails'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedRouteUserManagment from './pages/userManagment/components/ProtectedRoute'
import Profile from './pages/profile'
import Layout from './components/Layout'
import UserManagment from './pages/userManagment/userManagment'
import JobTitles from './pages/admin/JobTitles'


function App() {

  return (
    <>
      <LanguageProvider>
        <FormProvider>
          <Router>  
            <Routes>
              {/* Application Form is now the base route */}
              <Route path='/' element={<ApplicantForm />} />
              <Route path='/login' element={<Login />} />
              
              {/* Protected HR Dashboard routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout/>}>
                  <Route path='/dashboard' element={<HrDashboard />} />
                  <Route path='/dashboard/:status' element={<HrDashboard />} />
                  <Route path='/applications/:id' element={<ApplicationDetails />} />
                  <Route path='/profile' element={<Profile />} /> 
                  <Route path='/admin/job-titles' element={<JobTitles />} />
                  <Route element={<ProtectedRouteUserManagment />}>
                    <Route path='/user-managment' element={<UserManagment />} />
                  </Route>
                </Route> 
              </Route>
            </Routes>
          </Router> 
        </FormProvider>
      </LanguageProvider> 
    </>
  ) 
}

export default App
