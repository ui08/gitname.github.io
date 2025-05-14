import { faBell, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import finexaLogo from "../assets/img/finexa.png";
import packageJson from "../../package.json";
import {
  getAssumingRole,
  getsessionStorage,
  setsessionStorage,
} from "../util/Authenticate";
import { encrypt, encryptData } from "../util/Authenticate/CryptoJS";
import LogoutButton from "../util/Authenticate/logout";
import { getUserFilterDetails } from "./../util/Authenticate/index";
import "./header.scss";
const Header = () => {
  const navigate = useNavigate();
  const [userbox, setUserbox] = useState(false);
  const [notificationbox, setnotificationBox] = useState(false);

  /**
   * Handles user logout by clearing stored data and redirecting to the login page.
   */
  useEffect(() => {
    let temrole = getAssumingRole();
    if (temrole == "client") {
      // Set values in sessionStorage
      setsessionStorage(encrypt("Clienttorm"), encryptData(true)); // "true" will be encrypted
      setsessionStorage(
        encrypt("ClienttormID"),
        encryptData(getUserFilterDetails("clientId"))
      );
      setsessionStorage(
        encrypt("ClienttormName"),
        encryptData(getUserFilterDetails("fullName"))
      );
    }
  }, []);
  const handleuser = () => {
    setUserbox((prevValue) => !prevValue);
    // setnotificationBox((prevValue) => !prevValuem);
  };
  const handlenotification = () => {
    // setUserbox((prevValue) => !prevValue);

    setnotificationBox((prevValue) => !prevValue);
  };

  const convertShortRoleName = () => {
    let str = String(getUserFilterDetails("userRoles"));
    return str
      .replace(/_/g, " ") // Replace underscores with spaces
      .split(" ") // Split the string into words
      .map((word) => {
        if (word.toLowerCase() === "admin") {
          return "Admin"; // Special case for 'admin'
        }
        return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter of each word
      })
      .join(" "); // Join the words back together with spaces
  };

  const convertShortUserName = () => {
    let str = String(getUserFilterDetails("fullName"));

    return str.charAt(0); // Split the string into words
  };

  const renderTooltip = (props) => (
    <div className="titlecard" id="button-tooltip" {...props}>
      <div className="divbox">
        <p className="titletitleemail">{getUserFilterDetails("email")}</p>
        <p className="iconbox">{convertShortUserName("fullName")}</p>

        <p className="titletitle">
          <h1>{getUserFilterDetails("fullName")}</h1>
          {getUserFilterDetails("userRoles") == "client"
            ? "Client"
            : getUserFilterDetails("userRoles")}
        </p>
      </div>
    </div>
  );

  return (
    <div className="headerdiv">
      {/* Application Logo */}
      <div className="applogo">
        {/* {getTenantkey("logo")} */}

        <img className="img-fluid" src={finexaLogo} />
        {packageJson.version}
      </div>

      {/* Navigation Toggle Button */}
      {/* <div className="Popup_user_box">
          <span className="Popup_user_Name">
            {convertShortUserName()} {}{" "}
            <FontAwesomeIcon
              icon={faCircle}
              beatFade
              size="sm"
              style={{ color: "#66ff00" }}
            />
          </span>
          <span className="Popup_user_roa">
            ({convertShortRoleName()} {})
          </span>
        </div> */}
      {/* Profile and Logout Section */}
      <div className="d-flex justify-content-end align-items-center gap-3 me-1">
        <button
          className="btn notification_wall me-1"
          onClick={() => handlenotification()}
        >
          <span className="Popup_notification"> 9+</span>
          <FontAwesomeIcon icon={faBell} size="xl" />
        </button>

        <OverlayTrigger
          placement="bottom"
          // delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button className="btn notification_wall me-1">
            <span className="Popup_notifications">
              {" "}
              <FontAwesomeIcon
                icon={faCircle}
                beatFade
                size="sm"
                style={{ color: "#66ff00" }}
              />
            </span>
            <span className="Popup_user_Name">
              {convertShortUserName()} {}{" "}
            </span>
          </button>
        </OverlayTrigger>

        <button
          className="btn notification_wall me-1"
          // onClick={() => handlenotification()}
        >
          <LogoutButton
            logoutType={getsessionStorage(encrypt("Login_Type"))}
            logoutAction={"user"}
          />
        </button>
      </div>
      {notificationbox && (
        <div className="notification_box popup_box">
          <ul>
            <li className="notification_div">
              {" "}
              <div className="notification_text">
                notification notific ationnotifica tionnotificationnot
              </div>{" "}
              <div className="notification_time">3 min</div>
            </li>
          </ul>
        </div>
      )}
      {userbox && (
        <div className="user_box popup_box">
          <ul>
            <li>
              {" "}
              {/* <FontAwesomeIcon icon={faRightFromBracket} /> logout */}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
