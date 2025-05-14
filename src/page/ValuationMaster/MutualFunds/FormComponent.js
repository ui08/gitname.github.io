import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import { decryptData } from "../../../util/Authenticate/CryptoJS";
import PatternMessage from "../../../util/PatternMessage";
import { ValidationPattern } from "../../../ValidationPattern/ValidationPattern";
import "./VMMutualFundsFormCompoent.scss";

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,
}) => {
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
    productType,
    uniqueCode,
    instrumentName,
    shortName,
    issuerGroup,
    assetClass,
    taxAssetClass,
    entityAssetClass,
    isin,
    NSESymbol,
    BSECode,
    instrumentCategory,
    listingStatus,
    instrumentRisk,
    benchmarkIndices
  ] = watch([
    "productType",
    "uniqueCode",
    "instrumentName",
    "shortName",
    "issuerGroup",
    "assetClass",
    "taxAssetClass",
    "entityAssetClass",
    "isin",
    "NSESymbol",
    "BSECode",
    "instrumentCategory",
    "listingStatus",
    "instrumentRisk",
    "benchmarkIndices"
  ]);

  const isValidCondition =
  productType &&
  uniqueCode &&
  instrumentName &&
  shortName &&
  issuerGroup &&
  assetClass &&
  taxAssetClass &&
  entityAssetClass &&
  isin &&
  NSESymbol &&
  BSECode &&
  instrumentCategory &&
  listingStatus &&
  instrumentRisk &&
  benchmarkIndices;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  };

  const handleCancel =()=>{
    navigate("/" + encrypt("DirectEquityList"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        <h5 className="p-3">Primary Information</h5>
        <div className="row">
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="productType"
            mandatory={true}
            labelName="Product Type"
            options={approvalOptions}
            onSelect={() => {}}
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
            labelName="Unique Code"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Name"),
            }}
            registerName={"uniqueCode"}
            name={"uniqueCode"}
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
            labelName="Instrument Name"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Description"),
            }}
            registerName={"instrumentName"}
            name={"instrumentName"}
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
              message: PatternMessage("alphabet", "Description"),
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
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="issuerGroup"
            mandatory={true}
            labelName="Issuer Group"
            options={approvalOptions}
            onSelect={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        </div>
        <div className="row mt-5">
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="assetClass"
            mandatory={true}
            labelName="Asset Class"
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
            registerName="taxAssetClass"
            mandatory={true}
            labelName="Tax Asset Class"
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
            registerName="entityAssetClass"
            mandatory={true}
            labelName="Entity Asset Class"
            options={approvalOptions}
            onSelect={() => {}}
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
            labelName="ISIN"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Name"),
            }}
            registerName={"isin"}
            name={"isin"}
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
            labelName="NSE Symbol"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Name"),
            }}
            registerName={"NSESymbol"}
            name={"NSESymbol"}
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
            labelName="BSE Code"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Name"),
            }}
            registerName={"BSECode"}
            name={"BSECode"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        </div>
        <div className="row mt-5">
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="instrumentCategory"
            mandatory={true}
            labelName="Instrument Category"
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
            registerName="listingStatus"
            mandatory={true}
            labelName="Listing Status"
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
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="benchmarkIndices"
            mandatory={true}
            labelName="Benchmark Indices"
            options={approvalOptions}
            onSelect={() => {}}
            divClassName={"divClassName"}
          />
        </div>
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
