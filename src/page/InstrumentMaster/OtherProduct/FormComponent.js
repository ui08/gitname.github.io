import dayjs from "dayjs";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputDatePicker from "../../../Component/ComponentsInput/InputDatePicker";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputText from "../../../Component/ComponentsInput/InputText";
import { Apiurl } from "../../../util/apiurl";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import {
  listingOptions,
  pricingOptions,
  statusOptions,
} from "../../../util/FrontendMaster";
import PatternMessage from "../../../util/PatternMessage";
import { ValidationPattern } from "../../../ValidationPattern/ValidationPattern";
import InputDatePickerWithMoment from "./../../../Component/ComponentsInput/InputDatePickerWithMoment";
import "./OtherProductFormComponent.scss";
import moment from "moment";

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

  const [allProduct, setAllProduct] = useState([]);
  const [allAsset, setAllAsset] = useState([]);

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
      console.log("initialData", initialData);
      // reset(initialData);
      setValue("SecurityID", initialData.securityID);
      setValue("InstrumentName", initialData.instrumentName);
      setValue("InstrumentFullName", initialData.instrumentFullName);
      setValue("InstrumentDescription", initialData.instrumentDescription);
      setValue(
        "MasterProductClassificationId",
        initialData.masterProductClassificationId
      );
      setValue("AssetName", initialData.AssetName);
      assetList(initialData.assetClassificationId);
      productList(initialData.masterProductClassificationId);
      setValue("ProductName", initialData.productName);
      setValue("EntityAssetName", initialData.entityAssetName);
      setValue("TaxAssetName", initialData.taxAssetName);
      setValue("InstrumentCategoryName", initialData.instrumentCategoryName);
      setValue(
        "ServiceProviderName",
        initialData.serviceProviderNameAmcIssuerName
      );
      setValue("ISIN", initialData.isin);
      setValue("RTACode", initialData.rtaCode);
      setValue("ListingStatus", {
        label: initialData.listingStatus,
        value: initialData.listingStatus,
      });
      setValue("BenchmarkIndice", initialData.benchmarkIndice);
      setValue("Status", {
        label: initialData.status,
        value: initialData.status,
      });
      setValue("PricingMethod", {
        label: initialData.pricingMethod,
        value: initialData.pricingMethod,
      });
      setValue("InstrumentRisk", initialData.instrumentRisk);
      setValue("IssueOpenDate", initialData.issueOpenDate);
      setValue("IssueCloseDate", initialData.issueCloseDate);
      setValue("MaturityDate", initialData.maturityDate);
      setValue("FaceValue", initialData.faceValue);
    }

    productList();
    assetList();
  }, [initialData, reset]);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [
    InstrumentName,
    ProductName,
    AssetName,
    TaxAssetName,
    Status,
    PricingMethod,
    EntityAssetName,
    ListingStatus,
  ] = watch([
    "InstrumentName",
    "ProductName",
    "AssetName",
    "TaxAssetName",
    "Status",
    "PricingMethod",
    "EntityAssetName",
    "ListingStatus",
  ]);

  const isValidCondition =
    InstrumentName &&
    ProductName &&
    AssetName &&
    TaxAssetName &&
    EntityAssetName &&
    ListingStatus &&
    Status &&
    PricingMethod;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  const handleCancel = () => {
    navigate(
      "/" + encrypt("IMOtherProductListLanding") + "/" + encryptData("List")
    );
  };
  const MaturityDateFunction = () => {
    // Return an object with properties based on the input value
    let temIssueOpenDate = getValues("IssueOpenDate");
    let temIssueOpenDates =
      temIssueOpenDate != undefined && temIssueOpenDate.$d;

    return {
      MaturityDatereadonly: temIssueOpenDate === undefined ? true : false, // Set readonly based on the value passed
      MaturityDatedisabled: temIssueOpenDate === undefined ? true : false, // Example of another property
      MaturityDateminDateVal: dayjs(temIssueOpenDates),
      MaturityDatemaxDateVal: dayjs(temIssueOpenDates).add(3, "year"),
      IssueCloseDatereadonly: temIssueOpenDates === undefined ? true : false, // Set readonly based on the value passed
      IssueCloseDatedisabled: temIssueOpenDates === undefined ? true : false, // Example of another property
      IssueCloseDatemaxDateVal: dayjs(temIssueOpenDates).add(1, "day"),
      IssueCloseDateminDateVal: dayjs(temIssueOpenDates).add(3, "year"),
    };
  };

  // Get the properties from MaturityDateFunction
  const maturityDateProps = MaturityDateFunction();

  const productList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.allProduct);
      setLoading(false);
      setAllProduct([]);
      Object.values(response.data).map((item) => {
        if (value == item.id) {
          setValue("ProductName", { label: item.productName, value: item.id });
        }
        console.log("first", item);

        let SingleData = {
          label: item.productName,
          value: item.id,
        };
        setAllProduct((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const assetList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.allAsset);
      setLoading(false);
      Object.values(response.data).map((item) => {
        if (value == item.id) {
          setValue("AssetName", { label: item.description, value: item.id });
        }
        let SingleData = {
          label: item.description,
          value: item.id,
        };
        setAllAsset((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode || isEditMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Security ID"
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "Security ID"),
            }}
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
          {/* Instrument Name* */}
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Instrument Name"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "Instrument Name"),
            }}
            registerName={"InstrumentName"}
            name={"InstrumentName"}
            mandatory={true}
            minLength={1}
            maxLength={255}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        {/* Instrument Full Name */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Instrument Full Name"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "Instrument Full Name"),
            }}
            registerName={"InstrumentFullName"}
            name={"InstrumentFullName"}
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
        {/* Instrument Description */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Instrument Description"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "Instrument Description"),
            }}
            registerName={"InstrumentDescription"}
            name={"InstrumentFullName"}
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
        {/* Product Name* */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="ProductName"
            mandatory={true}
            labelName="Product Name"
            options={allProduct}
            onSelect={() => {}}
            divClassName={"divClassName"}
            previewFlag={isViewMode}
          />
        </div>
        {/* Asset Name* */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="AssetName"
            mandatory={true}
            labelName="Asset Name"
            options={allAsset}
            onSelect={() => {}}
            divClassName={"divClassName"}
            previewFlag={isViewMode}
          />
        </div>
        {/* Tax Asset Name* */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Tax Asset Name"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "Tax Asset Name"),
            }}
            registerName={"TaxAssetName"}
            name={"TaxAssetName"}
            mandatory={true}
            minLength={1}
            maxLength={255}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        {/* Entity Asset Name* */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Entity Asset Name"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "Entity Asset Name"),
            }}
            registerName={"EntityAssetName"}
            name={"EntityAssetName"}
            mandatory={true}
            minLength={1}
            maxLength={255}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        {/* Instrument Category Name */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Instrument Category Name"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage(
                "alphanumeric",
                "Instrument Category Name"
              ),
            }}
            registerName={"InstrumentCategoryName"}
            name={"InstrumentCategoryName"}
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
        {/* Instrument Description */}
        {/* <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Service Provider ID / AMC ID / Issuer ID"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "Service Provider ID"),
            }}
            registerName={"ServiceProviderID"}
            name={"ServiceProviderID"}
            mandatory={false}
            minLength={1}
            maxLength={255}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div> */}
        {/* Service Provider Name / AMC Name / Issuer Name */}
        <div className="col-12 col-md-6 col-lg-6">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Service Provider Name / AMC Name / Issuer Name"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "Service Provider Name"),
            }}
            registerName={"ServiceProviderName"}
            name={"ServiceProviderName"}
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
        {/* ISIN */}
        <div className="col-12 col-md-6 col-lg-6">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="ISIN"
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "ISIN"),
            }}
            registerName={"ISIN"}
            name={"ISIN"}
            mandatory={false}
            minLength={1}
            maxLength={12}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        {/* RTA Code */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="RTA Code"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "RTACode"),
            }}
            registerName={"RTACode"}
            name={"RTACode"}
            mandatory={false}
            minLength={1}
            maxLength={30}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        {/* Listing Status* */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="ListingStatus"
            mandatory={true}
            labelName="Listing Status"
            options={listingOptions}
            onSelect={() => {}}
            divClassName={"divClassName"}
            previewFlag={isViewMode}
          />
        </div>
        {/* Benchmark Indice*/}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Benchmark Indice"
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "Benchmark Indice"),
            }}
            registerName={"BenchmarkIndice"}
            name={"Benchmark Indice"}
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

        {/*  Status* */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="Status"
            mandatory={true}
            labelName="Status"
            options={statusOptions}
            onSelect={() => {}}
            divClassName={"divClassName"}
            previewFlag={isViewMode}
          />
        </div>
        {/*  Pricing Method* */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="PricingMethod"
            mandatory={true}
            labelName="Pricing Method"
            options={pricingOptions}
            onSelect={() => {}}
            divClassName={"divClassName"}
            previewFlag={isViewMode}
          />
        </div>
        {/* Instrument Risk*/}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Instrument Risk"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumeric", "Instrument Risk"),
            }}
            registerName={"InstrumentRisk"}
            name={"InstrumentRisk"}
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
        <div className="col-12 col-md-4 col-lg-4">
          {/* <InputDatePicker
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="Issue Open Date"
            registerName="IssueOpenDate"
            mandatory={false}
            dateformat="DD/MM/YYYY"
            disabled={isViewMode}
            minDateVal={null} // Optional: Specify the minimum date
            maxDateVal={dayjs()} // Disable future dates */}
          <InputDatePickerWithMoment
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="Issue Open Date"
            registerName="IssueOpenDate"
            mandatory={true}
            dateformat="DD/MM/YYYY"
            disabled={false}
            dateviews={"year"}
            minDateVal={null}
            maxDateVal={moment()}
          />
          {/* /> */}
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputDatePickerWithMoment
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="Maturity Date"
            registerName="MaturityDate"
            mandatory={true}
            dateformat="DD/MM/YYYY"
            disabled={false}
            readonly={maturityDateProps.MaturityDatereadonly}
            dateviews={"year"}
            minDateVal={moment().add(1, "day")}
            maxDateVal={null}
            onSelect={(value) => MaturityDateFunction()}
          />
          {/* <InputDatePicker
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="Maturity Date"
            registerName="MaturityDate"
            mandatory={false}
            dateformat="DD/MM/YYYY"
            readonly={maturityDateProps.MaturityDatereadonly}
            // disabled={maturityDateProps.MaturityDatedisabled}
            disabled={isViewMode}
            minDateVal={dayjs().add(1, "day")} // Optional: Specify the minimum date
            maxDateVal={null} // Disable future dates
            onSelect={(value) => MaturityDateFunction()}
          /> */}
        </div>
        <div className="col-12 col-md-4 col-lg-4">
            <InputDatePickerWithMoment
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="Issue Close Date"
            registerName="IssueCloseDate"
            mandatory={true}
            dateformat="DD/MM/YYYY"
            disabled={isViewMode}
            readonly={maturityDateProps.MaturityDatereadonly}
            dateviews={"year"}
            // minDateVal={maturityDateProps.IssueCloseDateminDateVal}
            // maxDateVal={maturityDateProps.IssueCloseDatemaxDateVal}

            minDateVal={maturityDateProps.MaturityDateminDateVal} // Optional: Specify the minimum date
            // maxDateVal={maturityDateProps.IssueCloseDatemaxDateVal}
            onSelect={(value) => MaturityDateFunction()}
          />

          {/* <InputDatePicker
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="Issue Close Date"
            registerName="IssueCloseDate"
            mandatory={false}
            dateformat="DD/MM/YYYY"
            // readonly={maturityDateProps.IssueCloseDatereadonly}
            // disabled={maturityDateProps.IssueCloseDatedisabled}
            disabled={isViewMode}
            // minDateVal={maturityDateProps.IssueCloseDateminDateVal}
            // maxDateVal={maturityDateProps.IssueCloseDatemaxDateVal}

            minDateVal={maturityDateProps.MaturityDateminDateVal} // Optional: Specify the minimum date
            // maxDateVal={maturityDateProps.IssueCloseDatemaxDateVal}
            onSelect={(value) => MaturityDateFunction()} */}
          {/* /> */}
        </div>
        {/* Face Value */}
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="Face Value"
            pattern={{
              value: ValidationPattern.decimal,
              message: PatternMessage("decimal", "Face Value"),
            }}
            registerName={"FaceValue"}
            name={"FaceValue"}
            mandatory={false}
            minLength={1}
            maxLength={60}
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
