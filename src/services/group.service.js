import { boardService } from './board.service.local.js';
import { utilService } from './util.service';

export const groupService = {
  query,
  getById,
  save,
  remove,
};

async function query(boardId) {
  const board = await boardService.getById(boardId);
  return board.groups;
}

async function getById(boardId, groupId) {
  const board = await boardService.getById(boardId);
  return board.groups.find((group) => group.id === groupId);
}

async function save(boardId, group) {
  const board = await boardService.getById(boardId);
  if (group.id) {
    const idx = board.groups.findIndex(
      (currGroup) => currGroup.id === group.id,
    );
    board.groups.splice(idx, 1, group);
  } else {
    group.id = utilService.makeId();
    board.groups.push(group);
  }
  await boardService.save(board);
  return group;
}

async function removeTask(boardId, groupId, taskId) {
  const board = await boardService.getById(boardId);
  const group = await board.groups.find((group) => group.id === groupId);
  const idx = group.tasks.findIndex((task) => task.id === taskId);
  group.tasks.splice(idx, 1);
  await boardService.save(board);
}

async function updateTask(boardId, groupId, updatedTask) {
  const board = await boardService.getById(boardId);
  const group = board.groups.find((group) => group.id === groupId);
  const idx = group.tasks.findIndex((task) => task.id === updatedTask.id);
  group.tasks.splice(idx, 1, updatedTask);
  await boardService.save(board);
  return updatedTask;
}
