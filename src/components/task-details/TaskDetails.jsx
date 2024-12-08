import { Avatar, Button, Icon } from '@ui'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { MenuRender } from 'ui/Menus/MenuRender'
import { updateTask } from '../../store/board/board.actions'
import { NavTaskDetails } from './components/NavTaskDetails'

export function TaskDetails({ task: initialTask, groupId }) {
  const board = useSelector((state) => state.boardModule.board)
  const user = useSelector((state) => state.userModule.user)
  const currentGroup = board.groups.find((g) => g.id === groupId);
  const currentTask = currentGroup?.tasks.find((t) => t.id === initialTask.id) || initialTask

  const [title, setTitle] = useState(currentTask.title)
  const [description, setDescription] = useState(currentTask.description || '')
  const [showTitleInput, setShowTitleInput] = useState(false)
  const [showDescriptionInput, setShowDescriptionInput] = useState(false)
  const taskMembers = currentTask.memberIds || []
  const inputRef = useRef(null)

  const groupTitle = board.groups[groupId]?.title || 'Unknown List'

    const memberDetails = taskMembers
    .map(memberId => {
      const boardMember = board.members.find(member => member._id === memberId)
      return boardMember || (user._id === memberId ? user : null)
    })
    .filter(Boolean)

  useEffect(() => {
    if (showTitleInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTitleInput]);

  async function handleTitleUpdate() {
    try {
      if (title.trim() === '') {
        setTitle(task.title);
      } else {
        await updateTask(
          board._id,
          groupId,
          { ...task, title },
          'Updated task title',
        );
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setShowTitleInput(false);
    }
  }

  async function handleDescriptionUpdate() {
    try {
      await updateTask(
        board._id,
        groupId,
        { ...task, description },
        'Updated task description',
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
    setShowDescriptionInput(false);
  }

  const taskLabels = currentTask.labelIds
    ? currentTask.labelIds
        .map((labelId) => board.labels.find((label) => label.id === labelId))
        .filter(Boolean)
    : [];

  return (
    <div className="task-details">
      <section className="task-header-container">
        <div className="task-header">
          <div className="title">
            <Icon name="task" color="var(--ds-text)" size="22px" />
            {showTitleInput ? (
              <input
                className="title-input"
                type="text"
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleUpdate}
              />
            ) : (
              <div
                className="title-text"
                onClick={() => setShowTitleInput(true)}
              >
                {title || <span>Click to add a title</span>}
              </div>
            )}
          </div>

          <div className="group-container">
            <p>
              in list:
              <Button
                scale="neutral"
                size="xs"
                paddinginline="5px"
                className="btn"
              >
                <span>{groupTitle}</span>
              </Button>
            </p>
          </div>
        </div>
      </section>

      <section className="task-body">
        <div className="task-body-content">
          <div className="actions-container">
            <div className="action">
              <span>Members</span>
              <div className="members-container">
                {memberDetails.length > 0 && (
                  <div className="members-list">
                    {memberDetails.map((member) => (
                      <Avatar key={member._id} data={member} />
                    ))}
                  </div>
                )}

                  <MenuRender
                    buttonData={{
                      name: 'member',
                      icon: 'plus',
                      text: 'Add Member',
                    }}
                    context="plusIcon"
                    task={currentTask}
                    groupId={groupId}
                    user={user}
                    boardId={board._id}
                  />
              </div>
            </div>

            <div className="action">
              <span>Labels</span>

              <div>
                <span>
                  {taskLabels.length > 0 &&
                    taskLabels.map((label) => (
                      <MenuRender
                        key={label.id}
                        buttonData={{
                          name: 'label',
                          icon: 'label',
                          text: label.title,
                        }}
                        task={currentTask}
                        groupId={groupId}
                        customTrigger={
                          <Button
                            scale="neutral"
                            className="btn"
                            style={{
                              backgroundColor: label.color,
                              color: 'var(--dynamic-text)',
                            }}
                          >
                            {label.title}
                          </Button>
                        }
                      />
                    ))}
                </span>

                <MenuRender
                  buttonData={{
                    name: 'label',
                    icon: 'plus',
                    text: 'Add Label',
                  }}
                  task={currentTask}
                  groupId={groupId}
                  context="plusIcon"
                />
              </div>
            </div>

            <div className="action">
              <span>Notifications</span>
              <div>
                <Button scale="neutral" className="btn" fullwidth="true">
                  <Icon name="watch" size="16px" />
                  <span>Watch</span>
                </Button>
              </div>
            </div>
          </div>

          <TaskDescription board={board} task={task} groupId={groupId} />

          <div className="activity-container">
            <div className="action-title">
              <div className="icon-wrapper">
                <Icon name="activity" size="22px" />
                <h4>Activity</h4>
              </div>

              <Button scale="neutral" className="btn-activity" radius="3px">
                Hide details
              </Button>
            </div>

            <div className="activities">
              <div className="activity">
                <div className="avatar">
                  <Avatar data={user} />
                </div>
                <input
                  className="input-activity"
                  type="text"
                  placeholder="Write a comment..."
                />
              </div>

              <div className="activities">
                {board.activities
                  .filter((activity) => activity.currentTask?.id === currentTask.id)
                  .map((activity) => (
                    <div key={activity.id} className="activity">
                      <div className="avatar">
                        <Avatar data={activity.byMember} />
                      </div>
                      <div className="activity-content">
                        <span>
                          <span className='activity-member'>{activity.byMember.fullname}</span>
                          <span className='activity-txt'>
                            {activity.txt}
                          </span>
                        </span>
                        <span className="timestamp">
                          {new Date(activity.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <NavTaskDetails
          task={currentTask}
          groupId={groupId}
          user={user}
          boardId={board._id}
        />
      </section>
    </div>
  );
}
