import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import AppModal from "../../../Component/Modal/AppModal";
import FileUploadwithTable from "../../../Component/UploadComponent/FileUploadwithTable";
import Pagehader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import { getUserId } from "../../../util/Authenticate";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import { userRole } from "../../../util/Authenticate/Rolename";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";
import { uploadEnum } from "../../Uploads/data";
import { UploadTemplateFunction } from "../../Uploads/UploasAction";
import { ClientMasterPageurl } from "../ClientMasterPageurl";
import ClientMasterProductHistory from "./ClientMasterHistory";
import ClientMasterList from "./ClientMasterList";

export default function ClientMasterProductLanding() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);
  const pageName = decryptData(useParams().pageName);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleHistoryClick = () => {
    if (pageName === "List") {
      navigate(
        "/" +
          encrypt("ClientMasterProductLanding") +
          `/${encryptData("History")}`
      );
    }
    if (pageName === "History") {
      navigate(
        "/" + encrypt("ClientMasterProductLanding") + `/${encryptData("List")}`
      );
    }
  };

  const handleDownloadFile = async (value) => {
    setLoading(true);
    setUploadModalOpen((prevValue) => !prevValue);
    try {
      const response = await axiosInstance.get(`${Apiurl.CientMasterUpload}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${uploadEnum.CLIENT_MASTER_BULK_UPLOAD}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      toast.success(response.data);
      setUploadModalOpen((prevValue) => !prevValue);
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    setUploadModalOpen((prevValue) => !prevValue);
  };

  const handleAddNew = () => {
    navigate(
      "/" +
        encrypt("ClientOnboarding") +
        `/${encryptData("add")}` +
        `/${encryptData("0")}` +
        `/${encryptData(0)}`
    );
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    setUploadModalOpen((prevValue) => !prevValue);
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert(
        "File size exceeds the maximum limit of 10MB. Please upload a smaller file."
      );
      return;
    }

    let fileUploadDTO = JSON.stringify({
      filename: "Other Product",
      userId: getUserId(),
      fileUploadType: uploadEnum.CLIENT_MASTER_BULK_UPLOAD,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    const success = await UploadTemplateFunction(data);

    if (success) {
      setLoading(false);
      navigate(
        "/" +
          encrypt("ClientMasterProductLanding") +
          `/${encryptData("History")}`
      );
    } else {
      setLoading(false);
    }
  };

  const FileUploadwithTableItems = {
    downloadTemplateApi: Apiurl.CientMasterUpload,
    downloadTemplateFileName: "Client Master",
    fetchDataHistoryApi: `${Apiurl.uploadHistory}${uploadEnum.CLIENT_MASTER_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadExcelTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.fileDownload}`,
    uploadEnum: uploadEnum.CLIENT_MASTER_BULK_UPLOAD,
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00269")}
            Breadcrumbshow={true}
            breadcrumbItems={
              pageName === "List"
                ? ClientMasterPageurl.ClientMasterList
                : ClientMasterPageurl.ClientMasterHistory
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
              {RouteCurrentAuthorities([
                userRole.Client_Master_Bulk_Upload,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle={"tableHeader"}
                  btnText={"Bulk Upload"}
                  onClick={() => {
                    handleUpload();
                  }}
                />
              )}
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="tableHeader"
                btnText={"Add New"}
                onClick={handleAddNew}
              />
              {/* {RouteCurrentAuthorities([
                userRole.Client_Master_BulkUpload_Client,
              ]) && (
                
              )} */}
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
              <>
                {pageName === "List" && (
                  <ClientMasterList UploadModalOpen={UploadModalOpen} />
                )}
              </>

              <>{pageName === "History" && <ClientMasterProductHistory />}</>
            </div>
          </div>
        </>
      )}
      <AppModal
        isOpen={UploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        handleAction={handleFileUpload}
        Modalsize={"xl"}
        buttonConfigs={[]}
        ModalBody={
          // <ClientMasterUploadComponent
          //   downloadTemplate={handleDownloadFile}
          //   onFileChangeNew={handleFileUpload}
          // />
          <FileUploadwithTable
            FileUploadwithTableItems={FileUploadwithTableItems}
          />
        }
      />
    </>
  );
}
