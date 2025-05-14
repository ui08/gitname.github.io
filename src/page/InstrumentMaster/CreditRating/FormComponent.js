import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { eventMode } from "../../../ValidationPattern/Messaging";
import { ValidationPattern } from "../../../ValidationPattern/ValidationPattern";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import { decryptData, encrypt } from "../../../util/Authenticate/CryptoJS";
import Textarea from "../../../Component/ComponentsInput/Textarea";
import FileUpload from "../../../Component/ComponentsInput/InputFile";
import PatternMessage from "../../../util/PatternMessage";
import "./CreditRatingFormComponent.scss";

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
    }
  }, [initialData, reset]);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [
    vendorName,
    rating,
    normalisedRating,
    normalisedRatingBos,
    description,
    BosCode,
    fundooCode,
  ] = watch([
    "verdorName",
    "rating",
    "normalisedRating",
    "normalisedRatingBos",
    "description",
    "BosCode",
    "fundooCode",
  ]);

  const isValidCondition =
    vendorName &&
    rating &&
    normalisedRating &&
    normalisedRatingBos &&
    description &&
    BosCode &&
    fundooCode;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  const handleCancel =() => {
   navigate("/" + encrypt("CreditRatingList"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Vendor Name"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Vendor Name"),
            }}
            registerName={"verdorName"}
            name={"vendorName"}
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
            labelName="Rating"
            pattern={{
              value: ValidationPattern.number,
              message: PatternMessage("alphabet", "Rating"),
            }}
            registerName={"rating"}
            name={"rating"}
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
            labelName="Normalised Rating"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Normalised Rating"),
            }}
            registerName={"normalisedRating"}
            name={"normalisedRating"}
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
            labelName="Normalised Rating Bos"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Normalised Rating Bos"),
            }}
            registerName={"normalisedRatingBos"}
            name={"normalisedRatingBos"}
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
            labelName="Description"
            pattern={{
              value: ValidationPattern.number,
              message: PatternMessage("alpjabet", "Description"),
            }}
            registerName={"description"}
            name={"description"}
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
            labelName="Bos Code"
            pattern={{
              value: ValidationPattern.number,
              message: PatternMessage("number", "Bos Code"),
            }}
            registerName={"BosCode"}
            name={"BosCode"}
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
            labelName="Fundoo Code"
            pattern={{
              value: ValidationPattern.number,
              message: PatternMessage("number", "Fundoo Code"),
            }}
            registerName={"fundooCode"}
            name={"fundooCode"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
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
              disabled={!isValid}
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
