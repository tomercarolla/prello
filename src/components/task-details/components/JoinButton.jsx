import { Button, Icon } from '@ui';

import { useSelector } from 'react-redux';
import { utilService } from 'services/util.service';
import { updateTask } from 'store/board/board.actions';

export function JoinButton({ task, groupId }) {
  const board = useSelector((state) => state.boardModule.board);
  const loggedInUser = useSelector((state) => state.userModule.user);
  const memberIds = task.memberIds || [];
  const isLeft = memberIds.includes(loggedInUser._id);

  async function handleToggleJoin() {
    try {
      const updatedTask = {
        ...task,
        memberIds: isLeft
          ? memberIds.filter((id) => id !== loggedInUser._id)
          : [...memberIds, loggedInUser._id],
      };

      const activity = {
        id: utilService.makeActivityId(),
        txt: isLeft ? 'left this card' : 'joined this card',
        createdAt: Date.now(),
        byMember: {
          _id: loggedInUser._id,
          username: loggedInUser.username,
          fullname: loggedInUser.fullname,
        },
        currentTask: { id: task.id, title: task.title },
      };

      const savedTask = await updateTask(
        board._id,
        groupId,
        updatedTask,
        activity,
      );

      console.log('Received saved task:', savedTask);
    } catch (err) {
      console.error('Failed to join task:', err);
    }
  }

  return (
    <Button
      onClick={handleToggleJoin}
      scale="neutral"
      fullwidth="true"
      radius="3px"
      className="btn-nav"
    >
      <Icon name={isLeft ? 'unjoin' : 'join'} size="18px" />

      <span>{isLeft ? 'Leave' : 'Join'}</span>
    </Button>
  );
}
