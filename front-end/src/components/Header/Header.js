import './Header.css';
//import logo from './logo.svg'
import { Link } from 'react-router-dom';
// import HamburgerMenu from "./HamburgerMenu.svg";
/**
 * Our QuizVerse Header!
 */
import React, { useState, useEffect } from "react"
import axios from "axios"
const Header = (props) => {
  const [data, setData] = useState([])
  const [streak, setStreak] = useState(0)
  const [coins, setCoins] = useState(0)

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log("fetching 10 random users...")
    axios("https://my.api.mockaroo.com/users.json?key=6b3bc3e0")
      .then(response => {
        // extract the data from the server response
        setData(response.data)
        setStreak(response.data[0].streak)
        setCoins(response.data[0].coins)
      })
      .catch(err => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`)
        console.error(err) // the server returned an error... probably too many requests... until we pay!

        // make some backup fake data
        const backupData =[{"username":"udottrell0","first_name":"Ulrich","last_name":"Dottrell","email":"udottrell0@newyorker.com","coins":34,"streak":14},{"username":"fgrandin1","first_name":"Fannie","last_name":"Grandin","email":"fgrandin1@360.cn","coins":59,"streak":71},{"username":"tbraundt2","first_name":"Thorin","last_name":"Braundt","email":"tbraundt2@ucoz.ru","coins":42,"streak":17},{"username":"drahl3","first_name":"Dun","last_name":"Rahl","email":"drahl3@joomla.org","coins":89,"streak":47},{"username":"gwimlett4","first_name":"Gothart","last_name":"Wimlett","email":"gwimlett4@ning.com","coins":68,"streak":48},{"username":"nlacroux5","first_name":"Nester","last_name":"Lacroux","email":"nlacroux5@github.io","coins":51,"streak":29},{"username":"gwasselin6","first_name":"Gwendolen","last_name":"Wasselin","email":"gwasselin6@photobucket.com","coins":96,"streak":66},{"username":"hscrymgeour7","first_name":"Hollie","last_name":"Scrymgeour","email":"hscrymgeour7@biblegateway.com","coins":60,"streak":91},{"username":"sgoldsworthy8","first_name":"Sandra","last_name":"Goldsworthy","email":"sgoldsworthy8@timesonline.co.uk","coins":88,"streak":4},{"username":"fkondratenko9","first_name":"Frants","last_name":"Kondratenko","email":"fkondratenko9@ebay.co.uk","coins":86,"streak":33}]

        setData(backupData)
        console.log(data)
      })
  }, []) 

  return (
    <div className="header-container">
      <nav className="Header-navbar">
        <h3>QuizVerse</h3>
        <ul className="nav-links">
          {/*Coins and streak will be eventually pulled from backend*/}
          <li className="nav-item">
            <Link to="/shop">Current Streak: {streak} </Link>
          </li>
          <li className="nav-item">
            <Link to="/shop">Coins: {coins}</Link>
          </li>
          {/*This will be set to the right eventually with css*/}
          <li className="nav-item">
            <Link to="/daily-quiz">Daily Quiz!</Link>
          </li>
          <li className="nav-item">
            <Link to="/my-account">My Account</Link>
          </li>
        </ul>
        {/*These are filler just to be used for current navigation purposes*/}
        <li className="nav-item">
          <Link to="/">Landing</Link>
        </li>
        <li className="nav-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/items">Items</Link>
        </li>
      </nav>
    </div>
  );
};

// make this component available to be imported into any other file
export default Header;
