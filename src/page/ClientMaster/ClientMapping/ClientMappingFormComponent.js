import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../../Layout/Pagehader";
import { decryptData } from "../../../util/Authenticate/CryptoJS";
import { ClientMasterPageurl } from "../ClientMasterPageurl";
import AddFormComponent from "./AddFormComponent";
import EditFormComponent from "./EditFormComponent";
import ViewFormComponent from "./ViewFormComponent";

export default function ClientMappingFormComponent() {
  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  return (
    <>
      <Pagehader
        pagename={pagemode()}
        Breadcrumbshow={true}
        breadcrumbItems={pagemode()}
      ></Pagehader>
      <div className="pagebody">{pageFunction()}</div>
    </>
  );

  function pagemode() {
    let modeLabel;

    if (mode === "add") {
      modeLabel = ClientMasterPageurl.ClientMappingAdd;
    } else if (mode === "edit") {
      modeLabel = ClientMasterPageurl.ClientMappingEdit;
    } else if (mode === "view") {
      modeLabel = ClientMasterPageurl.ClientMappingview;
    } else {
      modeLabel = ""; // Default case
    }
    return modeLabel;
  }

  function pageFunction() {
    let component;

    if (
      mode === "add")
     {
      component = <AddFormComponent />;
    } else if (mode === "edit" && RouteCurrentAuthorities([
      userRole.Client_Master_RM_Client_Remapping_Edit ||
        userRole.Client_Master_RM_Client_Remapping_Delete ||
        userRole.Client_Master_RM_Client_Remapping_View,
    ] )) {
      component = <EditFormComponent />;
    } else if (mode === "view") {
      component = <ViewFormComponent />;
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }

    return component;
  }
}
