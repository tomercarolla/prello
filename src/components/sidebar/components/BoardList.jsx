import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Icon } from 'ui/icons/Icon';
import { Button, Menu } from '@ui';


export function BoardList({ items, toggleMenu, getMenuContent }) {
  return (
    <List>
      {items.map((item) => (
        <li key={item.name} className='list-item'>
          <StyledLink to='/'>
            <div className='icons-container'>
              <Icon name={item.icon} size='16px' />
              <span>{item.name}</span>
            </div>
            <div className='icons-container'>
              <Menu
                trigger={
                  <Button
                    size='md'
                    scale='ghost'
                    className='details'
                    onClick={() => toggleMenu(item.name.toLowerCase())}
                  >
                    <Icon name='details' size='14px' />
                  </Button>
                }
                title={item.name}
              >
                {getMenuContent(item.name.toLowerCase())}
              </Menu>
            </div>
          </StyledLink>
        </li>
      ))}
    </List>
  );
}

const List = styled.ul`
    list-style: none;
    padding: 5px;
    margin: 0;
}
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 4px 8px;
  height: 32px;
  color: inherit;
  width: 100%;

  &:hover {
    background-color: var(--ds-background-neutral-hovered);
    text-decoration: none;
  }
`;

