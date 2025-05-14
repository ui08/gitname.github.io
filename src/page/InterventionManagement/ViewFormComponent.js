import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import { decryptData } from "../../util/CryptoJS";
import Loader from "../../util/Loader";
import { Apiurl } from "./../../util/apiurl";
import FormComponent from "./FormComponent";

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
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${Apiurl.interventionSingleView}/${id}`);
        // console.log("result",response);
        if (!response.statusText == "OK") throw new Error("Network response was not ok");
        const result = await response.data;
        setData(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
}, [])

  const handleViewSubmit = () => {};

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        
          <div>
            <FormComponent initialData={data} onSubmit={handleViewSubmit} />
          </div>

      )}
    </>
  );
};

export default ViewFormComponent;
