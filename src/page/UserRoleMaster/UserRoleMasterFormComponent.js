import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../../src/Layout/Pagehader";
import { decryptData, encrypt } from "../../util/Authenticate/CryptoJS";
import ActivationFormComponent from "./ActivationFormComponent";
import AddFormComponent from "./AddFormComponent";
import DeactivateFormComponent from "./DeactivateFormComponent";
import EditFormComponent from "./EditFormComponent";
import "./UserRoleMasterFormComponent.scss";
import ViewFormComponent from "./ViewFormComponent";

export default function UserRoleMasterFormComponent() {
  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const breadcrumbItems = [
    {
      label: "User Role Master",
      patth: "/" + encrypt("UserRoleMasterList"),
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
      modeLabel = "Add New  Role";
    } else if (mode === "edit") {
      modeLabel = "Edit  Role";
    } else if (mode === "view") {
      modeLabel = "view  Role";
    } else if (mode === "Activation") {
      modeLabel = "  Role Activation";
    } else if (mode === "Deactivation") {
      modeLabel = "  Role Deactivation";
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
    } else if (mode === "Deactivation") {
      component = <DeactivateFormComponent />;
    } else if (mode === "Activation") {
      component = <ActivationFormComponent />;
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }

    return component;
  }
}
