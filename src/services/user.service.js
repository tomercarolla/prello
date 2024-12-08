import { httpService } from './http.service';

export const userService = {
  query,
  getById,
  update,
  remove,
  getLoggedinUser,
};

async function query() {
  try {
    return await httpService.get(`user`);
  } catch (err) {
    console.error('Cannot get users', err);
    throw new Error('Cannot get users');
  }
}

async function getById(userId) {
  try {
    return await httpService.get(`user/${userId}`);
  } catch (err) {
    console.error('Cannot get user', err);
    throw new Error('Cannot get user');
  }
}

async function update(user) {
  try {
    return await httpService.put(`user/${user._id}`, user);
  } catch (err) {
    console.error('Cannot update user', err);
    throw new Error('Cannot update user');
  }
}

async function remove(userId) {
  try {
    return await httpService.delete(`user/${userId}`);
  } catch (err) {
    console.error('Cannot remove user', err);
    throw new Error('Cannot remove user');
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedinUser'));
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
