import { createStore, combineReducers } from "redux";

// Reducers
import { expensesReducer } from "./../reducers/expenses.js";
import { filterReducer } from "./../reducers/filters.js";

// Store
export const configureStore = () => {
  return createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filterReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
