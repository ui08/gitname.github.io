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
import { TransactionMasterPageurl } from "../TransactionMasterPageurl";
import TransactionDirectEquityHistory from "./DirectEquityHistory";
import TransactionDirectEquityList from "./DirectEquityList";
import DirectEquityUploadComponent from "./DirectEquityUploadComponent";
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
import { userRole } from "../../../util/Authenticate/Rolename";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";

export default function TransactionDirectEquityLanding() {
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

  const FileUploadwithTableItems = {
    downloadTemplateApi: `${Apiurl.downloadTransactionTemplate}`+"/"+"deTrxnTemplate",
    downloadTemplateFileName: "TRANSACTION DIRECT EQUITY",
    fetchDataHistoryApi: `${Apiurl.transactionHistory}${uploadEnum.DIRECT_EQUITY_TRANSACTION_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadTransactionTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.bulkmasterHistory}`,
    uploadEnum: uploadEnum.DIRECT_EQUITY_TRANSACTION_BULK_UPLOAD,
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={"Mutual Funds"}
            Breadcrumbshow={true}
            breadcrumbItems={
              pageName === "List"
                ? TransactionMasterPageurl.Directlist
                : TransactionMasterPageurl.DirectHistorylist
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
               {RouteCurrentAuthorities([
                                  userRole.Transaction_Direct_Equity_Bulk_Upload
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
              {pageName === "List" && <TransactionDirectEquityList UploadModalOpen={UploadModalOpen}/>}
              {pageName === "History" && <TransactionDirectEquityHistory />}
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
