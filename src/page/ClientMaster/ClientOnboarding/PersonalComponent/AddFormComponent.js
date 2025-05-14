import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Apiurl } from "../../../../util/apiurl";
import { getMomentFromDate } from "../../../../util/Authenticate";
import { encrypt, encryptData } from "../../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../../util/axiosInstance";
import Loader from "../../../../util/Loader";
import AppModal from "./../../../../Component/Modal/AppModal";
import FormComponent from "./FormComponent";

const AddFormComponent = () => {
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
    console.log("stepperId", data);
    const payload = {
      // stepperId: 9007199254740991,

      // id: 9007199254740991,
      lastStepId: 1,
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
      mobileNo:
        data.MobileNumber == "" ||
        data.MobileNumber == undefined ||
        data.MobileNumber == null
          ? null
          : data.MobileNumber,
      nrmRia: data.NRMRIA,
      userCode:
        data.Clientid == "" ||
        data.Clientid == undefined ||
        data.Clientid == null
          ? null
          : data.Clientid,
      clientAccountDetailEntityDto: {
        id: null,
        accountName:
          data.AccountName === undefined || data.AccountName === null
            ? null
            : data.AccountName,
        accountCategory:
          data.AccountCategory === undefined || data.AccountCategory === null
            ? null
            : data.AccountCategory.label,
        distributor:
          data.Distributor === undefined || data.Distributor === null
            ? null
            : data.Distributor.label,
        accountUniqueId:
          data.AccountUniqueID === undefined ||
          data.AccountUniqueID === null ||
          data.AccountUniqueID === ""
            ? null
            : data.AccountUniqueID,
      },
      clientGuardianDetailsEntityDto: {
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
          data.RMCode === undefined || data.RMCode === null
            ? null
            : data.RMCode.value,
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
        addressLine1:
          data.AddressLine1 == "" ||
          data.AddressLine1 == undefined ||
          data.AddressLine1 == null
            ? null
            : data.AddressLine1,
        addressLine2:
          data.AddressLine2 == "" ||
          data.AddressLine2 == undefined ||
          data.AddressLine2 == null
            ? null
            : data.AddressLine2,
        addressLine3: null,

        pincode:
          data.Pincode === undefined || data.Pincode === null
            ? null
            : data.Pincode.value,
        state:
          data.State === undefined || data.State === null ? null : data.State,
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

      toast.success("Personal Details successfully saved");
      // setCoverImage("");
      setTimeout(() => {
        navigate(
          "/" +
            encrypt("JointHoldingFormComponent") +
            `/${encryptData("add")}` +
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
