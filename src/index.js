import React from "react";
import ReactDOM from "react-dom";
import "reset-css";
import "./index.css";
import Refiner from "./Refiner";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Refiner />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your Refiner, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
