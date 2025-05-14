import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import "./appToaster.scss";

export default function AppToasterbody({ type, messagecode, message }) {
  // Define color mappings
  const toastStyles = {
    Success: {
      background: "$app_w_color",
      checkBackground: "#27a844",
    },
    Info: {
      background: "$app_w_color",
      checkBackground: "#007aff",
    },
    Warning: {
      background: "$app_w_color",
      checkBackground: "#fec107",
    },
    Error: {
      background: "$app_w_color",
      checkBackground: "#dc3546",
    },
    Default: {
      background: "$app_w_color",
      checkBackground: "#008000",
    },
  };

  useEffect(() => {
    const { background, checkBackground } =
      toastStyles[type] || toastStyles.Default;

    document.documentElement.style.setProperty("--toastbackground", background);
    document.documentElement.style.setProperty("--checkbackground", checkBackground);
    document.documentElement.style.setProperty("--checktext", "$app_w_color");
    document.documentElement.style.setProperty("--text", "#666666");
    document.documentElement.style.setProperty("--text1", "#333");
  }, [type, messagecode, message]);

  return (
    <div role="alert">
      <div className="toast active">
        <div className="toast-content">
          <FontAwesomeIcon icon={faXmark} className="check" />
          <div className="message">
            <span className="text text-1">{type}</span>
            <span className="text text-2">
              {message} <strong>{messagecode}</strong>
            </span>
          </div>
        </div>
        <button className="close" onClick={() => toast.dismiss()}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="progress active" />
      </div>
    </div>
  );
}

// Adding prop types validation
AppToasterbody.propTypes = {
  type: PropTypes.oneOf(["Success", "Info", "Warning", "Error"]).isRequired,
  messagecode: PropTypes.string,
  message: PropTypes.string.isRequired,
};
