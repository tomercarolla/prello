import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { CalendarOutlined, CodeSandboxOutlined, EllipsisOutlined, PlusOutlined, ProjectOutlined, SettingOutlined, StarOutlined, TableOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'

import { IconButton } from '../ui/IconButton';

import { Icon } from 'ui/icons/Icon';



export function Sidebar() {
  const [expandedSidebar, setExpandedSidebar] = useState(true);

  return (
    <nav className={`sidebar ${expandedSidebar ? 'expanded' : ''}`}>
      <Container>
        <Container $justifyContent='flex-start'>
          <div className='avatar'></div>
          <div className='user-info'>
            <span className='username'>tomer test</span>
            <span className='user-status'>Premium</span>
          </div>
        </Container>

        <IconButton
          onClick={() => setExpandedSidebar(!expandedSidebar)}
          className={`expand-button ${
            expandedSidebar ? 'expanded' : 'collapsed'
          }`}
        >
          <Icon size='28px' name='expanded' color='#fff' />
        </IconButton>
      </Container>
      {expandedSidebar && (
        <>
          <Divider />

          <Container $flexDirection='column' $alignItems='flex-start'>
            <StyledNavLink to='/'>
              <CodeSandboxOutlined style={{ marginRight: '8px' }} />
              Boards
            </StyledNavLink>

            <StyledNavLink to='/'>
              <UsergroupDeleteOutlined style={{ marginRight: '8px' }} />
              Members
            </StyledNavLink>

            <StyledNavLink to='/'>
              <SettingOutlined style={{ marginRight: '8px' }} />
              Workspace settings
            </StyledNavLink>
          </Container>

          <div className='workspace-container'>
            <span>Workspace views</span>
            <div className='icons-container'>
              <IconButton className='details'>
                <Icon name='details' size='16px' />
              </IconButton>

              <IconButton className='plus'>
                <Icon name='plus' size='16px' />
              </IconButton>
            </div>
          </div>

          <List>
            <li className='list-item'>
              <StyledLink to='/'>
                <div>
                  <span style={{ marginRight: '8px' }}>
                    <TableOutlined />
                  </span>
                  <span style={{ fontStyle: 'italic' }}>Tabel</span>
                </div>
                <div className='icons-container'>
                  <IconButton className='details'>
                    <Icon name='details' size='14px' />
                  </IconButton>
                </div>
              </StyledLink>
            </li>

            <li className='list-item'>
              <StyledLink to='/'>
                <div>
                  <span style={{ marginRight: '8px' }}>
                    <CalendarOutlined />
                  </span>
                  <span style={{ fontStyle: 'italic' }}>Calendar</span>
                </div>
                <div className='icons-container'>
                  <IconButton className='details'>
                    <Icon name='details' size='14px' />
                  </IconButton>
                </div>
              </StyledLink>
            </li>
          </List>

          <div className='workspace-container'>
            <span>Your Boards</span>
            <div className='icons-container'>
              <IconButton className='details'>
                <Icon name='details' size='16px' />
              </IconButton>
              <IconButton className='plus'>
                <Icon name='plus' size='16px' />
              </IconButton>
            </div>
          </div>

          <List>
            <li className='list-item'>
              <StyledLink to='/'>
                <div>
                  <span style={{ marginRight: '8px' }}>
                    <ProjectOutlined />
                  </span>
                  <span>Yonatan's Board</span>
                </div>
                <div className='icons-container'>
                  <IconButton className='details'>
                    <Icon name='details' size='16px' />
                  </IconButton>
                  <IconButton className='star'>
                    <Icon name='starEmpty' size='16px' />
                  </IconButton>
                </div>
              </StyledLink>
            </li>
          </List>
        </>
      )}
    </nav>
  );
}

const Container = styled.div`
  display:flex;
  flex-direction: ${props => props.$flexDirection || 'row'};
  justify-content: ${props => props.$justifyContent || 'space-between' };
  align-items: ${props => props.$alignItems || 'center'};
  width: 100%;
  padding: 5px;
`

const Divider = styled.div`
  border-top: 1px solid #999;
  opacity: 0.2;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 6px;
  height: 32px;
  width: 100%;

  &:hover {
    background-color: var( --ds-background-neutral-hovered);
    text-decoration: none; 
`;

const List = styled.ul`
  list-style: none;
  padding: 5px;
  margin: 0;
  }
`

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
    color: inherit;
  }
`;
