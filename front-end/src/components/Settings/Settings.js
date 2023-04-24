import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Settings.css';
import toast from 'react-hot-toast';

/**
 * A React component that represents the Settings page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Settings = (props) => {
  const navigate = useNavigate();
  let token = 'Zappy!';
  let parsed = "";
  const [user, setUser] = useState('');
  let username = "";
  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'))
      token = parsed.token;
      username = parsed.username
    } catch {
      console.log('Not logged in.');
      navigate('/', { state: { redirectedFrom: 'Settings' } });
    }
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const changeEmail = (event) => {
    event.preventDefault();
    toast.success('Email changed! Your email is now set to ' + email + '!');
    axios({
      method: 'POST',
      data: {
        email: email
      },
      withCredentials: true,
      headers: { 'jwt-token': token, username: parsed.username },
      url: 'http://localhost:3001/settings-email'
    })
      .then((response) => {
        console.log('Email updated!');
        return 'Email updated!';
      })
      .catch((err) => {
        console.log('Email change error!');
        return 'Email change error!';
      });
    //console.log({ email });
  };
  const changePassword = (event) => {
    event.preventDefault();
    toast.success('Password changed! Your password is now set to ' + password + '!');
    axios({
      method: 'POST',
      data: {
        password: password
      },
      withCredentials: true,
      headers: { 'jwt-token': token, username: parsed.username},
      url: 'http://localhost:3001/settings-password'
    }
    )
      .then((response) => {
        console.log('Password updated!');
        return 'Password updated!';
      })
      .catch((err) => {
        console.log('Password change error!');
        return 'Password change error!';
      });
    //post('http://localhost:3001/login');
    //navigate('./');
  };
  const deleteAccountWarning = (event) => {
    let input = prompt(
      "THIS WILL DELETE YOUR ACCOUNT PERMANENTLY. TYPE 'ok' in this box to confirm deletion of your account."
    );
    if (input === 'ok') {
      toast.success('Your account has been deleted!');
      axios({
        method: 'POST',
        withCredentials: true,
        headers: { 'jwt-token': token, username: parsed.username},
        url: 'http://localhost:3001/delete'
      }
      )
        .then((response) => {
          console.log('Deletion Successful!');
          localStorage.removeItem('info');
          return 'Deletion Successful!';
        })
        .catch((err) => {
          console.log('Oh noes big error!');
          return 'Oh noes big error!';
        });
      navigate('/');
    } else {
      toast.error('Incorrect input!');
      console.log('Incorrect input!');
    }
  };
  const logoutWarning = (event) => {
    toast.success('Thanks for using QuizVerse! See you again soon!')
    axios
      // post new message to server
      .post('http://localhost:3001/logout', {
        headers: { 'jwt-token': token, username: username} // pass the token, if any, to the server
      }, {})
      .then((response) => {
        localStorage.removeItem('info');
        console.log('Logout Successful!');
        return 'Logout Successful!';
      })
      .catch((err) => {
        console.log('Logout error!');
        return 'Logout error!';
      });
  };
  /**
   * sends a request to the specified url from a form. this will change the window location.
   * @param {string} path the path to send the post request to
   * @param {object} params the parameters to add to the url
   * @param {string} [method=post] the method to use on the form
   */

  // function post(path, params, method = 'post') {
  //   // The rest of this code assumes you are not using a library.
  //   // It can be made less verbose if you use one.
  //   const form = document.createElement('form');
  //   form.method = method;
  //   form.action = path;

  //   for (const key in params) {
  //     if (params.hasOwnProperty(key)) {
  //       const hiddenField = document.createElement('input');
  //       hiddenField.type = 'hidden';
  //       hiddenField.name = key;
  //       hiddenField.value = params[key];

  //       form.appendChild(hiddenField);
  //     }
  //   }

  //   document.body.appendChild(form);
  //   form.submit();
  // }
  return (
    <>
      <main>
        <div className="logo-container">
          <img src="http://localhost:3001/static/images/QuizVerseLogo.png" alt="QuizVerse" />
        </div>
        <div>
          <h1>Settings</h1>
        </div>
        <div className="settings-buttons-container">
          <form
            className="settings-form"
            onSubmit={changeEmail}
            action="http://localhost:3001/settings-email"
            method="post">
            <div className="settings-input-container">
              <label
                htmlFor="username"
                className="login-page-label"
                placeholder="example@mail-service.com">
                Set Email:
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="email-input"
              />
            </div>
          </form>
          <form className="settings-form" onSubmit={changePassword}>
            <div className="settings-input-container">
              <label
                htmlFor="username"
                className="login-page-label"
                placeholder="example@mail-service.com"
                action="http://localhost:3001/settings-password"
                method="post">
                Set Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="password-input"
              />
            </div>
          </form>
          <Link to="/items" className="settings-button">
            View Items
          </Link>
          <Link to="/study-stats" className="settings-button">
            Study Statistics
          </Link>
          <button className="settings-button" onClick={deleteAccountWarning}>
            DELETE ACCOUNT
          </button>
          <Link to="/" className="settings-button" onClick={logoutWarning}>
            Logout
          </Link>
        </div>
      </main>
    </>
  );
};

// make this component available to be imported into any other file
export default Settings;
