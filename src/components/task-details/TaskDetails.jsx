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
            <Icon name="task" color="var(--ds-text)" size="26px" />
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
              <div style={{ display: 'flex', gap: '2px' }}>
                <Button scale="neutral" radius="50%">
                  TS
                </Button>
                <Button scale="neutral" radius="50%">
                  <Icon name="plus" size="16px" />
                </Button>
              </div>
            </div>

            <div className="actions">
              <span>Notifications</span>
              <Button scale="neutral" fullwidth={true} className='notification-btn'>
                <Icon name="watch" size="16px" scale="ghost" />
                Watch
              </Button>
            </div>
          </div>
          {/* <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div> */}
        </section>
        <nav className="nav-task-body">
          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
              <Icon name="join" size="18px" />
              Join
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
              <Icon name="member" size="18px" />
              Members
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
              <Icon name="label" size="18px" />
              Labels
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
              <Icon name="checklist" size="18px" />
              Checklist
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
              <Icon name="date" size="18px" />
              Dates
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
              <Icon name="attachment" size="18px" />
              Attachments
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
              <Icon name="cover" size="18px" />
              Cover
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
              <Icon name="customFields" size="18px" />
              CustomFields
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}
