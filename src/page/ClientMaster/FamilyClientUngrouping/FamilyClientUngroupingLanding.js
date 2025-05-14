import {
  faBars,
  faClockRotateLeft,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import AppModal from "../../../Component/Modal/AppModal";
import Pagehader from "../../../Layout/Pagehader";
import { getUserId } from "../../../util/Authenticate";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import { ClientMasterPageurl } from "../ClientMasterPageurl";
import RouteCurrentAuthorities from "./../../../util/Authenticate/AuthorizedFunction";
import { userRole } from "./../../../util/Authenticate/Rolename";
import FamilyClientUngroupingList from "./FamilyClientUngroupingList";

export default function FamilyClientUngroupingLanding() {
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
            ClientMasterPageurl.FamilyClientUngroupingList
            }
          ></Pagehader>
          <div className="pagebody">
            
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
              {RouteCurrentAuthorities([
                userRole.Client_Master_Family_Remapping_Listed,
              ]) && <>{pageName === "List" && <FamilyClientUngroupingList />}</>}
             
            </div>
          </div>
        </>
      )}
      
    </>
  );
}
