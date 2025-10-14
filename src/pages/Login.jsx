import { useState, useEffect } from 'react'
import Input from '../components/Input'
import Button from '../components/button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'

const Login = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)  
    const navigate = useNavigate()

    const { handleLogin , user } = useAuth()

    useEffect(() => {
        if (user) {
          navigate('/dashboard')
        }
      }, [user, navigate])



    const handleLoginSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setLoading(true)
        try {
            await handleLogin(username, password)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
        
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <Input 
                            type="text" 
                            placeholder="Username" 
                            required 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />

                        <Input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                </div>
            </div>

            {error && <p>{error}</p>}
        </div>
    )
}

export default Login