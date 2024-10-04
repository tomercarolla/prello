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
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
        </section>
        <navbar className="nav-task-body">
          <div className="btn-container">
            <Icon name="join" />
            <Button scale="ghost" className="nav-btn">
              Join
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
            <Icon name="member" size='18px' />
              Members
            </Button>
          </div>

          <div className="btn-container">
            <Icon name="label" />
            <Button scale="ghost" className="nav-btn">
              Labels
            </Button>
          </div>

          <div className="btn-container">
            <Icon name="checklist" />
            <Button scale="ghost" className="nav-btn">
              Checklist
            </Button>
          </div>

          <div className="btn-container">
            <Button scale="ghost" className="nav-btn">
            <Icon name="date" />
              Dates
            </Button>
          </div>

          <div className="btn-container">
            <Icon name="attachment" />
            <Button scale="ghost" className="nav-btn">
              Attachments
            </Button>
          </div>

          <div className="btn-container">
            <Icon name="cover" />
            <Button scale="ghost" className="nav-btn">
              Cover
            </Button>
          </div>

          <div className="btn-container">
            <Icon name="customFields" />
            <Button scale="ghost" className="nav-btn">
              CustomFields
            </Button>
          </div>
        </navbar>
      </div>
    </div>
  );
}
