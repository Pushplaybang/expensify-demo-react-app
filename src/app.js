import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { AppRouter } from "./routers/AppRouter.js";
import { configureStore } from "./store/configureStore.js";
import { startSetExpenses } from "./actions/expenses.js";
import { setTextFilter } from "./actions/filters.js";
import { getVisibleExpenses } from "./selectors/getVisibleExpenses.js";

// import firebase setup
import "./firebase/firebase";

// initialize redux store
const store = configureStore();

// setup primary app component
const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// Render the App
ReactDOM.render(<p>loading...</p>, document.getElementById("app"));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(App, document.getElementById("app"));
});
