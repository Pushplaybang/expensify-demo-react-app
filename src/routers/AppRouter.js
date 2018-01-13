import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Header from "./../components/Header.js";
import { NotFound } from "./../components/NotFound.js";
import { ExpenseDashboardPage } from "./../components/ExpenseDashboardPage.js";
import AddExpensePage from "./../components/AddExpensePage.js";
import EditExpensePage from "./../components/EditExpensePage.js";
import { HelpPage } from "./../components/HelpPage.js";
import LoginPage from "./../components/LoginPage.js";
import PrivateRoute from "./PrivateRoute.js";
export const history = createHistory();

export const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute
          path="/dashboard"
          component={ExpenseDashboardPage}
          exact={true}
        />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
