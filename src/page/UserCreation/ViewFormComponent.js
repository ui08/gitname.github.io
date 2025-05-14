import React, { useEffect, useState } from "react";
import Loader from "../../util/Loader";
import FormComponent from "./FormComponent";
import { useParams } from "react-router-dom";
import {
  decryptData,
  encryptData,
  encrypt,
  decrypt,
} from "../../util/Authenticate/CryptoJS";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";

const ViewFormComponent = () => {
  const id = decryptData(useParams().id);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

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
        `${Apiurl.getUserDetailsByUserId}/${id}`
      );
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      console.log(result);
      setData({
        FirstName: result.otherUserDetails.firstName,
        LastName: result.otherUserDetails.lastName,
        Gender: result.otherUserDetails.gender,
        OtherGender: result.otherUserDetails.otherGender,
        EmailID: result.email,
        Country: result.otherUserDetails.country,
        MobileNumber: result.otherUserDetails.mobileNo,
        Pincode: result.otherUserDetails.pincode,
        State: result.otherUserDetails.state,
        City: result.otherUserDetails.city,
        EmployeeCode: result.otherUserDetails.empCode,
        EUIN: result.otherUserDetails.euin,
        SubBrokerCode: result.otherUserDetails.subBrokerCode,
        Role: result.userRoles[0],
        Supervisorrole: result.supervisorUserId,
        displayNameactivation:
          result.activeFlag == true && result.activationReason !== null
            ? result.activationReason
            : result.activeFlag == false && result.deactivationReason !== null
            ? result.deactivationReason
            : null,
        displayNameactivationstatus: result.activeFlag ? "Active" : "Inactive",
        branch: result.branchId,
        zone: result.zoneId,
      });
      setPreviewImage(result.coverImageBase64);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleViewSubmit = () => {};

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <div>
          <FormComponent
            initialData={data}
            onSubmit={handleViewSubmit}
            previewImage={previewImage}
          />
        </div>
      )}
    </>
  );
};

export default ViewFormComponent;
