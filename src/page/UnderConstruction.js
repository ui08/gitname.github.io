// UnderConstruction.js
import React from "react";
import "./UnderConstruction.scss";
import UnderConstructionImg from '../assets/img/UnderConstruction.jpg'

const UnderConstruction = () => {
  return (
    <div className="under-construction">
      <div className="content-container center">
        <h1 className="title">This Page is under Construction</h1>
        <div className="animation-container">
          <div className="crane">
            <img alt="No Image"
             src={UnderConstructionImg}
            ></img>
          </div>
        </div>
        <div className="footer-message">
          <p>Thank you for your patience..!</p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
