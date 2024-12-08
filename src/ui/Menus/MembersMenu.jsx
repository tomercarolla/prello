import { useEffect, useState } from 'react';
import { boardService } from 'services/board.service';
import { Avatar } from '@ui'
import { useSelector } from 'react-redux'
import { updateTask } from 'store/board/board.actions'
import styled from 'styled-components'

export function MembersMenu({ context = 'default', task, groupId }) {
  const board = useSelector((state) => state.boardModule.board)
  const currentUser = useSelector((state) => state.userModule.user)
  const memberIds = task.memberIds || []
  const [searchMember, setSearchMember] = useState('')

  const availableMembers = board.members
    .filter(member => {
      if (!searchMember) return true

      return (
        member.fullname?.toLowerCase().includes(searchMember.toLowerCase()) ||
        member.username?.toLowerCase().includes(searchMember.toLowerCase())
      )
  })

  async function handleMemberToggle(memberId) {
    try {
      const updatedTask = {
        ...task,
        memberIds: task.memberIds?.includes(memberId)
          ? task.memberIds.filter(id => id !== memberId)
          : [...(task.memberIds || []), memberId]
      }

      await updateTask(board._id, groupId, updatedTask);
    } catch (err) {
      console.error('Failed to toggle member:', err);
    }
  }

  return (
    <MembersMenuWrapper context={context}>
      <SearchInput
        type="text"
        placeholder="Search members"
        value={searchMember}
        onChange={(e) => setSearchMember(e.target.value)}
      />

      <StyledDiv>
        <h3>{context === 'plusIcon' ? 'Add member' : 'Board members'}</h3>
      </StyledDiv>

      {availableMembers.map((member) => (
        <MemberDiv
          key={member._id}
          onClick={() => handleMemberToggle(member._id)}
        >
          <Avatar data={member} />

          <div>{member.fullname}</div>

          {memberIds.includes(member._id)}
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
