import styled from 'styled-components';

export const ButtonLink = styled.a`
  min-width: 32px;
  max-width: 400px;
  height: 32px;
  padding-inline: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: var(--dynamic-button);
  border-radius: 3px;
  color: var(--dynamic-text);
  font-size: 14px;
  font-weight: 500;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: var(--dynamic-button-hovered);
    text-decoration: none;
  }

  &.active {
    background-color: var(--dynamic-button-highlighted);
    color: var(--dynamic-button-highlighted-text);
  }
`;
