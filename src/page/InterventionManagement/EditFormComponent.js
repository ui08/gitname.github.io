import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import { decryptData, encrypt } from "../../util/CryptoJS";
import Loader from "../../util/Loader";
import { Apiurl } from "./../../util/apiurl";
import FormComponent from "./FormComponent";

const EditFormComponent = () => {
  const id = decryptData(useParams().id);
  const [singledata, setSingleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${Apiurl.interventionSingleView}/${id}`
        );
        if (!response.statusText == "OK")
          throw new Error("Network response was not ok");
        const result = await response.data;
        setSingleData(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditSubmit = (data) => {
    const temInterventionid = data.interventionid;
    const temInterventionLevels = data.interventionLevels;
    const combinedInterventionData = temInterventionid.map((item, index) => ({
      ...item,
      interventionLevels: temInterventionLevels[index],
    }));

    const Data = {
      id: id,
      interventionName: data.interventionName,
      status: "Active",
      levels: combinedInterventionData,
      interventionId: data.interventionId,
    };
    submitData(Data);
  };

  const submitData = async (payload) => {
    try {
      const response = await axiosInstance.put(
        Apiurl.interventionEdit,
        payload
      );
      toast.success(
        t("Messages:UpdateMessage", { mode: t("Common:App_lms_Common_00004") })
      );

      setTimeout(() => {
        navigate("/" + encrypt("Interventionlist"));
      }, 2000);
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
          <FormComponent initialData={singledata} onSubmit={handleEditSubmit} />
        </div>
      )}
    </>
  );
};

export default EditFormComponent;
