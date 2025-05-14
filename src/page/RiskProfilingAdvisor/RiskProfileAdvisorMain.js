import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Pagehader from "../../Layout/Pagehader";
import { Apiurl } from "../../util/apiurl";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import "./RiskProfileAdvisor.scss";
import RiskProfileTableAdvisor from "./RiskProfileTableAdvisor";
import Loader from "../../util/Loader";
import RiskProfileQuestionnaireCard from "./RiskProfileQuestionnaireCard";
import toast from "react-hot-toast";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import { getUserFilterDetails } from "../../util/Authenticate";

export default function RiskProfileAdvisorMain() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [riskProfiles, setRiskProfiles] = useState([]);
  const [riskProfileQuestion, setriskProfileQuestion] = useState([]);

  const modes = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00259"),
    },
  ];

  useEffect(() => {
    getRiskProfileNameList();
    rmGetAllQuestionWithResponse();
  }, []);

  const getRiskProfileNameList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.rmGetRiskProfileNameList);
      const list = response?.data || [];
      const formattedList = list.map((item, index) => ({
        id: index + 1,
        color: getColorByIndex(index),
        label: item.name,
        min: item.minScore,
        max: item.maxScore,
        editId: item.id,
      }));
      setRiskProfiles(formattedList);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const rmGetAllQuestionWithResponse = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.rmGetAllQuestionWithResponse
      );
      setriskProfileQuestion(response?.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getColorByIndex = (index) => {
    const colors = ["#006400", "#8BC34A", "#FFEB3B", "#FF9800", "#D32F2F"];
    return colors[index] || "#ccc";
  };

  const handleSaveTableData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        Apiurl.rmcreateRiskprofileName,
        payload
      );
      toast.success("Profile Updated successfully");
      // setTimeout(() => {
      //   navigate("/" + encrypt("UnitStatusViewlist"));
      // }, 200);
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestionList = () => {
    navigate(
      "/" +
        encrypt("RiskProfileAdvisorFormComponent") +
        `/${encryptData("add")}` +
        `/${"ss"}`
    );
  };

  const handleEditQuestionList = () => {
    navigate(
      "/" +
        encrypt("RiskProfileAdvisorFormComponent") +
        `/${encryptData("edit")}` + "/" +
        getUserFilterDetails("rmAdvId")
    );
  };

  return (
    <>
      <Pagehader Breadcrumbshow={true} breadcrumbItems={breadcrumbItems} />
      {!loading ? (
        <div className="pagebody">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Risk Profile Master</h5>
            <div className="d-flex gap-3">
              <ButtonComp
                wrapperName="submit_btn_wrapper"
                type="button"
                btnStyle="box"
                btnText={"Add Details"}
                onClick={handleAddQuestionList}
              />
              <ButtonComp
                wrapperName="submit_btn_wrapper"
                type="button"
                btnStyle="box"
                btnText={"Edit Details"}
                onClick={handleEditQuestionList}
              />
            </div>
          </div>
          <div className="rpc-container p-2">
            <div style={{ width: "90%", padding: "1rem" }}>
              <RiskProfileTableAdvisor
                data={riskProfiles}
                onSave={(payload) => handleSaveTableData(payload)}
                onCancel={() => console.log("Reset triggered")}
                edit={riskProfiles.map((item) => item.editId)}
              />
            </div>
          </div>
          <div className="row p-3">
            <RiskProfileQuestionnaireCard questions={riskProfileQuestion} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
