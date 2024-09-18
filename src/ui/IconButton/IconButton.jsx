import styled from "styled-components";

export const IconButton = styled.button`
  width: 28px;
  height: 28px;
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
    padding: 2px;
  }

  &.plus .details .star {
    background-color: var(--dynamic-text)
  }
`;