import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AppModal from "../../Component/Modal/AppModal";
import {
  encrypt
} from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance.js";
import Loader from "../../util/Loader";
import { Apiurl } from './../../util/apiurl';
import FormComponent from './FormComponent.js';

const AddFormComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [imageUploadModal, setImageUploadModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleAddSubmit = (data) => {
    console.log("first", data);
    submitData()
  };

  const submitData = async (payload) => {
    try {
      const response = await axiosInstance.post(Apiurl.createPermission, payload);
      toast.success("Permission successfully created");
      setCoverImage("");
      setTimeout(() => {
        navigate("/" + encrypt("UnitStatusViewlist"));
      }, 200);
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setImageUploadModal(false);
  };

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <>
          <div>
            <FormComponent
              onSubmit={handleAddSubmit}
            />

            <AppModal
              isOpen={imageUploadModal}
              onClose={() => setImageUploadModal(false)}
              handleActon={""}
              buttonConfigs={[]}
              Modaldata={""}
              Modalsize={"md"}
              ModalTitle={"Image upload"}
              ModalBody={"Please upload cover image"}
              btnText={"Deleted"}
              show={true}
            />
          </div>{" "}
        </>
      )}
    </>
  );
};

export default AddFormComponent;
