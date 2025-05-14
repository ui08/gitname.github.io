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
import "./TransactionTypeMasterFormComponent.scss";

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

 

    const TransactionTypeEffect = [
      {
      id : 1, label : "Buy", value : 1
    },
    {
      id : 2, label : "Sell", value : -1
    },
    {
      id : 3, label : "Other", value : 0
    },
  ]

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
      setValue('TransactionMode', initialData.trxnMode)
      setValue('TransactionName', initialData.trxnType)
      setValue('TransactionEffect', {label : initialData.effect == 1 ? "Buy" : initialData.effect == -1 ? "Sell" : "Other", value : initialData.effect})
      setValue('TransactionDescription', initialData.trxnDisc)
      setValue('TransactionID', initialData.id)
    }
  }, [initialData, reset]);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [
    TransactionName,
    TransactionEffect
  ] = watch([
    "TransactionName",
    "TransactionEffect"
  ]);

  const isValidCondition =
  TransactionName &&
  TransactionEffect 


  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  };

  const handleCancel =()=>{
    navigate("/" + encrypt("TransactionTypeMasterList"));
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
                   labelName="Transaction Type ID"
                 
                   registerName={"TransactionID"}
                   name={"TransactionID"}
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
                   labelName="Transaction Type Name"
                   pattern={{
                     value: ValidationPattern.alphanumeric,
                     message: PatternMessage("alphaNumeric", "Transaction Type Name"),
                   }}
                   registerName={"TransactionName"}
                   maxLength={80}
                   minLength={1}
                   name={"TransactionName"}
                   mandatory={true}
                   onPaste={false}
                   onCopy={false}
                   previewFlag={isViewMode}
                   onChange={() => {}}
                   divClassName={"divClassName"}
                 />
               </div>
               <div className="col-12 col-md-4 col-lg-4">
                 <InputText
                   {...useFromProps}
                   useForm={useForm}
                   readOnly={isViewMode ? true : false}
                   disabled={isViewMode ? true : false}
                   type="text"
                   labelName="Transaction Type Description"
                   pattern={{
                     value: ValidationPattern.alphabet,
                     message: PatternMessage("alphabet", "Transaction Type Description"),
                   }}
                   registerName={"TransactionDescription"}
                   name={"TransactionDescription"}
                   maxLength={80}
                   minLength={1}
                   mandatory={false}
                   onPaste={false}
                   onCopy={false}
                   previewFlag={isViewMode}
                   onChange={() => {}}
                   divClassName={"divClassName"}
                 />
               </div>
               <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="TransactionEffect"
                    mandatory={true}
                    labelName="Transaction Type Effect"
                    options={TransactionTypeEffect}
                    onSelect={() => {}}
                    divClassName={"divClassName"}
                    previewFlag={isViewMode}
                  />
                </div>
               {/*<div className="col-12 col-md-4 col-lg-4">
                 <InputText
                   {...useFromProps}
                   useForm={useForm}
                   readOnly={isViewMode ? true : false}
                   disabled={isViewMode ? true : false}
                   type="text"
                   maxLength={80}
                   minLength={1}
                   labelName="Product ID"
                   pattern={{
                     value: ValidationPattern.alphabet,
                     message: PatternMessage("alphabet", "Product ID"),
                   }}
                   registerName={"ProductID"}
                   name={"ProductID"}
                   mandatory={true}
                   onPaste={false}
                   onCopy={false}
                   previewFlag={isViewMode}
                   onChange={() => {}}
                   divClassName={"divClassName"}
                 />
               </div>
               <div className="col-12 col-md-4 col-lg-4">
                 <InputText
                   {...useFromProps}
                   useForm={useForm}
                   readOnly={isViewMode ? true : false}
                   disabled={isViewMode ? true : false}
                   type="text"
                   maxLength={80}
                   minLength={1}
                   labelName="Product Type"
                   pattern={{
                     value: ValidationPattern.alphabet,
                     message: PatternMessage("alphabet", "Product Type"),
                   }}
                   registerName={"ProductType"}
                   name={"ProductType"}
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
