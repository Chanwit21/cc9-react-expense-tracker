import React, { useState } from "react";
import "./App.css";
import Container from "./component/Container";
import Pagination from "./component/Pagination";
import SearchBar from "./component/SearchBar";
import Summary from "./component/Summary";
import Transaction from "./component/Transaction";
import TransactionForm from "./component/TransactionForm";
import { INITIAL_TRANSACTION } from "./mocks/data";
import { formatDateShortMonthShortYear } from "./service/dateService";

function filterTransaction(text, month, year, filterTransactionFrom) {
  const transactionFilter = filterTransactionFrom
    .filter(item => {
      const {
        payee,
        amount,
        category: { name },
      } = item;
      if (
        payee.toLowerCase().includes(text.toLowerCase()) ||
        amount.toString().toLowerCase().includes(text.toLowerCase()) ||
        name.toLowerCase().includes(text.toLowerCase())
      ) {
        return true;
      } else if (!text) {
        return true;
      }
      return false;
    })
    .filter(item => {
      const { date } = item;
      if (formatDateShortMonthShortYear(date).split(" ")[0] === month) {
        return true;
      } else if (!month) {
        return true;
      }
      return false;
    })
    .filter(item => {
      const { date } = item;
      if (formatDateShortMonthShortYear(date).split(" ")[1] === year) {
        return true;
      } else if (!year) {
        return true;
      }
      return false;
    });
  return transactionFilter;
}

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTION);
  const [filter, setFilter] = useState({ text: "", month: "", year: "" });

  const addTransaction = newTransaction => {
    // setTransactions(curTransactions => [newTransaction, ...newTransaction]);
    const cloneTransactions = [...transactions];
    cloneTransactions.unshift(newTransaction);
    setTransactions(cloneTransactions);
  };

  const detectFilter = (text, month, year) => {
    setFilter({
      text: text,
      month: month,
      year: year,
    });
  };

  function deleteTransaction(id) {
    const newTransactions = transactions.filter(item => item.id !== id);
    setTransactions(newTransactions);
  }

  const transactionsFilter = filterTransaction(
    filter.text,
    filter.month,
    filter.year,
    transactions
  );

  return (
    <Container>
      <TransactionForm addTransaction={addTransaction} />
      <Summary transactions={transactions} />
      <SearchBar detectFilter={detectFilter} transactions={transactions} />
      <Pagination />
      <Transaction
        transactionsFilter={transactionsFilter}
        deleteTransaction={deleteTransaction}
      />
    </Container>
  );
}

export default App;
