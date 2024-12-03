import { boardService } from './board.service.js';
import { httpService } from './http.service.js';
import { utilService } from './util.service';

export const taskService = {
  query,
  getById,
  addTask,
  save,
  remove,
};

async function query(boardId) {
  const board = await boardService.getById(boardId);
  // const group = board.groups.find((group) => group.id === groupId);

  return board.tasks;
}

async function getById(boardId, taskId) {
  const board = await boardService.getById(boardId);

  return board.tasks.find((task) => task.id === taskId);
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

async function save(boardId, groupId, task) {
  const board = await boardService.getById(boardId)
  const group = Object.values(board.groups).find(
    (group) => group.id === groupId
  );

  if (task.id) {
    const idx = group.tasks.findIndex((currTask) => currTask.id === task.id);

    group.tasks.splice(idx, 1, task);
  } else {
    task.id = utilService.makeId();

    group.tasks.push(task);
  }

  await boardService.save(board);

  return board;
}

async function remove(boardId, groupId, taskId) {
  const board = await boardService.getById(boardId);
  const group = board.groups.find((group) => group.id === groupId);
  const idx = group.tasks.findIndex((task) => task.id === taskId);

  group.tasks.splice(idx, 1);

  await boardService.save(board);
}
