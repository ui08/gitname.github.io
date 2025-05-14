import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AppModal from "../../Component/Modal/AppModal";
import { Apiurl } from "../../util/apiurl.js";
import { encrypt } from "../../util/Authenticate/CryptoJS.js";
import axiosInstance from "../../util/axiosInstance.js";
import Loader from "../../util/Loader";
import FormComponent from "./FormComponent.js";

const AddFormComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [imageUploadModal, setImageUploadModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleAddSubmit = (data) => {
    console.log("first", data);
    const payload = {
      roleName: data.RoleName,
      roleDescription: data.RoleDescription,
      displayName: data.displayName,
      active: true,
      deleted: false,
      status: "Active",
      supervisorRoleId: data.SupervisorRoleName.value,
    };
    submitData(payload)
  };

  const submitData = async (payload) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(Apiurl.roleCreate, payload, {
      
      });
      toast.success("Role successfully created");
       setTimeout(() => {
             navigate("/" + encrypt("UserRoleMasterList"));
           }, 200);
           setLoading(false);
    } catch (error) {
      setLoading(false);
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
