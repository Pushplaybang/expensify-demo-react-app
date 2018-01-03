import {
  addExpense,
  editExpense,
  removeExpense
} from "./../../actions/expenses";

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
  const expenseData = {
    description: "Rent",
    amount: 109500,
    createdAt: 1000,
    note: "here is a note"
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test("should setup the add expense action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: expect.any(Number)
    }
  });
});
