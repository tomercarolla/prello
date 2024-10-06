import { Button, Icon } from '@ui';
import { useEffect, useState } from 'react';
import { updateTask } from '../../store/board/board.actions';
import { NavTaskDetails } from './components/NavTaskDetails';


export function TaskDetails({ task, groupId, board }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);

  const groupTitle = board.groups[groupId]?.title || 'Unknown List';

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description || '');
  }, [task]);


  async function handleTitleUpdate() {
    try {
      setShowTitleInput(false);
      await updateTask(board._id, groupId, { ...task, title }, 'Updated task title');
    } catch (error) {
      console.error('Failed to update task:', error);
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleUpdate}
              />
            ) : (
              <h2 onClick={() => setShowTitleInput(true)}>{title}</h2>
            )}
          </div>
          <div className="group-container">
            <p>
              in list:
              <Button scale="neutral" size='sm' className="btn">
                <span>{groupTitle}</span>
              </Button>
            </p>
          </div>
        </div>
      </section>

      <section className="task-body">
        <div className="task-body-content">
          <div className="description-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                className="btn-description"
                onClick={() => setShowDescriptionInput(true)}
              >
                {description || 'Add more detailed description...'}
              </Button>
            )}
          </div>

          <div className="activity-container">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
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
