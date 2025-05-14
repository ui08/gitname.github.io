import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import AppModal from "../../../Component/Modal/AppModal";
import FileUploadwithTable from "../../../Component/UploadComponent/FileUploadwithTable";
import Pagehader from "../../../Layout/Pagehader";
import { decryptData, encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import { Apiurl } from "../../../util/apiurl";
import { DownloadTemplateFunction } from "../../Uploads/UploasAction";
import { uploadEnum } from "../../Uploads/data";
import TransactionOtherProductHistory from "./IncentiveRateUploadHistory";
import IncentiveRateUploadList from "./IncentiveRateUploadList";
import { IncentiveRateUploadPageurl } from "./IncentiveRateUploadPageurl";

export default function IncentiveRateUploadLanding() {
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
    const DownloadSuccess = await DownloadTemplateFunction("TRANSACTION");
    if (DownloadSuccess) {
      setLoading(false);
      setUploadModalOpen((prevValue) => !prevValue);
    } else {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleUpload = () => {
    setUploadModalOpen((prevValue) => !prevValue);
  };
  const handleAddNew = () => {
    navigate(
      "/" +
        encrypt("IncentiveRateUploadFormComponent") +
        `/${encryptData("add")}` +
        `/${encryptData("ss")}`
    );
  };
  // const handleFileUpload = async (file) => {
  //   setLoading(true);
  //   setUploadModalOpen((prevValue) => !prevValue);
  //   const MAX_FILE_SIZE = 10 * 1024 * 1024;

  //   if (file.size > MAX_FILE_SIZE) {
  //     alert(
  //       "File size exceeds the maximum limit of 10MB. Please upload a smaller file."
  //     );
  //     return;
  //   }

  //   let fileUploadDTO = JSON.stringify({
  //     filename: "Direct Equity Transaction",
  //     userId: getUserId(),
  //     fileUploadType: uploadEnum.TRANSACTION_BULK_UPLOAD,
  //   });

  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("fileUploadDTO", fileUploadDTO);

  //   const success = await UploadTemplateFunction(data);

  //   if (success) {
  //     setUploadModalOpen(false); // Close modal if upload succeeds
  //     setLoading(false);
  //     navigate(
  //       "/" +
  //         encrypt("TransactionDirectEquityLanding") +
  //         `/${encryptData("History")}`
  //     );
  //   } else {
  //     setLoading(false);
  //   }
  // };

  const FileUploadwithTableItems = {
    downloadTemplateApi: `${Apiurl.incentiveUpload}`,
    downloadTemplateFileName: "RATE UPLOAD",
    fetchDataHistoryApi: `${Apiurl.transactionHistory}${uploadEnum.OTHER_PRODUCTS_TRANSACTION_BULK_UPLOAD}`,
    // fetchDataHistoryApi: ``,
    TemplateUploadApi: Apiurl.uploadTransactionTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.fileDownload}`,
    uploadEnum: uploadEnum.OTHER_PRODUCTS_TRANSACTION_BULK_UPLOAD,
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
                ? IncentiveRateUploadPageurl.OtherProductsList
                : IncentiveRateUploadPageurl.OtherProductsHistory
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle={ "tableHeader"}     
                btnActiveStyle = {UploadModalOpen ?  "active" : "inactive" }                btnText={"Bulk Upload"}
                onClick={() => {
                  handleUpload();
                }}
              />
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle={ "tableHeader"}     
                btnActiveStyle = {UploadModalOpen ?  "inactive" : "active" }                btnText={"Add New"}
                onClick={() => {
                  handleAddNew();
                }}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
              <IncentiveRateUploadList />
              {pageName === "History" && <TransactionOtherProductHistory />}
            </div>
          </div>
        </>
      )}
      <AppModal
        isOpen={UploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        handleAction={handleUpload}
        Modalsize={"xl"}
        buttonConfigs={[]}
        ModalBody={
          <FileUploadwithTable
            FileUploadwithTableItems={FileUploadwithTableItems}
            dummy = {"dummy"}
          />
        }
      />
    </>
  );
}
