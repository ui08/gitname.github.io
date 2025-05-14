import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Pagehader from "../../../Layout/Pagehader";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import AppModal from "../../../Component/Modal/AppModal";
import {
  decrypt,
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import PMSAIFList from "./PMSAIFList";
import PMSAIFHistory from "./PMSAIFHistory";
import PMSAIFUploadComponent from "./PMSAIFUploadComponent";
import { OtherMasterPageurl } from "../OtherMasterPageUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClockRotateLeft,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";

export default function PMSAIFLanding() {
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const breadcrumbItems = [
    {
      label: "PMS/AIF - Underlying Holdings",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  //EDIT USER
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    if (pageName === "List") {
      navigate("/" + encrypt("PMSAIFLanding") + `/${encryptData("History")}`);
    }
    if (pageName === "History") {
      navigate("/" + encrypt("PMSAIFLanding") + `/${encryptData("List")}`);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleUpload = () => {
    setUploadModalOpen((prevValue) => !prevValue);
  };

  const handleAction = (action) => {
    if (action === "continue") {
      // Add your logic here
    }
  };

  const handleUploadFile = (value) => {
    setShowModal(true);
    setModalType(value);
  };

  const handleDownloadFile = async () => {
    setLoading(true);
    const success = await DownloadTemplateFunction("CLIENT_MASTER_BULK_UPLOAD");
    if (success) {
      setLoading(false);
    } else {
      setLoading(false);
    }
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
                ? OtherMasterPageurl.PMSAIFlist
                : OtherMasterPageurl.PMSAIFHistory
            }
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
              {/* <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Download"}
                onClick={() => {
                  handleDownloadFile("downloadFile");
                }}
              /> */}
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Bulk Upload"}
                onClick={() => {
                  handleUploadFile("uploadFile");
                }}
              />
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={pageName == "List" ? "History" : "List"}
                onClick={() => {
                  handleHistoryClick();
                }}
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
              {pageName === "List" && <PMSAIFList />}
              {pageName === "History" && <PMSAIFHistory />}
            </div>
          </div>
        </>
      )}
      <AppModal
        isOpen={showModal}
        onClose={handleCloseModal}
        handleAction={handleAction}
        ModalTitle={""}
        Modalsize="lg"
        buttonConfigs={[
        ]}
        ModalBody={
          <PMSAIFUploadComponent
            downloadTemplate={handleDownloadFile}
            onFileChangeNew={handleUploadFile}
          />
        }
      />
    </>
  );
}
