import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { utilService } from 'services/util.service';

import { useSelector } from 'react-redux';
import { loadBoards } from 'store/board/board.actions';

import { Icon } from '@ui';

export function WorkspaceContent() {
  const boards = useSelector((state) => state.boardModule.boards);
  console.log(boards)

  useEffect(() => {
    loadBoards();
  }, []);

  return (
    <>
      <section className="boards-container">

        <div className="your-boards">
          <h2 className="boards-header">
            <span>
              <Icon name="member" size="22px" />
            </span>
            Your Boards
          </h2>

          <ul className="boards-list">
            {/* TODO - Refactor to Component */}
            {boards.map((board) => (
              <li
                key={board._id}
                className="boards-list-item"
                style={{ backgroundColor: utilService.getRandomColor() }}
              >
                <Link
                  to={`/board/${board._id}/${board.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span className="board-title">{board.title}</span>
                </Link>
              </li>
            ))}
            <div className="add-board-btn">Create new board</div>
          </ul>
        </div>
      </section>
    </>
  );
}
