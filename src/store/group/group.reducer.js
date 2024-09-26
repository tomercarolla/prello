export const SET_GROUPS = 'SET_GROUPS'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'

const initialState = {
 groups: [],
}

export function groupReducer(state = initialState, action) {
 switch (action.type) {
     case SET_GROUPS:
         return { ...state, groups: action.groups }
     case ADD_GROUP:
        return { ...state, groups: [...state.groups, action.group] }
     case UPDATE_GROUP:
         return { ...state, groups: state.groups.map(group => (group.id === action.group.id) ? action.group : group) }
     case REMOVE_GROUP:
         return { ...state, groups: state.groups.filter(group => group.id !== action.groupId) }
     default:
         return state
  }
}