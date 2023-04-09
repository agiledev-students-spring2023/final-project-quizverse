import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Home = (props) => {
  //eslint-disable-next-line
  const [data, setData] = useState([]); // eslint-disable-next-line
  const [streak, setStreak] = useState(0); // eslint-disable-next-line
  const [coins, setCoins] = useState(0);
  const [user, setUser] = useState('');

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log('fetching 10 random users...');
    axios('http://localhost:3001/home')
      .then((response) => {
        // extract the data from the server response
        setData(response.data);
        setStreak(response.data[0].streak);
        setCoins(response.data[0].coins);
        setUser(response.data[0].first_name);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <main>
        <h1>Welcome, {user}!</h1>
        <div className="logo-container">
          <img src="http://localhost:3001/static/images/QuizVerseLogo.png" alt="QuizVerse Logo" />
        </div>

        <div className="buttons-container">
          <Link to="/daily-quiz" className="big-button">
            Daily Quiz (Streak: {streak} &#128293;)
          </Link>
          <Link to="/items" className="big-button">
            My Items
          </Link>
          <Link to="/shop" className="big-button">
            Item Shop (Coins: {coins} &#x1FA99;)
          </Link>
          <Link to="/flashcards" className="big-button">
            My Flashcard Sets
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
