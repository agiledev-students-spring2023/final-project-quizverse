import './Footer.css'
//import logo from './logo.svg'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material';
/**
 * Our QuizVerse Footer!
 */
function Copyright() {
    return (
      <Typography variant="body2" color="primary" align="center">
        {'Copyright © '}
        <Link color="inherit" to="/">
          QuizVerse
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
const Footer = props => {
  return (
    <footer className="footer">
            <p className='item'><Copyright /></p>
            <p className="item"><Typography variant="body2" color="primary" align="center"><Link to="/terms">Terms of Service</Link></Typography></p>
            <p className="item"><Typography variant="body2" color="primary" align="center"><Link to="/privacy">Privacy Policy</Link></Typography></p>
    </footer>
  )
}

// make this component available to be imported into any other file
export default Footer