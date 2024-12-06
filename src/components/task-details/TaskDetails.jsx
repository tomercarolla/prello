import { Button, Icon } from '@ui';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MenuRender } from 'ui/Menus/MenuRender';
import { updateTask } from '../../store/board/board.actions';
import { NavTaskDetails } from './components/NavTaskDetails';
import { TaskDescription } from './components/TaskDescription.jsx';

export function TaskDetails({ task, groupId }) {
  const board = useSelector((state) => state.boardModule.board);
  const [title, setTitle] = useState(task.title);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const inputRef = useRef(null);
  const groupTitle = board.groups[groupId]?.title || 'Unknown List';

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

  const taskLabels = task.labelIds
    ? task.labelIds
        .map((labelId) => board.labels.find((label) => label.id === labelId))
        .filter(Boolean)
    : null;

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
              <div>
                <div className="avatar">TS</div>
                <MenuRender
                  buttonData={{
                    name: 'member',
                    icon: 'plus',
                    text: 'Add Member',
                  }}
                  context="plusIcon"
                />
              </div>
            </div>

            <div className="action">
              <span>Labels</span>

              <div>
                <span>
                  {taskLabels &&
                    taskLabels.map((label) => (
                      <MenuRender
                        key={label.id}
                        buttonData={{
                          name: 'label',
                          icon: 'label',
                          text: label.title,
                        }}
                        task={task}
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
                  task={task}
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
                <div className="avatar">TS</div>

                <input
                  className="input-activity"
                  type="text"
                  placeholder="Write a comment..."
                />
              </div>

              <div className="activity">
                <div className="avatar">YY</div>

                <span>
                  <span>Yehonatan Yeshayahu</span>
                  Joined this card
                </span>
              </div>
            </div>
          </div>
        </div>

        <NavTaskDetails task={task} groupId={groupId} />
      </section>
    </div>
  );
}
