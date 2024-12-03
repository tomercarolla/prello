export const SET_BOARDS = 'SET_BOARDS';
export const SET_BOARD = 'SET_BOARD';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const ADD_BOARD = 'ADD_BOARD';
export const UPDATE_BOARD = 'UPDATE_BOARD';
export const ADD_BOARD_MSG = 'ADD_BOARD_MSG';
export const UPDATE_TASK = 'UPDATE_TASK';

const initialState = {
  board: null,
  boards: [],
};

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOARDS:
      return { ...state, boards: action.boards };

    case SET_BOARD:
      return { ...state, board: action.board };

    case REMOVE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board._id !== action.boardId),
      };

    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.board],
      };

    case UPDATE_BOARD:
      return {
        ...state,
        board: action.board,
        boards: state.boards.map((board) =>
          board._id === action.board._id ? action.board : board,
        ),
      };

    case ADD_BOARD_MSG:
      return {
        ...state,
        board: {
          ...state.board,
          msgs: [...(state.board.msgs || []), action.msg],
        },
      };

    case UPDATE_TASK:
      const updatedBoard = {
        ...state.board,
        groups: state.board.groups.map(group =>
          group.id === action.groupId
            ? {
              ...group,
              tasks: group.tasks.map(task =>
                task.id === action.task.id
                  ? {
                    ...task,
                    labelIds: action.task.labelIds,
                    ...action.task
                  }
                  : task
              )
            }
            : group
        )
      };

      return { ...state, board: updatedBoard }

    default:
      return state;
  }
}

// unitTestReducer()

function unitTestReducer() {
  let state = initialState;

  const board1 = {
    _id: 'b101',
    title: 'Board ' + parseInt(Math.random() * 10),
  };
  const board2 = {
    _id: 'b102',
    title: 'Board ' + parseInt(Math.random() * 10),
  };

  state = boardReducer(state, { type: SET_BOARDS, boards: [board1] });
  console.log('After SET_BOARDS:', state);

  state = boardReducer(state, { type: ADD_BOARD, board: board2 });
  console.log('After ADD_BOARD:', state);

  state = boardReducer(state, {
    type: UPDATE_BOARD,
    board: { ...board2, title: 'Good' },
  });
  console.log('After UPDATE_BOARD:', state);

  state = boardReducer(state, { type: REMOVE_BOARD, boardId: board2._id });
  console.log('After REMOVE_BOARD:', state);

  const msg = { _id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' };
  state = boardReducer(state, {
    type: ADD_BOARD_MSG,
    boardId: board1._id,
    msg,
  });
  console.log('After ADD_BOARD_MSG:', state);

  // state = boardReducer(state, {type: REMOVE_BOARD, boardId: board1._id})
  // console.log('After REMOVE_BOARD:', state)
}
