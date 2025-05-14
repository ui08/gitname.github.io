import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

function ClientOnboarding(props) {
  const mode = decryptData(useParams().mode);
  const id = decryptData(useParams().id);
  const sID = decryptData(useParams().sID);
  console.log("mode", mode, id, sID);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "add") {
      navigate(
        "/" +
          encrypt("PersonalFormComponent") +
          `/${encryptData("add")}` +
          `/${encryptData("0")}`
      );
    } else {
      switch (sID) {
        case "0":
          navigate(
            "/" +
              encrypt("PersonalFormComponent") +
              `/${encryptData("edit")}` +
              `/${encryptData(id)}`
          );
          break;
        case "1":
          navigate(
            "/" +
              encrypt("JointHoldingFormComponent") +
              `/${encryptData("add")}` +
              `/${encryptData(id)}`
          );
          break;
        case "2":
          navigate(
            "/" +
              encrypt("NomineeFormComponent") +
              `/${encryptData("add")}` +
              `/${encryptData(id)}`
          );
          break;
        case "3":
          navigate(
            "/" +
              encrypt("BankFormComponent") +
              `/${encryptData("add")}` +
              `/${encryptData(id)}`
          );
          break;
        case "4":
          navigate(
            "/" +
              encrypt("FATCAFormComponent") +
              `/${encryptData("add")}` +
              `/${encryptData(id)}`
          );
          break;
        case "5":
          navigate(
            "/" +
              encrypt("ViewComponentFormComponent") +
              `/${encryptData("add")}` +
              `/${encryptData(id)}`
          );
          break;
        default:
          break;
      }
    }
  }, []);

  return (
    <div>
      <Loader />
    </div>
  );
}

ClientOnboarding.propTypes = {};

export default ClientOnboarding;
