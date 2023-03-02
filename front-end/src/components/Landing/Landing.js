import React from "react";
import Typewriter from "typewriter-effect";
import styles from "./Landing.module.css";
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className={styles.LandingContainer}>
      <div className={styles.LandingHeader}>
        <h1>Welcome to QuizVerse!</h1>
        <p className={styles.LandingStaticSentence}>
          A spaced repetition learning platform for{" "}
          <span className={styles.LandingTypewriter}>
            <Typewriter
              options={{
                strings: [
                  "students",
                  "teachers",
                  "learners",
                  "educators",
                  "everyone",
                ],
                autoStart: true,
                loop: true,
                wrapperClassName: styles.LandingTypewriterWord,
              }}
            />
          </span>
        </p>
      </div>
      <div className={styles.LandingBody}>
        <Link to="/login">
          <button className={styles.LogInButton}>Log In</button>
        </Link>{" "}
        <Link to="/SignUp">
          <button className={styles.LogInButton}>Sign Up</button>
        </Link>{" "}
      </div>
    </div>
  );
}

export default Landing;
