import { expensesReducer } from "./../../reducers/expenses";
import expenses from "./../fixtures/expenses";

test("should test default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const state = expensesReducer(expenses, {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  });
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id is not found", () => {
  const state = expensesReducer(expenses, {
    type: "REMOVE_EXPENSE",
    id: 1234
  });
  expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test("should add an expense", () => {
  const expense = {
    id: 400,
    description: "new item",
    note: "",
    amount: 1000,
    createdAt: 0
  };

  const state = expensesReducer(expenses, {
    type: "ADD_EXPENSE",
    expense
  });

  expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense", () => {
  const amount = 20207357;
  const state = expensesReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: { amount }
  });
  expect(state[0].amount).toBe(amount);
});

test("should not edit an expense if id is not found", () => {
  const amount = 20207357;
  const state = expensesReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: 12345,
    updates: { amount }
  });
  expect(state).toEqual(expenses);
});
