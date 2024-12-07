import { Button, Icon } from "@ui"
import { useState } from "react"

import { useSelector } from "react-redux"
import { utilService } from "services/util.service"
import { updateTask } from "store/board/board.actions"

export function Joinbutton({ task, groupId }) {
  const board = useSelector(state => state.boardModule.board)
  const loggedinUser = useSelector(state => state.userModule.user)
  const memberIds = task.memberIds || []
  const isJoined = memberIds.includes(loggedinUser._id)

  async function handleToggleJoin() {    
    try {
      const updatedTask = {
        ...task,
        memberIds: isJoined
          ? memberIds.filter((id) => id !== loggedinUser._id)
          : [...memberIds, loggedinUser._id]
      };

      const activity = {
        id: utilService.makeActivityId(),
        txt: isJoined ? 'joined this card' : 'left this card',
        createdAt: Date.now(),
        byMember: {
          _id: loggedinUser._id,
          username: loggedinUser.username,
          fullname: loggedinUser.fullname
        },
        currentTask: { id: task.id, title: task.title }
      }

      console.log('Sending activity:', activity)
      const savedTask = await updateTask(board._id, groupId, updatedTask, activity)
      console.log('Received saved task:', savedTask)
    } catch (err) {
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

