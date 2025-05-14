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
import FamilyMasterHistory from "./FamilyMasterHistory";
import FamilyMasterList from "./FamilyMasterList";
import FamilyMasterUploadComponent from "./FamilyMasterUploadComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClockRotateLeft,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { getUserId } from "../../../util/Authenticate";
import { uploadEnum } from "../../Uploads/data";
import {
  DownloadTemplateFunction,
  UploadTemplateFunction,
} from "../../Uploads/UploasAction";
import axiosInstance from "../../../util/axiosInstance";
import { Apiurl } from "../../../util/apiurl";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../../util/Authenticate/Rolename";
import FileUploadwithTable from "../../../Component/UploadComponent/FileUploadwithTable";

export default function FamilyMasterLanding() {
  const [loading, setLoading] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);

  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);
  console.log("pageName:", pageName);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  //EDIT USER
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    if (pageName === "List") {
      navigate(
        "/" + encrypt("FamilyMasterLanding") + `/${encryptData("History")}`
      );
    }
    if (pageName === "History") {
      navigate(
        "/" + encrypt("FamilyMasterLanding") + `/${encryptData("List")}`
      );
    }
  };
  const handleUpload = () => {
    setUploadModalOpen((prevValue) => !prevValue);
  };

  const handleDownload = async () => {
    setLoading(true);
    setUploadModalOpen((prevValue) => !prevValue);
    const success = await DownloadTemplateFunction("FAMILY_MASTER");
    if (success) {
      setLoading(false);
      setUploadModalOpen((prevValue) => !prevValue);
    } else {
      setLoading(false);
    }
  };

  const FileUploadwithTableItems = {
    downloadTemplateApi: `${Apiurl.downloadExcelTemplateForFamilyMaster}`+"/"+"FAMILY_MASTER",
    downloadTemplateFileName: "FAMILY MASTER",
    fetchDataHistoryApi: `${Apiurl.uploadHistory}${uploadEnum.FAMILY_MASTER_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadExcelTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.fileDownload}`,
    uploadEnum: uploadEnum.FAMILY_MASTER_BULK_UPLOAD,
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
      filename: "Family Master",
      userId: getUserId(),
      fileUploadType: uploadEnum.FAMILY_MASTER_BULK_UPLOAD,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    const success = await UploadTemplateFunction(data);

    if (success) {
      setLoading(false);
      navigate(
        "/" + encrypt("FamilyMasterLanding") + `/${encryptData("History")}`
      );
    } else {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    navigate(
      "/" +
        encrypt("FamilyMasterFormComponent") +
        `/${encryptData("add")}` +
        `/${encryptData("ss")}`
    );
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
                ? ClientMasterPageurl.FamilyMasterList
                : ClientMasterPageurl.FamilyMasterHistory
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
              {RouteCurrentAuthorities([
                userRole.Family_Master_Create,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle={ "tableHeader"}     
                  btnActiveStyle = {UploadModalOpen ?  "inactive" : "active" }             
                  btnText={"Add New"}
                  onClick={handleAddNew}
                />
              )}
              {RouteCurrentAuthorities([
                userRole.Family_Master_Bulk_Upload,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle={ "tableHeader"}     
                  btnActiveStyle = {UploadModalOpen ?  "active" : "inactive" } 
                  btnText={"Bulk Upload"}
                  onClick={() => {
                    handleUpload();
                  }}
                />
              )}
              {/* {RouteCurrentAuthorities([
                userRole.Client_Master_Family_Master_Listed ||
                  userRole.Client_Master_Family_Master_BulkUpload,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={pageName == "List" ? "History" : "List"}
                  onClick={() => {
                    handleHistoryClick();
                  }}
                />
              )} */}
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
              <>{pageName === "List" && <FamilyMasterList UploadModalOpen={UploadModalOpen}/>}</>
               <>{pageName === "History" && <FamilyMasterHistory />}</>
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
          // <FamilyMasterUploadComponent
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
