import moment from "moment";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import { Apiurl } from "../../../util/apiurl";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import { pricingOptions } from "../../../util/FrontendMaster";
import PatternMessage from "../../../util/PatternMessage";
import { ValidationPattern } from "../../../ValidationPattern/ValidationPattern";
import InputDatePickerWithMoment from './../../../Component/ComponentsInput/InputDatePickerWithMoment';
import "./VMOtherProductFormComponent.scss";

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,
}) => {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState("");
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
  const [allProduct, setAllProduct] = useState([]);
  const [allInstrument, setAllInstrument] = useState([]);

  const [loading, setLoading] = useState(false);

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
      instrumentList(initialData.instrumentName);
      setValue("ISIN", initialData.isin);
      setValue("RTACode", initialData.rtaCode);
      setValue("SecurityID", initialData.securityId);
      setValue("AccountID", initialData.accountId);
      setValue("MarketValue", initialData.marketValue);
      setValue("ClientName", initialData.clientName);
      setValue("ProductName", initialData.prouctName);
      setValue("Date", initialData.updatedDate);
      setValue(
        "PricingMethod",
        initialData.unitizedFlag == "Yes"
          ? { label: "Unitized", value: "Unitized" }
          : { label: "Non Unitized", value: "Nonunitized" }
      );
      setPricing(initialData.unitizedFlag == "Yes" ? true : false);
    } else {
      instrumentList();
    }
  }, [initialData, reset, getValues]);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [InstrumentName, ProductName, Date, MarketValue, PricingMethod] = watch(
    ["InstrumentName", "ProductName", "Date", "MarketValue", "PricingMethod"]
  );

  const isValidCondition =
    InstrumentName &&
    // ProductName &&
    Date &&
    MarketValue &&
    PricingMethod;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  const instrumentList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.IMotherProductList);
      setLoading(false);
      setAllInstrument([]);
      Object.values(response.data).map((item) => {
        if (value == item.instrumentName) {
          setValue("InstrumentName", {
            label: item.instrumentName,
            value: item.id,
          });
        }

        let SingleData = {
          label: item.instrumentName,
          value: item.id,
          isin: item.isin,
          rtaCode: item.rtaCode,
          securityId: item.securityID,
          productName: item.productName,
        };
        setAllInstrument((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInstrumentName = (selectedOption) => {
    console.log("kk", selectedOption);
    setValue("ISIN", selectedOption.isin);
    setValue("RTACode", selectedOption.rtaCode);
    setValue("SecurityID", selectedOption.securityId);
    setValue("ProductName", selectedOption.productName);
  };

  const handleCancel = () => {
    navigate(
      "/" + encrypt("VMOtherProductListLanding") + `/${encryptData("List")}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="PricingMethod"
            mandatory={true}
            labelName="Pricing Method"
            options={pricingOptions}
            onSelect={(e) => {
              if (e.value === "Unitized") {
                setPricing(true);
              } else {
                setPricing(false);
              }
            }}
            divClassName={"divClassName"}
            previewFlag={isViewMode}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="InstrumentName"
            mandatory={true}
            labelName="Instrument Name"
            options={allInstrument}
            onSelect={(e) => {
              handleInstrumentName(e);
            }}
            divClassName={"divClassName"}
            previewFlag={isViewMode}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={true}
            disabled={true}
            type="text"
            labelName="Product Name"
            registerName={"ProductName"}
            name={"ProductName"}
            mandatory={false}
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
            readOnly={true}
            disabled={true}
            type="text"
            labelName="RTA Code"
            minLength={1}
            maxLength={30}
            // pattern={{
            //   value: ValidationPattern.alphanumeric,
            //   message: PatternMessage("alphanumeric", "RTA Code"),
            // }}
            registerName={"RTACode"}
            name={"RTACode"}
            mandatory={false}
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
            readOnly={true}
            disabled={true}
            type="text"
            labelName="Security ID"
            minLength={1}
            // maxLength={255}
            // pattern={{
            //   value: ValidationPattern.number,
            //   message: PatternMessage("number", "Security ID"),
            // }}
            registerName={"SecurityID"}
            name={"SecurityID"}
            mandatory={false}
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
            readOnly={true}
            disabled={true}
            type="text"
            labelName="ISIN"
            minLength={1}
            maxLength={12}
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "ISIN"),
            }}
            registerName={"ISIN"}
            name={"ISIN"}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
         
          <InputDatePickerWithMoment
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="Updated Date"
            registerName="UpdatedDate"
            mandatory={true}
            dateformat="DD/MM/YYYY"
            disabled={isViewMode}
            dateviews={"year"}
            minDateVal={null}
            maxDateVal={moment()}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Market Value"
            pattern={{
              value: ValidationPattern.decimal,
              message: PatternMessage("decimal", "Market Value"),
            }}
            registerName={"MarketValue"}
            name={"Market Value"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className={!pricing ? "col-12 col-md-4 col-lg-4" : "d-none"}>
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Account ID"
            minLength={1}
            maxLength={255}
            pattern={{
              value: ValidationPattern.number,
              message: PatternMessage("number", "Account ID"),
            }}
            registerName={"AccountID"}
            name={"AccountID"}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className={!pricing ? "col-12 col-md-4 col-lg-4" : "d-none"}>
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Client Name"
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "Client Name"),
            }}
            registerName={"ClientName"}
            name={"ClientName"}
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
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Market Value"
            pattern={{
              value: ValidationPattern.decimal,
              message: PatternMessage("decimal", "Market Value"),
            }}
            registerName={"MarketValue"}
            name={"MarketValue"}
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
              // disabled={!isValid}  
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
