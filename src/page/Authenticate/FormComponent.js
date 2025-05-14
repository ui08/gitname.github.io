import {
  faEye,
  faEyeSlash,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import SelectElement from "../../Component/ComponentsInput/InputSelect";
import InputText from "../../Component/ComponentsInput/InputText";
import "../../Component/ComponentsInput/InputText.scss";
import Inputcheckbox from "../../Component/ComponentsInput/Inputcheckbox";
import { ValidationPattern } from "../../ValidationPattern/ValidationPattern";
import finexaLogo from "../../assets/img/finexa.png";
import { getsessionStorage } from "../../util/Authenticate";
import { encrypt } from "../../util/Authenticate/CryptoJS";
import PatternMessage from "../../util/PatternMessage";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import { GetSvgIcon } from "./../../assets/img/app/GetSvgIcon";

const FormComponent = ({ initialData, onSubmit, Showrecaptchabtn }) => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [urlpage, setUrlpage] = useState();
  const [allrole, setAllrole] = useState([]);
  const [urlpageType, setUrlpageType] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUrl();
  }, [urlpage]);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto"; // Restore scrolling when unmounting
    };
  }, []);

  const fetchUrl = () => {
    let urlElements = window.location.href.split("/");
    let urlElelement = urlElements[3];
    let urlElelement5 = urlElements[4];
    if (urlElelement5 === "rm" || urlElelement5 === "superadmin") {
      setUrlpageType(urlElelement5);
      console.log("urlElelement5", urlElelement5);
      if (urlElelement5 === "superadmin") {
        setValue("LoginAsother", "super_admin");
      } else {
        setValue("LoginAsother", "null");
      }
    } else {
      if (urlElelement5 == undefined && urlElelement == "login") {
        setValue("LoginAsother", "client");
      } else {
        setValue("LoginAsother", "null");
      }
    }
    console.log(urlElelement5);
    setUrlpage(`${urlElelement}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    control,
    watch,
    getValues,
    setError,
    clearErrors,
  } = useForm({ defaultValues: initialData });
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
    setError,
    clearErrors,
  };

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showrePassword, setShowrePassword] = useState(false);
  useEffect(() => {
    if (initialData) {
      Getallrole(getsessionStorage(encrypt("Login_Type")));
      reset(initialData);
    }
    const element = document.querySelector("body");
    element.classList.add("loginbody");
  }, [initialData, urlpageType]);

  const isViewurlpage = urlpage === "view";
  const username = watch("username");
  const password = watch("password");
  const rePassword = watch("rePassword");

  const isValid = ValidFunction();

  function ValidFunction() {
    let Valid;
    if (urlpage === "ForgotPassword") {
      Valid = username && password && rePassword;
    } else if (urlpage === "login") {
      Valid = username && password;
    } else if (urlpage === "signup") {
      Valid = username && password;
    } else {
      Valid = true;
    }
    return Valid;
  }

  function handleBtnClick(e) {
    navigate(`/${e}`);
  }
  const ButtonName =
    urlpage == "login" ? "Login" : urlpage == "signup" ? "Signup" : "Proceed";
  const LoginLogo =
    urlpageType == "rm"
      ? "RMLogin"
      : urlpage == "login"
      ? "ClientLoginVector"
      : urlpage == "signup"
      ? "Signup"
      : urlpage == "superadmin"
      ? "superadmin"
      : "ForgotPassword";
  // console.log("ForgotPassword", validatelogoFunction());

  const Getallrole = async (value) => {
    try {
      const response = await axiosInstance.get(Apiurl.preLoginrole);

      setAllrole([]);

      Object.values(response.data)
        .filter((x) => x.roleName != "client" && x.roleName != "super_admin")
        .map((item) => {
          if (urlpageType == item.roleName) {
            setValue("LoginAs", {
              label: item.displayName,
              value: item.roleName,
              roleName: item.roleName,
            });
          }
          let SingleData = {
            label: item.displayName,
            value: item.roleName,
            roleName: item.roleName,
          };
          setAllrole((prev) => [...prev, SingleData]);
        });
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };

  return (
    <div>
      <div className="row m-auto align-content-center logincarddiv">
        <div className="col-lg-5 col-md-5 col-sm-12 col-12 ">
          <div class="card logincard m-auto">
            <div class="card-body">
              <div className="applogo">
                <img className="img-fluid" src={finexaLogo} />
              </div>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className={urlpageType !== "rm" ? "d-none" : ""}>
                  {urlpageType == "rm" ? (
                    <div className="LoginAsMainDiv">
                      <SelectElement
                        {...useFromProps}
                        useForm={useForm}
                        register={() => {}}
                        divClassName={"LoginAs"}
                        isMulti={false}
                        readOnly={false}
                        previewFlag={""}
                        onSelect={() => {}}
                        handleInputChange={() => {}}
                        registerName={"LoginAs"}
                        mandatory={true}
                        labelName="Login as"
                        options={allrole}
                      />
                    </div>
                  ) : (
                    <InputText
                      {...useFromProps}
                      useForm={useForm}
                      readOnly={isViewurlpage}
                      disabled={isViewurlpage}
                      type="text"
                      hidden={true}
                      labelName={"LoginAsother"}
                      divClassName="app-input-text-group-login"
                      registerName={"LoginAsother"}
                      name={"LoginAsother"}
                      onPaste={false}
                      onCopy={false}
                      previewFlag={isViewurlpage}
                      onChange={() => {}}
                    />
                  )}
                </div>

                <div
                  className={
                    urlpage === "ForgotPassword" || urlpage === "forgotuser"
                      ? "d-none"
                      : ""
                  }
                >
                  <InputText
                    {...useFromProps}
                    useForm={useForm}
                    maxLength={50}
                    minLength={1}
                    readOnly={isViewurlpage}
                    disabled={isViewurlpage}
                    type="text"
                    labelName={"User Name"}
                    pattern={{
                      value: ValidationPattern.email,
                      message: PatternMessage("alphabet", "User Name"),
                    }}
                    divClassName="app-input-text-group-login"
                    registerName={"username"}
                    name={"username"}
                    mandatory={true}
                    onPaste={false}
                    onCopy={false}
                    previewFlag={isViewurlpage}
                    onChange={() => {}}
                  />
                </div>

                <div
                  className={
                    urlpage == "ForgotPassword" ||
                    urlpage === "forgotuser" ||
                    urlpage === "signup"
                      ? ""
                      : "d-none"
                  }
                >
                  <h3 className={urlpage === "ForgotPassword" ? "" : "d-none"}>
                    Reset Your Password
                  </h3>
                  <p className={urlpage === "ForgotPassword" ? "" : "d-none"}>
                    Enter the email id you are register with
                  </p>
                  <InputText
                    {...useFromProps}
                    useForm={useForm}
                    readOnly={isViewurlpage}
                    disabled={isViewurlpage}
                    type="email"
                    labelName={"Email"}
                    divClassName="app-input-text-group-login"
                    pattern={{
                      value: ValidationPattern.email,
                      message: PatternMessage("email", t("Messages:onlyEmail")),
                    }}
                    registerName={"email"}
                    name={"email"}
                    mandatory={
                      urlpage == "ForgotPassword" ||
                      urlpage === "forgotuser" ||
                      urlpage === "SignUp"
                        ? true
                        : false
                    }
                    onPaste={false}
                    onCopy={false}
                    previewFlag={isViewurlpage}
                    onChange={() => {}}
                  />
                </div>

                <div
                  className={
                    urlpage == "ForgotPassword" ||
                    urlpage == "login" ||
                    urlpage === "signup"
                      ? ""
                      : "d-none"
                  }
                >
                  <div className=" password-group">
                    <InputText
                      {...useFromProps}
                      useForm={useForm}
                      maxLength={20}
                      minLength={1}
                      readOnly={isViewurlpage}
                      disabled={isViewurlpage}
                      divClassName="app-input-text-group-login"
                      type={showPassword ? "text" : "password"}
                      labelName={"Password"}
                      pattern={{
                        value: ValidationPattern.password,
                        message: PatternMessage(
                          "invalid",
                          t("Form:App_lms_Form_00090")
                        ),
                      }}
                      registerName={"password"}
                      name={"password"}
                      mandatory={
                        urlpage == "ForgotPassword" ||
                        urlpage == "login" ||
                        urlpage === "signup"
                          ? true
                          : false
                      }
                      onPaste={false}
                      onCopy={false}
                      previewFlag={isViewurlpage}
                      onChange={() => {}}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-space-between Captchadiv">
                  <InputText
                    {...useFromProps}
                    useForm={useForm}
                    maxLength={6}
                    minLength={1}
                    readOnly={true}
                    disabled={true}
                    type="text"
                    labelName={""}
                    divClassName="inputCaptcha"
                    registerName={"inputCaptcha"}
                    name={"inputCaptcha"}
                    onPaste={false}
                    onCopy={false}
                    previewFlag={true}
                    onChange={() => {}}
                  />
                  <div className="captchabtn">
                    <FontAwesomeIcon
                      icon={faRotateRight}
                      size="xl"
                      onClick={Showrecaptchabtn}
                      style={{ color: "#38479B" }}
                    />
                  </div>

                  <div
                    className={
                      urlpage === "ForgotPassword" || urlpage === "forgotuser"
                        ? "d-none"
                        : "captchainput"
                    }
                  >
                    <InputText
                      {...useFromProps}
                      useForm={useForm}
                      maxLength={6}
                      minLength={1}
                      readOnly={isViewurlpage}
                      disabled={isViewurlpage}
                      type="text"
                      divClassName="app-input-text-group-login"
                      labelName={"Captcha"}
                      pattern={{
                        message: PatternMessage(
                          "invalid",
                          t("Form:App_lms_Form_00089")
                        ),
                      }}
                      registerName={"Captcha"}
                      name={"captcha"}
                      mandatory={
                        urlpage === "ForgotPassword" || urlpage === "forgotuser"
                          ? false
                          : true
                      }
                      onPaste={false}
                      onCopy={false}
                      previewFlag={isViewurlpage}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (!inputValue) {
                          clearErrors("captcha"); // Clears error when input is empty
                        } else if (inputValue !== getValues("inputCaptcha")) {
                          let appHostname = window.location.hostname;
                          if (appHostname != "localhost") {
                            setError("captcha", {
                              type: "manual",
                              message: "Invalid Captcha",
                            });
                          }
                        } else {
                          clearErrors("captcha");
                        }
                      }}
                    />
                    {errors.captcha &&
                      watch("Captcha") && ( // Only show error if there's input
                        <p className="captcha-error">
                          {errors.captcha.message}
                        </p>
                      )}
                  </div>
                </div>
                <div className={urlpage == "ForgotPassword" ? "" : "d-none"}>
                  <div className=" password-group">
                    <InputText
                      {...useFromProps}
                      useForm={useForm}
                      maxLength={20}
                      minLength={1}
                      readOnly={isViewurlpage}
                      disabled={isViewurlpage}
                      type={showrePassword ? "text" : "password"}
                      labelName={"rePassword"}
                      pattern={{
                        value: ValidationPattern.alphabet,
                        message: PatternMessage(
                          "alphabet",
                          t("Form:App_lms_Form_00001")
                        ),
                      }}
                      registerName={"repassword"}
                      name={"repassword"}
                      mandatory={urlpage == "ForgotPassword" ? true : false}
                      onPaste={false}
                      onCopy={false}
                      previewFlag={isViewurlpage}
                      onChange={() => {}}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowrePassword(!showrePassword)}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                </div>
                <div className={urlpage === "login" ? "" : "d-none"}>
                  <div className="checkbox_style">
                    <Inputcheckbox
                      {...useFromProps}
                      useForm={useForm}
                      registerName="checkbox"
                      type={"checkbox"}
                      labelName={
                        <>
                          I agree to the{" "}
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                          </a>{" "}
                          of the website
                        </>
                      }
                      mandatory={true}
                      errorLabel={"Check Box"}
                    />
                  </div>
                </div>
                {/* <div className="d-flex justify-content-between mt-3">
                  {urlpageType != "rm" &&
                    urlpage != "signup" &&
                    urlpage != "forgotuser" &&
                    urlpage != "ForgotPassword" && (
                      <button
                        className="btn logbtn"
                        onClick={() => handleBtnClick("forgotuser")}
                      >
                        Forget User Id ?
                      </button>
                    )}
                  {urlpageType != "rm" &&
                    urlpage != "signup" &&
                    urlpage != "forgotuser" &&
                    urlpage != "ForgotPassword" && (
                      <button
                        className="btn logbtn"
                        onClick={() => handleBtnClick("ForgotPassword")}
                      >
                        Forgot Password ?
                      </button>
                    )}
                  {urlpage == "signup" && urlpage != "forgotuser" && (
                    <span>
                      Already have an account ? {""}
                      <button
                        className="btn logbtn"
                        onClick={() => handleBtnClick("login")}
                      >
                        Login
                      </button>
                    </span>
                  )}
                </div> */}

                {!isViewurlpage && (
                  <div className="buttonClassDiv">
                    <ButtonComp
                      wrapperName="submit_btn_wrapper"
                      type="submit"
                      btnStyle="box"
                      btnText={ButtonName}
                      disabled={!isValid}
                      onClick={() => handleSubmit()}
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-7 col-md-7 col-sm-12 col-12 d-flex justify-content-center mt-5 ">
          <div className="Illustration">
            <GetSvgIcon iconName={LoginLogo} color={"d"}></GetSvgIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

FormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
  handleBtnClick: PropTypes.func,
};
export default FormComponent;
