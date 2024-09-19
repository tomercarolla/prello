import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { CalendarOutlined, CodeSandboxOutlined, ProjectOutlined, SettingOutlined, TableOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'



import { Icon } from 'ui/icons/Icon';
import { Button } from '@ui';



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

        <Button
          scale='dynamic'
          onClick={() => setExpandedSidebar(!expandedSidebar)}
          className={`expand-button ${
            expandedSidebar ? 'expanded' : 'collapsed'
          }`}
        >
          <Icon
            color='var(--text)'
            size='28px'
            name={expandedSidebar ? 'chevronLeft' : 'chevronRight'}
          />
        </Button>
      </Container>
      {expandedSidebar && (
        <>
          <Divider />

          <Container $flexDirection='column' $alignItems='flex-start'>
            <StyledNavLink to='/'>
              <div className='icons-container'>
                <Icon name='board' size='16px'/>
                Boards
              </div>
            </StyledNavLink>

            <StyledNavLink to='/'>
              <div className='icons-container'>
                <Icon name='member' size='16px' />
                Members
              </div>
            </StyledNavLink>

            <StyledNavLink to='/'>
              <div className='icons-container'>
              <Icon name='settings' size='16px' />
              Workspace settings
              </div>
            </StyledNavLink>
          </Container>

          <div className='workspace-container'>
            <span>Workspace views</span>
            <div className='icons-container'>
              <Button size='sm' scale='dynamic' className='details' onClick={() => console.log('workspace view')}>
                <Icon name='details' size='16px' color='var(--text)' />
              </Button>

              <Button size='sm' scale='dynamic' className='plus' onClick={() => console.log('Create a view')}>
                <Icon name='plus' size='16px' color='var(--text)' />
              </Button>
            </div>
          </div>

          <List>
            <li className='list-item'>
              <StyledLink to='/'>
                <div className='icons-container'>
                  <Icon name='table' size='16px' />
                  <span>Tabel</span>
                </div>
                <div className='icons-container'>
                  <Button size='md' scale='dynamic' className='details' onClick={() => console.log('Table')}>
                    <Icon name='details' size='14px' color='var(--text)' />
                  </Button>
                </div>
              </StyledLink>
            </li>

            <li className='list-item'>
              <StyledLink to='/'>
                <div className='icons-container'>
                  <Icon name='calendar' size='16px' />
                  <span>Calendar</span>
                </div>
                <div className='icons-container'>
                  <Button size='md' scale='dynamic' className='details' onClick={() => console.log('Calendar')}>
                    <Icon name='details' size='14px' />
                  </Button>
                </div>
              </StyledLink>
            </li>
          </List>

          <div className='workspace-container'>
            <span>Your Boards</span>
            <div className='icons-container'>
              <Button size='sm' scale='dynamic' className='details' onClick={() => console.log('Your Board')}>
                <Icon name='details' size='16px' />
              </Button>
              <Button size='sm' scale='dynamic' className='plus' onClick={() => console.log('Create a board')}>
                <Icon name='plus' size='16px' />
              </Button>
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
                  <Button size='md' scale='dynamic' className='details' onClick={() => console.log('Details about this board')}>
                    <Icon name='details' size='16px' />
                  </Button>
                  <Button size='md' scale='dynamic' className='star' onClick={() => console.log('Star this board')}>
                    <Icon name='starEmpty' size='16px' />
                  </Button>
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
  }
`;
