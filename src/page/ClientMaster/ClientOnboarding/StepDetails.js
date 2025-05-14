import {
  faBuildingColumns,
  faCheck,
  faFileInvoice,
  faFileLines,
  faNewspaper,
  faPen,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import "./stepDetails.scss";

// Step configuration
const steps = [
  { name: "PersonalFormComponent", label: "Personal Details", icon: faUser },
  {
    name: "JointHoldingFormComponent",
    label: "Joint Holding Details",
    icon: faUsers,
  },
  { name: "NomineeFormComponent", label: "Nominee Details", icon: faNewspaper },
  { name: "BankFormComponent", label: "Bank Details", icon: faBuildingColumns },
  { name: "FATCAFormComponent", label: "FATCA Details", icon: faFileInvoice },
  {
    name: "ViewComponentFormComponent",
    label: "Preview Details",
    icon: faFileLines,
  },
];

export default function StepDetails({
  OnboardingStepDetailsid,
  laststepDetails,
}) {
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState("");
  // Ensure only first step is active if ID is 0
  const effectiveLastStep = OnboardingStepDetailsid == 0 ? 0 : laststepDetails;
  useEffect(() => {
    fetchUrl();
  }, []);

  const fetchUrl = () => {
    let urlElements = window.location.href.split("/");
    let urlElelement = urlElements[3];
    let urlElelement2 = urlElements[4];
    let urlElelement1 = urlElements[2];
    setCurrentUrl(`${urlElelement}`);
  };
  // Handle step navigation
  const handleStepperClick = (stepIndex) => {
    if (effectiveLastStep == 0) {
      const componentName = steps[stepIndex].name;
      navigate(
        `/${encrypt(componentName)}/${encryptData("add")}/${encryptData(
          OnboardingStepDetailsid
        )}`
      );
    }
    if (stepIndex <= effectiveLastStep && effectiveLastStep !== 0) {
      console.log(stepIndex, laststepDetails);
      const componentName = steps[stepIndex].name;
      if (stepIndex === laststepDetails) {
        navigate(
          `/${encrypt(componentName)}/${encryptData("add")}/${encryptData(
            OnboardingStepDetailsid
          )}`
        );
      } else {
        navigate(
          `/${encrypt(componentName)}/${encryptData("edit")}/${encryptData(
            OnboardingStepDetailsid
          )}`
        );
      }
    }
  };

  // Determine step classes
  const getStepClass = (index) => {
    const componentName = steps[index].name;
    if (index < effectiveLastStep) {
      if (index < effectiveLastStep && componentName === currentUrl) {
        return "step stepperedit";
      } else if (index < effectiveLastStep) {
        return "step stepperInProgress";
      } else {
        return "step ";
      }
    }
    if (index === effectiveLastStep) return "step stepperactive";

    return "step";
  };

  // Determine which icon to show
  const getStepIcon = (index) => {
    if (index < effectiveLastStep) return <FontAwesomeIcon icon={faCheck} />;
    if (index === effectiveLastStep) return <FontAwesomeIcon icon={faPen} />;
    return null;
  };

  return (
    <div>
      <ul className="stepper">
        {steps.map((step, index) => (
          <li key={step.name} className={getStepClass(index)}>
            <button
              className="dot btn"
              onClick={() => handleStepperClick(index)}
              disabled={index > effectiveLastStep}
            >
              <FontAwesomeIcon icon={step.icon} />
            </button>
            <span className="smalldot">{getStepIcon(index)}</span>
            <span className="lower-text">{step.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
