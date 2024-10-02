import { taskService } from '../../services/task.service.js';
import { store } from '../store';

export const SET_TASKS = 'SET_TASKS';
export const SET_TASK = 'SET_TASK';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export async function loadTasks(boardId, groupId) {
  try {
    const tasks = await taskService.query(boardId, groupId);
    store.dispatch({ type: SET_TASKS, tasks });
  } catch (err) {
    console.error('TaskActions: err in loadTasks', err);
    throw err;
  }
}

export async function loadTask(boardId, groupId, taskId) {
  try {
    const task = await taskService.getById(boardId, groupId, taskId);
    store.dispatch({ type: SET_TASK, task })
  } catch (err) {
    console.error('TaskActions: err in loadTask', err);
    throw err;
  }
}

export async function addTask(boardId, groupId, task) {
  try {
    const savedTask = await taskService.save(boardId, groupId, task);
    store.dispatch({ type: ADD_TASK, task: savedTask });
  } catch (err) {
    console.error('TaskActions: err in addTask', err);
    throw err;
  }
}

export async function removeTask(boardId, groupId, taskId) {
  try {
    await taskService.remove(boardId, groupId, taskId);
    store.dispatch({ type: REMOVE_TASK, taskId });
  } catch (err) {
    console.error('TaskActions: err in removeTask', err);
    throw err;
  }
}

export async function updateTask(boardId, groupId, task) {
  try {
    const updatedTask = await taskService.save(boardId, groupId, task);
    store.dispatch({ type: UPDATE_TASK, task: updatedTask });
    return updatedTask;
  } catch (err) {
    console.error('TaskActions: err in updateTask', err);
    throw err;
  }
}
