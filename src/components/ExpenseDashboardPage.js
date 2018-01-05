import React from "react";

import ExpenseList from "./ExpenseList.js";
import ExpenseListFilters from "./ExpenseListFilters.js";
import ExpenseSummary from "./ExpenseSummary.js";

export const ExpenseDashboardPage = props => (
  <div>
    <ExpenseSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);
