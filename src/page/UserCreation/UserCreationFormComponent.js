import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../../src/Layout/Pagehader";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../util/Authenticate/CryptoJS";
import AddFormComponent from "./AddFormComponent";
import EditFormComponent from "./EditFormComponent";
import "./UserCreationFormComponent.scss";
import ViewFormComponent from "./ViewFormComponent";
import DeactivateFormComponent from "./DeactivateFormComponent";
import ActivationFormComponent from "./ActivationFormComponent";

export default function UserCreationFormComponent() {
  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const breadcrumbItems = [
    {
      label: "User Creation",
      patth:
        "/" + encrypt("UserCreationListLanding") + `/${encryptData("List")}`,

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

  // function pagemode() {
  //   let modeLabel;

  //   if (mode === "add") {
  //     modeLabel = t("Common:App_lms_Common_00001K");
  //   } else if (mode === "edit") {
  //     modeLabel = t("Common:App_lms_Common_00001B");
  //   } else if (mode === "view") {
  //     modeLabel = t("Common:App_lms_Common_00001C");
  //   } else if (mode === "Activation") {
  //     modeLabel = t("Common:App_lms_Common_00001E");
  //   } else if (mode === "Deactivation") {
  //     modeLabel = t("Common:App_lms_Common_00001F");
  //   } else {
  //     modeLabel = ""; // Default case
  //   }
  //   return t("Common:App_lms_Common_00005", {
  //     mode: modeLabel,
  //     label: t("Common:App_lms_Common_00001L"),
  //   });
  // }
  function pagemode() {
    let modeLabel;

    if (mode === "add") {
      modeLabel = "Add New  User ";
    } else if (mode === "edit") {
      modeLabel = "Edit  User ";
    } else if (mode === "view") {
      modeLabel = "view  User ";
    } else if (mode === "Activation") {
      modeLabel = "  User  Activation";
    } else if (mode === "Deactivation") {
      modeLabel = "  User  Deactivation";
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
