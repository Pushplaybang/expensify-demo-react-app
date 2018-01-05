import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";

import getVisibleExpenses from "./../selectors/getVisibleExpenses";
import getTotalExpenses from "./../selectors/getTotalExpenses";

export const ExpenseSummary = ({ count, amount }) => {
  const expenseWord = count === 1 ? 'expense' : 'expenses';
  return (
    <h3>
      Viewing {count || 0} {expenseWord} totalling 
      <strong> {numeral(amount / 100).format("$0,0.00")}</strong>
    </h3>
  );
};

const mapStateToProps = (state, props) => ({
  count: getVisibleExpenses(state.expenses, state.filters).length,
  amount: getTotalExpenses(getVisibleExpenses(state.expenses, state.filters))
});

export default connect(mapStateToProps)(ExpenseSummary);
