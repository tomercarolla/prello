import { boardService } from '../../services/board.service';
import { store } from '../store';
import {
  ADD_BOARD,
  ADD_BOARD_MSG,
  REMOVE_BOARD,
  SET_BOARD,
  SET_BOARDS,
  UPDATE_BOARD,
  UPDATE_TASK,
} from './board.reducer';

export async function loadBoards() {
  try {
    const boards = await boardService.query();

    console.log('Boards from DB:', boards);

    store.dispatch(getCmdSetBoards(boards));
  } catch (err) {
    console.error('Cannot load boards', err);

    throw err;
  }
}

export async function loadBoard(boardId) {
  try {
    const board = await boardService.getById(boardId);

    console.log('Board from DB:', board);

    store.dispatch(getCmdSetBoard(board));
  } catch (err) {
    console.log('Cannot load board', err);

    throw err;
  }
}

export async function removeBoard(boardId) {
  try {
    await boardService.remove(boardId);

    store.dispatch(getCmdRemoveBoard(boardId));
  } catch (err) {
    console.log('Cannot remove board', err);
    throw err;
  }
}

export async function addBoard(board) {
  try {
    const savedBoard = await boardService.save(board);

    store.dispatch(getCmdAddBoard(savedBoard));

    return savedBoard;
  } catch (err) {
    console.log('Cannot add board', err);

    throw err;
  }
}

export async function updateBoard(updatedBoard) {
  try {
    const savedBoard = await boardService.save(updatedBoard);

    store.dispatch(getCmdUpdateBoard(savedBoard));

    return savedBoard;
  } catch (err) {
    console.log('Cannot save board', err);

    throw err;
  }
}

export async function addBoardMsg(boardId, txt) {
  try {
    const msg = await boardService.addBoardMsg(boardId, txt);
    console.log('Added Board message', msg);
    store.dispatch(getCmdAddBoardMsg(msg));
    return msg;
  } catch (err) {
    console.log('Cannot add board msg', err);
    throw err;
  }
}

export async function updateTask(boardId, groupId, task, activity) {
  try {
    const savedTask = await boardService.updateTask(
      boardId,
      groupId,
      task,
      activity,
    );

    store.dispatch({
      type: UPDATE_TASK,
      groupId,
      task: savedTask,
      activity,
    });

    return savedTask;
  } catch (err) {
    console.log('Cannot update task', err);

    throw err;
  }
}

// Command Creators:
function getCmdSetBoards(boards) {
  return {
    type: SET_BOARDS,
    boards,
  };
}

function getCmdSetBoard(board) {
  return {
    type: SET_BOARD,
    board,
  };
}

function getCmdRemoveBoard(boardId) {
  return {
    type: REMOVE_BOARD,
    boardId,
  };
}

function getCmdAddBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  };
}

function getCmdUpdateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board,
  };
}

function getCmdAddBoardMsg(msg) {
  return {
    type: ADD_BOARD_MSG,
    msg,
  };
}

function getCmdUpdateTask(groupId, task, activity) {
  return {
    type: UPDATE_TASK,
    groupId,
    task,
    activity,
  };
}

// unitTestActions()
async function unitTestActions() {
  await loadBoards();
  await addBoard(boardService.getEmptyBoard());
  await updateBoard({
    _id: 'm1oC7',
    title: 'Board-Good',
  });
  await removeBoard('m1oC7');
  // TODO unit test loadBoard
  // TODO unit test addBoardMsg
  // TODO unit test updateTask
}
