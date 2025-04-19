/**
 * Counter App - A simple React counter implementation
 * This file demonstrates different approaches to implement a counter in React,
 * from basic useState to more advanced patterns like useReducer.
 */

import React, { useState, useCallback, useReducer } from 'react';

/**
 * Basic Counter using useState
 */
export function BasicCounter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button data-testid="decrement-button" onClick={() => setCount(count - 1)}>-</button>
      <button data-testid="increment-button" onClick={() => setCount(count + 1)}>+</button>
      <p>Count: {count}</p>
    </div>
  );
}

/**
 * Counter using useState with functional updates
 * This approach is safer for state updates as it uses the previous state
 */
export function FunctionalCounter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button data-testid="decrement-button" onClick={() => setCount(count => count - 1)}>-</button>
      <button data-testid="increment-button" onClick={() => setCount(count => count + 1)}>+</button>
      <p>Count: {count}</p>
    </div>
  );
}

/**
 * Counter using useCallback for optimized event handlers
 */
export function CallbackCounter() {
  const [count, setCount] = useState(0);
  const decrease = useCallback(() => setCount(count => count - 1), []);
  const increase = useCallback(() => setCount(count => count + 1), []);

  return (
    <div>
      <button data-testid="decrement-button" onClick={decrease}>-</button>
      <button data-testid="increment-button" onClick={increase}>+</button>
      <p>Count: {count}</p>
    </div>
  );
}

/**
 * Counter using data attributes for a single event handler
 * This approach is more scalable when handling multiple similar actions
 */
export function DataAttributeCounter() {
  const [count, setCount] = useState(0);
  const update = useCallback((e) => {
    const change = parseInt(e.currentTarget.dataset.change ?? '0');
    setCount(count => count + change);
  }, []);

  return (
    <div>
      <button data-testid="decrement-button" data-change="-1" onClick={update}>-</button>
      <button data-testid="increment-button" data-change="1" onClick={update}>+</button>
      <p>Count: {count}</p>
    </div>
  );
}

/**
 * Counter using useReducer for complex state management
 * This approach is similar to Redux pattern and better for complex state logic
 */
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export function ReducerCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button
        data-testid="decrement-button"
        onClick={() => dispatch({ type: 'decrement' })}
      >
        -
      </button>
      <button
        data-testid="increment-button"
        onClick={() => dispatch({ type: 'increment' })}
      >
        +
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}

// Default export
export default function App() {
  return (
    <div>
      <h2>Basic Counter</h2>
      <BasicCounter />
      
      <h2>Functional Counter</h2>
      <FunctionalCounter />
      
      <h2>Callback Counter</h2>
      <CallbackCounter />
      
      <h2>Data Attribute Counter</h2>
      <DataAttributeCounter />
      
      <h2>Reducer Counter</h2>
      <ReducerCounter />
    </div>
  );
}
