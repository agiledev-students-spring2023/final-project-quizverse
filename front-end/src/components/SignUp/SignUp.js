import React, { useState } from 'react';
//import useContext from 'react';
import { useNavigate } from 'react-router-dom';
//import {UserContext} from '../Landing/UserContext';
import './SignUp.css';
import axios from 'axios';

function SignUpPage() {
  //const {userCredentials, setUserCredentials} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/register', { username, password });
      alert("Successfully registered. Please log in.")
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
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
            className="signup-page-input"
          />
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
            className="signup-page-input"
          />
        </div>
        <button type="submit" className="signup-page-button">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
