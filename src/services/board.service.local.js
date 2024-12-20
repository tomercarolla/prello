import { storageService } from './async-storage.service';
import { userService } from './user.service';
import { utilService } from './util.service';

const STORAGE_KEY = 'boards';

const boards = [
  {
    _id: '123',
    title: 'Board dev proj',
    isStarred: false,
    archivedAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    style: {
      backgroundImage: '',
    },
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#61bd33',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Taltal',
        imgUrl: 'https://www.google.com',
      },
      {
        _id: 'u102',
        fullname: 'Josh Ga',
        imgUrl: 'https://www.google.com',
      },
    ],
    groups: {
      g101: {
        id: 'g101',
        title: 'Group 1',
        archivedAt: 1589983468418,
        tasksIds: ['c101', 'c102'],
        style: {},
      },
      g102: {
        id: 'g102',
        title: 'Group 2',
        tasksIds: ['c104', 'c103'],
        style: {},
      },
    },
    tasks: {
      c101: {
        id: 'c101',
        title: 'Replace logo',
      },
      c103: {
        id: 'c103',
        title: 'Do that',
        archivedAt: 1589983468418,
      },
      c102: {
        id: 'c102',
        title: 'Add Samples',
        labelIds: ['l102'],
      },
      c104: {
        id: 'c104',
        title: 'Help me',
        dueDate: '2024-09-24',
        description: 'description',
        comments: [
          {
            id: 'ZdPnm',
            title: 'also @yaronb please CR this',
            createdAt: 1590999817436,
            byMember: {
              _id: 'u101',
              fullname: 'Tal Tarablus',
              imgUrl: '',
            },
          },
        ],
        checklists: [
          {
            id: 'YEhmF',
            title: 'Checklist',
            todos: [
              {
                id: '212jX',
                title: 'To Do 1',
                isDone: false,
              },
            ],
          },
        ],
        memberIds: ['u101'],
        labelIds: ['l101', 'l102'],
        byMember: {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl: '',
        },
        style: {
          backgroundColor: '#26de81',
        },
      },
    },
    orderedGroupsIds: ['g101', 'g102'],
    activities: [
      {
        id: 'a101',
        title: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        group: {
          id: 'g101',
          title: 'Urgent Stuff',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
  },

  
  {
    _id: '1234',
    title: 'Board dev proj',
    isStarred: false,
    archivedAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    style: {
      backgroundImage: '',
    },
    labels: [
      {
        id: 'l101',
        title: 'Done',
        color: '#61bd4f',
      },
      {
        id: 'l102',
        title: 'Progress',
        color: '#61bd33',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Taltal',
        imgUrl: 'https://www.google.com',
      },
      {
        _id: 'u102',
        fullname: 'Josh Ga',
        imgUrl: 'https://www.google.com',
      },
    ],
    groups: {
      g103: {
        id: 'g103',
        title: 'Group 1',
        archivedAt: 1589983468418,
        tasksIds: ['c101', 'c102'],
        style: {},
      },
      g104: {
        id: 'g104',
        title: 'Group 2',
        tasksIds: ['c103', 'c104'],
        style: {},
      },
    },
    tasks: {
      c101: {
        id: 'c101',
        title: 'Replace logo',
      },
      c103: {
        id: 'c103',
        title: 'Do that',
        archivedAt: 1589983468418,
      },
      c102: {
        id: 'c102',
        title: 'Add Samples',
      },
      c104: {
        id: 'c104',
        title: 'Help me',
        dueDate: '2024-09-24',
        description: 'description',
        comments: [
          // in Trello this is easier implemented as an activity
          {
            id: 'ZdPnm',
            title: 'also @yaronb please CR this',
            createdAt: 1590999817436,
            byMember: {
              _id: 'u101',
              fullname: 'Tal Tarablus',
              imgUrl: '',
            },
          },
        ],
        checklists: [
          {
            id: 'YEhmF',
            title: 'Checklist',
            todos: [
              {
                id: '212jX',
                title: 'To Do 1',
                isDone: false,
              },
            ],
          },
        ],
        memberIds: ['u101'],
        labelIds: ['l101', 'l102'],
        byMember: {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl: '',
        },
        style: {
          backgroundColor: '#26de81',
        },
      },
    },
    orderedGroupsIds: ['g103', 'g104'],
    activities: [
      {
        id: 'a101',
        title: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        group: {
          id: 'g101',
          title: 'Urgent Stuff',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
  },
];

_createBoards();

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  getDemoBoard,
  addBoardMsg,
  updateTask,
  // getTaskEditCmps
};

window.boardSer = boardService;

async function query(filterBy = { title: '' }) {
  let boards = await storageService.query(STORAGE_KEY);

  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, 'i');

    boards = boards.filter((board) => regex.test(board.title));
  }

  // Return just preview info about the boards
  // boards = boards.map(({_id, title, owner}) => ({_id, title, owner}));

  return boards;
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId);
}

async function remove(boardId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, boardId);
}

async function save(board) {
  console.log('saved board ', board);
  if (board._id) {
    return await storageService.put(STORAGE_KEY, board);
  } else {
    await storageService.post(STORAGE_KEY, board);
  }
}

async function addBoardMsg(boardId, txt) {
  // Later, this is all done by the backend
  const board = await getById(boardId);

  if (!board.msgs) board.msgs = [];

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };

  board.msgs.push(msg);

  await storageService.put(STORAGE_KEY, board);

  return msg;
}

async function updateTask(boardId, groupId, task, activityTitle) {
  // Later, this is all done by the backend
  const board = await getById(boardId);
  if (!board.groups || !board.groups[groupId]) {
    console.error(`Group with id ${groupId} not found in board:`, board);
    throw new Error('Group with id ${groupId} not found');
  }

  if (!board.tasks[task.id]) {
    console.error(`Task with id ${task.id} not found in board:`, board);
    throw new Error(`Task with id ${task.id} not found`);
  }

  board.tasks[task.id] = { ...board.tasks[task.id], ...task };

  if (!board.groups[groupId].tasksIds.includes(task.id)) {
    board.groups[groupId].tasksIds.push(task.id);
  }
  // const group = board.groups.find((g) => g.id === groupId);
  // const idx = group.tasks.findIndex((t) => t.id === task.id);

  // group.tasks[idx] = task;

  const activity = _createActivity(
    activityTitle,
    _toMiniTask(task),
    _toMiniGroup(board.groups[groupId]),
  );

  board.activities.push(activity);

  await storageService.put(STORAGE_KEY, board);

  return [board.tasks[task.id], activity];
}

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

function getEmptyBoard() {
  return {
    title: 'Board -' + (Date.now() % 1000),
    activities: [],
  };
}

function getDemoBoard() {
  return structuredClone(board);
}

function _createBoards() {
  let boardStorage = utilService.loadFromStorage(STORAGE_KEY);

  if (boardStorage && boardStorage.length > 0) return;

  utilService.saveToStorage(STORAGE_KEY, boards);
}

function _createActivity(title, task, group = null) {
  return {
    id: utilService.makeId(),
    createdAt: Date.now(),
    byMember: userService.getLoggedinUser(),
    title,
    task,
    group,
  };
}

// function _getStatuses() {
//   return ['open', 'inProgress', 'done'];
// }

function _toMiniGroup(group) {
  return { id: group.id, title: group.title };
}

function _toMiniTask(task) {
  return { id: task.id, title: task.title };
}

// TEST DATA
// storageService.post(STORAGE_KEY, board).then(savedBoard => console.log('Added board', savedBoard))
