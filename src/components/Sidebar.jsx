import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { CalendarOutlined, CodeSandboxOutlined, EllipsisOutlined, PlusOutlined, ProjectOutlined, SettingOutlined, StarOutlined, TableOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'

import { IconButton } from '../ui/IconButton';

import BackwardIcon from '../ui/icons/BackwardIcon.svg';



export function Sidebar() {
  const [expandedSidebar, setExpandedSidebar] = useState(true);

  return (
    <nav className={`sidebar ${expandedSidebar ? 'expanded' : ''}`}>
      <Container>
        {expandedSidebar && (
          <Container $justifyContent='flex-start'>
            <div className='avatar'></div>
            <div className='user-info'>
              <span className='username'>tomer test</span>
              <span className='user-status'>Premium</span>
            </div>
          </Container>
        )}
        <IconButton
          onClick={() => setExpandedSidebar(!expandedSidebar)}
          className={`expand-button ${
            expandedSidebar ? 'expanded' : 'collapsed'
          }`}
        >
          <div className='icon'>
            <img src={BackwardIcon}/>
          </div>
        </IconButton>
      </Container>
      {expandedSidebar && (
        <>
          <Divider />

          <Container $flexDirection='column' $alignItems='flex-start'>
            <StyledLink to='/'>
              <CodeSandboxOutlined style={{ marginRight: '8px' }} />
              Boards
            </StyledLink>

            <StyledLink to='/'>
              <UsergroupDeleteOutlined style={{ marginRight: '8px' }} />
              Members
            </StyledLink>

            <StyledLink to='/'>
              <SettingOutlined style={{ marginRight: '8px' }} />
              Workspace settings
            </StyledLink>
          </Container>

          <div>
            <div>
              <div className='workspace-container'>
                <span>Workspace views</span>
                <div className='icons-container'>
                  <IconButton className='icon icon-details small'>
                    <EllipsisOutlined />
                  </IconButton>
                  <IconButton className='icon plus'>
                    <PlusOutlined />
                  </IconButton>
                </div>
              </div>
              <List>
                <div className='list-container'>
                  <li className='list-item'>
                    <div>
                      <TableOutlined />
                    </div>
                    <LinkStyled to='/'>Tabel</LinkStyled>
                    <IconButton className='icon-details small'>
                      <EllipsisOutlined />
                    </IconButton>
                  </li>

                  <li className='list-item'>
                    <div>
                      <CalendarOutlined />
                    </div>
                    <LinkStyled to='/'>Calendar</LinkStyled>
                    <div>
                      <IconButton className='icon-details small'>
                        <EllipsisOutlined />
                      </IconButton>
                    </div>
                  </li>
                </div>
              </List>
            </div>
          </div>

          <div>
            <div>
              <div className='workspace-container'>
                <span>Your Boards</span>
                <div className='icons-container'>
                  <IconButton className='icon icon-details small'>
                    <EllipsisOutlined />
                  </IconButton>
                  <IconButton className='icon plus'>
                    <PlusOutlined />
                  </IconButton>
                </div>
              </div>
              <List>
                <div className='list-container'>
                  <li className='list-item'>
                    <div>
                      <ProjectOutlined />
                    </div>
                    <LinkStyled to='/'>Yonatan's Board</LinkStyled>
                    <div className='icons-container'>
                      <IconButton className='icon-details small'>
                        <EllipsisOutlined />
                      </IconButton>
                      <div className='icon-star'>
                        <StarOutlined />
                      </div>
                    </div>
                  </li>
                </div>
              </List>
            </div>
          </div>
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

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 6px;
  width: 100%;

  &:hover {
    text-decoration: none; 
    background-color: var( --ds-background-neutral-hovered);
    border-radius: 2px;
    transition: 0.3s;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;

  &:hover {
    text-decoration: none; 
    color: inherit;

    .icon-details {
      display: block;
      }
  }
`
