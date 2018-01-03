import moment from 'moment';

export default [
  {
    id: 1,
    description: "item 1 aabb",
    note: "",
    amount: 100,
    createdAt: moment(0).valueOf()
  },
  {
    id: 2,
    description: "item 2 bbcc",
    note: "",
    amount: 200,
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: 3,
    description: "item 3 aacc",
    note: "",
    amount: 300,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  }
];
