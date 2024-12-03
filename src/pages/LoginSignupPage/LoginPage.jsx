import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "store/user/user.actions.js"

import leftImage from './assets/trello-signup-left-image.svg';
import rightImage from './assets/trello-signup-right-image.svg';

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

        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={(ev) =>
            setCredentials((prev) => ({
              ...prev,
              username: ev.target.value,
            }))
          }
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={(ev) =>
            setCredentials((prev) => ({
              ...prev,
              password: ev.target.value,
            }))
          }
          placeholder="Password"
        />
        <button>Login</button>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>

      <div className="images-container">
        <img src={leftImage} alt="left-image" />
        <img src={rightImage} alt="right-image" />
      </div>
    </div>
  )
}