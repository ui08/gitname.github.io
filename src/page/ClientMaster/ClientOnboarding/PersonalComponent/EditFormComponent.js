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
import { getMomentFromDate } from "../../../../util/Authenticate";

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
  const [stepDetails, setStepDetails] = useState([])
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  
    
  // const fetchData = async () => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `${Apiurl.getUserDetailsByUserId}/${id}`
  //     );
  //     if (!response.statusText == "OK")
  //       throw new Error("Network response was not ok");
  //     const result = await response.data;
  //     setEmailIDl(result.email);
  //     setData({
  //       FirstName: result.otherUserDetails.firstName,
  //       LastName: result.otherUserDetails.lastName,
  //       Gender: result.otherUserDetails.gender,
  //       OtherGender: result.otherUserDetails.otherGender,
  //       EmailID: result.email,
  //       Country: result.otherUserDetails.country,
  //       MobileNumber: result.otherUserDetails.mobileNo,
  //       Pincode: result.otherUserDetails.pincode,
  //       State: result.otherUserDetails.state,
  //       City: result.otherUserDetails.city,
  //       EmployeeCode: result.otherUserDetails.empCode,
  //       EUIN: result.otherUserDetails.euin,
  //       SubBrokerCode: result.otherUserDetails.subBrokerCode,
  //       Role: result.userRoles[0],
  //       Supervisorrole: result.supervisorUserId,
  //       // branch:data.branchId ,
  //       // zone:data.zoneId
  //       // branch: result.branchId,
  //       branchId:data.branch.value == null || data.branch.value == undefined ? "" : data.branch.value,
  //       zone:data.zoneId.value == null || data.zoneId.value == undefined ? "" : data.zoneId.value
  //       // zone: result.zoneId,
  //     });
  //     setPreviewImage(result.coverImageBase64);
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleEditSubmit = (data) => {
     console.log("stepperId", data);
     const payload = {
       stepperId: id,
 
       id: Details.clientMasterEntityDTO.id,
       lastStepId: IDBDatabase,
       name: data.InvestorName,
       pan: data.PanNumber,
       investorType: data.InvestorType,
       gender:
         data.Gender === undefined || data.Gender === null
           ? null
           : data.Gender.label,
       email: data.EmailID,
       isFamilyHead:
         data.FamilyHead === "Yes" || data.FamilyHead === undefined
           ? true
           : false,
       isAutoFeeMapping:
         data.AutoFeeMappinghe === "Yes" || data.isAutoFeeMapping === undefined
           ? true
           : false,
       isFamilyHeadAway:
         data.Reportsbyheld === "Yes" || data.isFamilyHeadAway === undefined
           ? true
           : false,
       dateOfBirth: getMomentFromDate(data.Birthdate, "DateDis"),
       mobileNo: data.MobileNumber == "" || data.MobileNumber == undefined || data.MobileNumber == null ? null : data.MobileNumber,
       nrmRia: data.NRMRIA,
       userCode: data.Clientid == "" || data.Clientid == undefined || data.Clientid == null ? null : data.Clientid,
       clientAccountDetailEntityDto: {
         id: id,
         accountName: data.AccountName === undefined || data.AccountName === null ? null : data.AccountName,
         accountCategory:
           data.AccountCategory === undefined || data.AccountCategory === null
             ? null
             : data.AccountCategory.label,
             distributor: data.Distributor === undefined || data.Distributor === null
             ? null
             : data.Distributor.label,         accountUniqueId: data.AccountUniqueID === undefined || data.AccountUniqueID === null ? null : data.AccountUniqueID,
       },
       clientGuardianDetailsEntityDto: {
        id : Details.clientGuardianDetailsEntityDto.id,
         name: data.GuardianName,
         dateOfBirth: getMomentFromDate(data.Guardiandate, "DateDis"),
         pan: data.GuardianPanNumber,
         relationwithMinor:
           data.Relationwithminor === undefined ||
           data.Relationwithminor === null
             ? null
             : data.Relationwithminor.label,
       },
       familyMasterEntityDto: {
         id:
         Details.clientMasterEntityDTO.familyMasterEntityDto?.id,
         name:
           data.FamilyName === undefined || data.FamilyName === null
             ? null
             : data.FamilyName.value,
         rmCode:
           data.RMCode === undefined || data.RMCode === null
             ? null
             : data.RMCode.value,
       },
       clientAddressDetailsEntityDto: {
        id : Details.clientAddressDetailsEntityDto.id,
         addressLine1: data.AddressLine1 == "" || data.AddressLine1 == undefined || data.AddressLine1 == null ? null : data.AddressLine1,
         addressLine2: data.AddressLine2 == "" || data.AddressLine2 == undefined || data.AddressLine2 == null ? null : data.AddressLine2,
         addressLine3: null,
 
         pincode:
           data.Pincode === undefined || data.Pincode === null
             ? null
             : data.Pincode.value,
         state: data.State === undefined || data.State === null ? null : data.State,
         city: data.City === undefined || data.City === null ? null : data.City,
       },
     };
     console.log("AddSubmit", payload);
     submitData(payload);
   };
 
   const submitData = async (payload) => {
     setLoading(true);
     try {
       const response = await axiosInstance.post(
         Apiurl.addPersonalDetails,
         payload
       );
       console.log("successfully", response.data);
       toast.success("Personal Details successfully saved");
       // setCoverImage("");
       setTimeout(() => {
         navigate(
           "/" +
             encrypt("JointHoldingFormComponent") +
             `/${encryptData("edit")}` +
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
