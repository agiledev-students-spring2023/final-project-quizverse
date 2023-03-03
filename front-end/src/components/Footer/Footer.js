import './Footer.css'
//import logo from './logo.svg'
import { Link } from 'react-router-dom'
/**
 * Our QuizVerse Footer!
 */
const Footer = props => {
  return (
    <footer className=".Footer-Footer">
      <nav className="Footer-navbar">
        <h1>QuizVerse! (In Progress)</h1>
      </nav>
    </footer>
  )
}

// make this component available to be imported into any other file
export default Footer