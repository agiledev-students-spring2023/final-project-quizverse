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
      <div className="item">
        <Copyright />
      </div>
      <div className="item">
        <Typography variant="body2" color="primary" align="center">
          <Link to="/terms">Terms of Service</Link>
        </Typography>
      </div>
      <div className="item">
        <Typography variant="body2" color="primary" align="center">
          <Link to="/privacy">Privacy Policy</Link>
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
