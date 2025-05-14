import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { decryptData, encrypt } from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import FormComponent from "./FormComponent";
import axiosInstance from "../../../util/axiosInstance";
import { Apiurl } from "../../../util/apiurl";


const EditFormComponent = () => {
  const navigate = useNavigate();
  const id = decryptData(useParams().id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [imageUploadModal, setImageUploadModal] = useState(false);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    fetchData();
},[])

const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${Apiurl.viewPermission}/${id}`);
        if (!response.statusText == "OK") throw new Error("Network response was not ok");
        const result = await response.data;
        setData(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const handleEditSubmit = (data) => {
      console.log("first", data);
      const payload = {
        id : id,
        permissionName: data.permissionName,
        permissionShortName: data.permissionShortName,
        permissionDesc: data.permissionDesc,
        roleIdList: [1],
        activeFlag: true,
      };
      console.log(payload);
      submitData(payload);
    };
  
    const submitData = async (payload) => {
      try {
        const response = await axiosInstance.post(
          Apiurl.editPermission,
          payload
        );
        toast.success("Successfully updated");
        setTimeout(() => {
          navigate("/" + encrypt("Rolepermission"));
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
       <Loader pagename="Updating ..."/>
      ) : (
       <div>
            <FormComponent initialData={data} previewImage={previewImage} onSubmit={handleEditSubmit} />
          </div>
      )}
    </>
  );
};

export default EditFormComponent;
