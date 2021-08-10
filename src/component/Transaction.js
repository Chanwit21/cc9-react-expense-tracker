import React from "react";
import TransactionCard from "./TransactionCard";

function Transaction(props) {
  const { transactionsFilter, deleteTransaction } = props;

  return (
    <>
      <ul className="list-group">
        {transactionsFilter.map(item => {
          return (
            <TransactionCard
              key={item.id}
              transaction={item}
              deleteTransaction={deleteTransaction}
            />
          );
        })}
      </ul>
    </>
  );
}

export default Transaction;
