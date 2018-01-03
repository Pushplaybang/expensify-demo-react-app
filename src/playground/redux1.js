import { createStore } from "redux";

//action generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({ count } = {}) => ({
  type: "SET",
  count
});

const resetCount = () => ({
  type: "RESET"
});

/**
 * Reducers
 * 1 - Reducers are pure functions (no addition input or sideeffects)
 * 2 - Never change state or action
 */
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.incrementBy };
    case "DECREMENT":
      return { count: state.count - action.decrementBy };
    case "SET":
      return { count: action.count };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

// store
const store = createStore(countReducer);

// subscribe to the store
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// increment
store.dispatch(incrementCount());
store.dispatch(incrementCount({ incrementBy: 12 }));

// decrement
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 20 }));

// reset
store.dispatch(resetCount());

// set
store.dispatch(setCount({ count: 1337 }));
