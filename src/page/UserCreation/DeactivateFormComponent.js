import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../util/Authenticate/CryptoJS";
import Loader from "../../util/Loader";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import FormComponent from "./FormComponent";

const DeactivateFormComponent = () => {
  const id = decryptData(useParams().id);
  const navigate = useNavigate();
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

  const handleViewSubmit = (data) => {
    console.log("DeactivateFormComponent", data);
    const payload = {
      userId: parseInt(id),
      activateFlag: false,
      deactivateFlag: true,
      activationReason: data.DeactivationorActivation.value,
      activationReason: null,
    };
    console.log("AddSubmit", payload);
    submitData(payload);
  };
  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(Apiurl.useractivation, payload);
      toast.success("User successfully Update");

      navigate(
        "/" + encrypt("UserCreationListLanding") + `/${encryptData("List")}`
      );
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
            initialData={data}
            onSubmit={handleViewSubmit}
            previewImage={previewImage}
          />
        </div>
      )}
    </>
  );
};

export default DeactivateFormComponent;
