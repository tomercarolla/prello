import { groupService } from '../services/groupService';
import { store } from '../store/store';
import {
  ADD_GROUP,
  REMOVE_GROUP,
  SET_GROUPS,
  UPDATE_GROUP,
} from './group.reducer';

export async function loadGroups() {
  try {
    const groups = await groupService.query();
    store.dispatch({ type: SET_GROUPS, groups });
  } catch (err) {
    console.error('GroupActions: err in loadGroups', err);
    throw err;
  }
}

export async function addGroup(group) {
  try {
    const savedGroup = await groupService.save(group);
    store.dispatch({ type: ADD_GROUP, group: savedGroup });
  } catch (err) {
    console.error('GroupActions: err in addGroup', err);
    throw err;
  }
}

export async function updateGroup(group) {
  try {
    const savedGroup = await groupService.save(group);
    store.dispatch({ type: UPDATE_GROUP, group: savedGroup });
    return savedGroup;
  } catch (err) {
    console.error('GroupActions: err in updateGroup', err);
    throw err;
  }
}

export async function removeGroup(groupId) {
  try {
    await groupService.remove(groupId);
    store.dispatch({ type: REMOVE_GROUP, groupId });
  } catch (err) {
    console.error('GroupActions: err in removeGroup', err);
    throw err;
  }
}
