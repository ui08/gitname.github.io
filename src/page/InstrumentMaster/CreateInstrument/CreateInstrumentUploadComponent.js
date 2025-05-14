import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";
import AppToaster from "../../../util/Toaster/AppToaster";
import FormComponent from "./UploadFormComponent";

function CreateInstrumentUploadComponent({
  modalType,
  uploadButtonName,
  handleClose,
}) {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [loading, setLoading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (modalType === "downloadFile" || modalType === "downloadInstrument") {
      downloadFunctionCall();
    }
    if (modalType === "instrument" || modalType === "uploadFile") {
      setUploadUrl(getUploadUrl(modalType));
    }
  }, [modalType]);

  const getDownloadUrl = (modalType) => {
    switch (modalType) {
      case "downloadFile":
      case "uploadFile":
        return "/user/api/v1/usertype/downloadFile";
      case "downloadInstrument":
      case "instrument":
        return "/user/api/v1/usertype/downloadInstrument";
      default:
        return "";
    }
  };

  const getUploadUrl = (modalType) => {
    switch (modalType) {
      case "instrument":
        return "/user/api/v1/usertype/instrument";
      case "uploadFile":
        return "/user/api/v1/usertype/file";
      default:
        return "";
    }
  };

  const downloadFunctionCall = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(getDownloadUrl(modalType), {
        responseType: "blob",
      });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "uploadEnum.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(response.data.message);
      <AppToaster duration={50000} Toastericon={"👏"} />;
    } catch (error) {
      console.error("Download error: ", error);
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = (data) => {
    // Handle form submission logic here
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    uploadFile(formData, uploadUrl);
    navigate(
      "/" + encrypt("CreateInstrumentLanding") + `/${encryptData("History")}`
    );
    handleClose()
  };

  const uploadFile = async (payload, url) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(url, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);
      <AppToaster duration={50000} Toastericon={"👏"} />;
    } catch (error) {
      toast.error(t("error"));
      console.error("Upload error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          {modalType === "downloadFile" ||
          modalType === "downloadInstrument" ? (
            <Loader pagename={t("Common:App_lms_Common_00269")} />
          ) : (
            <div className="col-12">
              <FormComponent
                onSubmit={handleAddSubmit}
                onFileChangeNew={handleFileUpload}
                downloadTemplate={downloadFunctionCall}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CreateInstrumentUploadComponent;
