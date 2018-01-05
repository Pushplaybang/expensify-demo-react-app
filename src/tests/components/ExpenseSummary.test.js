import React from "react";
import { shallow } from "enzyme";

import getTotalExpenses from "./../../selectors/getTotalExpenses";
import expenses from "./../fixtures/expenses";

import { ExpenseSummary } from "./../../components/ExpenseSummary";

test("Should render ExpenseSummary with no expenses", () => {
  const wrapper = shallow(<ExpenseSummary />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseSummary with one expense", () => {
  const total = getTotalExpenses([expenses[0]]);
  const count = 1;
  const wrapper = shallow(<ExpenseSummary count={count} amount={total} />);

  expect(wrapper).toMatchSnapshot();
});

test("Should render ExpenseSummary with multiple expenses", () => {
  const total = getTotalExpenses(expenses);
  const count = expenses.length;
  const wrapper = shallow(<ExpenseSummary count={count} amount={total} />);

  expect(wrapper).toMatchSnapshot();
});
