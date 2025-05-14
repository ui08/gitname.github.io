import { useEffect, useState } from "react";
import { Apiurl } from "../apiurl";
import axiosInstance from "../axiosInstance";
import { encrypt } from "./CryptoJS";
import { filtercurrentRole } from "./currentRealmRole";
import {
    getsessionStorage,
    getToken,
    setLocalStorage,
    setsessionStorage,
    validateJwt,
} from "./index";
import LogoutButton from "./logout";

const AuthComponent = () => {
  const [isIdlehandleLogoutOpen, setIsIdlehandleLogoutOpen] = useState(false);

  const [uservalidity, setuservalidity] = useState();
  /**
   * Checks the validity of the current token and triggers auto logout if invalid.
   */
  const checkTokenValidity = () => {
    const token = getToken();

    if (token) {
      if (!validateJwt(token)) {
        redirectingUserlogin();
      } else {
        let currentRole = filtercurrentRole();
        if (currentRole.length > 0) {
          handlelogvalidate();
          // console.log("expiration1");
        } else {
          setuservalidity("Bad_credentials");
          handleAutoLogout();
          // console.log("expiration1");
        }
      }
    } else {
      setuservalidity("system");
      handleAutoLogout();
    }
  };

  /**
   * Handles user auto-logout by clearing data and redirecting to the login page.
   */
  const handleAutoLogout = () => {
    setIsIdlehandleLogoutOpen(true);
  };
  const handlelogvalidate = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.logvalidate);
      const tokenData = response.data;
      if (!tokenData) {
        redirectingUserlogin("validate");
      }
      // console.log("expiration1", tokenData);
    } catch (error) {
      setuservalidity("system");
      handleAutoLogout();
    } finally {
    }
  };
  const redirectingUserlogin = async (valus) => {
    try {
      const response = await axiosInstance.get(Apiurl.Loginrefresh);
      const tokenData = response.data;

      if (tokenData) {
        setsessionStorages(encrypt("jwt-secret-app"), tokenData);
        if (valus === "validate") {
          window.location.reload();
        }
      }
      // console.log(tokenData);
    } catch (error) {
      console.error("Login error: ", error);
      setuservalidity("system");
      handleAutoLogout();
    } finally {
    }
  };
  /**
   * Sets up an interval to periodically check token validity.
   */
  useEffect(() => {
    const intervalId = setInterval(
      () => {
        checkTokenValidity();
      },

      3000
    ); // Default: 3000 ms (3 seconds)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Component renders nothing isIdlehandleLogoutOpenT2 ? "Bad_credentials" :
  return (
    <>
      {(uservalidity === "system" || uservalidity === "Bad_credentials") && (
        <>
          {isIdlehandleLogoutOpen ? (
            <LogoutButton
              logoutType={getsessionStorage(encrypt("Login_Type"))}
              logoutAction={uservalidity}
            />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default AuthComponent;
