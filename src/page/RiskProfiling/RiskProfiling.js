import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Pagehader from "../../Layout/Pagehader";
import { Apiurl } from "../../util/apiurl";
import { getUserFilterDetails } from "../../util/Authenticate";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import "../RiskProfiling/RiskProfiling.scss";
import RiskGauge from "./RiskGuage";

export default function RiskProfiling() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState(0); // Default risk level
  const [riskProfileName, setRiskProfileName] = useState();
  const [riskLastUpdateOn, setRiskLastUpdateOn] = useState();
  const Marketdata = [
    {
      label: "AUM",
      data: [50, 50],
      backgroundColor: ["#4A75CB", "#889BFF"],
      borderColor: ["#4A75CB", "#889BFF"],
      borderWidth: 1,
    },
  ];
  const MarketDatalabels = ["Equity", "Debt"];

  const modes = decryptData(useParams().mode);
  console.log("modes", modes);
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00259"),
    },
  ];

  useEffect(() => {
    fetchClientRiskProfile();
  }, []);

  const fetchClientRiskProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.getRiskProfile + "/" + `${getUserFilterDetails("clientId")}`}`
      );
      setLoading(false);
      setRiskLevel(response?.data?.riskprofile / 10);
      setRiskProfileName(response?.data?.riskProfileName);
      setRiskLastUpdateOn(response?.data?.lastUpdatedOn);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Pagehader
        Breadcrumbshow={true}
        breadcrumbItems={breadcrumbItems}
      ></Pagehader>
      <div className="pagebody">
        <div className="row chart-container">
          {riskLevel !== null && riskProfileName !== null ? (
            <div className="col-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 riskdiv p-5">
              <RiskGauge
                loading={loading}
                riskLevel={riskLevel}
                riskProfileName={riskProfileName}
                riskLastUpdateOn={riskLastUpdateOn}
              />
            </div>
          ) : (
            navigate(
              "/" +
                encrypt("RiskFormComponent") +
                `/${encryptData("add")}` +
                `/${"ss"}`
            )
            // <RiskProfileQnA />
          )}

          {/* Separator Column */}
          {/* <div className="col-1 separatorMainDiv">
            <div className="separator"></div>
          </div> */}

          {/* Pie Chart Column */}
          {/* <div className="col-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 pieChartMainDiv p-5">
            <h3 className="dashbordchartname">
              <strong>Recommended Asset Allocation</strong>
            </h3>
            <div className="pieChartDiv">
              <ApppieChart
                type={"DoughnutChart"}
                legendposition={"bottom"}
                legenddisplay={true}
                Chartdata={Marketdata}
                Chartlabels={MarketDatalabels}
                cutout={"70"}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
