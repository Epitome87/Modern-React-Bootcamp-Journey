import React, { useReducer } from 'react';

const actionType = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
};

function countReducer(state, action) {
  switch (action.type) {
    case actionType.INCREMENT:
      return { count: state.count + action.payload };
    case actionType.DECREMENT:
      return { count: state.count - action.payload };

    default:
      return { ...state };
  }
}

function TestReducer() {
  const [state, dispatch] = useReducer(countReducer, { count: 10 });

  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => dispatch({ type: actionType.INCREMENT, payload: 5 })}
      >
        Add 1
      </button>
      <button
        onClick={() => dispatch({ type: actionType.DECREMENT, payload: 1 })}
      >
        Subtract 1
      </button>
    </div>
  );
}

export default TestReducer;
