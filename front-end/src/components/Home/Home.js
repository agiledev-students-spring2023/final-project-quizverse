import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { responsiveFontSizes } from '@mui/material';
/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Home = (props) => {
  const navigate = useNavigate();
  let token = 'Zappy!';
  let parsed = "";
  const [user, setUser] = useState('');
  let username = "";
  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'));
      token = parsed.token;
      username = parsed.username;
    } catch {
      console.log('Not logged in.');
      navigate('/', { state: { redirectedFrom: 'Home' } });
    }
  });
  //eslint-disable-next-line
  const [data, setData] = useState([]); // eslint-disable-next-line
  const [streak, setStreak] = useState(0); // eslint-disable-next-line
  const [coins, setCoins] = useState(0);

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    axios
      .get(`${process.env.REACT_APP_APIURL}/home`, {
        headers: { 'jwt-token': token, username: username } // pass the token, if any, to the server
      })
      .then((response) => {
        // extract the data from the server response
        if (
          response.data === null ||
          response.data.streak == null ||
          response.data.coins == null ||
          response.data.username == null
        ) {
          console.log('Incorrect credentials. Returning to login screen.');
          navigate('/', { state: { redirectedFrom: 'Home' } });
        }

        setData(response.data);
        setStreak(response.data.streak);
        setCoins(response.data.coins);
        setUser(response.data.username);
        //console.log(token);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.status);
        console.log('Incorrect credentials. Returning to login screen.');
        navigate('/', { state: { redirectedFrom: 'Home' } });
      });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <main>
        <h1>Welcome, {user}!</h1>
        <div className="logo-container">
          <img
            src={`${process.env.REACT_APP_APIURL}/static/images/QuizVerseLogo.png`}
            alt="QuizVerse Logo"
          />
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
          <Link to="/create-set" className="big-button">
            Create a Flashcard Set
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
