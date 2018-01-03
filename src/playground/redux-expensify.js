import { createStore, combineReducers } from "redux";
import uuid from "uuid";
/**
 * const demoState = {
 *  expenses: [{
 *    id: String,
 *    description: String,
 *    notes: String,
 *    amount: Number // in cents
 *    createdAt: Date
 *  }],
 *  filters: {
 *    text: String,
 *    sortBy: String // [ 'date', 'amount'],
 *    startDate: Date,
 *    endDate: Date,
 *  },
 * };
 */

// ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = Date.now()
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});
// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// SET_START_DATE
const setStartDate = date => ({
  type: "SET_START_DATE",
  date
});

// SET_END_DATE
const setEndDate = date => ({
  type: "SET_END_DATE",
  date
});

// Expenses Reducer
const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id !== action.id) return expense;
        return { ...expense, ...action.updates };
      });
    case "REMOVE_EXPENSE":
      return state.filter(expense => expense.id !== action.id);
    default:
      return state;
  }
};

// Filter Reducer
const defaultFilterReducerState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filterReducer = (state = defaultFilterReducerState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, ...action.text };
    case "SORT_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SET_START_DATE":
      return { ...state, startDate: action.date };
    case "SET_END_DATE":
      return { ...state, endDate: action.date };
    default:
      return state;
  }
};

// Store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filter: filterReducer
  })
);

console.log(store.getState());

// filtering
const getVisibleExpenses = (
  expenses,
  { text = '', sortBy, startDate, endDate } = {}
) => {
  return expenses.filter(expense => {
    const startDateMatch =
      typeof startDate !== "number" || expense.createdAt >= startDate;
    const endDateMatch =
      typeof endDate !== "number" || expense.createdAt <= endDate;
    const textMatch = expense.description
      .toLowerCase()
      .includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.created < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

store.subscribe(() => {
  const state = store.getState();
  const visible = getVisibleExpenses(state.expenses, state.filters);
  console.log(visible);
});

const expenseOne = store.dispatch(
  addExpense({ description: "rent", amount: 950000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "coffee", amount: 400 })
);

console.log(expenseOne);
console.log(expenseTwo);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

console.log("here is expenseTwo.expense", expenseTwo.expense);
console.log("here is expenseTwo.expense.id", expenseTwo.expense.id);
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 5000 }));

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(Date.now()));
// store.dispatch(setEndDate(Date.now()));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());
