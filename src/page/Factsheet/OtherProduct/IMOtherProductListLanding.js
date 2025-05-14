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
import { InstrumentMasterPageurl } from "../InstrumentMasterPageurl";
import OtherProductList from "./OtherProductList";
import OtherProductListHistory from "./OtherProductListHistory";
import OtherProductListUploadComponent from "./OtherProductListUploadComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function IMOtherProductListLanding() {
  const [loading, setLoading] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);

  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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

  const handleUpload = () => {
    setUploadModalOpen((prevValue) => !prevValue);
  };

  const handleAddNew = () => {
    navigate(
      "/" +
        encrypt("ViewFormComponent") +
        `/${encryptData("add")}` +
        `/${encryptData("ss")}`
    );
  };

  const handleDownload = () => {
    alert("Download");
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
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Add New"}
                onClick={handleAddNew}
              />
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Download"}
                onClick={handleDownload}
              />
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Upload"}
                onClick={handleUpload}
              />
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={pageName == "List" ? "History" : "List"}
                onClick={handleHistoryClick}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
              {pageName === "List" && <OtherProductList />}
              {pageName === "History" && <OtherProductListHistory />}
            </div>
          </div>
          <AppModal
            isOpen={UploadModalOpen}
            onClose={() => setUploadModalOpen(false)}
            handleActon={handleUpload}
            buttonConfigs={[]}
            ModalBody={<OtherProductListUploadComponent />}
            Modalsize={"lg"}
          />
        </>
      )}
    </>
  );
}
