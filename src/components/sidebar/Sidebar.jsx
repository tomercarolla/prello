import { useState } from 'react';
import styled from 'styled-components';

import { Button, Icon } from '@ui';
import { Select } from 'antd';
import { AvatarContainer, Container, Divider } from './StyledElements';

import { BoardList } from './components/BoardList';
import { NavLinks } from './components/NavLinks.jsx';
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
          <div className="filter-container">
            <StyledLabel>Filter</StyledLabel>
            <StyledSelect
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={(value) => console.log(value)}
              options={[
                { value: 'all', label: 'All workspace views' },
                { value: 'created', label: 'Created by me' },
              ]}
              className="custom-select"
            />
          </div>
        );
      case 'board':
        return (
          <div className="sort-container">
            <StyledLabel>Sort</StyledLabel>
            <StyledSelect
              defaultValue="alphabetically"
              style={{ width: '100%' }}
              onChange={(value) => console.log(value)}
              options={[
                { value: 'alphabetically', label: 'sort alphabetically' },
                { value: 'created', label: 'sort by created date' },
              ]}
              className="custom-select"
            />
          </div>
        );
      case 'table':
      case 'calendar':
        return (
          <Button
            fullwidth="true"
            scale="dynamic"
            size="md"
            className="close-button"
          >
            <Icon name="trash" size="16px" color="var(--ds-text)" />
            <span style={{ color: 'var(--ds-text)' }}>Remove View</span>
          </Button>
        );
      default:
        return null;
    }
  }

  const listItems = [
    { name: 'Table', icon: 'table' },
    { name: 'Calendar', icon: 'calendar' },
  ];

  return (
    <nav className={`sidebar ${expandedSidebar ? 'expanded' : 'collapsed'}`}>
      <Container className="sidebar-container">
        {expandedSidebar ? (
          <AvatarContainer>
            {/*todo add dynamic user*/}
            <div className="avatar">T</div>

            <div className="user-info">
              <span className="username">Tomer test</span>
              <span className="status">Free</span>
            </div>
          </AvatarContainer>
        ) : null}

        <Button
          scale="ghost"
          radius="3px"
          onClick={() => setExpandedSidebar(!expandedSidebar)}
          className="expand-button"
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
            title="Workspace views"
            menuType="workspace"
            getMenuContent={getMenuContent}
          />

          <BoardList
            items={listItems}
            toggleMenu={toggleMenu}
            getMenuContent={getMenuContent}
          />

          <WorkspaceContainer
            title="Your Boards"
            menuType="board"
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
