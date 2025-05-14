import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./../Component/BreadcrumbComponent/BreadcrumbComponent";
// import "./Pageheader.scss";
import {
  faCaretDown,
  faCaretUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Layout/Pageheader.scss"; // Include new styles

import micicon from "../assets/img/mic.svg";
import ButtonComp from "../Component/ButtonComp/ButtonComp";
import {
  getAssumingRole,
  getsessionStorage,
  removeLocalStorage,
  setsessionStorage
} from "../util/Authenticate";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../util/Authenticate/CryptoJS";
export default function Pageheader({
  Breadcrumbshow,
  breadcrumbItems,
  getfullName,
  pagename,
  btnnav,
  showScroller
}) {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [userbox, setUserbox] = useState(false);

  /**
   * Handles user logout by clearing stored data and redirecting to the login page.
   */
  const handleuser = () => {
    setUserbox((prevValue) => !prevValue);
    // setnotificationBox((prevValue) => !prevValuem);
  };

  const ExitToClient = () => {
    // Check if encrypt and encryptData work as expected
    const clienttormValue = encrypt("Clienttorm");
    const clienttormidValue = encrypt("ClienttormID");
    const clienttormnameValue = encrypt("ClienttormName");
    setsessionStorage(clienttormValue, encryptData("false"));
    removeLocalStorage(clienttormidValue);
    removeLocalStorage(clienttormnameValue);

    // Navigate after setting sessionStorage
    navigate(`/${encrypt("DashboardLandingPage")}`);
    window.location.reload(true);
  };

  let temUserDetails = JSON.parse(getsessionStorage(encrypt("UserDetails")));
  console.log('temUserDetails',temUserDetails.userRoles[0])

  const [login, setLogin] = useState(temUserDetails.userRoles[0] == "relationship_manager" ? "RM" : "Operation")
  

  // Example function to fetch stock data from an API
  const fetchStockData = async () => {
    // Replace the URL with your API endpoint
    const apiData = [
      { name: "Bharti Airtel Ltd", value: 1577.25, change: -0.1 },
      { name: "BAJFINANCE", value: 6617.95, change: -1.01 },
      { name: "HINDUNILVR", value: 2479.2, change: 0.31 },
      { name: "INDIGO", value: 4229.6, change: 0.0 },
      { name: "ITC Ltd", value: 477.0, change: 0.31 },
    ]; // Replace this with a real API response
    setStocks(apiData);
  };

  useEffect(() => {
    fetchStockData();
  }, []);
  const handlenavigate = () => {
    navigate(btnnav);
  };
  const [hasNewClass, setHasNewClass] = useState(false);
  const updateClassList = () => {
    const element = document.querySelector(".blur_bg");
    element.classList.add("blur_bg");
    setHasNewClass(!hasNewClass);
    element.classList.remove("navbarshow");
    element.classList.remove("navbarhide");
    element.classList.add(hasNewClass ? "navbarshow" : "navbarhide");
  };

  return (
    <div className="pageheader">
      <div className="row d-flex align-items-center stock-section">
        {decryptData(getsessionStorage(encrypt("Clienttorm"))) === "true" &&
        getAssumingRole() != "client" ? (
          <p className="ClienttormName">
            {decryptData(getsessionStorage(encrypt("ClienttormName")))}{" "}
          </p>
        ) : (
          showScroller == "true" ?
          <div className="ticker-container">
            <div className="ticker-wrapper">
              {stocks.map((stock, index) => (
                <div className="BSEBox" key={index}>
                  <span className="name">{stock.name}</span>
                  <span className="value">{stock.value.toFixed(2)}</span>
                  <span className="per">
                    {stock.change >= 0 ? (
                      <FontAwesomeIcon icon={faCaretUp} color="green" />
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} color="red" />
                    )}
                  </span>
                  <span
                    className="per"
                    style={{ color: stock.change >= 0 ? "green" : "red" }}
                  >
                    {stock.change >= 0
                      ? `${stock.change.toFixed(2)}%`
                      : `${stock.change.toFixed(2)}%`}
                  </span>
                </div>
              ))}
            </div>
          </div> : null
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center page-main-heading-section">
        <div className="d-flex align-items-center">
          <div>
            {Breadcrumbshow ? <Breadcrumb items={breadcrumbItems} /> : ""}
          </div>
        </div>
        <div
          className="d-flex justify-content-between align-items-center stock-section mx5"
          style={{ color: "#80808" }}
        >
          {decryptData(getsessionStorage(encrypt("Clienttorm"))) == "true" &&
          getAssumingRole() != "client" ? (
            // <button className="btn" onClick={() => ExitToClient()}>
            //   <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
            // </button>
            <ButtonComp
                        wrapperName="submit_btn_wrapper"
                        type={"submit"}
                        btnStyle="box"
                        btnText={`Back to ${login}`}
                        disabled={false}
                        onClick={() => ExitToClient()}
                      />
          ) : (
            <>
              {" "}
              {/* <button className="btn" onClick={() => handleuser()}>
                <img src={micicon} className="micicon" />
              </button> */}
              {userbox && (
                <span className="mictext mictext-slide-left">
                  simply text of the printing and typeset{" "}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Pageheader.propTypes = {
  Breadcrumbshow: PropTypes.bool.isRequired,
  pagename: PropTypes.string.isRequired,
  btnshow: PropTypes.bool.isRequired,
  btnUploadnav: PropTypes.any,
  btnUploadName: PropTypes.any,
  btnUpload: PropTypes.bool.isRequired,
  BtnName: PropTypes.string,
  btnnav: PropTypes.any,
  breadcrumbItems: PropTypes.array.isRequired,
};

// Pageheader.propTypes = {
//   Breadcrumbshow: PropTypes.bool.isRequired,
//   breadcrumbItems: PropTypes.array.isRequired,
//   btnnav: PropTypes.any,
// };
