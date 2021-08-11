import React from "react";

function Container(props) {
  const { children } = props;
  return (
    <div className="container">
      <div className="content">{children}</div>
    </div>
  );
}

export default Container;
