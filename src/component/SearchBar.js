import React, { useState } from "react";
import { formatDateShortMonthShortYear } from "../service/dateService";

function formatYear(date) {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
  }).format(date);
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
  }).format(date);
}

function SearchBar(props) {
  const { detectFilter, transactions } = props;
  const [searchText, setSearchText] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleChangeSearch = e => {
    setSearchText(e.target.value);
    detectFilter(e.target.value, month, year);
  };

  const handleChangeMonth = e => {
    setMonth(e.target.value);
    detectFilter(searchText, e.target.value, year);
  };

  const handleChangeYear = e => {
    setYear(e.target.value);
    detectFilter(searchText, month, e.target.value);
  };

  const yearOption = transactions.map(item => {
    const { date, id } = item;
    return (
      <option
        key={id}
        value={formatDateShortMonthShortYear(date).split(" ")[1]}
      >
        {formatYear(date)}
      </option>
    );
  });

  const monthOption = transactions.map(item => {
    const { date, id } = item;
    return (
      <option key={id} value={formatMonth(date)}>
        {formatMonth(date)}
      </option>
    );
  });

  return (
    <div className="row g-3 mt-3">
      <div className="col-sm-6">
        <input
          type="text"
          className="form-control"
          placeholder="Enter to search"
          value={searchText}
          onChange={e => handleChangeSearch(e)}
        />
      </div>
      <div className="col-sm-3">
        <select
          className="form-select"
          value={month}
          onChange={e => handleChangeMonth(e)}
        >
          <option value="">Filter Month</option>
          {monthOption}
        </select>
      </div>
      <div className="col-sm-3">
        <select
          className="form-select"
          value={year}
          onChange={e => handleChangeYear(e)}
        >
          <option value="">Filter Year</option>
          {yearOption}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
