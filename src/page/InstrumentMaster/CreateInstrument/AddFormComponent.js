import React, { useEffect, useState } from "react";
import Loader from "../../../util/Loader";
import FormComponent from "./FormComponent.js";
import toast from "react-hot-toast";
import AppModal from "../../../Component/Modal/AppModal";
import { useNavigate } from "react-router-dom";
import {
  decryptData,
  encryptData,
  encrypt,
  decrypt,
} from "../../../util/Authenticate/CryptoJS";

const AddFormComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [imageUploadModal, setImageUploadModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleAddSubmit = (data) => {
    console.log("first", data);

  };

  const submitData = async (payload) => {
    try {
      const response = await axiosInstance.post(Apiurl.unitCreate, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Successfully created");
      setCoverImage("");
      setTimeout(() => {
        navigate("/" + encrypt("UnitStatusViewlist"));
      }, 200);
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setImageUploadModal(false);
  };

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <>
          <div>
            <FormComponent
              onSubmit={handleAddSubmit}
            />

            <AppModal
              isOpen={imageUploadModal}
              onClose={() => setImageUploadModal(false)}
              handleActon={""}
              buttonConfigs={[]}
              Modaldata={""}
              Modalsize={"md"}
              ModalTitle={"Image upload"}
              ModalBody={"Please upload cover image"}
              btnText={"Deleted"}
              show={true}
            />
          </div>{" "}
        </>
      )}
    </>
  );
};

export default AddFormComponent;
