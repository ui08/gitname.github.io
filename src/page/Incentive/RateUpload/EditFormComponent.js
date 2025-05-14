import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { decryptData, encrypt } from "../../../util/Authenticate/CryptoJS";
import Loader from "../../../util/Loader";
import FormComponent from "./FormComponent";


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
        const response = await axiosInstance.get(`${Apiurl.courseSingleView}/${id}`);
        if (!response.statusText == "OK") throw new Error("Network response was not ok");
        const result = await response.data;
        setData({
          name: result.name,
          validity: result.validity,
          description: result.description,
        });
        setPreviewImage(result.coverImageBase64)
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const handleEditSubmit = (data) => {
    console.log("kk",data);
    };

    const submitData = async (payload) => {
      try {
        const response = await axiosInstance.put(Apiurl.unitEdit, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success('Successfully created');
        setCoverImage('');
        setTimeout(() => {
          navigate(
            "/" +
            encrypt("AssetClassList") 
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
       <Loader pagename="Updating ..."/>
      ) : (
       <div>
            <FormComponent initialData={data} previewImage={previewImage} onSubmit={handleEditSubmit} onFileChangeNew={handleImageUpload} />
          </div>
      )}
    </>
  );
};

export default EditFormComponent;
