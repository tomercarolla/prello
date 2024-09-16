import styled from "styled-components";

export const IconButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dynamic-button);
  border: none;
  border-radius: 2px;
  color: var(--dynamic-text);
  //todo - move to generic place
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  cursor: pointer;

  &:hover {
    background-color: var(--dynamic-button-hovered);
  }

  &.small {
    display: none;
    width: 22px;
    height: 22px;
  }

  &.plus {
    display: flex;
<<<<<<< HEAD:src/ui/IconButton.jsx
    width: 22px;
    height: 22px;
  }

  &.expanded {
    width: 28px;
    height: 28px;
  }
=======
    align-items: center;
    justify-content: center;
    background-color: var(--dynamic-button);
    border-radius: 3px;
    color: var(--dynamic-text);
    //todo - move to generic place
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
    cursor: pointer;
    border: none;
    
    &:hover {
        background-color: var(--dynamic-button-hovered);
    }
>>>>>>> 4d548593a1e26a8482d66a6b3f2b2606c55d0a2a:src/ui/IconButton/IconButton.jsx
`;