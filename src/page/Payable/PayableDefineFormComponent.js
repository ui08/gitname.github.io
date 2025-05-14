import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../../src/Layout/Pagehader";
import RouteCurrentAuthorities from "./../../util/Authenticate/AuthorizedFunction";
import { decryptData, encrypt } from "./../../util/Authenticate/CryptoJS";
import { userRole } from "./../../util/Authenticate/Rolename";
import AddFormComponent from "./AddFormComponent";
import { PayablePageurl } from "./PayablePageurl";

export default function PayableDefineFormComponent() {
  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const breadcrumbItems = [
    {
      label: "Other Product",
      href: "/" + encrypt("VMOtherProductList"),
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
        breadcrumbItems={pagemode()}
      ></Pagehader>
      <div className="pagebody">{pageFunction()}</div>
    </>
  );

  function pagemode() {
    let modeLabel;

    if (mode === "add") {
      modeLabel = PayablePageurl.PayableAdd;
    } 
    return modeLabel;
  }

  function pageFunction() {
    let component;

     if (mode === "add" ) {
          component = <AddFormComponent />;
        }  else {
          component = null; // or use an empty fragment <></> if you prefer
        }

    return component;
  }
}
