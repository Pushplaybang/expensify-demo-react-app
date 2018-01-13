import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { AppRouter, history } from "./routers/AppRouter.js";
import { configureStore } from "./store/configureStore.js";
import { startSetExpenses } from "./actions/expenses.js";
import { login, logout } from "./actions/auth.js";
import { getVisibleExpenses } from "./selectors/getVisibleExpenses.js";

// import firebase setup
import { firebase } from "./firebase/firebase";

// initialize redux store
const store = configureStore();

// setup primary app component
const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (hasRendered) return;
  hasRendered = true;
  ReactDOM.render(App, document.getElementById("app"));
};

// Render loading state
ReactDOM.render(<p>loading...</p>, document.getElementById("app"));

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    store.dispatch(logout());
    renderApp();
    history.push("/");
    return;
  }

  store.dispatch(startSetExpenses()).then(() => {
    store.dispatch(login({ uid: user.uid }));
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/dashboard");
    }
  });
});
