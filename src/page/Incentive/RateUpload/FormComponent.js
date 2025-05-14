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
import "./TransactionOtherProductFormComponent.scss";
import InputDatePicker from "../../../Component/ComponentsInput/InputDatePicker";
import dayjs from "dayjs";
import axiosInstance from "../../../util/axiosInstance";
import { Apiurl } from "../../../util/apiurl";

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
  const [loading, setLoading] = useState(false);

  const approvalOptions = [
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];
  const [allZone, setAllzone] = useState([])
  const [allBranch, setAllbranch] = useState([])
  const [allProduct, setAllProduct] = useState([])
  const [allAsset, setAllAsset] = useState([])
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
    GetallZone();
    assetList();
    productList();
  }, [initialData, reset]);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [name, description, assetType, instrumentType] = watch([
    "name",
    "description",
    "assetType",
    "instrumentType",
  ]);

  const isValidCondition = name && description && assetType && instrumentType;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  const handleCancel = () => {
    navigate("/" + encrypt("VMOtherProductList"));
  };

  const GetallZone = async (editvalue) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.fetchzone);
      setLoading(false);
      setAllzone([]);

      Object.values(response.data).map((item) => {
        if (editvalue == item.zoneId) {
          setValue("zone", {
            label: item.displayName,
            value: item.zoneId,
            mappedBranches: item.mappedBranches,
          });
          console.log(initialData.branch);
        }
        fetchDataAllbranch(item.mappedBranches);

        let SingleData = {
          label: item.displayName,
          value: item.zoneId,
          mappedBranches: item.mappedBranches,
        };
        setAllzone((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAllbranch = async (value, editvalue) => {
    console.log(value);
    setLoading(true);
    try {
      const response = value;
      // const result = await response.json();
      setAllbranch([]);
      console.log("response",  response);
      if (response.length < 0) {
        setValue("branch", null);
      }
      Object.values(response).map((item) => {
        // if (initialData.branch == item.branchId) {
        //   setValue("branch", {
        //     label: item.displayName,
        //     value: item.branchId,
        //   });
        // }
        let SingleData = {
          label: item.displayName,
          value: item.branchId,
        };
        setAllbranch((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };



  const productList = async (value) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(Apiurl.allProduct);
        setLoading(false);
        setAllProduct([]);
        Object.values(response.data).map((item) => {
         
  
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
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="ProductCategory"
            mandatory={true}
            labelName="Product Category"
            options={allProduct}
            onSelect={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="AssetCategory"
            mandatory={true}
            labelName="Asset Category"
            options={allAsset}
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
            labelName="Scheme Name"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Scheme Name"),
            }}
            registerName={"Schemename"}
            name={"Schemename"}
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
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="RM Name"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "RM Name"),
            }}
            registerName={"RMName"}
            name={"RMName"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div> */}
        {/* <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="RM Code"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "RM Code"),
            }}
            registerName={"RMCode"}
            name={"RMCode"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div> */}

        {/* <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="From Date - To Date"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "RM Code"),
            }}
            registerName={"FromDate"}
            name={"FromDate"}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div> */}
        <div className="col-12 col-md-3 col-lg-4">
          <InputDatePicker
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="From Date"
            registerName="fromDate"
            mandatory={true}
            dateformat="DD/MM/YYYY"
            disabled={false}
            minDateVal={null} // Optional: Specify the minimum date
            maxDateVal={dayjs()} // Disable future dates
          />{" "}
        </div>
        <div className="col-12 col-md-3 col-lg-4">
          <InputDatePicker
            control={control}
            setValue={setValue}
            errors={errors}
            labelName=" To Date"
            registerName="toDate"
            mandatory={true}
            dateformat="DD/MM/YYYY"
            disabled={false}
            minDateVal={null} // Optional: Specify the minimum date
            maxDateVal={dayjs()} // Disable future dates
          />{" "}
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode ? true : false}
            disabled={isViewMode ? true : false}
            type="text"
            labelName="From Value"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "From Value"),
            }}
            registerName={"From Value"}
            name={"From Value"}
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
            labelName="To Value"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "To Value"),
            }}
            registerName={"To Value"}
            name={"To Value"}
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
            labelName="% of Commission for Upfront"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "CommissionUpfront"),
            }}
            registerName={"CommissionUpfront"}
            name={"CommissionUpfront"}
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
            labelName="% of Commission for Trail annually"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "CommissionTrail"),
            }}
            registerName={"CommissionTrail"}
            name={"CommissionTrail"}
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
            registerName="zone"
            mandatory={true}
            labelName="Zone ID"
            options={allZone}
            onSelect={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="branch"
            mandatory={true}
            labelName="Branch ID"
            options={allBranch}
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
