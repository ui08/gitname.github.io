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
    console.log("dataaa", data);
    let clientId = data.ClientName.value
    let PayloadData = {
    //  familyHeadClientId: data.FamilyName.familyHeadId,
    familyMasterId: data.FamilyName.value,
    memberClientIds: [data.ClientName.value],
    relation: data.Relation.label
    };
    submitData(PayloadData);
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(Apiurl.saveFamilyClientMapping, payload);
      toast.success("Successfully created");
      setTimeout(() => {
        navigate(
          "/" + encrypt("FamilyClientMappingLanding") + `/${encryptData("List")}`
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
