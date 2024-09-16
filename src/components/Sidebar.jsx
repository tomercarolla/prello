import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { CalendarOutlined, CodeSandboxOutlined, EllipsisOutlined, RightOutlined, PlusOutlined, ProjectOutlined, SettingOutlined, StarOutlined, TableOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'




export function Sidebar() {
  const [expandedSidebar, setExpandedSidebar] = useState(false);

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
        <button
          onClick={() => setExpandedSidebar(!expandedSidebar)}
          className={`expand-button ${expandedSidebar ? 'expanded' : 'collapsed'}`}
        >
          <div className='icon'>
            <RightOutlined />
          </div>
        </button>
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
                  <div className='icon icon-details'>
                    <EllipsisOutlined />
                  </div>
                  <div className='icon icon-plus'>
                    <PlusOutlined />
                  </div>
                </div>
              </div>
              <List>
                <div className='list-container'>
                  <li className='list-item'>
                    <div>
                      <TableOutlined />
                    </div>
                    <LinkStyled to='/'>Tabel</LinkStyled>
                    <div className='icon-details'>
                      <EllipsisOutlined />
                    </div>
                  </li>

                  <li className='list-item'>
                    <div>
                      <CalendarOutlined />
                    </div>
                    <LinkStyled to='/'>Calendar</LinkStyled>
                    <div>
                      <div className='icon-details'>
                        <EllipsisOutlined />
                      </div>
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
                  <div className='icon icon-details'>
                    <EllipsisOutlined />
                  </div>
                  <div className='icon icon-plus'>
                    <PlusOutlined />
                  </div>
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
                      <div className='icon-details'>
                        <EllipsisOutlined />
                      </div>
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
    background-color: #555;
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
