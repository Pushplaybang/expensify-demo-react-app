import moment from "moment";
import { filterReducer } from "./../../reducers/filters";

test("should setup default filter values", () => {
  const state = filterReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sortBy to amount", () => {
  const state = filterReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const state = filterReducer(currentState, { type: "SORT_BY_DATE" });
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const text = "filter me";
  const state = filterReducer(undefined, {
    type: "SET_TEXT_FILTER",
    text
  });
  expect(state.text).toBe(text);
});

test("should set startDate filter", () => {
  const date = moment(0).valueOf();
  const state = filterReducer(undefined, {
    type: "SET_START_DATE",
    date
  });
  expect(state.startDate).toBe(date);
});

test("should set endDate filter", () => {
  const date = moment(0).valueOf();
  const state = filterReducer(undefined, {
    type: "SET_END_DATE",
    date
  });
  expect(state.endDate).toBe(date);
});
