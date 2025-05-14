import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import AppModal from "../../Component/Modal/AppModal";
import FileUploadwithTable from "../../Component/UploadComponent/FileUploadwithTable";
import Pageheader from "../../Layout/Pagehader";
import { Apiurl } from "../../util/apiurl";
import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";
import Loader from "../../util/Loader";
import { uploadEnum } from "../Uploads/data";
import { decryptData } from "./../../util/Authenticate/CryptoJS";
import UserCreationList from "./UserCreationList";
import { UserCreationMasterPageurl } from "./UserCreationMasterPageurl";
import UserCreationtHistory from "./UserCreationtHistory";
import RouteCurrentAuthorities from "./../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../util/Authenticate/Rolename";

export default function UserCreationListLanding() {
  const [loading, setLoading] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);

  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleHistoryClick = () => {
    if (pageName === "List") {
      navigate(
        "/" + encrypt("UserCreationListLanding") + `/${encryptData("History")}`
      );
    }
    if (pageName === "History") {
      navigate(
        "/" + encrypt("UserCreationListLanding") + `/${encryptData("List")}`
      );
    }
  };

  const handleUpload = () => {
    setUploadModalOpen((prevValue) => !prevValue);
  };

  const handleAddNew = () => {
    navigate(
      "/" +
        encrypt("UserCreationFormComponent") +
        `/${encryptData("add")}` +
        `/${encryptData("ss")}`
    );
  };
  if (loading) {
    return (
      <div>
        {" "}
        <Loader pagename={t("Common:App_lms_Common_00269")} />.
      </div>
    );
  }
  const FileUploadwithTableItems = {
    downloadTemplateApi: Apiurl.DownloadUserTemplate,
    downloadTemplateFileName: Apiurl.DownloadUserTemplate,
    fetchDataHistoryApi: `${Apiurl.uploadHistory}${uploadEnum.USER_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadExcelTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.fileDownload}`,
    uploadEnum: uploadEnum.USER_BULK_UPLOAD,
  };

  return (
    <>
      <Pageheader
        pagename={t("Common:App_lms_Common_00268")}
        Breadcrumbshow={true}
        breadcrumbItems={
          pageName === "List"
            ? UserCreationMasterPageurl.UserCreationlist
            : UserCreationMasterPageurl.UserCreationHistory
        }
      ></Pageheader>
      <div className="pagebody">
        <div className="d-flex gap-3">
          {RouteCurrentAuthorities([userRole.User_Create]) && (
            <ButtonComp
              wrapperName={"download_temp_wrapper"}
              type="button"
              btnStyle="box"
              btnText={"Add New"}
              onClick={handleAddNew}
            />
          )}
          {RouteCurrentAuthorities([userRole.User_Bulk_Upload]) && (
            <ButtonComp
              wrapperName={"download_temp_wrapper"}
              type="button"
              btnStyle="box"
              btnText={"Bulk Upload"}
              onClick={handleUpload}
            />
          )}
          {/* <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={pageName == "List" ? "History" : "List"}
                onClick={handleHistoryClick}
              /> */}
        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
          {pageName === "List" && (
            <UserCreationList UploadModalOpen={UploadModalOpen} />
          )}
          {pageName === "History" && <UserCreationtHistory />}
        </div>
      </div>

      <AppModal
        isOpen={UploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        buttonConfigs={[]}
        ModalBody={
          <FileUploadwithTable
            FileUploadwithTableItems={FileUploadwithTableItems}
          />
        }
        Modalsize={"xl"}
      />
    </>
  );
}
