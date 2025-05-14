import React, { useState } from "react";
import GaugeChart from "react-gauge-chart";
import "../RiskProfiling/RiskGuage.scss"; // import CSS file
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";
import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";
import { useEffect } from "react";
import {
  getMomentFromDate,
  getUserFilterDetails,
  getUserId,
} from "../../util/Authenticate";
import axiosInstance from "../../util/axiosInstance";
import { Apiurl } from "../../util/apiurl";
import Loader from "../../util/Loader";
import { t } from "i18next";

const RiskGauge = ({
  loading,
  riskLevel,
  riskProfileName,
  riskLastUpdateOn,
}) => {
  const navigate = useNavigate();

  // Define your risk levels and corresponding colors
  const riskLevels = [
    { name: "Very Conservative", color: "#006400", range: "0-20%" },
    { name: "Conservative", color: "#8BC34A", range: "20-40%" },
    { name: "Moderate", color: "#FFEB3B", range: "40-60%" },
    { name: "Aggressive", color: "#FF9800", range: "60-80%" },
    { name: "Very Aggressive", color: "#D32F2F", range: "80-100%" },
  ];

  const getRiskProfileColor = () => {
    const matchedLevel = riskLevels.find(
      (level) => level?.name === riskProfileName
    );
    return matchedLevel ? matchedLevel.color : "#000"; // default to black if not found
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <div className="risk-gauge-container">
          {/* <h4>
            <b style={{ color: getRiskProfileColor() }}>{riskProfileName}</b>
          </h4> */}
          {/* Gauge Chart */}
          <GaugeChart
            id="risk-gauge"
            nrOfLevels={5}
            arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
            colors={riskLevels.map((level) => level.color)}
            percent={riskLevel}
            arcPadding={0.02}
            textColor={"#000"}
            needleColor={"#000"}
            needleBaseColor={"#000"}
          />

          <div className="risk-profile-text">
            <p>
              Based on the information you have provided, your risk profile has
              been evaluated as{" "}
              <b style={{ color: getRiskProfileColor(), fontStyle: "italic" }}>
                {riskProfileName}
              </b>{" "}
              and last updated on{" "}
              <span style={{ fontStyle: "italic" }}>
                {getMomentFromDate(riskLastUpdateOn, "DD-MM-YYYY")}
              </span>
            </p>
          </div>

          <div className="risk-legend mt-2">
            <div className="legend-items">
              {riskLevels.map((level, index) => (
                <div key={index} className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: level.color }}
                  ></span>
                  <span className="legend-text">
                    {level.name}
                    {/* ({level.range}) */}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="buttonDiv mt-4">
            <div className="me-4">
              <ButtonComp
                wrapperName="btn_wrapper"
                type="button"
                btnStyle="box"
                btnText={"Invest Now"}
                onClick={() => alert("Investment is an upcoming feature")}
              />
            </div>
            <div className="">
              <ButtonComp
                wrapperName="btn_wrapper"
                type="button"
                btnStyle="box"
                btnText={"Edit Risk Profile"}
                onClick={() =>
                  navigate(
                    "/" +
                      encrypt("RiskFormComponent") +
                      `/${encryptData("edit")}` +
                      `/${getUserFilterDetails("clientId")}`
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RiskGauge;
