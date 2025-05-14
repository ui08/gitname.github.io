import React, { useEffect, useState } from "react";
import Loader from "../../../util/Loader";
import FormComponent from "./FormComponent";
import { useParams } from "react-router-dom";
import { decryptData, encryptData, encrypt, decrypt } from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import { Apiurl } from "../../../util/apiurl";

const ViewFormComponent = () => {
  const id = decryptData(useParams().id);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

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
  setLoading(true)
      try {
        const response = await axiosInstance.get(`${Apiurl.IMSingleView}/${id}`);
        
        if (!response.statusText == "OK") throw new Error("Network response was not ok");
        setLoading(false);

        const result = await response.data;
        setData(result)
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
            <FormComponent initialData={data} onSubmit={handleViewSubmit}/>
          </div>

      )}
    </>
  );
};

export default ViewFormComponent;
