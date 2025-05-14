import {
  faAddressCard,
  faAngleDown,
  faAngleUp,
  faArrowLeft,
  faArrowsRotate,
  faArrowUpFromBracket,
  faBackward,
  faBan,
  faBars,
  faCartShopping,
  faCircleArrowDown,
  faCircleArrowUp,
  faCircleXmark,
  faClockRotateLeft,
  faCloudArrowUp,
  faEye,
  faFileArrowUp,
  faFileExport,
  faFilterCircleXmark,
  faForward,
  faHandHoldingDollar,
  faHomeUser,
  faHouse,
  faIndianRupeeSign,
  faLockOpen,
  faPaperPlane,
  faPen,
  faPlus,
  faRectangleXmark,
  faRightToBracket,
  faSeedling,
  faTag,
  faToggleOff,
  faToggleOn,
  faTrashArrowUp,
  faTrashCan,
  faTriangleExclamation,
  faUserPlus,
  faUserTie,
  faWandMagicSparkles
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

export default function ButtonComp({
  wrapperName,
  type,
  onClick,
  disabled,
  btnText,
  btnStyle,
  btnIcon,
  btnActiveStyle
}) {
  const buttonContent = () => {
    let buttonIcon;
    let buttonIconColor;
    if (btnText == "Add New") {
      buttonIcon = faPlus;
      buttonIconColor = "ButtonIconColor_default";
    } else if (btnText == "Address") {
      buttonIcon = faHomeUser;
      buttonIconColor = "ButtonIconColor_default";
    } else if (btnText === "Login") {
      buttonIcon = faRightToBracket;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Logout") {
      buttonIcon = faArrowUpFromBracket;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "History") {
      buttonIcon = faClockRotateLeft;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Reset Filter") {
      buttonIcon = faFilterCircleXmark;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (
      btnText === "Bulk Upload" ||
      btnText === "Non Unitized Bulk Upload" ||
      btnText === "Unitized Bulk Upload"
    ) {
      buttonIcon = faCloudArrowUp;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Delete") {
      buttonIcon = faTrashCan;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Refresh") {
      buttonIcon = faArrowsRotate;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Download Template") {
      buttonIcon = faCircleArrowDown;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Upload File") {
      buttonIcon = faFileArrowUp;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "No") {
      buttonIcon = faBan;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Close") {
      buttonIcon = faCircleXmark;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Visit Homepage") {
      buttonIcon = faHouse;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Access Right Mapping") {
      buttonIcon = faLockOpen;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Edit") {
      buttonIcon = faPen;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Submit") {
      buttonIcon = faPaperPlane;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Cancel") {
      buttonIcon = faRectangleXmark;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Assign") {
      buttonIcon = faPlus;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Remove") {
      buttonIcon = faTrashArrowUp;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "RM Login") {
      buttonIcon = faUserTie;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Signup") {
      buttonIcon = faUserPlus;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "List") {
      buttonIcon = faBars;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Export") {
      buttonIcon = faFileExport;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "View") {
      buttonIcon = faEye;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Generate") {
      buttonIcon = faWandMagicSparkles;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Download") {
      buttonIcon = faCircleArrowDown;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Upload") {
      buttonIcon = faCircleArrowUp;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Buy") {
      buttonIcon = faCartShopping;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Sell") {
      buttonIcon = faTag;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "SIP") {
      buttonIcon = faSeedling;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "BUY") {
      buttonIcon = faCartShopping;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Download Instruments") {
      buttonIcon = faCircleArrowDown;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Update Intruments") {
      buttonIcon = faCircleArrowUp;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Download Template") {
      buttonIcon = faCircleArrowDown;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Invest Now") {
      buttonIcon = faIndianRupeeSign; 
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "RO Access Your Risk Profile") {
      buttonIcon = faTriangleExclamation;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Deactivate") {
      buttonIcon = faToggleOff;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Activate" || btnText === "Toggle") {
      buttonIcon = faToggleOn;
      buttonIconColor = "ButtonIconColor_danger";
    }
    // else if (btnText === "Toggle") {
    //   buttonIcon = faToggleOff;
    //   buttonIconColor = "ButtonIconColor_danger";
    // }
    else if (btnText === "Go Back") {
      buttonIcon = faArrowLeft;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Accordion Open") {
      buttonIcon = faAngleUp;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Accordion Close") {
      buttonIcon = faAngleDown;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Previous") {
      buttonIcon = faBackward;
      buttonIconColor = "ButtonIconColor_danger";
    } else if (btnText === "Next") {
      buttonIcon = faForward;
      buttonIconColor = "ButtonIconColor_danger"; 
    } else if (btnText === "Edit Risk Profile") {
      buttonIcon = faPen;
      buttonIconColor = "ButtonIconColor_danger"; 
    } else {
      buttonIcon = null; // Default case
      buttonIconColor = null; // Default case
    }
    return btnStyle === "round" ? (
      <div className="icon ">
        {buttonIcon != null && (
          // <span className={buttonIconColor}>
          <span>
            <FontAwesomeIcon icon={buttonIcon} />
          </span>
        )}
      </div>
    ) : btnStyle === "tableHeader" ? 
    (
      <div className={`${btnStyle}_style`}>
        {buttonIcon != null && (
          <span className={`${btnStyle}_icon`}>
            <span className={buttonIconColor}>
              <FontAwesomeIcon icon={buttonIcon} />
            </span>
          </span>
        )}
        {btnText && <span className={`${btnStyle}_btn_text`}>{btnText}</span>}
      </div>
    ) :
    (
      <div className={`${btnStyle}_style`}>
        {buttonIcon != null && (
          <span className={`${btnStyle}_icon`}>
            <span className={buttonIconColor}>
              <FontAwesomeIcon icon={buttonIcon} />
            </span>
          </span>
        )}
        {btnText && <span className={`${btnStyle}_btn_text`}>{btnText}</span>}
      </div>
    );
  };

  return (
    <div className={wrapperName}>
      <Tooltip disableFocusListener title={btnText} arrow>
        <button
          type={type}
          className={`${btnStyle}_btn ${btnStyle}_${btnActiveStyle} ${disabled ? "btn_disabled" : ""}`}
          onClick={disabled ? null : onClick}
        >
          {buttonContent()}
        </button>
      </Tooltip>
    </div>
  );
}

ButtonComp.propTypes = {
  wrapperName: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  btnText: PropTypes.string,
  btnStyle: PropTypes.string,
};

ButtonComp.defaultProps = {
  wrapperName: "btn_wrapper",
  type: "button",
  onClick: () => {},
  disabled: false,
  btnText: "Click Me",
  btnStyle: "box",
};
