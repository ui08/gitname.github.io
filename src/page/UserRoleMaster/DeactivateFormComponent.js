import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { decryptData, encrypt } from "../../util/Authenticate/CryptoJS";
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
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Apiurl.rolebyid}/${id}`);
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      console.log(result);
      setData({
        RoleID: result.roleId,
        RoleName: result.roleName,
        SupervisorRoleName: result.supervisorRoleId,
        RoleDescription: result.roleDescription,
        displayName: result.displayName,
        DeactivationorActivationtext: result.deactivationReason,
      });
      setPreviewImage(result.coverImageBase64);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSubmit = (data) => {
    console.log("DeactivateFormComponent", data);
    const payload = {
      roleId: parseInt(id),
      activateFlag: false,
      deactivateFlag: true,
      deactivationReason: data.DeactivationorActivation.value,
      activationReason: null,
    };
    console.log("AddSubmit", payload);
    submitData(payload);
  };
  const submitData = async (payload) => {
    try {
      const response = await axiosInstance.post(Apiurl.activationrole, payload);
      toast.success("Role successfully Update");

      navigate("/" + encrypt("UserRoleMasterList"));
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
