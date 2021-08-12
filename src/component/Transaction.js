import React from "react";
import TransactionCard from "./TransactionCard";

function Transaction(props) {
  const { transactionsFilter, deleteTransaction, clickToEdit } = props;

  return (
    <>
      <ul className="list-group">
        {transactionsFilter.map((item) => {
          return (
            <TransactionCard
              key={item.id}
              transaction={item}
              deleteTransaction={deleteTransaction}
              clickToEdit={clickToEdit}
            />
          );
        })}
      </ul>
    </>
  );
}

export default Transaction;
