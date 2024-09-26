import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"
import { boardService } from "./board/board.service.local"

export const taskService = {
  query,
  getById,
  save,
  remove,
  addTask,
  removeTask,
  updateTask,
}

async function query(boardId, groupId) {
   const board = await boardService.getById(boardId)
   const group = board.groups.find(group => group.id === groupId)
 
    return group.tasks
}

async function getById(boardId, groupId, taskId) { 
   const board = await boardService.getById(boardId)
   const group = board.groups.find(group => group.id === groupId)
 
    return group.tasks.find(task => task.id === taskId)
}

async function save(boardId, groupId, task) {
   const board = await boardService.getById(boardId)
   const group = board.groups.find(group => group.id === groupId)
   if (task.id) {
       const idx = group.tasks.findIndex(currTask => currTask.id === task.id)
       group.tasks.splice(idx, 1, task)
   } else {
       task.id = utilService.makeId()
       group.tasks.push(task)
   }
   await boardService.save(board)
   return task
}

async function remove(boardId, groupId, taskId) {
   const board = await boardService.getById(boardId)
   const group = board.groups.find(group => group.id === groupId)
   const idx = group.tasks.findIndex(task => task.id === taskId)
   group.tasks.splice(idx, 1)
   await boardService.save(board)
}


