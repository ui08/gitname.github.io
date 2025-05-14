import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Pagehader from "../../../../src/Layout/Pagehader";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import AppModal from "../../../Component/Modal/AppModal";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import CreateInstrumentHistory from "./CreateInstrumentHistory";
import CreateInstrumentList from "./CreateInstrumentList";
import CreateInstrumentUploadComponent from "./CreateInstrumentUploadComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function CreateInstrumentLanding() {
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
      label: t("Common:App_lms_Common_00269"),
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  //EDIT USER
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    if (pageName === "List") {
      navigate(
        "/" + encrypt("CreateInstrumentLanding") + `/${encryptData("History")}`
      );
    }
    if (pageName === "History") {
      navigate(
        "/" + encrypt("CreateInstrumentLanding") + `/${encryptData("List")}`
      );
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAction = (action) => {
    if (action === "continue") {
      // Add your logic here
    }
  };

  const handleUploadFile = (value) => {
    setShowModal(true);
    setModalType(value);
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
            breadcrumbItems={breadcrumbItems}
          ></Pagehader>
          <div className="pagebody">
            <div className="d-flex gap-3">
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Download File"}
                onClick={() => {
                  handleUploadFile("downloadFile");
                }}
              />
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Upload File"}
                onClick={() => {
                  handleUploadFile("uploadFile");
                }}
              />
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Download Instruments"}
                onClick={() => {
                  handleUploadFile("downloadInstrument");
                }}
              />
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Update Intruments"}
                onClick={() => {
                  handleUploadFile("instrument");
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
              {pageName === "List" && <CreateInstrumentList />}
              {pageName === "History" && <CreateInstrumentHistory />}
            </div>
          </div>
        </>
      )}
      <AppModal
        isOpen={showModal}
        onClose={handleCloseModal}
        handleAction={handleAction}
        ModalTitle={""}
        Modalsize="xl"
        buttonConfigs={[
          { text: "Continue", icon: null, action: "continue" },
          { text: "Cancel", icon: null, action: "cancel" },
        ]}
        ModalBody={
          <div className="row ">
            <CreateInstrumentUploadComponent
              modalType={modalType}
              handleClose={handleCloseModal}
            />
          </div>
        }
        ModalType="Watchlist"
        ModalScrollable={true}
        // ReactOdometervalue={seconds}
      />
    </>
  );
}