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

const EditFormComponent = ({stepDetails}) => {
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
      setEmailIDl(result.email);
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
        // branch:data.branchId ,
        // zone:data.zoneId
        // branch: result.branchId,
        branchId:data.branch.value == null || data.branch.value == undefined ? "" : data.branch.value,
        zone:data.zoneId.value == null || data.zoneId.value == undefined ? "" : data.zoneId.value
        // zone: result.zoneId,
      });
      setPreviewImage(result.coverImageBase64);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = (data) => {
    console.log("datadatadatadata", data);
    const payload = {
      userId: parseInt(id),
      userName: EmailIDl,
      email: EmailIDl,
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
          data.Country === null || data.Country === undefined
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
      branchId:data.Role.value == 3 ?  data.branch.value : null
        };
    console.log("datadatadatadata", payload);
    setEditModalOpen(true);
    setModalData([]);
    setModalData(payload);
  };
  const handleEdit = () => {
    submitData(modalData);
  };
  const submitData = async (payload) => {
    setEditModalOpen(false);
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        Apiurl.UserDetailsupdate,
        payload
      );
      toast.success("User Edit successfully");
      setCoverImage("");
      setLoading(true);
      setTimeout(() => {
        navigate(
          "/" + encrypt("UserCreationListLanding") + `/${encryptData("List")}`
        );
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
        <div>
          <FormComponent
            initialData={data}
            previewImage={previewImage}
            onSubmit={handleEditSubmit}
          />
          <AppModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            handleActon={handleEdit}
            buttonConfigs={[
              {
                text: "Edit",
              },
            ]}
            Modaldata={modalData}
            Modalsize={"md"}
            ModalTitle={"Update Confirmation"}
            ModalBody={"Are you sure you want to edit  ?"}
            btnText={"Edit"}
            show={true}
          />
        </div>
      )}
    </>
  );
};

export default EditFormComponent;
