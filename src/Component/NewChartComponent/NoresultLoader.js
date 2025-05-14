import React from "react";
import NoData from "./NoData.svg";
import "./NoresultLoader.scss";

export default function NoresultLoader({ type }) {
  return (
    <div className="cartNordiv">
      <img src={NoData} className=" img-fluid " />
      <p>No Data</p>
    </div>
  );
}
