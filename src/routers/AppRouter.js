import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";

import Header from "./../components/Header.js";
import { NotFound } from "./../components/NotFound.js";
import { ExpenseDashboardPage } from "./../components/ExpenseDashboardPage.js";
import AddExpensePage from "./../components/AddExpensePage.js";
import EditExpensePage from "./../components/EditExpensePage.js";
import { HelpPage } from "./../components/HelpPage.js";
import LoginPage from "./../components/LoginPage.js";

export const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route
          path="/dashboard"
          component={ExpenseDashboardPage}
          exact={true}
        />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);
