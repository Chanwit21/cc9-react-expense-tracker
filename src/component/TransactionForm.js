import React, { useState } from "react";
import { INCOMES, EXPENSES } from "../mocks/data";
import { isEmpty } from "../service/validateService";
import { v4 as uuidv4 } from "uuid";

const validatePayee = value => {
  if (isEmpty(value)) {
    return "Payee is require";
  }
  return "";
};
const validateAmount = value => {
  if (isEmpty(value)) {
    return "Amount is require";
  } else if (isNaN(value)) {
    return "Amount must be a numberic";
  } else if (+value <= 0) {
    return "Amount must be greater than zero";
  }
  return "";
};
const validateDate = value => {
  if (isEmpty(value)) {
    return "Date is require or invalid format";
  }
  return "";
};

function TransactionForm(props) {
  const { addTransaction } = props;
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState(EXPENSES[0].id);
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState({});

  const handleChangeType = e => {
    setType(e.target.value);
    if (e.target.value === "Expense") {
      setCategory(EXPENSES[0].id);
    } else {
      setCategory(INCOMES[0].id);
    }
  };

  const handleChangePayee = e => {
    setPayee(e.target.value);
    setError(curErr => ({ ...curErr, payee: validatePayee(e.target.value) }));
  };

  const handleChangeAmount = e => {
    setAmount(e.target.value);
    setError(curErr => ({ ...curErr, amount: validateAmount(e.target.value) }));
  };

  const handleChangeDate = e => {
    // console.log(e.target.value);
    setDate(e.target.value);
    setError(curErr => ({ ...curErr, date: validateDate(e.target.value) }));
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    const payeeError = validatePayee(payee);
    const amountError = validateAmount(amount);
    const dateError = validateDate(date);

    if (payeeError || amountError || dateError) {
      setError(curErr => ({
        ...curErr,
        payee: payeeError,
        amount: amountError,
        date: dateError,
      }));
    } else {
      const newTransaction = {
        id: uuidv4(),
        payee,
        amount: +amount,
        date: new Date(date),
        category:
          type === "Expense"
            ? EXPENSES.find(item => item.id === category)
            : INCOMES.find(item => item.id === category),
        comment,
      };
      addTransaction(newTransaction);
      setType("Expense");
      setCategory(EXPENSES[0].id);
      setPayee("");
      setAmount("");
      setDate("");
      setComment("");
      setError({});
    }
  };

  const categoryOptions = (type === "Expense" ? EXPENSES : INCOMES).map(
    item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    }
  );

  return (
    <div className="border bg-white rounded-2 p-3">
      <form className="row g-3" onSubmit={e => handleSubmitForm(e)}>
        <div className="col-12">
          <input
            type="radio"
            className="btn-check"
            name="type"
            id="cbx-expense"
            value="Expense"
            defaultChecked
            onChange={e => handleChangeType(e)}
          />
          <label
            className="btn btn-outline-danger rounded-0 rounded-start"
            htmlFor="cbx-expense"
          >
            Expense
          </label>
          <input
            type="radio"
            className="btn-check"
            name="type"
            id="cbx-income"
            value="Income"
            onChange={e => handleChangeType(e)}
          />
          <label
            className="btn btn-outline-success rounded-0 rounded-end"
            htmlFor="cbx-income"
          >
            Income
          </label>
        </div>
        <div className="col-sm-6">
          <label className="form-label">Payee</label>
          <input
            type="text"
            className={`form-control${error.payee ? " is-invalid" : ""}`}
            value={payee}
            onChange={e => handleChangePayee(e)}
          />
          {/* JSX จะ พยายาม Render แค่ String หรือ Num ถ้าเป็นตัวอื่นจะไม่พยายามแปลงแล้ว Render */}
          <div className="invalid-feedback">{error.payee}</div>
        </div>
        <div className="col-sm-6">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categoryOptions}
          </select>
        </div>
        <div className="col-sm-6">
          <label className="form-label">Amount</label>
          <input
            type="text"
            className={`form-control${error.amount ? " is-invalid" : ""}`}
            value={amount}
            onChange={e => handleChangeAmount(e)}
          />
          {/* JSX จะ พยายาม Render แค่ String หรือ Num ถ้าเป็นตัวอื่นจะไม่พยายามแปลงแล้ว Render */}
          <div className="invalid-feedback">{error.amount}</div>
        </div>
        <div className="col-sm-6">
          <label className="form-label">Date</label>
          <input
            type="date"
            className={`form-control${error.date ? " is-invalid" : ""}`}
            value={date}
            onChange={e => handleChangeDate(e)}
          />
          {/* JSX จะ พยายาม Render แค่ String หรือ Num ถ้าเป็นตัวอื่นจะไม่พยายามแปลงแล้ว Render */}
          <div className="invalid-feedback">{error.date}</div>
        </div>
        <div className="col-12">
          <label className="form-label">Comment</label>
          <input
            type="text"
            className="form-control"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <div className="col-12 mt-4 d-grid">
          <button className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
