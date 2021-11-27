import { types } from '../../types/types';

export function taskReducer(state, action) {
  switch (action.type) {
    case types.ADD_TASK:
      return [...state, addNewTask(action.payload.name)];

    case types.DELETE_TASK:
      return state.filter((s) => s.id !== action.payload.id);

    case types.TOGGLE_TASK:
      return state.map((s) => {
        if (s.id === action.payload.id)
          return { ...s, completed: !s.completed };
        return s;
      });

    case types.EDIT_TASK:
      return state.map(s => {
        if (s.id === action.payload.id) {
          return {...s, name: action.payload.name}
        }
        return s;
      });

    default:
      return state;
  }
}

function addNewTask(name) {
  return { id: Date.now(), name, completed: false };
}
