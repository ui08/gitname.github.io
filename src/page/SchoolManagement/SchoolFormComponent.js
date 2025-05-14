import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleDot,
  faHouse,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Pagehader from "../../Layout/Pagehader";
import { decryptData, encrypt, encryptData } from "../../util/CryptoJS";
import AddFormComponent from "./AddFormComponent";
import EditFormComponent from "./EditFormComponent";
import SchoolUpload from "./SchoolUpload";
import ViewFormComponent from "./ViewFormComponent";

import schools from "../../assets/img/back-to-school.png";
import school from "../../assets/img/school.png";

export default function SchoolFormComponent() {
  const modes = decryptData(useParams().mode);
  const [mode, setMode] = useState(modes);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const isAddMode = mode === "add";
  const isuploadMode = mode === "upload";
  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00001"),
      href: "/",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      label: t("Common:App_lms_Common_00004B"),
      href:
        "/" +
        encrypt("Schoollist") +
        `/${encryptData(isuploadMode ? "bulk" : "Individual")}`,
      icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      label: pagemode(),
      icon: <FontAwesomeIcon icon={faList} />,
    },
  ];

  const handlenavigate = (e) => {
    setMode(e);
  };
  return (
    <>
      <Pagehader
        pagename={pagemode()}
        Breadcrumbshow={true}
        breadcrumbItems={breadcrumbItems}
      ></Pagehader>

      <div className="pagebody">
        {ModeFunction(isAddMode, isuploadMode, mode, handlenavigate, t)}
        {pageFunction()}
      </div>
    </>
  );

  function pagemode() {
    let modeLabel;

    if (mode === "add") {
      modeLabel = t("Common:App_lms_Common_00001A");
    } else if (mode === "edit") {
      modeLabel = t("Common:App_lms_Common_00001B");
    } else if (mode === "view") {
      modeLabel = t("Common:App_lms_Common_00001C");
    } else if (mode === "upload") {
      modeLabel = t("Common:App_lms_Common_00229");
    } else {
      modeLabel = ""; // Default case
    }
    return t("Common:App_lms_Common_00005", {
        mode: modeLabel,
      label: t("Common:App_lms_Common_00001L")t("Common:App_lms_Common_00004B"),
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
    } else if (mode === "upload") {
      component = <SchoolUpload />;
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }

    return component;
  }
}

function ModeFunction(isAddMode, isuploadMode, mode, handlenavigate, t) {
  return isAddMode || isuploadMode ? (
    <div className="d-flex">
      <button
        onClick={() => handlenavigate("add")}
        className={mode === "add" ? "modebtn modebtnactive" : "modebtn"}
      >
        <div className="d-flex">
          <FontAwesomeIcon
            icon={mode === "add" ? faCircleDot : faCircle}
            size="2xl"
          />
          <img src={school} alt="school" />
        </div>
        <h3>
          {" "}
          {t("Common:App_lms_Common_00005A", {
            mode: t("Common:App_lms_Common_00001A"),
            page: t("Common:App_lms_Common_00245"),
            label: t("Common:App_lms_Common_00004B"),
          })}
        </h3>{" "}
      </button>
      <button
        onClick={() => handlenavigate("upload")}
        className={mode === "upload" ? "modebtn modebtnactive" : "modebtn"}
      >
        <div className="d-flex">
          <FontAwesomeIcon
            icon={mode === "upload" ? faCircleDot : faCircle}
            size="2xl"
          />
          <img src={schools} alt="schools" />
        </div>
        <h3>
          {t("Common:App_lms_Common_00005A", {
            mode: t("Common:App_lms_Common_00229"),
            page: t("Common:App_lms_Common_00246"),
            label: t("Common:App_lms_Common_00004B"),
          })}
        </h3>{" "}
      </button>
    </div>
  ) : null;
}
