import { combineReducers, legacy_createStore as createStore } from 'redux';

import { boardReducer } from './board/board.reducer';
import { groupReducer } from './group/group.reducer';
import { reviewReducer } from './review/review.reducer';
import { systemReducer } from './system.reducer';
import { taskReducer } from './task/task.reducer';
import { userReducer } from './user/user.reducer';

const rootReducer = combineReducers({
  boardModule: boardReducer,
  userModule: userReducer,
  systemModule: systemReducer,
  reviewModule: reviewReducer,
  groupModule: groupReducer,
  taskModule: taskReducer
});

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined;

export const store = createStore(rootReducer, middleware);

window.gStore = store;

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
