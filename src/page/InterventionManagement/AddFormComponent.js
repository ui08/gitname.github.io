import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AppModal from "../../Component/Modal/AppModal";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import { encrypt } from "../../util/CryptoJS";
import Loader from "../../util/Loader";
import FormComponent from "./FormComponent";

const AddFormComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Add modalOpen state
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleAddSubmit = (data) => {
      const Data = {
      interventionName: data.interventionName,
      status: "Active",
      interventionLevels: data.interventionLevels,
    };

    submitData(Data);
  };

  const submitData = async (payload) => {
    try {
      const response = await axiosInstance.post(
        Apiurl.interventionCreate,
        payload
      );
      
      toast.success(
        t("Messages:CreateMessage", { mode: t("Common:App_lms_Common_00004") })
      );

      setTimeout(() => {
        navigate("/" + encrypt("Interventionlist"));
      }, 2000);
      // setModalOpen(true); // Open modal on successful submission
    } catch (error) {
      // ToastNotify(error) 
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/" + encrypt("InterventionList")); // Navigate to InterventionList on close
  };

  const handleAction = () => {
    setModalOpen(false);
    navigate("/"); // Navigate to home page
  };

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <>
          <div>
            <FormComponent onSubmit={handleAddSubmit} />
          </div>
          <AppModal
            isOpen={modalOpen}
            onClose={handleModalClose}
            handleActon={handleAction}
            ModalTitle="Dummy text"
            Modalsize="sm"
            buttonConfigs={[{ text: "Yes", icon: "check", action: "yes" }]}
            Modaldata={{}}
            ModalBody={<p>Do you want to add Intervention?</p>}
            ModalType="Confirm"
          />
        </>
      )}
    </>
  );
};

export default AddFormComponent;
