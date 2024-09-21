import React from 'react';
import styled from 'styled-components';

const InitialsCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ color }) => color || 'gray'}; /* User's color or default */
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;

const getUserInitials = (name) => {
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part[0]).slice(0, 2).join('');
  return initials;
};

const AccountInitials = ({ user }) => {
  const initials = getUserInitials(user.name);
  return (
    <InitialsCircle color={user.userColor}>
      {initials}
    </InitialsCircle>
  );
};

export default AccountInitials;
