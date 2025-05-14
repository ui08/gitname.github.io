
import React from "react";
import "./ErrorLoader.scss";

export default function ErrorLoader({ type }) {
  return (
    <div className="cartErrdiv">
      {type === "pie" || type === "doughnut" || type === "chart" ? (
        <div class="custom-loader"></div>
      ) : null}
    </div>
  );
}