import { userService } from '../../services/user.service.js'
import { authService } from '../../services/authService.js'
import { store } from '../store.js'

import { LOADING_START, LOADING_DONE } from '../system.reducer.js'
import { SET_USERS, SET_USER, SET_WATCHED_USER, REMOVE_USER  } from './user.reducer.js'
import { showErrorMsg } from '../../services/event-bus.service.js'
import { socketService } from '../../services/socket.service.js'

export async function login(credentials) {
  try {
    const user = await authService.login(credentials);
    store.dispatch({
      type: SET_USER,
      user,
    });
    socketService.login(user);
    return user;
  } catch (err) {
    console.log('Cannot login', err);
    throw err;
  }
}

export async function signup(credentials) {
  try {
    const user = await authService.signup(credentials);
    store.dispatch({
      type: SET_USER,
      user,
    });
    socketService.login(user);
    return user;
  } catch (err) {
    console.log('Cannot signup', err);
    throw err;
  }
}

export async function logout() {
  try {
    await authService.logout();
    store.dispatch({
      type: SET_USER,
      user: null,
    });
    socketService.logout();
  } catch (err) {
    console.log('Cannot logout', err);
    throw err;
  }
}

export async function loadUsers() {
  try {
    const users = await userService.query();
    store.dispatch({ type: LOADING_START });
    store.dispatch({ type: SET_USERS, users });
  } catch (err) {
    console.error('UserActions: err in loadUsers', err)
  } finally {
    store.dispatch({ type: LOADING_DONE });
  }
}

export async function loadUser(userId) {
  try {
    const user = await userService.getById(userId);
    store.dispatch({ type: SET_WATCHED_USER, user });
  } catch (err) {
    showErrorMsg('Cannot load user');
    console.log('Cannot load user', err);
  }
}


