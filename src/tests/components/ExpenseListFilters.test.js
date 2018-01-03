import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { ExpenseListFilters } from "./../../components/ExpenseListFilters";
import expenses from "./../fixtures/expenses";
import { filters, activeFilters } from "./../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters component correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alternative filter values", () => {
  wrapper.setProps({ filters: activeFilters });

  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "rent";
  wrapper.find("input").simulate("change", { target: { value } });

  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
  const value = "date";
  wrapper.find("select").simulate("change", { target: { value } });

  expect(sortByDate).toHaveBeenCalled();
});

test("should sort by amount", () => {
  const value = "amount";
  wrapper.find("select").simulate("change", { target: { value } });

  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date change", () => {
  const startDate = moment(0).add(1, "year");
  const endDate = moment(0).add(2, "year");
  wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate, endDate });

  expect(setStartDate).toHaveBeenCalledWith(startDate);
  expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test("should handle date focus change", () => {
  const calendarFocused = "endDate";
  wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocused);
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});
