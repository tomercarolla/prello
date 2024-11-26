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
