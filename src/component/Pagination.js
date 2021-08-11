import React from "react";

function Pagination() {
  return (
    <div className="mt-4 d-flex justify-content-between">
      <div className="row">
        <div className="col-12">
          <select type="text" className="form-select form-select-sm">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <nav>
        <ul className="pagination pagination-sm">
          <li className="page-item disabled">
            <a href="/" className="page-link">
              <span>&laquo;</span>
            </a>
          </li>
          <li className="page-item active">
            <a href="/" className="page-link">
              <span>1</span>
            </a>
          </li>
          <li className="page-item">
            <a href="/" className="page-link">
              <span>2</span>
            </a>
          </li>
          <li className="page-item">
            <a href="/" className="page-link">
              <span>3</span>
            </a>
          </li>
          <li className="page-item">
            <a href="/" className="page-link">
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
