import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { decryptData, encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
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
        const response = await axiosInstance.get(`${Apiurl.singleViewFamily}/${id}`);
        if (!response.statusText == "OK") throw new Error("Network response was not ok");
        const result = await response.data;
        setData(result);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const handleEditSubmit = (data) => {
    console.log("kk",data);
    let PayloadData = {
    //  familyHeadClientId: data.FamilyName.familyHeadId,
    familyMasterId: data.FamilyName.value,
    memberClientIds: [data.ClientName.value],
    relation: data.Relation.label
    };
    submitData(PayloadData)
    };

    const submitData = async (payload) => {
      try {
        const response = await axiosInstance.post(Apiurl.saveFamilyClientMapping, payload);
        toast.success('Updated Successfully');
        setTimeout(() => {
                navigate("/" +
                                        encrypt("FamilyClientMappingLanding") +
                                        `/${encryptData("List")}`);
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
            <FormComponent initialData={data}  onSubmit={handleEditSubmit}  />
          </div>
      )}
    </>
  );
};

export default EditFormComponent;
