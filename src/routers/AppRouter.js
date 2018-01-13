import React from "react";
import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Header from "./../components/Header";
import { NotFound } from "./../components/NotFound";
import { ExpenseDashboardPage } from "./../components/ExpenseDashboardPage";
import AddExpensePage from "./../components/AddExpensePage";
import EditExpensePage from "./../components/EditExpensePage";
import { HelpPage } from "./../components/HelpPage";
import LoginPage from "./../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

export const history = createHistory();

export const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <PublicOnlyRoute path="/" component={LoginPage} exact={true} />
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
