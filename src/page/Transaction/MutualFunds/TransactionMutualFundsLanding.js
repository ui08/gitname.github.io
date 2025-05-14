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
import { TransactionMasterPageurl } from "./../TransactionMasterPageurl";
import TransactionMutualFundsHistory from "./MutualFundsHistory";
import TransactionMutualFundsList from "./MutualFundsList";
import MutualFundsUploadComponent from "./MutualFundsUploadComponent";
import {
  DownloadTemplateFunction,
  UploadTemplateFunction,
} from "../../Uploads/UploasAction";
import { uploadEnum } from "../../Uploads/data";
import { getUserId } from "../../../util/Authenticate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { Apiurl } from "../../../util/apiurl";
import FileUploadwithTable from "../../../Component/UploadComponent/FileUploadwithTable";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import { userRole } from "../../../util/Authenticate/Rolename";

export default function TransactionMutualFundsLanding() {
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

  const handleHistoryClick = () => {
    if (pageName === "List") {
      navigate(
        "/" +
          encrypt("TransactionMutualFundsLanding") +
          `/${encryptData("History")}`
      );
    }
    if (pageName === "History") {
      navigate(
        "/" +
          encrypt("TransactionMutualFundsLanding") +
          `/${encryptData("List")}`
      );
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAction = (action) => {
    if (action === "continue") {
      // Add your logic here
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    setUploadModalOpen((prevValue) => !prevValue);
    setLoading(true);
    const DownloadSuccess = await DownloadTemplateFunction("TRANSACTION");
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
      filename: "Direct Equity Transaction",
      userId: getUserId(),
      fileUploadType: uploadEnum.TRANSACTION_BULK_UPLOAD,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    const success = await UploadTemplateFunction(data);

    if (success) {
      setUploadModalOpen(false); // Close modal if upload succeeds
      setLoading(false);
      navigate(
        "/" +
          encrypt("TransactionDirectEquityLanding") +
          `/${encryptData("History")}`
      );
    } else {
      setLoading(false);
    }
  };

  const FileUploadwithTableItems = {
    downloadTemplateApi: `${Apiurl.downloadTransactionTemplate}`+"/"+"mfTrxnTemplate",
    downloadTemplateFileName: "TRANSACTION MUTUAL FUNDS",
    fetchDataHistoryApi: `${Apiurl.transactionHistory}${uploadEnum.TRANSACTION_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadTransactionTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.bulkmasterHistory}`,
    uploadEnum: uploadEnum.TRANSACTION_BULK_UPLOAD,
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
                ? TransactionMasterPageurl.MutualFundslist
                : TransactionMasterPageurl.MutualFundsHistory
            }
          ></Pagehader>
         
          <div className="pagebody">
            <div className="d-flex gap-3">
            {RouteCurrentAuthorities([
                    userRole.Transaction_Mutual_Funds_Bulk_Upload
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
              {pageName === "List" && <TransactionMutualFundsList UploadModalOpen={UploadModalOpen}/>}
              {pageName === "History" && <TransactionMutualFundsHistory />}
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
          // <MutualFundsUploadComponent
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
