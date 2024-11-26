import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../store/user/user.actions.js'

export function SignupPage() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: ''
  })

  const [error, setError] = useState('')

  async function handleSubmit(ev) {
    ev.preventDefault()
    setError('')

    try {
      if (!credentials.username || !credentials.password || !credentials.fullname) {
        setError('All fields are required')
        return
      }

      await signup(credentials)
      navigate('/workspace')
    } catch (err) {
      if (err.response?.status === 400) {
        if (err.response.data.includes('already exists')) {
          setError('Username already exists')
        } else {
          setError(err.response.data || 'Error signing up')
        } 
      } else {
        setError('An error occurred duting signup. Please try again')
      }
      console.error('Error signing up:', err)
    }
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setCredentials((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }))
    
    if (error) setError('')
  }

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up!</h2>

        {error && <div className="error">{error}</div>}

        <div className="form-group">
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={credentials.fullname}
            onChange={handleChange}
            placeholder="Fullname"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Choose a password"
            required
          />
        </div>

        <button>Signup</button>
        <div className='login-link'>
          Already have an account?
          <span onClick={() => navigate('login')}>Login here</span>
        </div>
      </form>
    </div>
  );
}