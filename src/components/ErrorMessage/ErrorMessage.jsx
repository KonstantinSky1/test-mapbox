import React from "react";

function ErrorMessage({ errorMessage, style }) {
  return (
    <span
      style={style}
      className="errorMessage"
    >
      {errorMessage}
    </span>
  );
}

export default ErrorMessage;