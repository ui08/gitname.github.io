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
import { Apiurl } from "../../../util/apiurl";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../util/axiosInstance";
import moment from "moment";
import { getMomentFromDate } from "../../../util/Authenticate";

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
    let PayloadData = {
      securityID: data.SecurityID,
      instrumentName: data.InstrumentName,
      instrumentFullName: data.InstrumentFullName,
      instrumentDescription: data.InstrumentDescription,
      masterProductClassificationId: data.ProductName.value,
      assetClassificationId: data.AssetName.value,
      productName: null,
      assetName: null,
      taxAssetName: data.TaxAssetName,
      entityAssetName: data.EntityAssetName,
      instrumentCategoryName: data.InstrumentCategoryName,
      serviceProviderNameAmcIssuerName: data.ServiceProviderName,
      isin: data.ISIN,
      rtaCode: data.RTACode,
      listingStatus: data.ListingStatus.value,
      benchmarkIndice: data.BenchmarkIndice,
      status: data.Status.value,
      pricingMethod: data.PricingMethod.value,
      instrumentRisk: data.InstrumentRisk,
      issueOpenDate: data.IssueOpenDate == undefined ? null : getMomentFromDate(data.IssueCloseDate, "MonthDateYYYY"),
      issueCloseDate: data.IssueCloseDate == undefined ? null : getMomentFromDate(data.IssueCloseDate, "MonthDateYYYY"),
      maturityDate: data.MaturityDate == undefined ? null : getMomentFromDate(data.MaturityDate, "MonthDateYYYY"),
      faceValue: data.FaceValue,
      // "yieldDividendEntryPassing": "string"
    };
    submitData(PayloadData);
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        Apiurl.IMotherProductSave,
        payload
      );
      setLoading(false);
      toast.success("Saved successfully");
      setTimeout(() => {
        navigate(
          "/" + encrypt("IMOtherProductListLanding") + `/${encryptData("List")}`
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
