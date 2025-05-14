import React from "react";
import { useParams } from "react-router-dom";
import Pagehader from "../../../../src/Layout/Pagehader";
import { decryptData } from "../../../util/Authenticate/CryptoJS";
import { InstrumentMasterPageurl } from "../InstrumentMasterPageurl";
import AddFormComponent from "./AddFormComponent";
import EditFormComponent from "./EditFormComponent";
import ViewFormComponent from "./ViewFormComponent";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../../util/Authenticate/Rolename";

export default function OtherProductFormComponent() {
  const mode = decryptData(useParams().mode);
  console.log("pagemode()", pagemode());
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
      modeLabel = InstrumentMasterPageurl.OtherProductsAdd;
    } else if (mode === "edit") {
      modeLabel = InstrumentMasterPageurl.OtherProductsEdit;
    } else if (mode === "view") {
      modeLabel = InstrumentMasterPageurl.OtherProductsview;
    } else {
      modeLabel = ""; // Default case
    }
    return modeLabel;
  }

  function pageFunction() {
    let component;

    if (mode === "add" && 
          RouteCurrentAuthorities([userRole.Instrument_Master_Other_Products_Create])) {
      component = <AddFormComponent />;
    } else if (mode === "edit" && 
      RouteCurrentAuthorities([userRole.Instrument_Master_Other_Products_Edit])) {
      component = <EditFormComponent />;
    } else if (mode === "view" && 
      RouteCurrentAuthorities([userRole.Instrument_Master_Other_Products_Details])) {
      component = <ViewFormComponent />;
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }

    return component;
  }
}
