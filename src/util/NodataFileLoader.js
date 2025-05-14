import React from "react";
import "./NodataFileLoader.scss";

const NodataFileLoader = ({ labelName, mandatory, divClassName }) => {
  return (
    <div className="od">
      <div className="DivOd">
        <span>loading ...</span>
        <div>
          <figure>
            <div className="dot white" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </figure>
        </div>
      </div>

      {/* <div className="Singalfileloader__skeleton"></div> */}
    </div>
  );
};

export default NodataFileLoader;
