import React from 'react';
import { bool, func } from 'prop-types';
import { StyledBurger } from './Burger.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger color="black" open={open} onClick={() => setOpen(!open)}>
      <FontAwesomeIcon icon={faBars} size="2xl" />
    </StyledBurger>
  );
};
Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};
export default Burger;