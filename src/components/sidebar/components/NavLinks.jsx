import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'ui/icons/Icon';
import { Container } from '../StyledElements';

export function NavLinks() {
  return (
    <Container
      $padding="8px 0"
      $flexDirection="column"
      $alignItems="flex-start"
    >
      <StyledNavLink to="/workspace">
        <div className="icons-container">
          <Icon name="board" size="16px" />
          Boards
        </div>
      </StyledNavLink>
    </Container>
  );
}

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding-inline: 12px;
  height: 32px;
  width: 100%;

  &:hover {
    background-color: var(--ds-background-neutral-hovered);
    text-decoration: none;
  }
`;
