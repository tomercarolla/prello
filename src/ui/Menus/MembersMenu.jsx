import { Avatar } from '@ui';
import { useEffect, useState } from 'react';
import { boardService } from 'services/board.service';
import styled from 'styled-components';

export function MembersMenu({ context = 'default', boardId }) {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    loadBoard();
  }, [boardId]);

  async function loadBoard() {
    try {
      const loadedBoard = await boardService.getById(boardId);
      setBoard(loadedBoard);
    } catch (err) {
      console.error('Failed to load board:', err);
    }
  }

  if (!board) return null;

  return (
    <MembersMenuWrapper context={context}>
      <SearchInput type="text" placeholder="Search members" />

      <StyledDiv>
        <h3>{context === 'plusIcon' ? 'Add member' : 'Board members'}</h3>
      </StyledDiv>

      {board.members.map((member) => (
        <MemberDiv key={member._id}>
          <Avatar data={member} />

          <div>{member.fullname}</div>
        </MemberDiv>
      ))}
    </MembersMenuWrapper>
  );
}

const MembersMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: ${(props) => (props.context === 'plusIcon' ? '12px' : '0')};
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  font-size: 14px;
  color: var(--ds-text);
  border-radius: 3px;
  border: none;
  outline: none;
  background-color: var(--ds-background-input);
  box-shadow: inset 0 0 0 1px var(--ds-border-input, #091e4224);
  width: 100%;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;

  h3 {
    color: var(--ds-text-subtle);
    font-size: 12px;
    font-weight: 600;
  }
`;

const MemberDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 5px;
  border-radius: 3px;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--ds-background-neutral);
  }
`;
