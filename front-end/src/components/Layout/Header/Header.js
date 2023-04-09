import styles from './Header.module.css';
import { ReactComponent as ReactLogo } from './qv_logo.svg';
//import logo from './logo.svg'
import { Link } from 'react-router-dom';
import Burger from './Burger.js';
import Menu from './Menu.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCalendar,
  faCirclePlus,
  faHome,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  const [data, setData] = useState([]); // eslint-disable-next-line
  const [streak, setStreak] = useState(0); // eslint-disable-next-line
  const [coins, setCoins] = useState(0);
  const [open, setOpen] = useState(false);

  // the following side-effect will be called once upon initial render


  return (
    <div className={styles['header-container']}>
      <nav className={styles['header-navbar']}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} />
        <ReactLogo className={styles['header-logo']} />
        <div className={styles['nav-links']}>
          {/*Coins and streak will be eventually pulled from backend*/}
          {/* <li className={styles['nav-item']}>
            <Link to="/shop">Current Streak: {streak} </Link>
          </li> */}
          {/* <li className={styles['nav-item']}>
            <Link to="/shop">Coins: {coins}</Link>
          </li> */}
          {/*This will be set to the right eventually with css*/}
          <li className={styles['nav-item']}>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} />
              Home
            </Link>
          </li>
          <li className={styles['nav-item']}>
            <Link to="/daily-quiz">
              <FontAwesomeIcon icon={faCalendar} />
              Quiz
            </Link>
          </li>
          <li className={styles['nav-item']}>
            <Link to="/create-set">
              <FontAwesomeIcon icon={faCirclePlus} />
              Create
            </Link>
          </li>
          <li className={styles['nav-item']}>
            <Link to="/settings">
              <FontAwesomeIcon icon={faUser} />
              Settings
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Header;
