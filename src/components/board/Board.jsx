import { useEffect } from 'react';
import { BoardHeader } from './components/BoardHeader.jsx';
import { BoardList } from './components/BoardList.jsx';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { loadBoard } from 'store/board/board.actions.js';

export function Board() {
  const board = useSelector((state) => state.boardModule.board);
  const { boardId } = useParams();

  useEffect(() => {
    loadBoard(boardId);
    console.log(board);
  }, []);

  return (
    <section className="board">
      <BoardHeader />

      <div className="canvas">
        <BoardList />
      </div>
    </section>
  );
}
