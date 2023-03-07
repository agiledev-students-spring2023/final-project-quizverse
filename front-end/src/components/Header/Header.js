import './Header.css';
//import logo from './logo.svg'
import { Link } from 'react-router-dom';
// import HamburgerMenu from "./HamburgerMenu.svg";
/**
 * Our QuizVerse Header!
 */
const Header = (props) => {
  return (
    <header className=".Header-header">
      <nav className="Header-navbar">
        <h3>QuizVerse</h3>
        <ul className="nav-links">
          {/*Coins and streak will be eventually pulled from backend*/}
          <li className="nav-item">
            <Link to="/shop">
              Current Streak: 3<br></br>Coins: 100
            </Link>
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
      </nav>
    </header>
  );
};

// make this component available to be imported into any other file
export default Header;
