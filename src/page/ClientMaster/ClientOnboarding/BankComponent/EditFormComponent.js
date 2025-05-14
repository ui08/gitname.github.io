import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AppModal from "./../../../../Component/Modal/AppModal";
import { Apiurl } from "../../../../util/apiurl";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../../util/axiosInstance";
import Loader from "../../../../util/Loader";
import FormComponent from "./FormComponent";

const EditFormComponent = ({Details}) => {
  const navigate = useNavigate();
  const id = decryptData(useParams().id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [EmailIDl, setEmailIDl] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
 

  const handleEditSubmit = (data) => {
     console.log("data", data);
     const payload = {
       stepperId: id,
       lastStepId: 4,
       id: Details.id,
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
             `/${encryptData("edit")}` +
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
        <div>
          <FormComponent
            initialData={Details}
            previewImage={previewImage}
            onSubmit={handleEditSubmit}
          />
          
        </div>
      )}
    </>
  );
};

export default EditFormComponent;
