import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../Layout/Pagehader";
import { decryptData } from "../../util/Authenticate/CryptoJS";
import FundCompare from "./FundCompare";
import FundOverlap from "./FundOverlap";
import SectorHolding from "./SectorHolding";
import SecurityHolding from "./SecurityHolding";
import StocksOverlapping from "./StocksOverlapping";
import RouteCurrentAuthorities from "../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../util/Authenticate/Rolename";

export default function FundAnalyticsComponent() {
  const modes = decryptData(useParams().mode);
  // console.log("modes", modes);
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00260"),
    },
    {
      label: pagemode(),
    },
  ];

  return (
    <>
      <Pagehader
        pagename={pagemode()}
        Breadcrumbshow={true}
        breadcrumbItems={breadcrumbItems}
      ></Pagehader>

      <div className="pagebody ">{pageFunction()}</div>
    </>
  );

  function pagemode() {
    let modeLabel;

    if (modes === "FundCompare" && RouteCurrentAuthorities([
                      userRole.Fund_Analytics_Fund_Compare,
                    ])) {
      modeLabel = t("Common:App_lms_Common_00261");
    } else if (modes === "FundOverlap" && RouteCurrentAuthorities([
                      userRole.Fund_Analytics_Fund_Overlap,
                    ])) {
      modeLabel = t("Common:App_lms_Common_00262");
    } else if (modes === "StocksOverlapping" && RouteCurrentAuthorities([
                      userRole.Fund_Analytics_Stcoks_Overlapping,
                    ])) {
      modeLabel = t("Common:App_lms_Common_00263");
    } else if (modes === "SecurityHolding" && RouteCurrentAuthorities([
                      userRole.Fund_Analytics_Security_Holding,
                    ])) {
      modeLabel = t("Common:App_lms_Common_00264");
    } else if (modes === "SectorHolding" && RouteCurrentAuthorities([
                      userRole.Fund_Analytics_Sector_Holding,
                    ])) {
      modeLabel = t("Common:App_lms_Common_00265");
    } else {
      modeLabel = ""; // Default case
    }
    return modeLabel;
  }

  function pageFunction() {
    let component;
    if (modes === "FundCompare") {
      component = <FundCompare />;
    } else if (modes === "FundOverlap") {
      component = <FundOverlap />;
    } else if (modes === "StocksOverlapping") {
      component = <StocksOverlapping />;
    } else if (modes === "SecurityHolding") {
      component = <SecurityHolding />;
    } else if (modes === "SectorHolding") {
      component = <SectorHolding />;
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }

    return component;
  }
}
