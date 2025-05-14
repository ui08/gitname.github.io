import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../../Layout/Pagehader";
import { decryptData, encrypt } from './../../../util/Authenticate/CryptoJS';
import AddFormComponent from "./AddFormComponent";
import EditFormComponent from "./EditFormComponent";
import ViewFormComponent from "./ViewFormComponent";

export default function IncentiveRateUploadFormComponent() {
  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const breadcrumbItems = [
    {
      label: "Incentive ",
      href: "/" + encrypt("IncentiveRateUploadLanding"),
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
      <div className="pagebody">{pageFunction()}</div>
    </>
  );

  function pagemode() {
    let modeLabel;

    if (mode === "add") {
      modeLabel = "Rate " + t("Common:App_lms_Common_00001K");
    } else if (mode === "edit") {
      modeLabel = t("Common:App_lms_Common_00001B");
    } else if (mode === "view") {
      modeLabel = t("Common:App_lms_Common_00001C");
    } else {
      modeLabel = ""; // Default case
    }
    return t("Common:App_lms_Common_00005", {
      mode: modeLabel,
      label: t("Common:App_lms_Common_00001L"),
    });
  }

  function pageFunction() {
    let component;

    if (mode === "add") {
      component = <AddFormComponent />;
    } else if (mode === "edit") {
      component = <EditFormComponent />;
    } else if (mode === "view") {
      component = <ViewFormComponent />;
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }

    return component;
  }
}
