import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { db } from "./../../firebase/firebase";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses,
  startEditExpense
} from "./../../actions/expenses";
import expenses from "./../fixtures/expenses";

const uid = "test1234";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  db
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: 1234 });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: 1234
  });
});

test("should remove expense from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const action = store.getActions();
      expect(action[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      return db.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
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

test("should edit expense from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = { amount: 4000 };

  store
    .dispatch(startEditExpense(id, updates))
    .then(snapshot => {
      const action = store.getActions();
      expect(action[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });

      return db.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toBe(4000);
      done();
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
  const store = createMockStore(defaultAuthState);
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

      return db
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    })
    .catch(e => console.log(e));
});

test("should add expense with defaults to database and store", done => {
  const store = createMockStore(defaultAuthState);
  const defaults = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaults
        }
      });

      return db
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(defaults);
      done();
    })
    .catch(e => console.log(e));
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fetch the expenses from firebase", done => {
  const store = createMockStore(defaultAuthState);
  store
    .dispatch(startSetExpenses())
    .then(snapshot => {
      const action = store.getActions();
      expect(action[0]).toEqual({
        type: "SET_EXPENSES",
        expenses
      });
      done();
    })
    .catch(e => console.log(e));
});
