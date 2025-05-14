import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../Layout/Pagehader";
import { decryptData } from "../../util/Authenticate/CryptoJS";

import CLIENTBULK from "./CLIENTBULK";
import Holding from "./Holding";
import HoldingUnderlying from "./HoldingUnderlying";
import InstrumentSectorMapping from "./InstrumentSectorMapping";
import Issuers from "./Issuers";
import SectorClassification from "./SectorClassification";
import Transaction from "./Transaction";
import Instrument from "./Instrument";
import RouteCurrentAuthorities from "../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../util/Authenticate/Rolename";

export default function UploadsComponent() {
  const modes = decryptData(useParams().mode);
  // console.log(modes);
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00229"),

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

      <div className="pagebody ">{pageFunction()}</div>
    </>
  );

  function pagemode() {
    let modeLabel;

    if (modes === "Holding") {
      modeLabel = t("Common:App_lms_Common_00249");
    } else if (modes === "HoldingUnderlying") {
      modeLabel = t("Common:App_lms_Common_00250");
    } else if (modes === "SectorClassification") {
      modeLabel = t("Common:App_lms_Common_00251");
    } else if (modes === "Transaction") {
      modeLabel = t("Common:App_lms_Common_00252");
    } else if (modes === "Issuers") {
      modeLabel = t("Common:App_lms_Common_00253");
    } else if (modes === "InstrumentSectorMapping") {
      modeLabel = t("Common:App_lms_Common_00254");
    } else if (modes === "CLIENT_MASTER_BULK_UPLOAD") {
      modeLabel = t("Common:App_lms_Common_00266");
    } else if (modes === "Instrument") {
      modeLabel = t("Common:App_lms_Common_00267");
    } else {
      modeLabel = ""; // Default case
    }
    return t("Common:App_lms_Common_00005", {
      mode: t("Common:App_lms_Common_00229"),
      label: modeLabel,
    });
  }

  function pageFunction() {
    let component;
    if (modes === "Transaction" && RouteCurrentAuthorities([
                      userRole.RM_Transaction_Upload,
                    ])
            ) {
      component = <Transaction />;
    } else if (modes === "CLIENT_MASTER_BULK_UPLOAD" && RouteCurrentAuthorities([
                      userRole.RM_Client_Onboarding_Upload,
                    ])
            ) {
      component = <CLIENTBULK />;
    }  else if (modes === "Instrument" && RouteCurrentAuthorities([
                      userRole.RM_Instrument_Upload,
                    ])
            ) {
      component = <Instrument />;
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }

    return component;
  }
}
