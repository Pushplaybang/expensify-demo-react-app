export const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id !== action.id) return expense;
        return { ...expense, ...action.updates };
      });
    case "REMOVE_EXPENSE":
      return state.filter(expense => expense.id !== action.id);
    case "SET_EXPENSES":
      return action.expenses;
    default:
      return state;
  }
};
