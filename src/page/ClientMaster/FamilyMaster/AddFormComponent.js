import React, { useEffect, useState } from "react";
import Loader from "../../../util/Loader";
import FormComponent from "./FormComponent";
import toast from "react-hot-toast";
import AppModal from "../../../Component/Modal/AppModal";
import { useNavigate } from "react-router-dom";
import {
  decryptData,
  encryptData,
  encrypt,
  decrypt,
} from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import { Apiurl } from "../../../util/apiurl";

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

    let PayloadData = {
      familyHeadId: parseInt(data.ClientName.value),
      familyName: data.FamilyName,
    };
    submitData(PayloadData);
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(Apiurl.saveFamily, payload);
      toast.success("Successfully created");
      setTimeout(() => {
        navigate(
          "/" + encrypt("FamilyMasterLanding") + `/${encryptData("List")}`
        );
      }, 200);
    } catch (error) {
      toast.error(error.response.data);

      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setImageUploadModal(false);
  };

  return (
    <div>
      <FormComponent onSubmit={handleAddSubmit} />
    </div>
  );
};

export default AddFormComponent;
