import styled from "styled-components"
import { Button, Icon } from "@ui"
import { useState } from "react"

import { useSelector } from "react-redux"
import { utilService } from "services/util.service"
import { updateTask } from "store/board/board.actions"

export function Joinbutton({ task, groupId }) {
  const board = useSelector(state => state.boardModule.board)
  const loggedinUser = useSelector(state => state.userModule.user)
  const memberIds = task.memberIds || []
  const [isJoined, setIsJoined] = useState(memberIds.includes(loggedinUser._id))

  async function handleToggleJoin() {
    const newIsJoined = !isJoined
    
    try {
      setIsJoined(newIsJoined)

      const updatedTask = {
        ...task,
        memberIds: newIsJoined
          ? [...memberIds, loggedinUser._id]
          : memberIds.filter((id) => id !== loggedinUser._id),
      };

      const activity = {
        id: utilService.makeId(),
        txt: newIsJoined ? 'joined this card' : 'left this card',
        createdAt: Date.now(),
        byMember: loggedinUser,
        currentTask: { id: task.id, title: task.title },
      };

      await updateTask(board._id, groupId, updatedTask, activity)
    } catch (err) {
      setIsJoined(!newIsJoined);
      console.error('Failed to join task:', err)
    }
  }


  return (
    <Button onClick={handleToggleJoin} scale="neutral" fullwidth="true" radius="3px">
      <div className="btn-container">
        <Icon
          name={isJoined ? 'unjoin' : 'join'}
          size="18px"
          style={{ color: 'var(--ds-text)' }}
        />
        <span>{isJoined ? 'Leave' : 'Join'}</span>
      </div>
      </Button>
  );
}

