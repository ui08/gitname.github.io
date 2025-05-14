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
import { VMPageurl } from "../VMPageurl";
import VMOtherProductList from "./VMOtherProductList";
import VMOtherProductListHistory from "./VMOtherProductListHistory";
import VMOtherProductListUploadComponent from "./VMOtherProductListUploadComponent";
import {
  DownloadTemplateFunction,
  UploadTemplateFunction,
} from "../../Uploads/UploasAction";
import { getUserId } from "../../../util/Authenticate";
import { uploadEnum } from "../../Uploads/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClockRotateLeft,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { userRole } from "../../../util/Authenticate/Rolename";
import RouteCurrentAuthorities from "../../../util/Authenticate/AuthorizedFunction";
import FileUploadwithTable from "../../../Component/UploadComponent/FileUploadwithTable";
import { Apiurl } from "../../../util/apiurl";

export default function VMOtherProductListLanding() {
  const [loading, setLoading] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);
  const [UploadModalname, setUploadModalName] = useState("");

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
        "/" +
          encrypt("VMOtherProductListLanding") +
          `/${encryptData("History")}`
      );
    }
    if (pageName === "History") {
      navigate(
        "/" + encrypt("VMOtherProductListLanding") + `/${encryptData("List")}`
      );
    }
  };

  const handleUpload = (value) => {
    setUploadModalName("");
    setUploadModalName(value);
    setUploadModalOpen((prevValue) => !prevValue);
  };

  const handleAddNew = () => {
    navigate(
      "/" +
        encrypt("VMOtherProductFormComponent") +
        `/${encryptData("add")}` +
        `/${encryptData("ss")}`
    );
  };

  const handleDownload = async () => {
    setLoading(true);
    const success = await DownloadTemplateFunction("OTHER_PRODUCTS_VALUATION");
    if (success) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert(
        "File size exceeds the maximum limit of 10MB. Please upload a smaller file."
      );
      return;
    }

    let fileUploadDTO = JSON.stringify({
      filename: "Other Product",
      userId: getUserId(),
      fileUploadType: uploadEnum.OTHER_PRODUCT_PRICING_MASTER_BULK_UPLOAD,
    });

    const data = new FormData();
    data.append("file", file);
    data.append("fileUploadDTO", fileUploadDTO);

    const success = await UploadTemplateFunction(data);

    if (success) {
      setUploadModalOpen(false); // Close modal if upload succeeds
    }
  };
  const FileUploadwithTableItems = {
    downloadTemplateApi: `${Apiurl.unitizedProdValuationMasterTemplate}`,
    downloadTemplateFileName: "OTHER PRODUCTS VALUATION (unitize)",
    fetchDataHistoryApi: `${Apiurl.uploadHistory}${uploadEnum.OTHER_PRODUCT_PRICING_UNITIZED_MASTER_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadExcelTemplate,
    UploadMAX_FILE_SIZE: 10,
    DownloadFileApi: `${Apiurl.fileDownload}`,
    uploadEnum: uploadEnum.OTHER_PRODUCT_PRICING_UNITIZED_MASTER_BULK_UPLOAD,
  };
  const FileUploadwithNonUnitizedTableItems = {
    downloadTemplateApi: `${Apiurl.NonunitizedProdValuationMasterTemplate}`,
    downloadTemplateFileName: "OTHER PRODUCTS VALUATION (Non Unitize)",
    fetchDataHistoryApi: `${Apiurl.uploadHistory}${uploadEnum.OTHER_PRODUCT_PRICING_NON_UNITIZED_MASTER_BULK_UPLOAD}`,
    TemplateUploadApi: Apiurl.uploadExcelTemplate,
    DownloadFileApi: `${Apiurl.fileDownload}`,
    UploadMAX_FILE_SIZE: 10,
    uploadEnum:
      uploadEnum.OTHER_PRODUCT_PRICING_NON_UNITIZED_MASTER_BULK_UPLOAD,
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
                ? VMPageurl.OtherProductsList
                : VMPageurl.OtherProductsHistory
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
              {RouteCurrentAuthorities([
                userRole.Valuation_Master_Other_Products_Create,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="tableHeader"
                  btnText={"Add New"}
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
              {RouteCurrentAuthorities([
                userRole.Valuation_Master_Other_Products_Unitized_Bulk_Upload,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={"Unitized Bulk Upload"}
                  onClick={() => handleUpload("Unitized")}
                />
              )}
              {RouteCurrentAuthorities([
                userRole.Valuation_Master_Other_Products_Non_Unitized_Bulk_Upload,
              ]) && (
                <ButtonComp
                  wrapperName={"download_temp_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={"Non Unitized Bulk Upload"}
                  onClick={() => handleUpload("NonUnitized")}
                />
              )}

              {/* {RouteCurrentAuthorities([
                userRole.Valuation_Master_Other_Products_Listed ||
                  userRole.Valuation_Master_Other_Product_Bulk_Upload,
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
              <>
                {pageName === "List" && (
                  <VMOtherProductList UploadModalOpen={UploadModalOpen} />
                )}
              </>
              <>{pageName === "History" && <VMOtherProductListHistory />}</>
            </div>
          </div>
          <AppModal
            isOpen={UploadModalOpen}
            onClose={() => setUploadModalOpen(false)}
            handleActon={handleFileUpload}
            buttonConfigs={[]}
            ModalBody={
              // <VMOtherProductListUploadComponent
              //   downloadTemplate={handleDownload}
              //   onFileChangeNew={handleFileUpload}
              // />
              <FileUploadwithTable
                FileUploadwithTableItems={
                  UploadModalname === "Unitized"
                    ? FileUploadwithTableItems
                    : FileUploadwithNonUnitizedTableItems
                }
              />
            }
            Modalsize={"xl"}
          />
        </>
      )}
    </>
  );
}
