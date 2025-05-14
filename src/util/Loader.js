import React from "react";
import "./loader.scss";
export default function Loader() {
  return (
    // ************************ Finlabs Loader ************************ //
    // <div>
    //   <div className="loading-container">
    //     <div className="loading-text">
    //       <span>F</span>
    //       <span>I</span>
    //       <span>N</span>
    //       <span>L</span>
    //       <span>A</span>
    //       <span>B</span>
    //       <span>S</span>
    //     </div>
    //   </div>
    // </div>

    <>
      <div className="loginWrapper">
        <div className="loadercenter">
          <figure className="iconLoaderProgress">
            <svg className="iconLoaderProgressFirst" width={120} height={120}>
              <circle cx={60} cy={60} r={50} />
            </svg>
            <svg className="iconLoaderProgressSecond" width={120} height={120}>
              <circle cx={60} cy={60} r={50} />
            </svg>
          </figure>
        </div>
      </div>
    </>
  );
}
