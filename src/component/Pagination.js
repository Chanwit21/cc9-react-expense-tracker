import React, { useState } from "react";

function creatArrayFormQuntityPage(array, quntityPage) {
  const numberOfPage = Math.ceil(array.length / quntityPage);
  const result = [];
  for (let i = 1; i <= numberOfPage; i++) {
    result.push(i);
  }
  return result;
}

function creatArrayPageItemShow(
  onPage,
  transactionFilter1,
  quntityPage,
  pageItem,
  handleOnPage
) {
  if (Math.ceil(transactionFilter1.length / quntityPage) > 3) {
    if (onPage === 1) {
      return pageItem.splice(onPage - 1, 3);
    } else if (onPage === Math.ceil(transactionFilter1.length / quntityPage)) {
      return pageItem.splice(onPage - 3);
    }
    return pageItem.splice(onPage - 2, 3);
  } else {
    const arrayToCreate = [1, 2, 3].map((item, index) => {
      return (
        <li
          className={`page-item${pageItem.length < item ? " disabled" : ""}${
            onPage === item ? " active" : ""
          }`}
          key={index}>
          <a href="/" className="page-link" onClick={(e) => handleOnPage(e)}>
            <span>{item}</span>
          </a>
        </li>
      );
    });
    return arrayToCreate;
  }
}

function Pagination(props) {
  const { detectPagination, transactionFilter1 } = props;

  const [quntityPage, setQuntityPage] = useState(10);
  const [onPage, setOnPage] = useState(1);

  const handleQuantity = (e) => {
    setQuntityPage(+e.target.value);
    detectPagination(+e.target.value, onPage);
  };

  const handleOnPage = (e) => {
    e.preventDefault();
    // console.log(+e.target.innerText);
    setOnPage(+e.target.innerText);
    detectPagination(quntityPage, +e.target.innerText);
  };

  const handlePageDown = (e) => {
    e.preventDefault();
    let curPage = onPage;
    if (curPage > 1) {
      curPage -= 1;
    } else {
      curPage = 1;
    }
    setOnPage(curPage);
    detectPagination(quntityPage, curPage);
  };

  const handlePageUp = (e) => {
    e.preventDefault();
    let curPage = onPage;
    if (curPage < Math.ceil(transactionFilter1.length / quntityPage)) {
      curPage += 1;
    } else {
      curPage = Math.ceil(transactionFilter1.length / quntityPage);
    }
    setOnPage(curPage);
    detectPagination(quntityPage, curPage);
  };

  const pageItem = creatArrayFormQuntityPage(
    transactionFilter1,
    quntityPage
  ).map((item, index) => {
    return (
      <li
        className={`page-item${onPage === item ? " active" : ""}`}
        key={index}>
        <a href="/" className="page-link" onClick={(e) => handleOnPage(e)}>
          <span>{item}</span>
        </a>
      </li>
    );
  });

  const pageItemShow = creatArrayPageItemShow(
    onPage,
    transactionFilter1,
    quntityPage,
    pageItem,
    handleOnPage
  );

  return (
    <div className="mt-4 d-flex justify-content-between">
      <div className="row">
        <div className="col-12">
          <select
            type="text"
            className="form-select form-select-sm"
            value={quntityPage}
            onChange={(e) => handleQuantity(e)}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <nav>
        <ul className="pagination pagination-sm">
          <li className={`page-item${onPage === 1 ? " disabled" : ""}`}>
            <a
              href="/"
              className="page-link"
              onClick={(e) => handlePageDown(e)}>
              <span>&laquo;</span>
            </a>
          </li>
          {/* {pageItem} */}
          {pageItemShow}
          <li
            className={`page-item${
              onPage === Math.ceil(transactionFilter1.length / quntityPage)
                ? " disabled"
                : ""
            }`}>
            <a href="/" className="page-link" onClick={(e) => handlePageUp(e)}>
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
