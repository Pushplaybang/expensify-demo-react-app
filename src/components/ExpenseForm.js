import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    };
  }

  onDescriptionChange = event => {
    const description = event.target.value;
    this.setState(() => ({ description }));
  };

  onAmountChange = event => {
    const amount = event.target.value;
    if (amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = createdAt => {
    createdAt && this.setState(() => ({ createdAt }));
  };

  onFocusCalendar = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onNoteChange = event => {
    const note = event.target.value;
    this.setState(() => ({ note }));
  };

  onSubmit = event => {
    event.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide an amount and description"
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            placeholder="description"
            name="description"
            autoFocus
          />
          <input
            type="text"
            placeholder="amount"
            name="amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusCalendar}
            numberOfMonths={1}
            isOutsideRange={day => false}
          />
          <textarea
            placeholder="add a note for your expense (optional)"
            name="note"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button type="submit">
            {this.props.expense ? "Update" : "Add"} Expense
          </button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
