import { Button } from '@ui';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../../store/user/user.actions.js';
import LeftImage from '../assets/trello-signup-left-image.svg';
import RightImage from '../assets/trello-signup-right-image.svg';

export function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  });
  const [error, setError] = useState('');

  async function handleSubmit(ev) {
    ev.preventDefault();

    setError('');

    try {
      if (
        !credentials.username ||
        !credentials.password ||
        !credentials.fullname
      ) {
        setError('All fields are required');

        return;
      }

      await signup(credentials);

      navigate('/workspace');
    } catch (err) {
      if (err.response?.status === 400) {
        if (err.response.data.includes('already exists')) {
          setError('Username already exists');
        } else {
          setError(err.response.data || 'Error signing up');
        }
      } else {
        setError('An error occurred duting signup. Please try again');
      }

      console.error('Error signing up:', err);
    }
  }

  function handleChange(ev) {
    const { name, value } = ev.target;

    setCredentials((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));

    if (error) setError('');
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="header">
          <h2>Welcome to Prello</h2>
          <span>Sign up now!</span>
        </div>

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

        <Button className="submit-btn" radius="3px" fullwidth="true">
          Signup
        </Button>

        <div className="link">
          <span>Already have an account?</span>

          <Link to="/login">Login here</Link>
        </div>
      </form>

      <div className="images-container">
        <img src={LeftImage} alt="left-image" />
        <img src={RightImage} alt="right-image" />
      </div>
    </div>
  );
}
