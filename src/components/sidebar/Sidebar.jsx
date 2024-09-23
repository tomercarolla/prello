import React, { useState } from 'react';
import styled from 'styled-components';

import { Select } from 'antd';
import { Icon } from 'ui/icons/Icon';
import { Button, Menu } from '@ui';
import { Container } from './StyledElements';

import { NavLinks } from './NavLinks.jsx';
import { BoardList } from './components/BoardList';
import { WorkspaceContainer } from './components/WorkspaceContainer';


export function Sidebar() {
  const [expandedSidebar, setExpandedSidebar] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  function toggleMenu(menuType) {
    setOpenMenu(openMenu === menuType ? null : menuType);
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

  const listItems = [
    { name: 'Table', icon: 'table' },
    { name: 'Calendar', icon: 'table' },
  ];



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

          <NavLinks />

          <WorkspaceContainer
            title='Workspace views'
            menuType='workspace'
            getMenuContent={getMenuContent}
            onToggleMenu={toggleMenu}
          />

          <BoardList
            items={listItems}
            toggleMenu={toggleMenu}
            getMenuContent={getMenuContent}
          />

          <WorkspaceContainer
            title='Your Boards'
            menuType='board'
            getMenuContent={getMenuContent}
            onToggleMenu={toggleMenu}
          />

          <BoardList
            items={[{ name: "Yonatan's Board", icon: 'board' }]}
            toggleMenu={toggleMenu}
            getMenuContent={getMenuContent}
          />
        </>
      )}
    </nav>
  );
}

export const Divider = styled.div`
  border-top: 1px solid #999;
  opacity: 0.2;
`;

export const StyledSelect = styled(Select)`
  && {
    .ant-select-selector {
      background-color: var(--surface);
      color: var(--ds-text);
      border: 1px solid transparent;
    }

    &:hover .ant-select-selector {
      border-color: var(--ds-border-input-hovered);
    }

    .ant-select-arrow {
      color: var(--ds-text);
    }

    &.ant-select-focused .ant-select-selector {
      background-color: #22272b;
      border-color: #579dff;
      color: var(--ds-text);
    }

    &.ant-select-focused .ant-select-arrow {
      color: var(--ds-text);
    }
  }
`;

export const StyledLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
`;
