import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Settings.css';

/**
 * A React component that represents the Settings page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Settings = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const changeEmail = (event) => {
    event.preventDefault();
    alert('Email changed! Your email is now set to ' + email + '!');
    axios
      // post new message to server
      .post('http://localhost:3001/settings-email', { email: email })
      .then((response) => {
        console.log('yay!');
        return 'yay!';
      })
      .catch((err) => {
        console.log('Email change error!');
        return 'Email change error!';
      });
    //console.log({ email });
  };
  const changePassword = (event) => {
    event.preventDefault();
    alert('Password changed! Your new password is now set.');
    axios
      // post new message to server
      .post('http://localhost:3001/settings-password', { password: password })
      .then((response) => {
        console.log('yay!');
        return 'yay!';
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
      alert('Your account has been deleted!');
      navigate('/');
    } else if (!input === '') {
      alert('Incorrect input!');
    }
  };
  const logoutWarning = (event) => {
    alert('Thanks for using QuizVerse! See you again soon!');
    axios
      // post new message to server
      .post('http://localhost:3001/logout', {})
      .then((response) => {
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