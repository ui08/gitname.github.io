import React, { useEffect, useState } from "react";
import Loader from "../../../util/Loader";
import FormComponent from "./FormComponent.js";
import { useParams } from "react-router-dom";
import { decryptData, encryptData, encrypt, decrypt } from "../../../util/Authenticate/CryptoJS";

const ViewFormComponent = () => {
  const id = decryptData(useParams().id);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

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


  const handleViewSubmit = () => {};

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        
          <div>
            <FormComponent initialData={data} onSubmit={handleViewSubmit} previewImage={previewImage}/>
          </div>

      )}
    </>
  );
};

export default ViewFormComponent;
