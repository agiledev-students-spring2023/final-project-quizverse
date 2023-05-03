import React from 'react';
import Typewriter from 'typewriter-effect';
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function Landing() {
  const { redirectedFrom } = useLocation().state || { redirectedFrom: null };
  if (redirectedFrom) {
    toast.error(`You must be logged in to access the page!`, {
      id: 'login-error'
    });
  }

  return (
    <div className={styles.LandingContainer}>
      <div className={styles.LandingHeader}>
        <h1>Welcome to QuizVerse!</h1>
        <p className={styles.LandingStaticSentence}>
          A spaced repetition learning platform for{' '}
          <span className={styles.LandingTypewriter}>
            <Typewriter
              options={{
                strings: ['students', 'teachers', 'learners', 'educators', 'everyone'],
                autoStart: true,
                loop: true,
                wrapperClassName: styles.LandingTypewriterWord
              }}
              component={'span'}
            />
          </span>
        </p>
      </div>
      <div className={styles.LandingBody}>
        <Link to="/login">
          <button className={styles.LogInButton}>Log In</button>
        </Link>{' '}
        <Link to="/SignUp">
          <button className={styles.LogInButton}>Sign Up</button>
        </Link>{' '}
      </div>
    </div>
  );
}

export default Landing;
