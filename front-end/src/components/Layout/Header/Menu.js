import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
import { Link } from 'react-router-dom';
const Menu = ({ open, setOpen }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/" onClick={() => setOpen(!open)}>
        Home
      </Link>
      <Link to="/daily-quiz" onClick={() => setOpen(!open)}>
        Daily Quiz
      </Link>
      <Link to="/settings" onClick={() => setOpen(!open)}>
        Settings
      </Link>
      <Link to="/shop" onClick={() => setOpen(!open)}>
        Shop
      </Link>
      <Link to="/study-stats" onClick={() => setOpen(!open)}>
        My Stats
      </Link>
    </StyledMenu>
  );
};
Menu.propTypes = {
  open: bool.isRequired,
}
export default Menu;