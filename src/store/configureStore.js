import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Reducers
import { expensesReducer } from "./../reducers/expenses.js";
import { filterReducer } from "./../reducers/filters.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store
export const configureStore = () => {
  return createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filterReducer
    }),
    composeEnhancers(applyMiddleware(thunk)),
    // standard way to add dev tools:
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
