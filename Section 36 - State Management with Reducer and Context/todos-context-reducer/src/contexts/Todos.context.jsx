import React, { createContext } from 'react';
import { todoReducer } from '../reducers/Todo.reducer';
import { useLocalStorageReducer } from '../hooks/useLocalStorageReducer';

const defaultTodos = [
  { id: 1, task: 'More the lawn using goats', completed: false },
  { id: 2, task: 'Release lady bugs into garden', completed: true },
];

export const TodosContext = createContext();
export const DispatchContext = createContext();

export const TodosProvider = (props) => {
  const [todos, dispatch] = useLocalStorageReducer(
    'todos',
    defaultTodos,
    todoReducer
  );

  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};