import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { AppRouter } from "./routers/AppRouter.js";
import { configureStore } from "./store/configureStore.js";
import { addExpense } from "./actions/expenses.js";
import { setTextFilter } from "./actions/filters.js";
import { getVisibleExpenses } from "./selectors/getVisibleExpenses.js";

const store = configureStore();

const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(App, document.getElementById("app"));
