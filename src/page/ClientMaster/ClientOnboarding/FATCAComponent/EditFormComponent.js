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
       const payload = 
         {
           lastStepId: 5,
           id : Details.clientFatcaDetailsEntityDto.id,
           stepperId: id,    
           countryOfBirth:
             data.Country1 === undefined || data.Country1 === null
               ? null
               : data.Country1.label,
           taxResidentCountry:
             data.TaxResidentCountry1 === undefined ||
             data.TaxResidentCountry1 === null
               ? null
               : data.TaxResidentCountry1.label,
           identificationNumber: data.IdentificationNumber1,
           identificationType: data.IdentificationType1 === undefined || data.IdentificationType1 === null
           ? null
           : data.IdentificationType1.label,
           politicalExposureType:
             data.PoliticalExposureType1 === undefined ||
             data.PoliticalExposureType1 === null
               ? null
               : data.PoliticalExposureType1.label,
           incomeSlab:
             data.IncomeSlab1 === undefined || data.IncomeSlab1 === null
               ? null
               : data.IncomeSlab1.label,
           wealthSource:
             data.WealthSource1 === undefined || data.WealthSource1 === null
               ? null
               : data.WealthSource1.label,
           occupation:
             data.Occupation1 === undefined || data.Occupation1 === null
               ? null
               : data.Occupation1.label,
         }
       
   
       console.log("AddSubmit", payload);
       submitData(payload);
     };
   
     const submitData = async (payload) => {
       setLoading(true);
       try {
         const response = await axiosInstance.post(
           Apiurl.addFatcails,
           payload
         );
         toast.success("Fatca details successfully saved");
         setCoverImage("");
         setTimeout(() => {
           navigate(
             "/" +
               encrypt("ViewComponentFormComponent") +
               `/${encryptData("view")}` +
               `/${encryptData(response.data?.stepperId)}`
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
