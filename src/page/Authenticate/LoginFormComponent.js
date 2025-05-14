import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { Apiurl } from "../../util/apiurl";
import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";
import { setsessionStorage } from "../../util/Authenticate/index";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import { login } from "./../../util/Authenticate/index";
import FormComponent from "./FormComponent";

const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

const LoginFormComponents = () => {
  const [captcha, setCaptcha] = useState(generateRandomString());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const navigate = useNavigate();

  // Handle captcha regeneration
  const handlecaptcha = () => {
    setCaptcha(generateRandomString());
  };

  // Simulate loading state (could be removed once actual loading is added)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Sync captcha input with state
  useEffect(() => {
    setData({
      inputCaptcha: captcha,
    });
  }, [captcha]);

  // Form submission handler
  const handleAddSubmit = (formData) => {
    const payload = {
      username: formData.username,
      password: formData.password,
    };

    const logtype =
      formData.LoginAsother || formData.LoginAs?.value || "super_admin";
    let appHostname = window.location.hostname;

    if (
      appHostname === "localhost" ||
      formData.inputCaptcha === formData.Captcha
    ) {
      submitData(payload, logtype);
    } else {
      setCaptcha(generateRandomString());
      toast.error("Invalid Captcha");
    }
  };

  // Submit login data to the API
  const submitData = async (payload, logtype) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(Apiurl.apiLogin, payload);
      const tokenData = response.data;

      if (
        tokenData === "User is already logged in to the system." ||
        tokenData === "User is not active"
      ) {
        const userToken =
          tokenData === "User is already logged in to the system."
            ? "already"
            : "noactive";

        navigate(
          `/${encrypt("Redirectslogout")}/${logtype}/${encryptData(
            "system"
          )}/${encryptData(userToken)}`
        );
        toast.error(tokenData);
      } else if (tokenData) {
        // Perform login with the received token
        // login(tokenData, logtype);
        const decoded = jwtDecode(tokenData).roles;
console.log("decoded", decoded, logtype)
        if (decoded == logtype) {
          login(tokenData, logtype);
          setTimeout(() => {
            getUserDetails(logtype);
          }, 1000);
        } else {
          navigate(
            `/${encrypt("Redirectslogout")}/${logtype}/${encryptData(
              "Bad_credentials"
            )}/${encryptData("userToken")}`
          );
        }
        // getUserDetails();
      } else {
        toast.error(t("loginFailed"));
      }
    } catch (error) {
      console.error("Login error: ", error);
      setLoading(false);
      toast.error(t("loginFailed"));
    }
  };

  if (loading) {
    return <Loader />;
  }
  const getUserDetails = async (x) => {
    try {
      const response = await axiosInstance.get(Apiurl.userDetails);
      const userData = response.data;
      setsessionStorage(encrypt("UserDetails"), JSON.stringify(response.data));
      // Navigate to the dashboard page

      if (x === "Admin") {
        navigate(
          "/" + encrypt("UserCreationListLanding") + `/${encryptData("List")}`
        );
      } else {
        navigate(`/${encrypt("DashboardLandingPage")}`);
      }

      setsessionStorage(encrypt("counter"), "1");
      toast.success(t("loginSuccess"));
      setLoading(false);
      setsessionStorage(encrypt("Clienttorm"), encryptData(false));
    } catch (error) {
      console.error("Login error: ", error);
      // toast.error(t(""));
      setLoading(false);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <div className="apph100 d-flex align-content-center container-fluid">
      <FormComponent
        onSubmit={handleAddSubmit}
        initialData={data}
        Showrecaptchabtn={handlecaptcha}
      />
    </div>
  );
};

export default LoginFormComponents;
