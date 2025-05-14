import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Apiurl } from "../../../util/apiurl";
import { decryptData, encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";
import FormComponent from "./FormComponent";
import { getMomentFromDate } from "../../../util/Authenticate";

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
    try {
      const response = await axiosInstance.get(
        `${Apiurl.VMOtherProductSingleView}/${id}`
      );
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      setData(result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = (data) => {
    let PayloadData = {
      id: id,
      prouctName: data.ProductName,
      accountId: parseInt(data.AccountID),
      securityId: data.SecurityID,
      isin: data.ISIN,
      rtaCode: data.RTACode,
      instrumentName: data.InstrumentName.label,
      clientName: data.ClientName,
      marketValue: parseInt(data.MarketValue),
      updatedDate: getMomentFromDate(data.UpdatedDate, "MonthDateYYYY"),
      instrumentDetails: null,
      unitizedFlag:data.PricingMethod.value == "Unitized" ? "Yes" : "No",
    };
    submitData(PayloadData);
  };

  const submitData = async (payload) => {
    try {
      const response = await axiosInstance.post(Apiurl.VMotherProductSave, payload)
      toast.success("Updated Successfully");
      setTimeout(() => {
              navigate(
                "/" + encrypt("VMOtherProductListLanding") + `/${encryptData("List")}`
              );
            }, 200);
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
            initialData={data}
            previewImage={previewImage}
            onSubmit={handleEditSubmit}
          />
        </div>
      )}
    </>
  );
};

export default EditFormComponent;
