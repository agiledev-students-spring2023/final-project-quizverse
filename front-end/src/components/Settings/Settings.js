import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

/**
 * A React component that represents the Settings page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Settings = (props) => {
  const [email, setEmail] = useState('');
  const changeEmail = (event) => {
    event.preventDefault();
    alert('Email changed! Your email is now set to ${email}');
  };
  return (
    <>
      <main>
        <div className="logo-container">
          <img src={process.env.PUBLIC_URL + '/QuizVerseLogo.png'} alt="QuizVerse" />
        </div>

        <div className="buttons-container">
          <div className="login-page-input-container">
            <label htmlFor="email" className="email-box">
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
          <button type="submit" className="answer-button" onClick={changeEmail}>
            Submit
          </button>
          <Link to="/password" className="big-button">
            Change Password
          </Link>
          <Link to="/items" className="big-button">
            View Items
          </Link>
          <Link to="/study-statistics" className="big-button">
            Study Statistics
          </Link>
          <Link to="/daily-quiz-settings" className="big-button">
            Daily Quiz Settings
          </Link>
          <Link to="/delete-account" className="big-button">
            DELETE ACCOUNT
          </Link>
          <Link to="/landing" className="button">
            Logout
          </Link>
        </div>
      </main>
    </>
  );
};

// make this component available to be imported into any other file
export default Settings;
