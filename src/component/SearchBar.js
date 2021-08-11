import React, { useState } from "react";
// import { formatDateShortMonthShortYear } from '../service/dateService';

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

  const genArrayYearsToMap = (transaction) => {
    const result = [];
    for (let { date } of transaction) {
      if (!result.includes(formatYear(date))) {
        result.push(formatYear(date));
      }
    }
    return result;
  };

  const genArrayMonthsToMap = (transaction) => {
    const result = [];
    for (let { date } of transaction) {
      if (!result.includes(formatMonth(date))) {
        result.push(formatMonth(date));
      }
    }
    return result;
  };

  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
    detectFilter(e.target.value, month, year);
  };

  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
    detectFilter(searchText, e.target.value, year);
  };

  const handleChangeYear = (e) => {
    setYear(e.target.value);
    detectFilter(searchText, month, e.target.value);
  };

  const yearOption = genArrayYearsToMap(transactions).map((item, index) => {
    return (
      <option key={index} value={item.slice(2)}>
        {item}
      </option>
    );
  });

  const monthOption = genArrayMonthsToMap(transactions).map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <div className='row g-3 mt-3'>
      <div className='col-sm-6'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter to search'
          value={searchText}
          onChange={(e) => handleChangeSearch(e)}
        />
      </div>
      <div className='col-sm-3'>
        <select
          className='form-select'
          value={month}
          onChange={(e) => handleChangeMonth(e)}
        >
          <option value=''>Filter Month</option>
          {monthOption}
        </select>
      </div>
      <div className='col-sm-3'>
        <select
          className='form-select'
          value={year}
          onChange={(e) => handleChangeYear(e)}
        >
          <option value=''>Filter Year</option>
          {yearOption}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
