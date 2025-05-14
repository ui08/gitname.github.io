import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import { decryptData, encrypt, encryptData } from "../../util/CryptoJS";
import Loader from "../../util/Loader";
import { Apiurl } from "./../../util/apiurl";
import FormComponent from "./FormComponent";

const EditFormComponent = () => {
  const navigate = useNavigate();
  const id = decryptData(useParams().id);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(()=>{
    fetchData();
  },[])

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${Apiurl.schoolSingleView}/${id}`);
        if (!response.statusText == "OK") throw new Error("Network response was not ok");
        const result = await response.data;

        setData({
          schoolId: result.schoolId,
          schoolName: result.schoolName,
          state: result.state,
          city: result.city,
          pincode: result.pincode,
        });

      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

  const handleEditSubmit = (data) => {
    // console.log("Updating:", data);
    submitData(data);
  };

  const submitData = async (payload) => {
    try {
      const response = await axiosInstance.put(Apiurl.singleSchoolEdit,payload);
      toast.success(
        t("Messages:UpdateMessage", { mode: t("Common:App_lms_Common_00004B") })
      );
      setTimeout(() => {
        navigate(
         "/" +
        encrypt("Schoollist") +
        `/${encryptData("Individual")}`
        );
      }, 500);

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
            <FormComponent initialData={data} onSubmit={handleEditSubmit} />
          </div>
      )}
    </>
  );
};

export default EditFormComponent;
