import { Button, Icon } from '@ui';
import { Select } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLinks } from './components/NavLinks.jsx';
import { AvatarContainer, Container, Divider } from './StyledElements';

export function Sidebar() {
  const loggedInUser = useSelector((state) => state.userModule.user);
  const [expandedSidebar, setExpandedSidebar] = useState(true);

  return (
    <nav className={`sidebar ${expandedSidebar ? 'expanded' : 'collapsed'}`}>
      <Container className="sidebar-container">
        {expandedSidebar ? (
          <AvatarContainer>
            <div className="avatar">
              {loggedInUser.fullname.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">
              <span className="fullname">{loggedInUser.fullname}</span>
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
