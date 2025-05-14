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
import "./FamilyMasterFormComponent.scss";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";

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
      const [familyName, setFamilyName] = useState("");
      const [error,setError] = useState(false);
      const [changeName,setChangeName] = useState(false);

  
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
      setValue("FamilyID", initialData.id);
      setValue("FamilyName", initialData.familyName);
      setValue("ClientID", initialData.familyHeadId);
      setValue("ClientName", { label: initialData.familyHeadNamePAN, value: initialData.familyHeadId });
    }
    clientName();
  }, [initialData, reset]);
  useEffect(() => {
    if (familyName.trim()) {
      setError(false)
      const timeoutId = setTimeout(() => {
        checkExistingFamilyName(familyName);
      }, 500); // Adjust debounce time as needed (e.g., 500ms)

      return () => clearTimeout(timeoutId); // Cleanup on unmount or retyping
    }
  }, [familyName]);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [ FamilyName, ClientName] = watch([
    "FamilyName",
    "ClientName",
  ]);

  const isValidCondition =  FamilyName && ClientName;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }



  const checkExistingFamilyName = async (name) => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`${Apiurl.checkDuplicateFamilyName}` + name);
      console.log("API Response:", response.data);
      if(response.data == true) {
        setError(true)
        setLoading(false)
      } else {
        setError(false)
        setLoading(false)
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const clientName = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.allClients);
      setLoading(false);
      setAllClientName([]);
      Object.values(response.data).map((item) => {        
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

  const handleCancel = () => {
    navigate("/" + encrypt("FamilyMasterLanding") + `/${encryptData("List")}`);
  };

  return (
    <>
          {/* {loading ? (
            <Loader pagename={t("Common:App_lms_Common_00269")} />
          ) : (
            <> */}
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
       
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Family Name"
            maxLength={255}
            minLength={1}
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Family Name"),
            }}
            registerName={"FamilyName"}
            name={"FamilyName"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={(e) => {
              setChangeName(true)
              setFamilyName(e.target.value)
            }}
            divClassName={"divClassName"}
          />
          {error && (
          <small className="duplicate_error">{"Family Name already exist"}</small>
        )}
        </div>
       
         <div className="col-12 col-md-4 col-lg-4">
                          <InputSelect
                            control={control}
                            register={register}
                            setValue={setValue}
                            readOnly={isViewMode ? true : false}
                            disabled={isViewMode ? true : false}
                            registerName="ClientName"
                            mandatory={true}
                            labelName="Family Head "
                            options={allClientName}
                            onSelect={() => {}}
                            divClassName={"divClassName"}
                            previewFlag={isViewMode ? true : false}
                            
                          />
                        </div>
                        {/* {!isAddMode && (
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Client Name"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Client Name"),
            }}
            registerName={"ClientName"}
            name={"ClientName"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>)} */}

        {!isAddMode && (
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode || isEditMode ? true : false}
            disabled={isViewMode || isEditMode ? true : false}
            type="text"
            labelName="Family ID"
           
            registerName={"FamilyID"}
            name={"FamilyID"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>)}

        {!isViewMode && (
          <div className="d-flex gap-2">
            <ButtonComp
              wrapperName="submit_btn_wrapper"
              type={"submit"}
              btnStyle="box"
              btnText={mode === "edit" ? "Edit" : "Submit"}
              disabled={!isValid || error }
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
    </>
    //   )}
    // </>
  );
}


FormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
};
export default FormComponent;
