// sum an array
const reducer = (accumulator, currentValue) => accumulator + currentValue;

export default (expenses = []) => {
  return expenses.map(expense => expense.amount).reduce(reducer, 0);
};
