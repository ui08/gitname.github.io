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
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
 


  const handleEditSubmit = (data) => {
    console.log("data", data);
    const payload = {
      lastStepId: 3,
      id: Details.id,
      stepperId: id,
      nomineeName:
        data.NameN1 == "" || data.NameN1 == null || data.NameN1 == undefined
          ? null
          : data.NameN1,
      gender:
        data.GenderN1 === undefined ||
        data.GenderN1 === null ||
        data.GenderN1 === ""
          ? null
          : data.GenderN1.label,
      otherGender:
        data.OtherGenderN1 == "" ||
        data.OtherGenderN1 == null ||
        data.OtherGenderN1 == undefined
          ? null
          : data.OtherGenderN1,
      dateOfBirth: getMomentFromDate(data.BirthdateN1, "DateDis"),
      percentage:
        data.PercentageN1 == "" ||
        data.PercentageN1 == null ||
        data.PercentageN1 == undefined
          ? null
          : data.PercentageN1,
      relation:
        data.RelationN1 === undefined ||
        data.RelationN1 === null ||
        data.RelationN1 === ""
          ? null
          : data.RelationN1.label,
      otherRelation:
        data.OtherRelationN1 == "" ||
        data.OtherRelationN1 == null ||
        data.OtherRelationN1 == undefined
          ? null
          : data.OtherRelationN1,
      addressLine1:
        data.AddressLine1N1 == "" ||
        data.AddressLine1N1 == null ||
        data.AddressLine1N1 == undefined
          ? null
          : data.AddressLine1N1,
      addressLine2:
        data.AddressLine2N1 == "" ||
        data.AddressLine2N1 == null ||
        data.AddressLine2N1 == undefined
          ? null
          : data.AddressLine2N1,
      addressLine3:
        data.AddressLine3N1 == "" ||
        data.AddressLine3N1 == null ||
        data.AddressLine3N1 == undefined
          ? null
          : data.AddressLine3N1,
      city:
        data.CityN1 == "" || data.CityN1 == null || data.CityN1 == undefined
          ? null
          : data.CityN1,
      pincode:
        data.PincodeN1 === undefined ||
        data.PincodeN1 === null ||
        data.PincodeN1 === ""
          ? null
          : data.PincodeN1.label,
      state:
        data.StateN1 == "" || data.StateN1 == null || data.StateN1 == undefined
          ? null
          : data.StateN1,
    };
    console.log("AddSubmit", payload);
    submitData(payload);
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(Apiurl.addNomineeDetails, [
        payload,
      ]);
      toast.success("Nominee Details Added");
      setCoverImage("");
      setTimeout(() => {
        navigate(
          "/" +
            encrypt("BankFormComponent") +
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
