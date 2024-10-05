import { Icon } from '@ui';
import { Button } from 'ui/Buttons/Button';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
// import { updateTask } from 'store/task/task.actions';

export function TaskDetails({ task, groupId }) {
  // const { boardId } = useParams();
  // const board = useSelector((state) => state.boardReducer.board);
  const [title, setTitle] = useState(task.title);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

    // useEffect(() => {
    //   loadBoard(boardId);
    // }, [boardId]);
  
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  function handleTitleChange(ev) {
    setTitle(ev.target.value);
  }

  function handleTitleBlur() {
    setShowInput(false);
    // updateTask(boardId, groupId, { ...task, title });
  }

  function handleTitleKeyDown(ev) {
    if (ev.key === 'Enter') {
      handleTitleBlur();
    }
  }

  if (!task) return null;

  return (
    <div className="task-details">
      <div className="task-header-container">
        <div className="task-header">
          <div className="title">
            <Icon name="task" color="var(--ds-text)" size="22px" />
            {showInput ? (
              <input
                className="title-input"
                type="text"
                ref={inputRef}
                value={title}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
              />
            ) : (
              <h2 onClick={() => setShowInput(true)}>{title}</h2>
            )}
          </div>
          <p>in list</p>
        </div>
      </div>
      <div className="task-body">
        <section className="task-body-content">
          <div className="actions-container">
            <div className="actions">
              <span>Members</span>
              <div style={{ display: 'flex', gap: '5px' }}>
                <Button scale="neutral" radius="50%" className="btn">
                  TS
                </Button>
                <Button scale="neutral" radius="50%" className="btn">
                  <Icon name="plus" size="16px" />
                </Button>
              </div>
            </div>

            <div className="actions">
              <span>Notifications</span>
              <Button
                scale="neutral"
                fullwidth={true}
                className="btn-notification"
              >
                <Icon name="watch" size="16px" scale="ghost" />
                Watch
              </Button>
            </div>
          </div>

          <div className="description-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="description" size="22px" />
              <h4>Description</h4>
            </div>
            {/* I can't make this button wider. check this if you can fix it... in my scss file - btn-description*/}
            <Button scale="neutral" className="btn-description">
              Add more detailed description...
            </Button>
          </div>

          <div className="activity-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="activity" size="22px" />
              <h4>Activity</h4>
            </div>
            
            <div className='activities'>
              <div className='activity'>
                <div className='avatar'>TS</div>
                <input className='input-activity' type='text' value='Write a comment...' />
              </div>

              <div className='activity'>
                <div className='avatar'>YY</div>
                <span>
                  <span>Yehonatan Yeshayahu</span>
                  Joined this card
                </span>
              </div>
            </div>
          </div>
        </section>

        <nav className="nav-task-body">
          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="join" size="18px" />
              Join
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="member" size="18px" />
              Members
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="label" size="18px" />
              Labels
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="checklist" size="18px" />
              Checklist
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="date" size="18px" />
              Dates
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="attachment" size="18px" />
              Attachments
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="cover" size="18px" />
              Cover
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="customFields" size="18px" />
              CustomFields
            </Button>
          </div>

          <span>Actions</span>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="move" size="18px" />
              Move
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="copy" size="18px" />
              Copy
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="template" size="18px" />
              Make template
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="archive" size="18px" />
              Archive
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="neutral" className="btn-nav">
              <Icon name="share" size="18px" />
              Share
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
