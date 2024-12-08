import { Button } from '@ui';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from 'store/user/user.actions.js';
import LeftImage from '../assets/trello-signup-left-image.svg';
import RightImage from '../assets/trello-signup-right-image.svg';

export function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  async function handleSubmit(ev) {
    ev.preventDefault();

    try {
      await login(credentials);

      navigate('/workspace');
    } catch (err) {
      console.error('Error logging in:', err);

      throw new Error('Error logging in');
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="header">
          <h2>Welcome to Prello</h2>
          <span>Login</span>
        </div>

        <div className="form-group">
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
        </div>

        <div className="form-group">
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
        </div>

        <Button className="submit-btn" radius="3px" fullwidth="true">
          Login
        </Button>

        <div className="link">
          <span>Don't have an account?</span>

          <Link to="/signup">Sign up</Link>
        </div>
      </form>

      <div className="images-container">
        <img src={LeftImage} alt="left-image" />
        <img src={RightImage} alt="right-image" />
      </div>
    </div>
  );
}
