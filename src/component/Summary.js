import React from "react";
import SummaryCard from "./SummaryCard";
import { formatThaiCurrency } from "../service/currencyService";

function Summary(props) {
  const { transactions } = props;

  function calNetWorth(transactions) {
    let result = 0;
    for (let {
      amount,
      category: { type },
    } of transactions) {
      if (type === "Expense") {
        result -= amount;
      } else {
        result += amount;
      }
    }
    return formatThaiCurrency(result);
  }

  function calIncome(transactions) {
    let result = 0;
    for (let {
      amount,
      category: { type },
    } of transactions) {
      if (type === "Income") {
        result += amount;
      }
    }
    return formatThaiCurrency(result);
  }

  function calExpense(transactions) {
    let result = 0;
    for (let {
      amount,
      category: { type },
    } of transactions) {
      if (type === "Expense") {
        result += amount;
      }
    }
    return formatThaiCurrency(result);
  }

  return (
    <>
      <div className="row mt-4">
        <SummaryCard
          bg="info"
          name="Net Worth"
          value={calNetWorth(transactions)}
        />
        <SummaryCard
          bg="success"
          name="Income"
          value={calIncome(transactions)}
        />
        <SummaryCard
          bg="danger"
          name="Expense"
          value={calExpense(transactions)}
        />
      </div>
    </>
  );
}

export default Summary;
