import React, { useEffect, useState } from "react";
import Loader from "../../util/Loader";
import FormComponent from "./FormComponent";
import toast from "react-hot-toast";
import AppModal from "../../Component/Modal/AppModal";
import { useNavigate } from "react-router-dom";
import {
  decryptData,
  encryptData,
  encrypt,
  decrypt,
} from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import { Apiurl } from "../../util/apiurl";
import moment from "moment";

const AddFormComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  const handleAddSubmit = (data) => {
    console.log("first", data);
    // let PayloadData = {
    //   prouctName: data.ProductName,
    //   accountId: data.PricingMethod.value == "Unitized" ? null : parseInt(data.AccountID),
    //   securityId: data.SecurityID,
    //   isin: data.ISIN,
    //   rtaCode: data.RTACode,
    //   instrumentName: data.InstrumentName.label,
    //   clientName: data.PricingMethod.value == "Unitized" ? null : data.ClientName,
    //   marketValue: parseInt(data.MarketValue),
    //   updatedDate: moment(data.updatedDate).format("YYYY-MM-DD"),
    //   unitizedFlag:data.PricingMethod.value == "Unitized" ? "Yes" : "No",
    //   instrumentDetails: null,
    // };
    // submitData(PayloadData);
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        Apiurl.VMotherProductSave,
        payload
      );
      setLoading(false);
      toast.success("Saved successfully");
      setTimeout(() => {
        navigate(
          "/" + encrypt("VMOtherProductListLanding") + `/${encryptData("List")}`
        );
      }, 200);
    } catch (error) {
      setLoading(false);
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
            <FormComponent onSubmit={handleAddSubmit} />

            
          </div>{" "}
        </>
      )}
    </>
  );
};

export default AddFormComponent;
