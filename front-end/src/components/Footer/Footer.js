import './Footer.css';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

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
const Footer = (props) => {
  return (
    <footer className="footer">
      <p className="item">
        <Copyright />
      </p>
      <p className="item">
        <Typography variant="body2" color="primary" align="center">
          <Link to="/terms">Terms of Service</Link>
        </Typography>
      </p>
      <p className="item">
        <Typography variant="body2" color="primary" align="center">
          <Link to="/privacy">Privacy Policy</Link>
        </Typography>
      </p>
    </footer>
  );
};

export default Footer;
