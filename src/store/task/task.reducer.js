export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

const initialState = {
  tasks: [],
};

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.tasks };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.task] };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.task.id ? action.task : task,
        ),
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.taskId),
      };
    default:
      return state;
  }
}
