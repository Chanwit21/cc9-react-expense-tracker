import { v4 as uuidv4 } from "uuid";

const EXPENSES = [
  { id: uuidv4(), name: "Food", type: "Expense" },
  { id: uuidv4(), name: "Housing", type: "Expense" },
  { id: uuidv4(), name: "Shopping", type: "Expense" },
  { id: uuidv4(), name: "Transportation", type: "Expense" },
  { id: uuidv4(), name: "Utilities", type: "Expense" },
  { id: uuidv4(), name: "Clothing", type: "Expense" },
  { id: uuidv4(), name: "Medical/Healthcare", type: "Expense" },
  { id: uuidv4(), name: "Insurance", type: "Expense" },
  { id: uuidv4(), name: "Household Items/Supplies", type: "Expense" },
  { id: uuidv4(), name: "Debt", type: "Expense" },
  { id: uuidv4(), name: "Education", type: "Expense" },
  { id: uuidv4(), name: "Savings", type: "Expense" },
  { id: uuidv4(), name: "Gifts/Donations", type: "Expense" },
  { id: uuidv4(), name: "Entertainment", type: "Expense" },
];

const INCOMES = [
  { id: uuidv4(), name: "Salary", type: "Income" },
  { id: uuidv4(), name: "Wages", type: "Income" },
  { id: uuidv4(), name: "Commission", type: "Income" },
  { id: uuidv4(), name: "Interest", type: "Income" },
  { id: uuidv4(), name: "Investments", type: "Income" },
  {
    id: uuidv4(),
    name: "Selling something you create or own",
    type: "Income",
  },
  { id: uuidv4(), name: "Gifts", type: "Income" },
  { id: uuidv4(), name: "Allowance/Pocket Money", type: "Income" },
  { id: uuidv4(), name: "Government Payments", type: "Income" },
];

const INITIAL_TRANSACTION = [
  {
    id: uuidv4(),
    payee: "7-11",
    amount: 50,
    date: new Date("2021-06-12"),
    category: EXPENSES[1],
    comment: "",
  },
  {
    id: uuidv4(),
    payee: "Tesco Lotus",
    amount: 299,
    date: new Date("2019-11-28"),
    category: EXPENSES[2],
    comment: "",
  },
  {
    id: uuidv4(),
    payee: "True Corp.",
    amount: 20000,
    date: new Date("2020-09-30"),
    category: INCOMES[1],
    comment: "",
  },
];

export { INCOMES, EXPENSES, INITIAL_TRANSACTION };
