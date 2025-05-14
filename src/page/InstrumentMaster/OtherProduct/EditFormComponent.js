import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import FormComponent from "./FormComponent";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

const EditFormComponent = () => {
  const navigate = useNavigate();
  const id = decryptData(useParams().id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imageUploadModal, setImageUploadModal] = useState(false);

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
      const response = await axiosInstance.get(`${Apiurl.IMSingleView}/${id}`);

      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      setLoading(false);

      const result = await response.data;
      setData(result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = (data) => {
    console.log("kk", data);
    let PayloadData = {
      id: id,
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
      issueOpenDate:
        data.IssueOpenDate == undefined
          ? null
          : getMomentFromDate(data.IssueCloseDate, "MonthDateYYYY"),
      issueCloseDate:
        data.IssueCloseDate == undefined
          ? null
          : getMomentFromDate(data.IssueCloseDate, "MonthDateYYYY"),
      maturityDate:
        data.MaturityDate == undefined
          ? null
          : getMomentFromDate(data.MaturityDate, "MonthDateYYYY"),
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
      toast.success("Updated successfully");
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

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <div>
          <FormComponent initialData={data} onSubmit={handleEditSubmit} />
        </div>
      )}
    </>
  );
};

export default EditFormComponent;
