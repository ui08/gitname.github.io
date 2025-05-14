import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Apiurl } from "../../util/apiurl";
import { decryptData } from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import FormComponent from "./FormComponent";

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
        displayNameactivation:
          result.status === "Active" && result.activationReason !== null
            ? result.activationReason
            : result.status === "Inactive" && result.deactivationReason !== null
            ? result.deactivationReason
            : null,
        displayNameactivationstatus: result.status,
      });

      setPreviewImage(result.coverImageBase64);
    } catch (error) {
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
          <FormComponent initialData={data} previewImage={previewImage} />
        </div>
      )}
    </>
  );
};

export default ViewFormComponent;
