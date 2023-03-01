import React from 'react';
import Typewriter from 'typewriter-effect';
import styles from './HomeScreen.module.css';

function HomeScreen() {
  return (
    <div className={styles.HomeScreenContainer}>
      <div className={styles.HomeScreenHeader}>
        <h1>Welcome to QuizVerse!</h1>
        <p className={styles.HomeScreenStaticSentence}>
          A spaced repetition learning platform for{' '}
          <span className={styles.HomeScreenTypewriter}>
            <Typewriter
              options={{
                strings: [
                  'students',
                  'teachers',
                  'learners',
                  'educators',
                  'everyone',
                ],
                autoStart: true,
                loop: true,
                wrapperClassName: styles.HomeScreenTypewriterWord,
              }}
            />
          </span>
        </p>
      </div>
      <div className={styles.HomeScreenBody}>
        <button className={styles.LogInButton}>Log In</button>
        <button className={styles.SignUpButton}>Sign Up</button>
      </div>
    </div>
  );
}

export default HomeScreen;
