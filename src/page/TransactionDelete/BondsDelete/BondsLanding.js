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
import { TransactionMasterPageurl } from "../TransactionMasterPageurlDelete";
import BondsHistory from "./BondsHistory";
import BondsList from "./BondsList";
import {
  DownloadTemplateFunction,
  UploadTemplateFunction,
} from "../../Uploads/UploasAction";
import { uploadEnum } from "../../Uploads/data";
import { getUserId } from "../../../util/Authenticate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import FileUploadwithTable from "../../../Component/UploadComponent/FileUploadwithTable";
import { Apiurl } from "../../../util/apiurl";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../../util/Authenticate/Rolename";

export default function BondsLanding() {
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

  //EDIT USER
  const navigate = useNavigate();

  const handleDownload = async () => {
    setLoading(true);
    setUploadModalOpen((prevValue) => !prevValue);
    const DownloadSuccess = await DownloadTemplateFunction("BONDS_TRANSACTION");
    if (DownloadSuccess) {
      setLoading(false);
      setUploadModalOpen((prevValue) => !prevValue);
    } else {
      setLoading(false);
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
      filename: "Bonds Transaction",
      userId: getUserId(),
      fileUploadType: uploadEnum.BONDS_TRANSACTION_BULK_DELETE_UPLOAD,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    const success = await UploadTemplateFunction(data);

    if (success) {
      setLoading(false);
      navigate(
        "/" +
          encrypt("BondsLanding") +
          `/${encryptData("History")}`
      );
    } else {
      setLoading(false);
    }
  };

 

  const FileUploadwithTableItems = {
    downloadTemplateApi: `${Apiurl.downloadTransactionTemplate}`+"/"+"bondTrxnTemplateForDeletion",
    downloadTemplateFileName: "BONDS TRANSACTION DELETE",
    fetchDataHistoryApi: `${Apiurl.transactionHistory}${uploadEnum.BONDS_TRANSACTION_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadTransactionTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.bulkmasterHistory}`,
    uploadEnum: uploadEnum.BONDS_TRANSACTION_BULK_DELETE_UPLOAD,
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={"Bonds"}
            Breadcrumbshow={true}
            breadcrumbItems={
              pageName === "List"
                ? TransactionMasterPageurl.BondsList
                : TransactionMasterPageurl.BondsHistoryList
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
               {RouteCurrentAuthorities([
                                  userRole.Transaction_Bonds_Bulk_Upload
                                ]) && (
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Bulk Upload"}
                onClick={() => {
                  handleUpload();
                }}
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
              {pageName === "List" && <BondsList UploadModalOpen={UploadModalOpen}/>}
              {pageName === "History" && <BondsHistory />}
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
          // <DirectEquityUploadComponent
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
