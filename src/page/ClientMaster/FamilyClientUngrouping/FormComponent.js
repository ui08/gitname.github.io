import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import { decryptData, encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";
import PatternMessage from "../../../util/PatternMessage";
import { ValidationPattern } from "../../../ValidationPattern/ValidationPattern";
import "./FamilyClientUngroupingFormComponent.scss";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,
}) => {
  const navigate = useNavigate();

  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const mode = decryptData(useParams().mode);
      const [loading, setLoading] = useState(false);
  
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [change, setChange] = useState([
    { id: 1, label: "Yes", value: "Yes" },
    { id: 2, label: "No", value: "No" },
  ]);
  const [changeValue, setChangeValue] = useState({
    id: 2,
    label: "No",
    value: "No",
  });

  const approvalOptions = [
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];
    const [allClientName, setAllClientName] = useState([])
    const [allFamily, setAllFamily] = useState([])
    const [allRelationship, setAllRelationship] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  } = useForm({ defaultValues: initialData });
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setValue("FamilyID", initialData.familyId);
      setValue("FamilyName", initialData.familyName);
      setValue("ClientID", initialData.familyHeadId);
      clientName(initialData.memberClientIds[0]);
      fetchAllFamily(initialData.familyMasterId);
      fetchRelationship(initialData.relation);
    } else {
      clientName();
      fetchAllFamily();
      fetchRelationship();
    }
 
  }, [initialData, reset]);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [FamilyName, ClientName, Relation] = watch([
    "FamilyName",
    "ClientName",
    "Relation",
  ]);

  const isValidCondition = FamilyName && ClientName && Relation;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  const clientName = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.allClients);
      setLoading(false);
      setAllClientName([]);
      Object.values(response.data).map((item) => {
        if (value == item.id) {
          setValue("ClientName", { label: item.name + '-' + item.pan, value: item.id });
        }
        let clientName = item.name + '-' + item.pan
        let SingleData = {
          label: clientName,
          value: item.id,
        };
        setAllClientName((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFamily = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.familyList);
      setLoading(false);
      setAllFamily([]);
      Object.values(response.data.content).map((item) => {
        if (value == item.id) {
          setValue("FamilyName", { label: item.familyName, value: item.familyId });
        }
        let SingleData = {
          label:  item.familyName,
          value: item.id,
          familyHeadId : item.familyHeadId
        };
        setAllFamily((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelationship = async (rel) => {
    setLoading(true);
    console.log('qqq',  rel)

    try {
      const response = await axiosInstance.get(Apiurl.allRelationship);
      setLoading(false);
      setAllRelationship([]);
      Object.values(response.data).map((item) => {
        console.log('uuu', item.value, rel)
        if (rel == item.value) {
          setValue("Relationship", { label: item.value, value: item.id });
        }
        let SingleData = {
          label:  item.value,
          value: item.id,
        };
        setAllRelationship((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/" + encrypt("FamilyClientMappingLanding") + `/${encryptData("List")}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        
         <div className="col-12 col-md-4 col-lg-4">
                          <InputSelect
                            control={control}
                            register={register}
                            setValue={setValue}
                            registerName="FamilyName"
                            mandatory={true}
                            labelName="Select Family"
                            options={allFamily}
                            onSelect={() => {}}
                            divClassName={"divClassName"}
                            previewFlag={isViewMode}
                          />
                        </div>
                    
        
         <div className="col-12 col-md-4 col-lg-4">
                          <InputSelect
                            control={control}
                            register={register}
                            setValue={setValue}
                            registerName="ClientName"
                            mandatory={true}
                            labelName="Select Client"
                            options={allClientName}
                            onSelect={() => {}}
                            divClassName={"divClassName"}
                            previewFlag={isViewMode}
                            isMulti = {true}
                          />
                        </div>
        
         <div className="col-12 col-md-4 col-lg-4">
                          <InputSelect
                            control={control}
                            register={register}
                            setValue={setValue}
                            registerName="Relation"
                            mandatory={true}
                            labelName="Select Relation"
                            options={allRelationship}
                            onSelect={() => {}}
                            divClassName={"divClassName"}
                            previewFlag={isViewMode}
                          />
                        </div>
        

        {!isViewMode && (
          <div className="d-flex gap-2">
            <ButtonComp
              wrapperName="submit_btn_wrapper"
              type={"submit"}
              btnStyle="box"
              btnText={mode === "edit" ? "Edit" : "Submit"}
              disabled={!isValid}
              onClick={() => handleSubmit()}
            />

            <ButtonComp
              wrapperName="submit_btn_wrapper"
              type={"submit"}
              btnStyle="box"
              btnText={"Cancel"}
              // disabled={!isValid}
              onClick={() => handleCancel()}
            />
          </div>
        )}
      </div>
    </form>
  );
};

FormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
};
export default FormComponent;
