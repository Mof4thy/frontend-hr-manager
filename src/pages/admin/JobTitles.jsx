import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllJobTitles, createJobTitle, updateJobTitle, setJobTitleStatus, deleteJobTitle } from '../../services/jobTitlesService'
import { Plus } from 'lucide-react'
import Button from '../../components/button'
import Input from '../../components/Input'

const JobTitles = () => {
  const queryClient = useQueryClient()
  const [newTitle, setNewTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobTitles-all'],
    queryFn: getAllJobTitles
  })

  const invalidate = () => queryClient.invalidateQueries(['jobTitles-all'])

  const createMut = useMutation({
    mutationFn: createJobTitle,
    onSuccess: invalidate
  })

  const updateMut = useMutation({
    mutationFn: ({ id, title }) => updateJobTitle(id, title),
    onSuccess: () => {
      invalidate()
      setEditingId(null)
      setEditingTitle('')
    }
  })

  const statusMut = useMutation({
    mutationFn: ({ id, isActive }) => setJobTitleStatus(id, isActive),
    onSuccess: invalidate
  })

  const deleteMut = useMutation({
    mutationFn: deleteJobTitle,
    onSuccess: invalidate
  })

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    createMut.mutate(newTitle.trim())
    setNewTitle('')
  }

  const handleEdit = (jt) => {
    setEditingId(jt.jobTitleId)
    setEditingTitle(jt.title)
  }

  const handleSaveEdit = () => {
    if (!editingTitle.trim()) return
    updateMut.mutate({ id: editingId, title: editingTitle.trim() })
  }

  if (isLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div className='text-red-500'>Error loading job titles</div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      {/* Header */}
      <div className='w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-xl sm:text-3xl font-bold'>Job Titles</h1>
          <p className='text-gray-500'>Manage available job positions for applicants</p>
        </div>

      </div>

      {/* Main Content */}
      <div className='w-full flex flex-col gap-4 border-1 border-gray-400 shadow-lg p-6 rounded-xl bg-white'>
        
        {/* Add Form */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl -m-6 mb-4">
          <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                id="add-input"
                type="text"
                className="border-2 border-gray-300 rounded-2xl w-full"
                placeholder="Enter job title (e.g., Software Engineer)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              disabled={!newTitle.trim() || createMut.isPending}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              <Plus size={16} />
              {createMut.isPending ? 'Adding...' : 'Add'}
            </Button>
          </form>
        </div>

        <h2 className="text-lg font-semibold">All Job Titles ({data?.length || 0})</h2>

        {/* Table */}
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.map((jt) => (
                  <tr key={jt.jobTitleId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{jt.jobTitleId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === jt.jobTitleId ? (
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="flex-1 border-2 border-gray-300 rounded-lg"
                          />
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                            disabled={updateMut.isPending}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-semibold text-gray-900">{jt.title}</div>
                          <button
                            onClick={() => handleEdit(jt)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        jt.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {jt.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => statusMut.mutate({ id: jt.jobTitleId, isActive: !jt.isActive })}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                            jt.isActive
                              ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                          disabled={statusMut.isPending}
                        >
                          {jt.isActive ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${jt.title}"?`)) {
                              deleteMut.mutate(jt.jobTitleId)
                            }
                          }}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                          disabled={deleteMut.isPending}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {!data?.length && (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg mb-2">No job titles yet</p>
                <p className="text-sm">Add your first job title using the form above</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobTitles
