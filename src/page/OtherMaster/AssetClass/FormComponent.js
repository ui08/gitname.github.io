import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import { decryptData, encrypt } from "../../../util/Authenticate/CryptoJS";
import PatternMessage from "../../../util/PatternMessage";
import { ValidationPattern } from "../../../ValidationPattern/ValidationPattern";
import "./AssetClassFormComponent.scss";

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,
}) => {
    const navigate = useNavigate();
  
  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const mode = decryptData(useParams().mode);
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
      setValue('AssetClassID', initialData.id)
      setValue('AssetName', initialData.description)
      setValue('EntityAssetName', initialData.entityAssetDescription)
      setValue('TaxAssetName', initialData.taxAssetDescription)
    }
  }, [initialData, reset]);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [
    AssetName
  ] = watch([
    "AssetName"
  ]);

  const isValidCondition =
  AssetName


  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  };

  const handleCancel =()=>{
    navigate("/" + encrypt("AssetClassList"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        {!isAddMode && (
                       <div className="col-12 col-md-4 col-lg-4">
                         <InputText
                           {...useFromProps}
                           useForm={useForm}
                           readOnly={true}
                           disabled={true}
                           type="text"
                           labelName="Asset ID"
                         
                           registerName={"AssetClassID"}
                           name={"AssetClassID"}
                           mandatory={false}
                           onPaste={false}
                           onCopy={false}
                           previewFlag={isViewMode}
                           onChange={() => {}}
                           divClassName={"divClassName"}
                         />
                       </div>
                       )}
      <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Asset Name"
            minLength={1}
            maxLength={255}
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "Asset Name"),
            }}
            registerName={"AssetName"}
            name={"AssetName"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        {/* <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={true}
            disabled={true}
            type="text"
            labelName="Asset ID"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Asset ID"),
            }}
            registerName={"AssetID"}
            name={"AssetID"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div> */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Entity Asset Name"
            minLength={1}
            maxLength={255}
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "Entity Asset Name"),
            }}
            registerName={"EntityAssetName"}
            name={"EntityAssetName"}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        {/* <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={true}
            disabled={true}
            type="text"
            labelName="Entity Asset ID"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Entity Asset ID"),
            }}
            registerName={"EntityAssetID"}
            name={"EntityAssetID"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div> */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Tax Asset Name"
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "Tax Asset Name"),
            }}
            registerName={"TaxAssetName"}
            name={"TaxAssetName"}
            mandatory={false}
            minLength={1}
            maxLength={255}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        {/* <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={true}
            disabled={true}
            type="text"
            labelName="Tax Asset ID"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Tax Asset ID"),
            }}
            registerName={"TaxAssetID"}
            name={"TaxAssetID"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div> */}
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
