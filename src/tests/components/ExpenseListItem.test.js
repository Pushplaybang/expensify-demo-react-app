import React from "react";
import { shallow } from "enzyme";
import expenses from "./../fixtures/expenses";
import ExpenseListItem from "./../../components/ExpenseListItem";

test("Should render the expense list item with expense data", () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});
