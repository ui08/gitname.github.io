import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import AppModal from "../../../Component/Modal/AppModal";
import Pagehader from "../../../Layout/Pagehader";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import { ClientMasterPageurl } from "../ClientMasterPageurl";
import ClientMappingHistory from "./ClientMappingHistory";
import ClientMappingList from "./ClientMappingList";
import ClientMappingUploadComponent from "./ClientMappingUploadComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClockRotateLeft,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../util/axiosInstance";
import { Apiurl } from "../../../util/apiurl";
import { uploadEnum } from "../../Uploads/data";
import {
  DownloadTemplateFunction,
  UploadTemplateFunction,
} from "../../Uploads/UploasAction";
import toast from "react-hot-toast";
import { getUserId } from "../../../util/Authenticate";
import { userRole } from "../../../util/Authenticate/Rolename";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import FileUploadwithTable from "../../../Component/UploadComponent/FileUploadwithTable";

export default function ClientMappingLanding() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleDownload = async () => {
    setLoading(true);
    setUploadModalOpen((prevValue) => !prevValue);
    const DownloadSuccess = await DownloadTemplateFunction("CLIENT_REMAPPING");
    if (DownloadSuccess) {
      setLoading(false);
      setUploadModalOpen((prevValue) => !prevValue);
    }
  };

  const handleUpload = () => {
    setUploadModalOpen((prevValue) => !prevValue);
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
      filename: "Client Remapping",
      userId: getUserId(),
      fileUploadType: uploadEnum.CLIENT_REMAPPING_BULK_UPLOAD,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    const success = await UploadTemplateFunction(data);

    if (success) {
      setLoading(false);
      navigate(
        "/" + encrypt("ClientMappingLanding") + `/${encryptData("History")}`
      );
    } else {
      setLoading(false);
    }
  };

  const handleHistoryClick = () => {
    if (pageName === "List") {
      navigate(
        "/" + encrypt("ClientMappingLanding") + `/${encryptData("History")}`
      );
    }
    if (pageName === "History") {
      navigate(
        "/" + encrypt("ClientMappingLanding") + `/${encryptData("List")}`
      );
    }
  };

  const FileUploadwithTableItems = {
    downloadTemplateApi:
      `${Apiurl.downloadExcelTemplateClientRemapping}` + "/" + "CLIENT_REMAPPING",
    downloadTemplateFileName: "CLIENT REMAPPING",
    fetchDataHistoryApi: `${Apiurl.uploadHistory}${uploadEnum.CLIENT_REMAPPING_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadExcelTemplate,
    DownloadFileApi: `${Apiurl.fileDownload}`,
    UploadMAX_FILE_SIZE: 10,
    uploadEnum: uploadEnum.CLIENT_REMAPPING_BULK_UPLOAD,
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
                ? ClientMasterPageurl.ClientMappingList
                : ClientMasterPageurl.ClientMappingHistory
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
              {RouteCurrentAuthorities([
                userRole.Client_RM_Mapping_Bulk_Upload,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle={ "tableHeader"}     
                   btnText={"Bulk Upload"}
                  onClick={() => {
                    handleUpload();
                  }}
                />
              )}
              {/* {RouteCurrentAuthorities([
                userRole.Client_Master_RM_Client_Remapping_Listed||
                  userRole.Client_Master_RM_Client_Remapping_BulkUpload,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={pageName == "List" ? "History" : "List"}
                  onClick={handleHistoryClick}
                />
              )} */}
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
             <> {pageName === "List" && <ClientMappingList UploadModalOpen={UploadModalOpen}/>}</>
            <> {pageName === "History" && <ClientMappingHistory />}</>
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
          // <ClientMappingUploadComponent
          //   downloadTemplate={handleDownload}
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
