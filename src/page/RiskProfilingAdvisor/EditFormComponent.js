import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../util/Authenticate/CryptoJS";
import Loader from "../../util/Loader";
import { Apiurl } from "./../../util/apiurl";
import FormComponent from "./FormComponent";

const EditFormComponent = () => {
  const navigate = useNavigate();
  const id = decryptData(useParams().id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.rmGetAllQuestionWithResponse
      );
      const result = await response?.data;
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = (data) => {
    // console.log("Updating:", data);
    submitData(data);
  };

  const submitData = async (payload) => {
    setLoading(true);
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

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <div>
          <FormComponent
            editData={data}
            onSubmit={handleEditSubmit}
          />
        </div>
      )}
    </>
  );
};

export default EditFormComponent;
