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

    try {
      // create an object with the data we want to send to the server
      const requestData = {
        username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
        password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
      }
      // send the request to the server api to authenticate
      const response = await axios.post(
        "https://my.api.mockaroo.com/users.json?key=6b3bc3e0",
        requestData
      )
      // store the response data into the data state variable
      console.log(response.data)
    } catch (err) {
      // throw an error
      throw new Error(err)
    }
  
  return (
    <div className="header-container">
      <nav className="Header-navbar">
        <h1>QuizVerse</h1>
        <ul className="nav-links">
          {/*Coins and streak will be eventually pulled from backend*/}
          <li className="nav-item">
            <Link to="/shop">Current Streak: 3</Link>
          </li>
          <li className="nav-item">
            <Link to="/shop">Coins: 100</Link>
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
