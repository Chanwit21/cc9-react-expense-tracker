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
    .filter((item) => {
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
    .filter((item) => {
      const { date } = item;
      if (formatDateShortMonthShortYear(date).split(" ")[0] === month) {
        return true;
      } else if (!month) {
        return true;
      }
      return false;
    })
    .filter((item) => {
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

function filterByPagination(numberOfShowPage, onPage, arrayFilter) {
  const result = [...arrayFilter].splice(
    numberOfShowPage * (onPage - 1),
    numberOfShowPage
  );
  return result;
}

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTION);
  const [filter, setFilter] = useState({ text: "", month: "", year: "" });
  const [filterPagination, setFilterPagination] = useState({
    number: 10,
    onPage: 1,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [contentToEdit, setContentToEdit] = useState({});

  const addTransaction = (newTransaction) => {
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
    const newTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(newTransactions);
  }

  const detectPagination = (numberOfShowPage, onPage) => {
    setFilterPagination({
      number: numberOfShowPage,
      onPage: onPage,
    });
  };

  // console.log(isEdit);
  // console.log(contentToEdit);
  const clickToEdit = (obj) => {
    setContentToEdit(obj);
    setIsEdit(true);
  };

  const saveEditForm = (newTransaction) => {
    const newTransactions = [...transactions];
    const idx = newTransactions.findIndex(
      (item) => item.id === newTransaction.id
    );
    newTransactions[idx] = newTransaction;
    setTransactions(newTransactions);
    setContentToEdit({});
    setIsEdit(false);
  };

  const transactionFilter1 = filterTransaction(
    filter.text,
    filter.month,
    filter.year,
    transactions
  );

  const transactionsFilter = filterByPagination(
    filterPagination.number,
    filterPagination.onPage,
    filterTransaction(filter.text, filter.month, filter.year, transactions)
  );

  return (
    <Container>
      <TransactionForm
        addTransaction={addTransaction}
        isEdit={isEdit}
        contentToEdit={contentToEdit}
        saveEditForm={saveEditForm}
      />
      <Summary transactions={transactions} />
      <SearchBar detectFilter={detectFilter} transactions={transactions} />
      <Pagination
        transactionFilter1={transactionFilter1}
        detectPagination={detectPagination}
      />
      <Transaction
        transactionsFilter={transactionsFilter}
        deleteTransaction={deleteTransaction}
        clickToEdit={clickToEdit}
      />
    </Container>
  );
}

export default App;
