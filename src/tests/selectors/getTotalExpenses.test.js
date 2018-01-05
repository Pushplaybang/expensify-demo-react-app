import getTotalExpenses from "./../../selectors/getTotalExpenses";
import expenses from "./../fixtures/expenses";

test("should return 0 if no expenses", () => {
  const total = getTotalExpenses();
  expect(total).toBe(0);
});

test("should correctly add up an single expense", () => {
  const total = getTotalExpenses([expenses[0]]);
  expect(total).toBe(100);
});

test("should correctly add up multiple  expense", () => {
  const total = getTotalExpenses(expenses);
  expect(total).toBe(600);
});
