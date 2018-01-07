import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { db } from "./../../firebase/firebase";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense
} from "./../../actions/expenses";
import expenses from "./../fixtures/expenses";

const createMockStore = configureMockStore([thunk]);

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: 1234 });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: 1234
  });
});

test("should setup the edit expense action object", () => {
  const action = editExpense(1234, {
    note: "new note added"
  });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: 1234,
    updates: {
      note: "new note added"
    }
  });
});

test("should setup the add expense action object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

test("should add expense to database and store", done => {
  const store = createMockStore({});
  const expenseData = {
    description: "Test",
    amount: 3000,
    note: "test note",
    createdAt: 1000
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return db.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", () => {
  const store = createMockStore({});
  const defaults = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0,
  };

  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaults
        }
      });

      return db.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(defaults);
      done();
    });
});

// test("should setup the add expense action object with default values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       id: expect.any(String),
//       description: "",
//       note: "",
//       amount: 0,
//       createdAt: expect.any(Number)
//     }
//   });
// });
