import React, { useEffect, useState } from "react";
import Loader from "../../util/Loader";
import FormComponent from "./FormComponent";
import axiosInstance from "../../util/axiosInstance";
import { Apiurl } from "../../util/apiurl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";
import AppModal from "../../Component/Modal/AppModal"; // Import AppModal
import { useTranslation } from "react-i18next";

const AddFormComponent = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Add state for modal
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleAddSubmit = (data) => {
    submitData(data);
  };

  const submitData = async (payload) => {
    try {
      const response = await axiosInstance.post(
        Apiurl.rmsaveQuestionList,  
        payload
      );
      toast.success("Questions Updated Successfully");
      navigate("/" + encrypt("RiskProfileAdvisorMain"));
      // setModalOpen(true); // Open modal on successful creation
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/" + encrypt("Schoollist") + `/${encryptData("Individual")}`); // Navigate to Schoollist on close
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
            <h5>Question {currentQuestion + 1} of {totalQuestions}</h5>
            <FormComponent
              onSubmit={handleAddSubmit}
              onCurrentIndexChange={setCurrentQuestion}
              onQuestionCountChange={setTotalQuestions}
            />
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
