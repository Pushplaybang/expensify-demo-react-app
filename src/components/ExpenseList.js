import React from "react";
import { connect } from "react-redux";

import ExpenseListItem from "./ExpenseListItem.js";
import getVisibleExpenses from "./../selectors/expenses.js";

export const ExpenseList = props => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>no expenses found.</p>
      ) : (
        props.expenses.map(expense => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )
    }
  </div>
);

const mapStateToProps = state => {
  console.log("map state to..........", state);
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpenseList);
