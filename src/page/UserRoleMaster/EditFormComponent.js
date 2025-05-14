import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AppModal from "../../Component/Modal/AppModal";
import { Apiurl } from "../../util/apiurl";
import { decryptData, encrypt } from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import FormComponent from "./FormComponent";

const EditFormComponent = () => {
  const navigate = useNavigate();
  const id = decryptData(useParams().id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imageUploadModal, setImageUploadModal] = useState(false);
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
      const response = await axiosInstance.get(`${Apiurl.rolebyid}/${id}`);
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      setData({
        RoleID: result.roleId,
        RoleName: result.roleName,
        SupervisorRoleName: result.supervisorRoleId,
        RoleDescription: result.roleDescription,
        displayName: result.displayName,

        Activation: result.activationReason,
        Deactivation: result.deactivationReason,
      });
      setPreviewImage(result.coverImageBase64);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (file) => {
    setCoverImage(file);
    toast.success("Image successfully uploaded");
  };

  const handleEditSubmit = (data) => {
    console.log(data);
    let PayloadData = {
      roleId: data.RoleID,
      roleName: data.RoleName,
      roleDescription: data.RoleDescription,
      displayName: data.displayName,
      active: true,
      deleted: false,
      status: "Active",
      supervisorRoleId: data.SupervisorRoleName.value,
    };
    setEditModalOpen(true);
    setModalData([]);
    setModalData(PayloadData);
  };
  const handleEdit = () => {
    submitData(modalData);
  };
  const submitData = async (payload) => {
    setEditModalOpen(false);
    setLoading(true);
    try {
      const response = await axiosInstance.put(Apiurl.rolebyupdate, payload);
      setLoading(true);
      toast.success("Role successfully Update");

      setTimeout(() => {
        navigate("/" + encrypt("UserRoleMasterList"));
      }, 200);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      // toast.error(error.data.message);
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
            onFileChangeNew={handleImageUpload}
          />

          <AppModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            handleActon={handleEdit}
            buttonConfigs={[
              {
                text: "Yes",
              },
            ]}
            Modaldata={modalData}
            Modalsize={"md"}
            ModalTitle={"Update Confirmation"}
            ModalBody={"Are you sure you want to edit  ?"}
            btnText={"Yes"}
            show={true}
          />
        </div>
      )}
    </>
  );
};

export default EditFormComponent;
