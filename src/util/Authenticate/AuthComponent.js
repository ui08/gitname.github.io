import { useEffect, useState } from "react";
import { encrypt } from "./CryptoJS";
import { filtercurrentRole } from "./currentRealmRole";
import { getsessionStorage, getToken, setsessionStorage, validateJwt } from "./index";
import LogoutButton from "./logout";
import axiosInstance from "../axiosInstance";
import { Apiurl } from "../apiurl";

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
        // Token is invalid or expired — logout
        redirectingUserlogin("validate");
      } else {
        const currentRole = filtercurrentRole();
        if (currentRole.length > 0) {
          // Token valid and role is present — do nothing
        } else {
          setuservalidity("Bad_credentials");
          handleAutoLogout();
        }
      }
    } else {
      setuservalidity("system");
      handleAutoLogout();
    }
  };
  const redirectingUserlogin = async (valus) => {
    try {
      const response = await axiosInstance.get(Apiurl.Loginrefresh);
      const tokenData = response.data;
      console.log("token", tokenData)
      if (tokenData) {
        setsessionStorage(encrypt("jwt-secret-app"), tokenData);
        // if (valus === "validate") {
        //   window.location.reload();
        // }
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
   * Triggers logout UI.
   */
  const handleAutoLogout = () => {
    setIsIdlehandleLogoutOpen(true);
  };

  /**
   * Sets interval to periodically check token validity.
   */
  useEffect(() => {
    const intervalId = setInterval(checkTokenValidity, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {(uservalidity === "system" ||
        uservalidity === "Idle" ||
        uservalidity === "Bad_credentials") && (
        <>
          {isIdlehandleLogoutOpen && (
            <LogoutButton
              logoutType={getsessionStorage(encrypt("Login_Type"))}
              logoutAction={uservalidity}
            />
          )}
        </>
      )}
    </>
  );
};

export default AuthComponent;
