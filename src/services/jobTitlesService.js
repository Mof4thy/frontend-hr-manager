import api from './Api'

export const getActiveJobTitles = async () => {
  const res = await api.get('/jobs/jobs')
  return res.data.data.titles
}

export const getAllJobTitles = async () => {
  const res = await api.get('/jobs/jobs/all')
  return res.data.data.titles
}

export const createJobTitle = async (title) => {
  const res = await api.post('/jobs/jobs', { title })
  return res.data.data.jobTitle
}

export const updateJobTitle = async (id, title) => {
  const res = await api.put(`/jobs/jobs/${id}`, { title })
  return res.data.data.jobTitle
}

export const setJobTitleStatus = async (id, isActive) => {
  const res = await api.patch(`/jobs/jobs/${id}/status`, { isActive })
  return res.data.data.jobTitle
}

export const deleteJobTitle = async (id) => {
  const res = await api.delete(`/jobs/jobs/${id}`)
  return res.data
}

