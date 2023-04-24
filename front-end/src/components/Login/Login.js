import React, { useState } from 'react';
//import useContext from 'react';
//import {useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
//import {UserContext} from '../Landing/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { redirectedFrom } = useLocation().state || { redirectedFrom: null };

  if (redirectedFrom) {
    toast.success(`Registration successful! Try logging in now!`, {
      id: 'login-success'
    });
  }

  //const {userCredentials} = useContext(UserContext);

  //const [cookieData, setCookieData] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      // if (response.data && response.data.token){
      //   //alert(response.data.token);
      //   //console.log(response.data.token);
      //   //localStorage.setItem("token", response.data.token);
      //   //future requests should have
      // }
      //alert(response.data.message);
      // console.log(response.data.token);
      // const monkey = {
      //   ooo_ooo: 'aaa_aaa',
      //   sus: 'Zappy!',
      //   token: response.data.token
      // };
      // const serializedObj = JSON.stringify(monkey, null, 0); // a JSON string representation of the object
      // localStorage.setItem('Yunaka', serializedObj); // store it with the key, foo
      toast.success(`${response.data.username} is now logged in!`, {
        id: 'login-success'
      });
      console.log(response.data);
      const info = {
        username: response.data.username,
        token: response.data.token
      };
      localStorage.setItem('info', JSON.stringify(info, null, 0));
      navigate('/home');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred on login', {
        id: 'login-error'
      });
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
            className="login-page-input"
          />
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
            className="login-page-input"
          />
        </div>
        <button type="submit" className="login-page-button">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
