import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';
import toast from 'react-hot-toast';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
      });
      if (response.data.status === 'success') {
        // Store token and user information
        localStorage.setItem(
          'info',
          JSON.stringify({
            token: response.data.token,
            username: response.data.user.username,
          })
        );

        // Redirect user to home page
        navigate('/home');
      } else {
        // Handle any errors that may occur during registration
        console.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        // if form fields are empty
        const errArr = error.response?.data?.errors;
        const errStr = errArr.map((err) => err.msg + '\n');
        toast.error(errStr, { id: 'signup-error' });
      } else {
        toast.error(
          error.response?.data?.message || 'An error occurred on signup',
          { id: 'signup-error' }
        );
      }
    }
  };

    return (
        <div className="signup-page-container">
            <h1 className="signup-page-title">Sign Up</h1>
            <form className="signup-page-form" onSubmit={handleSubmit}>
                <div className="signup-page-input-container">
                    <label htmlFor="username" className="signup-page-label">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="signup-page-input"/>
                </div>
                <div className="signup-page-input-container">
                    <label htmlFor="password" className="signup-page-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="signup-page-input"/>
                </div>
                <button type="submit" className="signup-page-button">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUpPage;
