import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Apiurl } from "../apiurl";
import axiosInstance from "../axiosInstance";
import { encrypt, encryptData } from "./CryptoJS";
import {
  removeAccess,
  removeLocalStorage,
  removeToken,
  setsessionStorage,
} from "./index";

const LogoutButton = ({ logoutType, logoutAction }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Define the logout function
  const logoutfunction = useCallback(
    (logoutType, logoutAction) => {
      getUserlogout(logoutType, logoutAction);
    },
    [navigate]
  );
  const getUserlogout = async (logoutType, logoutAction) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.logout);
      const userData = response.data;

      navigate(
        "/" +
          encrypt("Redirectslogout") +
          `/${logoutType}` +
          `/${encryptData(logoutAction)}` +
          `/${encryptData("logout")}`
      );
      removeToken();
      removeAccess();
      removeLocalStorage("ChartColors");
      removeLocalStorage(encrypt("UserDetails"));
      setsessionStorage(encrypt("counter"), "1");
      setsessionStorage(encrypt("jwt-access"), encryptData("false"));
      // Check if encrypt and encryptData work as expected

      window.location.reload(true);
      toast.success(userData);
      setLoading(false);
    } catch (error) {
      console.error("Login error: ", error);
      toast.error("logOut");
    } finally {
    }
  };
  useEffect(() => {
    if (
      logoutAction == "system" ||
      logoutAction == "Idle" ||
      logoutAction == "Bad_credentials"
    ) {
      logoutfunction(logoutType, logoutAction);
    }
    return () => {
      if (logoutAction == "user") {
      }
    };
  }, [logoutAction]);

  return (
    <>
      <button
        className={
          logoutAction == "user" ? "btn Logoutbtn p-0" : "btn Logoutbtn d-none"
        }
        onClick={() => logoutfunction(logoutType, logoutAction)}
        title="Logout" // Call the function when button clicked
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </>
  );
};

export default LogoutButton;
