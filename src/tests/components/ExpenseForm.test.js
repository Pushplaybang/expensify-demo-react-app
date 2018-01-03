import React from "react";
import { shallow } from "enzyme";
import moment from "moment"; // mock
import ExpenseForm from "./../../components/ExpenseForm";
import expenses from "./../fixtures/expenses";

test("should render ExpenseForm component correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm component correctly with expenase data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set the description field on input change", () => {
  const value = "new description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input[name='description']").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("description")).toBe(value);
});

test("should set the note field on input change", () => {
  const value = "new note";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea[name='note']").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set the amount field on input change", () => {
  const value = "23.50";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input[name='amount']").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("amount")).toBe(value);
});

test("should not set the amount field  with incorrect input", () => {
  const value = "23.50123";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("input[name='amount']").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("amount")).toBe(value);
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBe(0);
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("SingleDatePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toBe(now);
});

test("should set calendar focus state", () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
