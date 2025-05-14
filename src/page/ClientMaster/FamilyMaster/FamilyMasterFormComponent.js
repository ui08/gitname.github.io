import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../../Layout/Pagehader";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { decryptData } from "../../../util/Authenticate/CryptoJS";
import { userRole } from "../../../util/Authenticate/Rolename";
import { ClientMasterPageurl } from "../ClientMasterPageurl";
import AddFormComponent from "./AddFormComponent";
import EditFormComponent from "./EditFormComponent";
import ViewFormComponent from "./ViewFormComponent";

export default function FamilyMasterFormComponent() {
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
      modeLabel = ClientMasterPageurl.FamilyMasterAdd;
    } else if (mode === "edit") {
      modeLabel = ClientMasterPageurl.FamilyMasterEdit;
    } else if (mode === "view") {
      modeLabel = ClientMasterPageurl.FamilyMasterview;
    } else {
      modeLabel = ""; // Default case
    }
    return modeLabel;
  }

  function pageFunction() {
    let component;

    if (
      mode === "add" &&
      RouteCurrentAuthorities([userRole.Family_Master_Create])
    ) {
      component = <AddFormComponent />;
    } else if (
      mode === "edit" &&
      RouteCurrentAuthorities([userRole.Family_Master_Edit])
    ) {
      component = <EditFormComponent />;
    } else if (
      mode === "view" &&
      RouteCurrentAuthorities([userRole.Family_Master_Details])
    ) {
      component = <ViewFormComponent />;
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }

    return component;
  }
}
