import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Home = (props) => {
  return (
    <>
      <main>
        <div className="logo-container">
          <img
            src={process.env.PUBLIC_URL + "/QuizVerseLogo.png"}
            alt="QuizVerse"
          />
        </div>

        <div className="buttons-container">
          <Link to="/flashcards" className="big-button">
            My Flashcard Sets
          </Link>
          <Link to="/items" className="big-button">
            My Items
          </Link>
          <Link to="/shop" className="big-button">
            Item Shop
          </Link>
          <Link to="/daily-quiz" className="big-button">
            Daily Quiz
          </Link>
          <Link to="/study-stats" className="big-button">
            My Study Statistics
          </Link>
          <Link to="/settings" className="big-button">
            Settings
          </Link>
        </div>
      </main>
    </>
  );
};

// make this component available to be imported into any other file
export default Home;
