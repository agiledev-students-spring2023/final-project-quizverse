import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Settings.css';

/**
 * A React component that represents the Settings page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Settings = (props) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const changeEmail = (event) => {
    event.preventDefault();
    //let input = document.getElementById('email').value;
    //setEmail(input);
    alert('Email changed! Your email is now set to ' + email + '!');
    console.log({ email });
  };
  const deleteAccountWarning = (event) => {
    let input = prompt(
      "THIS WILL DELETE YOUR ACCOUNT PERMANENTLY. TYPE 'ok' in this box to confirm deletion of your account."
    );
    if (input === 'ok') {
      alert('Your account has been deleted!');
      navigate('/');
    } else {
      alert('Incorrect input!');
    }
  };
  const logoutWarning = (event) => {
    alert('Thanks for using QuizVerse! See you again soon!');
  };
  return (
    <>
      <main>
        <div className="logo-container">
          <img src={process.env.PUBLIC_URL + '/QuizVerseLogo.png'} alt="QuizVerse" />
        </div>
        <div className="settings-buttons-container">
          <form className="login-page-form" onSubmit={changeEmail}>
            <div className="email-input-container">
              <label htmlFor="username" className="login-page-label">
                Email:
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
          <Link to="/password" className="settings-button">
            Change Password
          </Link>
          <Link to="/items" className="settings-button">
            View Items
          </Link>
          <Link to="/study-statistics" className="settings-button">
            Study Statistics
          </Link>
          <Link to="/daily-quiz-settings" className="settings-button">
            Daily Quiz Settings
          </Link>
          <button className="settings-button" onClick={deleteAccountWarning}>
            DELETE ACCOUNT
          </button>
          <Link to="/" className="button" onClick={logoutWarning}>
            Logout
          </Link>
        </div>
      </main>
    </>
  );
};

// make this component available to be imported into any other file
export default Settings;
