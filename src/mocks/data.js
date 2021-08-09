import { v4 as uuidv4 } from 'uuid';

const INITIAL_TRANSACTIONS = [
  {
    id: uuidv4(),
    payee: '7-11',
    amount: 50,
    date: new Date('2021-06-12'),
    category: {
      name: 'Food',
      type: 'Expense'
    },
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'Tesco Lotus',
    amount: 299,
    date: new Date('2019-11-28'),
    category: {
      name: 'Shopping',
      type: 'Expense'
    },
    comment: ''
  },
  {
    id: uuidv4(),
    payee: 'True Corp.',
    amount: 20000,
    date: new Date('2020-02-28'),
    category: {
      name: 'Salary',
      type: 'Income'
    },
    comment: ''
  }
];

export { INITIAL_TRANSACTIONS };