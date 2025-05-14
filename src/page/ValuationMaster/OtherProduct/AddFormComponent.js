import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AppModal from "../../../Component/Modal/AppModal";
import { Apiurl } from "../../../util/apiurl";
import { getMomentFromDate } from "../../../util/Authenticate";
import {
  encrypt,
  encryptData
} from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";
import FormComponent from "./FormComponent";

const AddFormComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [imageUploadModal, setImageUploadModal] = useState(false);

  useEffect(() => {
  }, []);

  const handleAddSubmit = (data) => {
    console.log("first", data);
    let PayloadData = {
      prouctName: data.ProductName,
      accountId: data.PricingMethod.value == "Unitized" ? null : parseInt(data.AccountID),
      securityId: data.SecurityID,
      isin: data.ISIN,
      rtaCode: data.RTACode,
      instrumentName: data.InstrumentName.label,
      clientName: data.PricingMethod.value == "Unitized" ? null : data.ClientName,
      marketValue: parseInt(data.MarketValue),
      updatedDate:getMomentFromDate(data.UpdatedDate, "MonthDateYYYY"),
      unitizedFlag:data.PricingMethod.value == "Unitized" ? "Yes" : "No",
      instrumentDetails: null,
    };
    submitData(PayloadData);
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
