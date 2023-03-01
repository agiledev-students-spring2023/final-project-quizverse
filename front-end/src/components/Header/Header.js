import './Header.css'
//import logo from './logo.svg'
import { Link } from 'react-router-dom'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = props => {
  return (
    <header className="Header-header">
      <nav className="Header-navbar">
        <h1>QuizVerse! (In Progress)</h1>
        <p>Hamburger menu, streak and coins, <Link to="/home">daily quiz link (actually just goes to home)</Link>, and my account</p>
        <a
          className="Sus Link"
          href="./"
          //target="_blank"
          //rel="noopener noreferrer"
        >
          Sus link back to root
        </a>
        <div>
          <Link to="/daily-quiz">Daily Quiz</Link>
        </div>
      </nav>
    </header>
  )
}

// make this component available to be imported into any other file
export default Header