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
import { userRole } from "../../../util/Authenticate/Rolename";
import Loader from "../../../util/Loader";
import { uploadEnum } from "../../Uploads/data";
import {
  DownloadTemplateFunction,
  UploadTemplateFunction,
} from "../../Uploads/UploasAction";
import { InstrumentMasterPageurl } from "../InstrumentMasterPageurl";
import RouteCurrentAuthorities from "./../../../util/Authenticate/AuthorizedFunction";
import OtherProductList from "./OtherProductList";
import OtherProductListHistory from "./OtherProductListHistory";

export default function IMOtherProductListLanding() {
  const [loading, setLoading] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);

  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleHistoryClick = () => {
    if (pageName === "List") {
      navigate(
        "/" +
          encrypt("IMOtherProductListLanding") +
          `/${encryptData("History")}`
      );
    }
    if (pageName === "History") {
      navigate(
        "/" + encrypt("IMOtherProductListLanding") + `/${encryptData("List")}`
      );
    }
  };

  const handleUpload = () => {
    setUploadModalOpen((prev) => !prev);
  };

  const handleAddNew = () => {
    navigate(
      "/" +
        encrypt("OtherProductFormComponent") +
        `/${encryptData("add")}` +
        `/${encryptData("ss")}`
    );
  };

  const handleDownload = async () => {
    setLoading(true);
    const DownloadSuccess = await DownloadTemplateFunction("CREATE_INSTRUMENT");
    if (DownloadSuccess) {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert(
        "File size exceeds the maximum limit of 10MB. Please upload a smaller file."
      );
      return;
    }

    let fileUploadDTO = JSON.stringify({
      filename: "INSTRUMENT",
      userId: getUserId(),
      fileUploadType: uploadEnum.CREATE_INSTRUMENT_BULK_UPLOAD,
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
          encrypt("IMOtherProductListLanding") +
          `/${encryptData("History")}`
      );
    } else {
      setLoading(false);
    }
  };

  const FileUploadwithTableItems = {
    downloadTemplateApi: `${Apiurl.instrumentMasterDownloadTemplate}`,
    downloadTemplateFileName: "CREATE Other Product",
    fetchDataHistoryApi: `${Apiurl.uploadHistory}${uploadEnum.CREATE_INSTRUMENT_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadExcelTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.fileDownload}`,
    uploadEnum: uploadEnum.CREATE_INSTRUMENT_BULK_UPLOAD,
  };

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00268")}
            Breadcrumbshow={true}
            breadcrumbItems={
              pageName === "List"
                ? InstrumentMasterPageurl.OtherProductsList
                : InstrumentMasterPageurl.OtherProductsHistory
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
            {RouteCurrentAuthorities([userRole.Instrument_Master_Other_Products_Create]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle={ "tableHeader"}     
                  btnActiveStyle = {UploadModalOpen ?  "active" : "inactive" }                   btnText={"Add New"}
                  onClick={handleAddNew}
                />
              )}
              {/* <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Download"}
                onClick={handleDownload}
              /> */}
              {RouteCurrentAuthorities([userRole.Instrument_Master_Other_Products_Bulk_Upload]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle={ "tableHeader"}     
                  btnActiveStyle = {UploadModalOpen ?  "inactive" : "active" }                   btnText={"Bulk Upload"}
                  onClick={handleUpload}
                />
              )}
              {/* {RouteCurrentAuthorities([
                userRole.Instrument_Master_Other_Product_Bulk_Upload,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={"Unitized Bulk Upload"}
                  onClick={handleUpload}
                />
              )} */}
              {/* Non Unitized */}
              {/* {RouteCurrentAuthorities([
                userRole.Instrument_Master_Other_Product_Listed ||
                  userRole.Instrument_Master_Other_Product_Add ||
                  userRole.Instrument_Master_Other_Product_View ||
                  userRole.Instrument_Master_Other_Product_Edit ||
                  userRole.Instrument_Master_Other_Product_DeactivationOrActivation ||
                  userRole.Instrument_Master_Other_Product_Bulk_Upload,
              ]) && (
                <>
                  <ButtonComp
                    wrapperName={"download_temp_wrapper"}
                    type="button"
                    btnStyle="box"
                    btnText={pageName == "List" ? "History" : "List"}
                    onClick={handleHistoryClick}
                  />
                </>
              )} */}
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
              <>{pageName === "List" && <OtherProductList UploadModalOpen={UploadModalOpen}/>}</>
             
                <>{pageName === "History" && <OtherProductListHistory />}</>
              
            </div>
          </div>
          <AppModal
            isOpen={UploadModalOpen}
            onClose={() => setUploadModalOpen(false)}
            handleAction={handleFileUpload}
            buttonConfigs={[]}
            ModalBody={
              // <OtherProductListUploadComponent
              //   downloadTemplate={handleDownload}
              //   onFileChangeNew={handleFileUpload}
              // />
              <FileUploadwithTable
                FileUploadwithTableItems={FileUploadwithTableItems}
              />
            }
            Modalsize={"xl"}
          />
        </>
      )}
    </>
  );
}
