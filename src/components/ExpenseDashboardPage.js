import React from "react";

import ExpenseList from './ExpenseList.js';
import ExpenseListFilters from './ExpenseListFilters.js';

export const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);
