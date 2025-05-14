import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../Component/ComponentsInput/InputSelect";
import InputText from "../../Component/ComponentsInput/InputText";
import { decryptData } from "../../util/Authenticate/CryptoJS";
import PatternMessage from "../../util/PatternMessage";
import { ValidationPattern } from "../../ValidationPattern/ValidationPattern";
import './UserHierarchyMappingFormComponent.scss';

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
    name,
    bosCode,
    shortName,
    description,
    fundooCode,
    benchmarkInstrument,
    instrumentRisk
  ] = watch([
    "name",
    "bosCode",
    "shortName",
    "description",
    "fundooCode",
    "benchmarkInstrument",
    "instrumentRisk"
  ]);

  const isValidCondition =
  name &&
  bosCode &&
  shortName &&
  description &&
  fundooCode &&
  benchmarkInstrument &&
  instrumentRisk;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  };

  const handleCancel =()=>{
    navigate("/" + encrypt("UserHierarchyMappingList"));
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
            labelName="Name"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Name"),
            }}
            registerName={"name"}
            name={"name"}
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
            registerName={"bosCode"}
            name={"bosCode"}
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
            labelName="Short Name"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Short Name"),
            }}
            registerName={"shortName"}
            name={"shortName"}
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
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Description"),
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

        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="benchmarkInstrument"
            mandatory={true}
            labelName="Benchmark Instrument"
            options={approvalOptions}
            onSelect={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="instrumentRisk"
            mandatory={true}
            labelName="Instrument Risk"
            options={approvalOptions}
            onSelect={() => {}}
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
