import {
  faCloudArrowUp,
  faDownload,
  faMagnifyingGlass,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types"; // Import PropTypes
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { decryptData } from "../../util/Authenticate/CryptoJS";
import ButtonComp from "../ButtonComp/ButtonComp";
import "./InputFile.scss";
import { useParams } from "react-router-dom";

const FileUpload = (props) => {
  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const {
    title,
    fileId,
    FILE_MAX_SIZE,
    FILE_MIN_SIZE,
    FILEType,
    Id,
    downloadTemplate,
    onFileChangeNew,
    mandatory,
  } = props;

  const [file, setFile] = useState(null);
  const [fileName, setFilenamee] = useState(null);
  const [error, setError] = useState("");

  const MAX_SIZE = FILE_MAX_SIZE * 1024 * 1024; // 2MB
  const MIN_SIZE = FILE_MIN_SIZE * 1024; // 1KB

  const allowedFileTypes = {
    pdf: ["application/pdf"],
    excel: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    image: ["image/jpg", "image/jpeg", "image/png", "image/gif"],
    word: [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    text: ["text/plain"],
    zip: ["application/zip", "application/x-rar-compressed"],
  };

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setError("No file selected.");
      setFile(null);
      return;
    }
    setError("");
    setFile(null);

    if (selectedFile) {
      const fileType = selectedFile.type;
      let fileExtension = selectedFile.name.split(".").pop();
      let isAllowed = false;

      for (const type of FILEType) {
        if (allowedFileTypes[type]?.includes(fileType)) {
          isAllowed = true;
          break;
        }
      }

      if (!isAllowed) {
        setError(t("Common:App_lms_Common_00233", { type: fileExtension }));
        setFile(null);
        return;
      }
    }

    if (selectedFile.size > MAX_SIZE) {
      setError(
        `File size exceeds the maximum limit of ${MAX_SIZE / (1024 * 1024)}MB.`
      );
      setFile(null);
      return;
    }

    if (selectedFile.size < MIN_SIZE) {
      setError(
        `File size is less than the minimum limit of ${MIN_SIZE / 1024}KB.`
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="uplboxs ">
      <div className="d-block">
        <h6 className="mb-2">
          <strong>
            {title}{" "}
            <span className="errormark">{mandatory === "NO" ? " " : "*"}</span>
          </strong>
        </h6>
        <div className="d-block text-muted">
          <ul>
            <li className="px-1 upload_box_text">
              {t("Common:App_lms_Common_00226", {
                minsize: `${MIN_SIZE / 1024}KB`,
                maxsize: `${MAX_SIZE / (1024 * 1024)}MB`,
              })}
            </li>
            <li className="px-1 upload_box_text">
              {t("Common:App_lms_Common_00225", {
                Filetype: FILEType.join(", "), // Join file types for better display
              })}
            </li>
          </ul>
        </div>
      </div>
      <div className="upload_boxs ">
        <div className="upload_box_input">
          <div className="upload_box mb-5">
            <input type="file" id={props.Id} onChange={onFileChange} />
            <FontAwesomeIcon icon={faCloudArrowUp} beatFade size="xl" />

            <h2 className="imguploadImagetext mt-1 ">
              {t("Common:App_lms_Common_00227")}
            </h2>
            <h2 className="imguploadImagetext mt-1 ">
              {t("Common:App_lms_Common_00228")}
            </h2>
          </div>

          <label className="btn_wrapper" htmlFor={props.Id}>
            <span className={file === null ? `box_btn cstm` : `box_btn cstm`}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="find_icon" />
              {file
                ? `${t("Common:App_lms_Common_00230")} ${t(
                    "Common:App_lms_Common_00232"
                  )}`
                : `${t("Common:App_lms_Common_00231")} ${t(
                    "Common:App_lms_Common_00232"
                  )}`}
            </span>
          </label>
        </div>
        {file === null ? null : (
          <div>
            <div>
              <div>
                <div className="errcard">
                  <div>
                    <p className="preview_Min_text_span mb-1">{file.name}</p>
                  </div>
                  <div>
                    <ButtonComp
                      wrapperName={"btn_wrapper "}
                      type="button"
                      btnStyle="round"
                      btnText={"Delete"}
                      onClick={removeFile}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="errcard">
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}

        <div className="text-center my-2">
          <ButtonComp
            wrapperName={"download_temp_wrapper"}
            type="button"
            btnStyle="box"
            btnText={"Download Template"}
            // disabled={file === null ? true : false}
            onClick={() => downloadTemplate(mode)}
          />
          <ButtonComp
            wrapperName={"upload_btn_wrapper "}
            type="button"
            btnStyle="box"
            btnText={"Upload File"}
            disabled={file === null}
            onClick={() => onFileChangeNew(file)}
          />
        </div>
      </div>
    </div>
  );
};

// Define prop types
FileUpload.propTypes = {
  title: PropTypes.string.isRequired,
  FILE_MAX_SIZE: PropTypes.number.isRequired,
  FILE_MIN_SIZE: PropTypes.number.isRequired,
  FILEType: PropTypes.any,
  downloadTemplate: PropTypes.func,
  onFileChangeNew: PropTypes.func.isRequired,
  mandatory: PropTypes.oneOf(["YES", "NO"]).isRequired,
};

export default FileUpload;
