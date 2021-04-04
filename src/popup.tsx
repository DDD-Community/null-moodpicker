import React from "react";
import ReactDOM from "react-dom";

const Popup: React.FC = () => {
  return (
    <h1>Hi</h1>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Popup/>
  </React.StrictMode>,
  document.getElementById("root")
);
