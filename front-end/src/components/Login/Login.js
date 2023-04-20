import React, {useState, useContext} from 'react';
import {useEffect } from "react"
import {useNavigate} from 'react-router-dom';
import './Login.css';
import {UserContext} from '../Landing/UserContext';
import axios from 'axios';



function LoginPage() {
    const [username,
        setUsername] = useState('');
    const [password,
        setPassword] = useState('');
    const navigate = useNavigate();
    const {userCredentials} = useContext(UserContext);
    
    const [cookieData, setCookieData] = useState({})

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', {
              username,
              password
            });
            alert(response.data.message);
            navigate('/home');
        } catch (error) {
            alert(error.response
                ?.data
                    ?.message || 'An error occurred');
        }
    };

    return (
        <div className="login-page-container">
            <h1 className="login-page-title">Log In</h1>
            <form className="login-page-form" onSubmit={handleSubmit}>
                <div className="login-page-input-container">
                    <label htmlFor="username" className="login-page-label">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="login-page-input"/>
                </div>
                <div className="login-page-input-container">
                    <label htmlFor="password" className="login-page-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="login-page-input"/>
                </div>
                <button type="submit" className="login-page-button">
                    Log In
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
