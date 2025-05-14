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
import axiosInstance from "../../../util/axiosInstance";

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
    const PayloadData = {
      productName: data.ProductName,
      productDescription: data.ProductDescription,
      lookupAssetClassId: data.AssetClass.value,
      lookupAssetSubClassId: data.SubAssetClass.value,
      masterProductTypeId: data.ProductType.value,
    };
    submitData(PayloadData);
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        Apiurl.saveProductType,
        payload
      );
      toast.success(" Successfully saved");
      setTimeout(() => {
        navigate("/" + encrypt("ProductTypeMasterList"));
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
