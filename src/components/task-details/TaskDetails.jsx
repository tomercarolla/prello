import { useEffect, useRef, useState } from 'react';
import { Button, Icon } from '@ui';
import { updateTask } from '../../store/board/board.actions';

import { NavTaskDetails } from './components/NavTaskDetails';
import { useSelector } from 'react-redux';


export function TaskDetails({ task, groupId }) {
  const board = useSelector((state) => state.boardModule.board);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const inputRef = useRef(null);

  const groupTitle = board.groups[groupId]?.title || 'Unknown List';
  
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
  }, [task]);

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
        await updateTask(board._id, groupId, { ...task, title }, 'Updated task title');
        }
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setShowTitleInput(false);
    }
  }

  async function handleDescriptionUpdate() {
    try {
      await updateTask(board._id, groupId, { ...task, description }, 'Updated task description');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
    setShowDescriptionInput(false);
  };

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
              <Button scale="neutral" size="sm" className="btn">
                <span>{groupTitle}</span>
              </Button>
            </p>
          </div>
        </div>
      </section>

      <section className="task-body">
        <div className="task-body-content">
          <div className="labels-container">
            <div className="labels">
              <span>Members</span>
              <div>
                <div className="avatar">TS</div>
                <Button scale="neutral" className="btn" radius="50%">
                  <Icon name="plus" size="16px" />
                </Button>
              </div>
            </div>

            <div className="labels">
              <span>Labels</span>
              <div>
                <Button scale="neutral" className="btn">
                  Label
                </Button>
                <Button scale="neutral" className="btn">
                  <Icon name="plus" size="16px" />
                </Button>
              </div>
            </div>

            <div className="labels">
              <span>Notifications</span>
              <div>
                <Button scale="neutral" className="btn" fullwidth="true">
                  <Icon name="watch" size="16px" />
                  Watch
                </Button>
              </div>
            </div>
          </div>

          <div className="description-container">
            <div
              className="action-title"
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <Icon name="description" size="22px" />
              <h4>Description</h4>
            </div>
            {showDescriptionInput ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleDescriptionUpdate}
              />
            ) : (
              <Button
                scale="neutral"
                size="lg"
                fullwidth="true"
                className="btn-description"
                onClick={() => setShowDescriptionInput(true)}
              >
                {description || 'Add more detailed description...'}
              </Button>
            )}
          </div>

          <div className="activity-container">
            <div
              className="action-title"
            >
              <div className='icon-wrapper'>
                <Icon name="activity" size="22px" />
                <h4>Activity</h4>
              </div>
              <Button scale="neutral" className="btn-activity">
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

        <NavTaskDetails />
      </section>
    </div>
  );
}
