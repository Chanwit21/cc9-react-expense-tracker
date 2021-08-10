import React from "react";
import { formatThaiCurrency } from "../service/currencyService";
import { formatDateShortMonthShortYear } from "../service/dateService";

function TransactionCard(props) {
  const { transaction, deleteTransaction } = props;
  const {
    id,
    payee,
    amount,
    date,
    category: { name, type },
  } = transaction;

  // console.log(
  //   new Intl.DateTimeFormat("en-US", {
  //     month: "short",
  //     year: "2-digit",
  //   }).format(new Date())
  // );

  const handleClickDelete = id => {
    deleteTransaction(id);
  };

  return (
    <>
      <li
        className={`list-group-item d-flex justify-content-between align-items-center bd-callout bd-callout-${
          type === "Income" ? "success" : "danger"
        }`}
      >
        <div className="transaction-detail d-flex flex-fill me-4">
          <div className="transaction-date-card border border-1 border-dark rounded-2 bg-warning p-2 text-center">
            <p className="p-0 m-0 fs-7 text-black-50">
              {/* แบบยาว */}
              {/* {date.toString().split(" ")[1]}{" "}
              {date.getFullYear().toString().slice(2)} */}
              {/* แบบ Intl ดูในฟังก์ชั่นที่ Import มา */}
              {formatDateShortMonthShortYear(date)}
            </p>
            <p className="p-0 m-0">{date.getDate()}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-fill ps-4">
            <div>
              <p className="mb-1 f-5 fw-bold">{payee}</p>
              <p className="mb-0 text-black-50 fs-7">{name}</p>
            </div>
            <span
              className={`badge bg-${type === "Income" ? "success" : "danger"}`}
            >
              {formatThaiCurrency(amount)}
            </span>
          </div>
        </div>
        <button
          className="btn btn-link text-secondary p-0 border-0"
          onClick={() => handleClickDelete(id)}
        >
          <i className="bi-x-circle" />
        </button>
      </li>
    </>
  );
}

export default TransactionCard;
