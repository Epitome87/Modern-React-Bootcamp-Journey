import { v4 as uuid } from 'uuid';

export const todoActionType = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  EDIT: 'EDIT',
  TOGGLE: 'TOGGLE',
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case todoActionType.ADD:
      return [...state, { id: uuid(), task: action.task, completed: false }];

    case todoActionType.REMOVE:
      return state.filter((todo) => todo.id !== action.id);

    case todoActionType.EDIT:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, task: action.newTask } : todo
      );

    case todoActionType.TOGGLE:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    default:
      return state;
  }
};
