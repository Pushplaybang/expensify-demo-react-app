import uuid from "uuid";
import moment from "moment";
import { db } from "./../firebase/firebase";
/**
 * Synchronous Actions
 * ---
 * 1. component calls action generator
 * 2. action generator returns an object
 * 3. component calls dispatch with the object on the store
 * 4. redux store changes
 *
 * Asynchronous Actions
 * ---
 * 1. component calls action generator
 * 2. action generator returns a function
 * 3. component calls dispatch with the function on the store (not default behavior
 *  requires redux-thunk middleware)
 * 4. function runs, has the ability to dispatch other actions or whatever it wants
 *     - async action - http request etc...
 *     - ends by interacting with redux store via standard action.
 */

export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    return db
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

export const removeExpense = ({ id }) => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

export const setExpenses = expenses => ({
  type: "SET_EXPENSES",
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db
      .ref(`users/${uid}/expenses`)
      .once("value")
      .then(snapshot => {
        const expenses = [];
        snapshot.forEach(item => {
          expenses.push({
            id: item.key,
            ...item.val()
          });
        });

        dispatch(setExpenses(expenses));
      });
  };
};
