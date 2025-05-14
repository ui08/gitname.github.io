import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AppModal from "../../Component/Modal/AppModal";
import { Apiurl } from "../../util/apiurl";
import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
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
    console.log("data", data);
    const payload = {
      // "userId": 9007199254740991,
      userName: data.EmailID,
      email: data.EmailID,
      activeFlag: true,
      userRoles: [data.Role.roleName],
      fullName: data.FirstName + " " + data.LastName,
      otherUserDetails: {
        firstName: data.FirstName,
        lastName: data.LastName,
        gender:
          data.Gender === undefined || data.Gender === null
            ? null
            : data.Gender.label,
        otherGender: data.OtherGender,
        country:
          data.Country === undefined || data.Country === null
            ? null
            : data.Country.value,
        mobileNo: data.MobileNumber,
        pincode: data.Pincode.value,
        state: data.State,
        city: data.City === undefined || data.City === null ? null : data.City,
        empCode: data.EmployeeCode,
        euin: data.EUIN === "" ? null : data.EUIN,
        subBrokerCode: data.SubBrokerCode === "" ? null : data.SubBrokerCode,
      },
      supervisorUserId:
        data.Supervisorrole === undefined || data.Supervisorrole === null
          ? null
          : data.Supervisorrole.value,
      branchId: data.Role.value == 3 ? data.branch.value : null,
    };
    console.log("AddSubmit", payload);
    submitData(payload);
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(Apiurl.userregister, payload);
      toast.success("User successfully created");
      setCoverImage("");
      setTimeout(() => {
        navigate(
          "/" + encrypt("UserCreationListLanding") + `/${encryptData("List")}`
        );
      }, 200);
      setLoading(false);
    } catch (error) {
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
