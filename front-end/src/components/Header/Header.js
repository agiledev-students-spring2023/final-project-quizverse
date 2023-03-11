import './Header.css';
//import logo from './logo.svg'
import { Link } from 'react-router-dom';
// import HamburgerMenu from "./HamburgerMenu.svg";
/**
 * Our QuizVerse Header!
 */
import React, { useState, useEffect } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import axios from "axios"
const Header = (props) => {
  const [data, setData] = useState([])

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log("fetching 10 random users...")
    axios("https://my.api.mockaroo.com/users.json?key=6b3bc3e0")
      .then(response => {
        // extract the data from the server response
        setData(response.data)
      })
      .catch(err => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`)
        console.error(err) // the server returned an error... probably too many requests... until we pay!

        // make some backup fake data
        const backupData = [
          {
            id: 1,
            title: "Paddy heron (unidentified)",
            country: "Brazil",
            price: "$10.51",
            description:
              "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
          },
          {
            id: 2,
            title: "Numbat",
            country: "Russia",
            price: "$2.37",
            description:
              "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
          },
        ]

        setData(backupData)
      })
  }, []) // only run it once!
  console.log(data[0].coins)
  
  return (
    <div className="header-container">
      <nav className="Header-navbar">
        <h1>QuizVerse</h1>
        <ul className="nav-links">
          {/*Coins and streak will be eventually pulled from backend*/}
          <li className="nav-item">
            <Link to="/shop">Current Streak: {data[0].streak} </Link>
          </li>
          <li className="nav-item">
            <Link to="/shop">Coins: {data[0].coins}</Link>
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
