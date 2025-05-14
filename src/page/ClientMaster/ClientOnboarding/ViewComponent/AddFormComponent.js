import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Apiurl } from "../../../../util/apiurl";
import { encrypt, encryptData } from "../../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../../util/axiosInstance";
import Loader from "../../../../util/Loader";
import FormComponent from "./FormComponent";
import AppModal from './../../../../Component/Modal/AppModal';

const AddFormComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
 
    }, 2000);
  }, []);

  const handleAddSubmit = (data) => {
    setShowModal(true)
  };


  const handleClose = ({ action, Modaldata }) => {
    if (action === "close") {
      navigate(
           
        "/" + encrypt("ClientMasterProductLanding") + `/${encryptData("List")}`
      );
    } 
  };



 

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <>
          <div>
            <FormComponent onSubmit={handleAddSubmit} initialData={data} />

            <AppModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              handleActon={handleClose}
              buttonConfigs={[
                { text: "Close", action: "close" },
              ]}
              Modaldata={""}
              Modalsize={"md"}
              ModalTitle={"Congratulations"}
              ModalBody={"Your login details will be sent to your registered email id"}
              // btnText={""}
              show={false}
              ModalType = {"OnboardingClose"}
            />
          </div>{" "}
        </>
      )}
    </>
  );
};

export default AddFormComponent;
