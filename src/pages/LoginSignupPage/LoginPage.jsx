import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "store/user/user.actions.js"

export function LoginPage() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  
  async function handleSubmit(ev) {
    ev.preventDefault()
    try {
      await login(credentials)
      navigate('/workspace')
    } catch (err) {
      console.error('Error logging in:', err)
      throw new Error('Error logging in')
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={ev => setCredentials(prev => ({
            ...prev,
            username: ev.target.value
          }))}
          placeholder="Username"
        />

        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={ev => setCredentials(prev => ({
            ...prev,
            password: ev.target.value
          }))}
          placeholder="Password"
        />
        <button>Login</button>
      </form>

    </div>
  )
}