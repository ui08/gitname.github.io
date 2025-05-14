import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dribbble_1img from "../../assets/img/dribbble_1.gif";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import Loader from "./../Loader"; // Ensure this is implemented correctly
import { decryptData, encrypt, encryptData } from "./CryptoJS";
import { removeLocalStorage, setsessionStorage } from "./index";

export default function Redirectslogout() {
  const temroles = decryptData(useParams().roles);
  const temaction = decryptData(useParams().action);
  const temfunction = decryptData(useParams().NavigateM);

  const [stateHandle, setStateHandle] = useState(false); // Renamed stateHandle to setStateHandle for clarity
  const navigate = useNavigate();

  // Define the logout function
  const Handlenavigate = useCallback(() => {
    if (temroles === undefined || temroles === "client") {
      navigate("/login");
    } else if (temroles === "super_admin") {
      navigate("/login/superadmin");
    } else {
      navigate("/login/rm");
    }
    removeLocalStorage(encrypt("Login_Type"));
    setsessionStorage(encrypt("Clienttorm"), encryptData("false"));
    removeLocalStorage(encrypt("ClienttormID"));
    removeLocalStorage(encrypt("ClienttormName"));
  }, [temroles, navigate]);

  useEffect(() => {
    if (temaction === "user") {
      setStateHandle(false); // Ensure this is being called correctly
      Handlenavigate(); // Ensure this is being called after updating state
    } else if (
      temaction === "system" ||
      temaction === "Bad_credentials" ||
      temaction === "Idle"
    ) {
      setStateHandle(true); // Set to true when action is either "system" or "Bad_credentials"
    }
  }, [temaction, Handlenavigate]); // Effect runs when temaction changes

  const HandleMeg = (data) => {
    switch (data) {
      case "already":
        return "User is already logged in to the system.";
      case "noactive":
        return "User is not active";
      case "logout":
        return " ";
      case "userToken":
        return "OR  Something went wrong. ";
      default:
        return "400"; // Return 400 if the action is not recognized
    }
  };

  return (
    <>
      {stateHandle ? (
        <div className="w3jumbo">
          <div>
            <img
              className="img-fluid"
              src={dribbble_1img}
              alt="Access Denied"
            />
            <h1 className="text-center">
              <code>Access Denied</code>
            </h1>

            <h2 className="text-center">
              {(temaction === "Bad_credentials" || temaction === "system") && (
                <code>
                  "Oops! That username or password doesn't seem right."
                </code>
              )}
              {temaction === "Idle" && (
                <code>You have been logged out due to inactivity.</code>
              )}
            </h2>
            <h3 className="text-center">
              <code>{temfunction ? HandleMeg(temfunction) : "Forbidden"}</code>
            </h3>

            <h3 className="text-center">
              <code>Please try again.</code>
            </h3>

            <div>
              <ButtonComp
                wrapperName="submit_btn_wrapper"
                type="button"
                btnStyle="box"
                btnText="Go Back"
                onClick={() => Handlenavigate()}
              />
            </div>
          </div>
        </div>
      ) : (
        // Display Loader while stateHandle is false
        <div className="loader-container">
          <Loader pagename="Dashboard" />
        </div>
      )}
    </>
  );
}
