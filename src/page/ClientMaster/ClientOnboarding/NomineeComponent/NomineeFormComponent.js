import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Pageheader from "../../../../Layout/Pagehader";

import { Apiurl } from "../../../../util/apiurl";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../../util/axiosInstance";
import StepDetails from "../StepDetails";
import AddFormComponent from "./AddFormComponent";
import EditFormComponent from "./EditFormComponent";
import ViewFormComponent from "./ViewFormComponent";

export default function NomineeFormComponent() {
  const mode = decryptData(useParams().mode);
  const id = decryptData(useParams().id);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
   const [stepValues, setStepValues] = useState([]);
    const [OnboardingstepDetails, SetOnboardingStepDetails] = useState([]);
    const [Onboardingstepid, SetOnboardingStepid] = useState();
    const [laststepid, SetLaststepid] = useState();
    const [loadingstep, setLoadingstep] = useState(false);
  
    const breadcrumbItems = [
      {
        label: "Client Onboarding",
        patth:
          "/" + encrypt("ClientMasterProductLanding") + `/${encryptData("List")}`,
  
        // icon: <FontAwesomeIcon icon={faList} />,
      },
      {
        label: pagemode(),
        // icon: <FontAwesomeIcon icon={faList} />,
      },
    ];
    useEffect(() => {
      if (id == 0 && mode === "add") {
        SetOnboardingStepid(0);
        SetLaststepid(1);
        setLoadingstep(true);
      } else {
        setLoadingstep(false);
        fetchgetOnboardingStepDetails();
      }
    }, []);
  
    const fetchgetOnboardingStepDetails = async () => {
      try {
        const response = await axiosInstance.get(
          Apiurl.getOnboardingStepDetails + id
        );
        SetLaststepid(response.data.lastStepId);
        SetOnboardingStepDetails(response.data);
        SetOnboardingStepid(response.data.id);
        setLoadingstep(true);
      } catch (error) {
        console.error("Error during POST request:", error.message);
      } finally {
      }
    };
  

 

  return (
    <>
      <Pageheader
        pagename={pagemode()}
        Breadcrumbshow={true}
        breadcrumbItems={breadcrumbItems}
      ></Pageheader>
       <div className="pagebody">{loadingstep && pageFunction()}</div>
      
    </>
  );

  function pagemode() {
    let modeLabel;

    if (mode === "add") {
      modeLabel = "Add New Nominee Details  ";
    } else if (mode === "edit") {
      modeLabel = "Edit  Nominee Details ";
    } else if (mode === "view") {
      modeLabel = "View  Nominee Details ";
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
      // if(OnboardingstepDetails.length > 0) {
  
      if (mode === "add") {
        component = (
          <>
            <StepDetails
              OnboardingStepDetailsid={id}
              laststepDetails={laststepid}
            ></StepDetails>{" "}
            <AddFormComponent Details={OnboardingstepDetails}/>
          </>
        );
      } else if (mode === "edit") {
        component = (
          <>
            <StepDetails
              OnboardingStepDetailsid={id}
              laststepDetails={laststepid}
            ></StepDetails>{" "}
            <EditFormComponent Details={OnboardingstepDetails} />
          </>
        );
      } else if (mode === "view") {
        component = (
          <>
            <StepDetails
              OnboardingStepDetailsid={id}
              laststepDetails={laststepid}
            ></StepDetails>{" "}
            <ViewFormComponent Details={OnboardingstepDetails} />
          </>
        );
      } else {
        component = null; // or use an empty fragment <></> if you prefer
      }
      // }
  
      return component;
    }
}
