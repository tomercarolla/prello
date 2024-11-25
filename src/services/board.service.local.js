import { httpService } from './http.service';

export const boardService = {
  query,
  getById,
  save,
  remove,
  addTask,
  updateTask,
  removeTask,
};

async function query(filterBy = {}) {
  try {
    return await httpService.get('board', filterBy);
  } catch (err) {
    console.error('Failed to get boards:', err);
    throw new Error('Failed to get boards');
  }
}

async function getById(boardId) {
  try {
    return await httpService.get(`board/${boardId}`);
  } catch (err) {
    console.error('Failed to get board:', err);
    throw new Error('Failed to get board');
  }
}

async function remove(boardId) {
  try {
    return await httpService.delete(`board/${boardId}`);
  } catch (err) {
    console.error('Failed to delete board:', err);
    throw new Error('Failed to delete board');
  }
}

async function save(board) {
  try {
    if (board._id) {
      return await httpService.put(`board/${board._id}`, board);
    } else {
      return await httpService.post('board', board);
    }
  } catch (err) {
    console.error('Failed to save board:', err);
    throw new Error('Failed to save board');
  }
}

async function addTask(boardId, groupId, task) {
  try {
    return await httpService.post(
      `board/${boardId}/group/${groupId}/task`,
      task,
    );
  } catch (err) {
    console.error('Failed to add task:', err);
    throw new Error('Failed to add task');
  }
}

async function updateTask(boardId, groupId, task) {
  try {
    return await httpService.put(
      `board/${boardId}/group/${groupId}/task/${task.id}`,
      task,
    );
  } catch (err) {
    console.error('Failed to update task:', err);
    throw new Error('Failed to update task');
  }
}

async function removeTask(boardId, groupId, taskId) {
  try {
    return await httpService.delete(
      `board/${boardId}/group/${groupId}/task/${taskId}`,
    );
  } catch (err) {
    console.error('Failed to remove task:', err);
    throw new Error('Failed to');
  }
}

//   if (!board.tasks[task.id]) {
//     console.error(`Task with id ${task.id} not found in board:`, board);
//     throw new Error(`Task with id ${task.id} not found`);
//   }

//   board.tasks[task.id] = { ...board.tasks[task.id], ...task };

//   if (!board.groups[groupId].tasksIds.includes(task.id)) {
//     board.groups[groupId].tasksIds.push(task.id);
//   }
//   // const group = board.groups.find((g) => g.id === groupId);
//   // const idx = group.tasks.findIndex((t) => t.id === task.id);

//   // group.tasks[idx] = task;

//   const activity = _createActivity(
//     activityTitle,
//     _toMiniTask(task),
//     _toMiniGroup(board.groups[groupId]),
//   );

//   board.activities.push(activity);

//   await storageService.put(STORAGE_KEY, board);

//   return [board.tasks[task.id], activity];
// }

// function getTaskEditCmps(task, board) {
//     const cmps = [
//         {
//             type: 'StatusPicker',
//             info: {
//                 label: 'Status:',
//                 propName: 'status',
//                 selectedStatus: task.status,
//                 statuses: _getStatuses()
//             }
//         },
//         {
//             type: 'DatePicker',
//             info: {
//                 label: 'Due date:',
//                 propName: 'dueDate',
//                 selectedDate: task.dueDate,
//             }
//         },
//         {
//             type: 'MemberPicker',
//             info: {
//                 label: 'Members: ',
//                 propName: 'memberIds',
//                 selectedMemberIds: task.memberIds || [],
//                 members: board.members
//             }
//         }
//     ]
//     return cmps
// }

// function getEmptyBoard() {
//   return {
//     title: 'Board -' + (Date.now() % 1000),
//     activities: [],
//   };
// }

// function getDemoBoard() {
//   return structuredClone(board);
// }

// function _createBoards() {
//   let boardStorage = utilService.loadFromStorage(STORAGE_KEY);

//   if (boardStorage && boardStorage.length > 0) return;

//   utilService.saveToStorage(STORAGE_KEY, boards);
// }

// function _createActivity(title, task, group = null) {
//   return {
//     id: utilService.makeId(),
//     createdAt: Date.now(),
//     byMember: userService.getLoggedinUser(),
//     title,
//     task,
//     group,
//   };
// }

// function _getStatuses() {
//   return ['open', 'inProgress', 'done'];
// }

// function _toMiniGroup(group) {
//   return { id: group.id, title: group.title };
// }

// function _toMiniTask(task) {
//   return { id: task.id, title: task.title };
// }

// TEST DATA
// storageService.post(STORAGE_KEY, board).then(savedBoard => console.log('Added board', savedBoard))
