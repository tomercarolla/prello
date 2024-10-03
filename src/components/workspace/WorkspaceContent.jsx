import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { utilService } from 'services/util.service';

import { useSelector } from 'react-redux';
import { loadBoards } from 'store/board/board.actions';

import { Icon } from '@ui';
import { Divider } from 'components/sidebar/StyledElements';

export function WorkspaceContent() {
  const boards = useSelector((state) => state.boardModule.boards);

  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="user-info-container">
          <div className="avatar">T</div>
          <div className="user-info">
            <div>
              <div>
                {' '}
                <h2>Tomer Test</h2>{' '}
              </div>
              <div className="subscription-container">
                <span>Premium</span>
                <span>
                  {' '}
                  <Icon name="lock" size="18px" />
                  Private
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className="boards-container">
        <div className="your-boards">
          <div className="boards-header">
            <span>
              <Icon name="member" size="22px" />
            </span>
            Your Boards
          </div>

          <ul className="boards-list">
            {/* TODO - Refactor to Component */}
            {boards.map((board) => (
              <li
                key={board._id}
                className="boards-list-item"
                style={{ backgroundColor: utilService.getRandomColor() }}
              >
                <Link
                  to={`/b/${board._id}/${board.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span className="board-title">{board.title}</span>
                </Link>
              </li>
            ))}
            <div className="add-board-btn">Create new board</div>
          </ul>
        </div>

        <div className="template-boards">
          <div className="boards-header">
            <span>
              <Icon name="template" size="22px" />
            </span>
            Most popular templates
          </div>

          <ul className="boards-list">
            {/* TODO - Refactor to Component */}
            <li
              className="boards-list-item"
              style={{ backgroundColor: utilService.getRandomColor() }}
            >
              <span className="board-title">Kanban Template</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
