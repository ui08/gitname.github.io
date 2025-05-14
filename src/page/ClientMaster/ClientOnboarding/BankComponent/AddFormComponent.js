import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Apiurl } from "../../../../util/apiurl";
import { encrypt, encryptData } from "../../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../../util/axiosInstance";
import Loader from "../../../../util/Loader";
import AppModal from "./../../../../Component/Modal/AppModal";
import FormComponent from "./FormComponent";

const AddFormComponent = ({ Details }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
  
    }, 2000);
  }, []);

  const handleAddSubmit = (data) => {
    console.log("data", data);
    const payload = {
      stepperId: Details.id,
      lastStepId: 4,
      // "id": 9007199254740991,
      bankAccountName:
        data.AccountName == "" ||
        data.AccountName == null ||
        data.AccountName == undefined
          ? null
          : data.AccountName,
      accountNumber:
        data.AccountNumber == "" ||
        data.AccountNumber == null ||
        data.AccountNumber == undefined
          ? null
          : data.AccountNumber,
      ifscCode:
        data.IFSCCode == "" ||
        data.IFSCCode == null ||
        data.IFSCCode == undefined
          ? null
          : data.IFSCCode,
      bankName:
        data.BankName == "" ||
        data.BankName == null ||
        data.BankName == undefined
          ? null
          : data.BankName,
      branchName:
        data.BranchName == "" ||
        data.BranchName == null ||
        data.BranchName == undefined
          ? null
          : data.BranchName,
      accountType:
        data.AccountType === undefined ||
        data.AccountType === null ||
        data.AccountType == ""
          ? null
          : data.AccountType.label,
    };
    console.log("AddSubmit", payload);
    submitData(payload);
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(Apiurl.addBankDetails, [
        payload,
      ]);
      toast.success("Bank Details successfully saved");
      setCoverImage("");
      setTimeout(() => {
        navigate(
          "/" +
            encrypt("FatcaFormComponent") +
            `/${encryptData("add")}` +
            `/${encryptData(response.data[0]?.stepperId)}`
        );
      }, 200);
      setLoading(false);
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
            <FormComponent onSubmit={handleAddSubmit} initialData={data} />

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
