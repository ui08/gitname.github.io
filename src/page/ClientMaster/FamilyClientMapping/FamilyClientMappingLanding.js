import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import AppModal from "../../../Component/Modal/AppModal";
import FileUploadwithTable from "../../../Component/UploadComponent/FileUploadwithTable";
import Pagehader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import { getUserId } from "../../../util/Authenticate";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import { uploadEnum } from "../../Uploads/data";
import {
  DownloadTemplateFunction,
  UploadTemplateFunction,
} from "../../Uploads/UploasAction";
import { ClientMasterPageurl } from "../ClientMasterPageurl";
import RouteCurrentAuthorities from "./../../../util/Authenticate/AuthorizedFunction";
import { userRole } from "./../../../util/Authenticate/Rolename";
import FamilyClientMappingHistory from "./FamilyClientMappingHistory";
import FamilyClientMappingList from "./FamilyClientMappingList";

export default function FamilyClientMappingLanding() {
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
        "/" +
          encrypt("FamilyClientMappingLanding") +
          `/${encryptData("History")}`
      );
    }
    if (pageName === "History") {
      navigate(
        "/" + encrypt("FamilyClientMappingLanding") + `/${encryptData("List")}`
      );
    }
  };
  const handleUpload = () => {
    setUploadModalOpen((prevValue) => !prevValue);
  };

  const handleDownload = async () => {
    setLoading(true);
    setUploadModalOpen((prevValue) => !prevValue);
    const success = await DownloadTemplateFunction("CLIENT_FAMILY_MAPPING");
    if (success) {
      setLoading(false);
      setUploadModalOpen((prevValue) => !prevValue);
    } else {
      setLoading(false);
      setUploadModalOpen((prevValue) => !prevValue);
    }
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
      filename: "Family Client Mapping",
      userId: getUserId(),
      fileUploadType: uploadEnum.CLIENT_FAMILY_MAPPING_BULK_UPLOAD,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    const success = await UploadTemplateFunction(data);

    if (success) {
      setLoading(false);
      navigate(
        "/" +
          encrypt("FamilyClientMappingLanding") +
          `/${encryptData("History")}`
      );
    } else {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    navigate(
      "/" +
        encrypt("FamilyClientMappingFormComponent") +
        `/${encryptData("add")}` +
        `/${encryptData("ss")}`
    );
  };

  const handleUnmap = () => {
    navigate("/" + encrypt("FamilyClientMappingUnmapFormComponent"));
  };

  const FileUploadwithTableItems = {
    downloadTemplateApi:
      `${Apiurl.downloadExcelTemplateForFamilyMapping}` +
      "/" +
      "CLIENT_FAMILY_MAPPING",
    downloadTemplateFileName: "CLIENT FAMILY MAPPING",
    fetchDataHistoryApi: `${Apiurl.uploadHistory}${uploadEnum.CLIENT_FAMILY_MAPPING_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadExcelTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.fileDownload}`,
    uploadEnum: uploadEnum.CLIENT_FAMILY_MAPPING_BULK_UPLOAD,
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
                ? ClientMasterPageurl.FamilyClientMappingList
                : ClientMasterPageurl.FamilyClientMappingHistory
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
              {RouteCurrentAuthorities([userRole.Family_Map]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle={"tableHeader"}
                  btnActiveStyle={UploadModalOpen ? "active" : "inactive"}
                  btnText={"Client Map"}
                  onClick={handleAddNew}
                />
              )}

              {RouteCurrentAuthorities([
                userRole.Family_Unmap_Client,
                userRole.Family_Unmap_Family_Head,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle={"tableHeader"}
                  btnActiveStyle={UploadModalOpen ? "inactive" : "active"}
                  btnText={"Client Unmap"}
                  onClick={handleUnmap}
                />
              )}
              {RouteCurrentAuthorities([
                userRole.Family_Mapping_Bulk_Upload,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle={"tableHeader"}
                  btnActiveStyle={UploadModalOpen ? "inactive" : "active"}
                  btnText={"Bulk Upload"}
                  onClick={() => {
                    handleUpload();
                  }}
                />
              )}
              {/* {RouteCurrentAuthorities([
                userRole.Client_Master_Family_Remapping_Listed ||
                  userRole.Client_Master_Family_Remapping_BulkUpload,
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
              <>
                {pageName === "List" && (
                  <FamilyClientMappingList UploadModalOpen={UploadModalOpen} />
                )}
              </>
              <>{pageName === "History" && <FamilyClientMappingHistory />}</>
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
          // <FamilyClientMappingUploadComponent
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
