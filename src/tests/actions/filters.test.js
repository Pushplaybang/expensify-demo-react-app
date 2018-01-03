import moment from "moment";
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate
} from "./../../actions/filters";

test("should generate sort by amount action object", () => {
  expect(sortByAmount()).toEqual({
    type: "SORT_BY_AMOUNT"
  });
});
test("should generate sort by date action object", () => {
  expect(sortByDate()).toEqual({
    type: "SORT_BY_DATE"
  });
});
test("should generate empty set text filter action object", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: undefined
  });
});
test("should generate  set text filter action object with values", () => {
  const action = setTextFilter("filter text");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "filter text"
  });
});

test("should generate set start date action object", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    date: moment(0)
  });
});

test("should generate set end date action object", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    date: moment(0)
  });
});
