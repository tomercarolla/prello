import { boardService } from './board.service.local.js';
import { utilService } from './util.service';

//TODO - refactor task service

export const taskService = {
  query,
  getById,
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

async function save(boardId, groupId, task) {
  const board = await boardService.getById(boardId);
  const group = Object.values(board.groups).find(
    (group) => group.id === groupId,
  );

  if (task.id) {
    const idx = group.tasks.findIndex((currTask) => currTask.id === task.id);

    group.tasks.splice(idx, 1, task);
  } else {
    task.id = utilService.makeId();
    board.tasks[task.id] = task;
    group.tasksIds.push(task.id);
  }

  await boardService.save(board);

  return task;
}

async function remove(boardId, groupId, taskId) {
  const board = await boardService.getById(boardId);
  const group = board.groups.find((group) => group.id === groupId);
  const idx = group.tasks.findIndex((task) => task.id === taskId);

  group.tasks.splice(idx, 1);

  await boardService.save(board);
}
