import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../Layout/Pagehader";
import { decryptData } from "../../util/Authenticate/CryptoJS";
import CapitalGainReport from "./CapitalGainReport";
import Client360DegreeWealth from "./Client360DegreeWealth";
import ClientHoldingReport from "./ClientHoldingReport";
import "./ClientHoldingReport.scss";
import ClientSummaryReports from "./ClientSummaryReports";
import ClientTransactionReport from "./ClientTransactionReport";
import ClientXIRRReports from "./ClientXIRRReports";

export default function ClientReportsComponent() {
  const modes = decryptData(useParams().mode);
  // console.log("modes", modes);
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00256"),

      // icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      label: pagemode(),
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];

  return (
    <>
      <Pagehader
        pagename={pagemode()}
        Breadcrumbshow={true}
        breadcrumbItems={breadcrumbItems}
      ></Pagehader>

      <div className="pagebody ClientHoldingReportpagebody">
        {pageFunction()}
      </div>
    </>
  );

  function pagemode() {
    let modeLabel;

    if (modes === "ClientHoldingReport") {
      modeLabel = t("Common:App_lms_Common_00255");
    } else if (modes === "CapitalGainReport") {
      modeLabel = t("Common:App_lms_Common_00257");
    } else if (modes === "ClientTransactionReport") {
      modeLabel = t("Common:App_lms_Common_00258");
    } else if (modes === "ClientXIRRReports") {
      modeLabel = "XIRR Report";
    } else if (modes === "ClientSummaryReports") {
      modeLabel = "Summary Report";
    } else if (modes === "Client360DegreeWealth") {
      modeLabel = " 360 Degree Wealth";
    } else {
      modeLabel = ""; // Default case
    }
    return modeLabel;
    //  t("Common:App_lms_Common_00255", {
    //   // mode: t("Common:App_lms_Common_00229"),
    //   label: modeLabel,
    // });
  }

  function pageFunction() {
    let component;
    if (modes === "ClientHoldingReport") {
      // <ClientHoldingReport></ClientHoldingReport>
      component = <ClientHoldingReport />;
    } else if (modes === "CapitalGainReport") {
      component = <CapitalGainReport />;
    } else if (modes === "ClientTransactionReport") {
      component = <ClientTransactionReport />;
    } else if (modes === "ClientSummaryReports") {
      component = <ClientSummaryReports />;
    } else if (modes === "ClientXIRRReports") {
      component = <ClientXIRRReports />;
    } else if (modes === "Client360DegreeWealth") {
      component = <Client360DegreeWealth />;
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }

    return component;
  }
}
//
