import React from "react";
import { shallow } from "enzyme";
import expenses from "./../fixtures/expenses";
import { ExpenseList } from "./../../components/ExpenseList";

test("Should render expense list with expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});

test("Should render expense list with empty message", () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
