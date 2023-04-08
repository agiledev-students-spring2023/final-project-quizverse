import styled from 'styled-components';
export const StyledBurger = styled.button`
  position: absolute;
  top: 0%
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  color: 'black';
  &:focus {
    outline: none;
  }
`;