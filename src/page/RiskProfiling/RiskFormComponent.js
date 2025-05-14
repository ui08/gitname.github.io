import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../../src/Layout/Pagehader";
import { decryptData, encrypt } from "../../util/Authenticate/CryptoJS";
// import AddFormComponent from "./AddFormComponent";
// import EditFormComponent from "./EditFormComponent";
// import ViewFormComponent from "./ViewFormComponent";
import RiskProfileQnA from "./RiskProfileQnA";

export default function RiskFormComponent() {
  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const breadcrumbItems = [
    {
      label: "Risk Profiling",
    //   patth: "/" + encrypt("TransactionTypeMasterList"),
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
      modeLabel = `${"Risk Profile Questionnaire"}`;
    } else if (mode === "edit") {
      modeLabel =  "Edit Risk Profile";
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
    // && RouteCurrentAuthorities([
    //           userRole.Other_Master_TransactionType_Add,
    //         ])
          ) {
      component = <RiskProfileQnA />;
  } else if (mode === "edit" 
    // && RouteCurrentAuthorities([
    //         userRole.Other_Master_TransactionType_Edit,
    //       ])
        ) {
      component = <RiskProfileQnA />;
  }else {
      component = null; // or use an empty fragment <></> if you prefer
  }

  return component;
}
}
