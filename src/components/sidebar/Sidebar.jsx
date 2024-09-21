import {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { ProjectOutlined } from '@ant-design/icons'
import { Select } from 'antd';


import {Icon} from 'ui/icons/Icon';
import {Button, Menu} from '@ui';




export function Sidebar() {
    const [expandedSidebar, setExpandedSidebar] = useState(true);
    const [openMenu, setOpenMenu] = useState(null);

    function toggleMenu(menuType) {
        setOpenMenu(openMenu === menuType ? null : menuType)
  }
  
  function getMenuContent(type) {
    switch (type) {
      case 'workspace':
        return (
          <div className='filter-container'>
            <StyledLabel>Filter</StyledLabel>
            <StyledSelect
              defaultValue='all'
              style={{ width: '100%' }}
              onChange={(value) => console.log(value)}
              options={[
                { value: 'all', label: 'All workspace views' },
                { value: 'created', label: 'Created by me' },
              ]}
              className='custom-select'
            />
          </div>
        );

      case 'board':
        return (
          <div className='sort-container'>
            <StyledLabel>Sort</StyledLabel>
            <StyledSelect
              defaultValue='alphabetically'
              style={{ width: '100%' }}
              onChange={(value) => console.log(value)}
              options={[
                { value: 'alphabetically', label: 'sort alphabetically' },
                { value: 'created', label: 'sort by created date' },
              ]}
              className='custom-select'
            />
          </div>
        );

      case 'table':
      case 'calendar':
        return (
          <Button scale='dynamic' size='md' className='close-button'>
            <Icon name='trash' size='16px' color='var(--ds-text)' />
            <span style={{ color: 'var(--ds-text)' }}>Remove View</span>
          </Button>
        );
      default:
        return null;
    }
  }
    return (
      <>
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
              scale='ghost'
              onClick={() => setExpandedSidebar(!expandedSidebar)}
              className={`expand-button ${expandedSidebar ? '' : 'collapsed'}`}
            >
              <Icon
                size={expandedSidebar ? '28px' : '26px'}
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
                    <Icon name='board' size='16px' />
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
                  <Menu
                    trigger={
                      <Button
                        size='sm'
                        scale='ghost'
                        className='details'
                        onClick={() => toggleMenu('workspace')}
                      >
                        <Icon name='details' size='16px' />
                      </Button>
                    }
                    title='Workspace Views'
                  >
                    {getMenuContent('workspace')}
                  </Menu>
                  <Button
                    size='sm'
                    scale='ghost'
                    className='plus'
                    onClick={() => console.log('Create a view')}
                  >
                    <Icon name='plus' size='16px' />
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
                      <Menu
                        trigger={
                          <Button
                            size='md'
                            scale='ghost'
                            className='details'
                            onClick={() => toggleMenu('table')}
                          >
                            <Icon name='details' size='14px' />
                          </Button>
                        }
                        title='Table'
                      >
                        {getMenuContent('table')}
                      </Menu>
                    </div>
                  </StyledLink>
                </li>

                <li className='list-item'>
                  <StyledLink to='/'>
                    <div className='icons-container'>
                      <Icon name='table' size='16px' />
                      <span>Calendar</span>
                    </div>
                    <div className='icons-container'>
                      <Menu
                        trigger={
                          <Button
                            size='md'
                            scale='ghost'
                            className='details'
                            onClick={() => toggleMenu('calendar')}
                          >
                            <Icon name='details' size='14px' />
                          </Button>
                        }
                        title='Table'
                      >
                        {getMenuContent('calendar')}
                      </Menu>
                    </div>
                  </StyledLink>
                </li>
              </List>

              <div className='workspace-container'>
                <span>Your Boards</span>
                <div className='icons-container'>
                  <Menu
                    trigger={
                      <Button
                        size='sm'
                        scale='ghost'
                        className='details'
                        onClick={() => toggleMenu('board')}
                      >
                        <Icon name='details' size='16px' />
                      </Button>
                    }
                    title='Your boards'
                  >
                    {getMenuContent('board')}
                  </Menu>
                  <Button
                    size='sm'
                    scale='ghost'
                    className='plus'
                    onClick={() => console.log('Create a board')}
                  >
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
                        <Menu
                          trigger={
                            <Button
                              size='md'
                              scale='ghost'
                              className='details'
                              onClick={() => toggleMenu('board')}
                            >
                              <Icon name='details' size='16px' />
                            </Button>
                          }
                          title='Board Options'
                        >
                          {getMenuContent('board')}
                        </Menu>
                        <Button
                          size='md'
                          scale='ghost'
                          className='star'
                          onClick={() => console.log('Star this board')}
                        >
                          <Icon name='starEmpty' size='16px' />
                        </Button>
                      </div>
                    </StyledLink>
                  </li>
              </List>
            </>
          )}
        </nav>
      </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.$flexDirection || 'row'};
    justify-content: ${props => props.$justifyContent || 'space-between'};
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
        background-color: var(--ds-background-neutral-hovered);
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

const StyledSelect = styled(Select)`
  .ant-select-selector {
    background-color: var(--surface) !important;
    color: var(--ds-text) !important;
    border: 1px solid transparent !important;
  }

  &:hover .ant-select-selector {
    border-color: var(--ds-border-input-hovered) !important;
  }

  .ant-select-arrow {
    color: var(--ds-text) !important;
  }

  &.ant-select-focused .ant-select-selector {
    background-color: #22272b !important;
    border-color: #579dff !important;
    color: var(--ds-text) !important;
  }

  &.ant-select-focused .ant-select-arrow {
    color: var(--ds-text) !important;
  }
`;

const StyledLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
`;
