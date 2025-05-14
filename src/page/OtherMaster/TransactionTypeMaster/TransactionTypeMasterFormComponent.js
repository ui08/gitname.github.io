import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../../../src/Layout/Pagehader";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { decryptData, encrypt } from "../../../util/Authenticate/CryptoJS";
import { userRole } from "../../../util/Authenticate/Rolename";
import AddFormComponent from "./AddFormComponent";
import EditFormComponent from "./EditFormComponent";
import ViewFormComponent from "./ViewFormComponent";

export default function TransactionTypeMasterFormComponent() {
  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const breadcrumbItems = [
    {
      label: "Transaction Type Master",
      patth: "/" + encrypt("TransactionTypeMasterList"),
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
        pagename={ pagemode()
        }
        Breadcrumbshow={true}
        breadcrumbItems={breadcrumbItems}
      ></Pagehader>
      <div className="pagebody">
        {pageFunction()}
      </div>
    </>
  );


  function pagemode() {
    let modeLabel;

    if (mode === "add") {
      modeLabel = "Add Transaction Type";
    } else if (mode === "edit") {
      modeLabel =  "Edit Transaction Type";
    } else if (mode === "view") {
      modeLabel =  "View Transaction Type";
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

  if (mode === "add" 
    && RouteCurrentAuthorities([
              userRole.Transaction_Master_Create,
            ])
          ) {
      component = <AddFormComponent />;
  } else if (mode === "edit" 
    && RouteCurrentAuthorities([
            userRole.Transaction_Master_Edit,
          ])
        ) {
      component = <EditFormComponent />;
  } else if (mode === "view"
     && RouteCurrentAuthorities([
            userRole.Transaction_Master_Details,
          ])
        ) {
      component = <ViewFormComponent />;
  }else {
      component = null; // or use an empty fragment <></> if you prefer
  }

  return component;
}
}
