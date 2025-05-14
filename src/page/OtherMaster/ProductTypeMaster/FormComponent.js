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
import "./ProductTypeMasterFormComponent.scss";
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
  const [allProductType, setAllProductType] = useState([])
  const [allAssetClass, setAllAssetClass] = useState([])
  const [allSubAssetClass, setAllSubAssetClass] = useState([])
    const [loading, setLoading] = useState(false);
  

  const mode = decryptData(useParams().mode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [change, setChange] = useState([
    { id: 1, label: "Yes", value: "Yes" },
    { id: 2, label: "No", value: "No" },
  ]);

  const approvalOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
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
      setValue('ProductName', initialData.productName)
      setValue('ProductDescription', initialData.productDescription)
      setValue('ProductID', initialData.id)
      fetchAssetClass(initialData.lookupAssetClassId)
      fetchSubAssetClass(initialData.lookupAssetClassId, initialData.lookupAssetSubClassId)
      productType(initialData.masterProductTypeId)



    } else {
      fetchAssetClass()
      // fetchSubAssetClass()
      productType()
    }
  }, [initialData, reset]);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [
    
    ProductName,
    ProductType,
    AssetClass,
    SubAssetClass
  ] = watch([
    
    "ProductName",
    "ProductType",
    "AssetClass",
    "SubAssetClass"
  ]);

  const isValidCondition =
   
  ProductName && 
  ProductType &&
  AssetClass &&
  SubAssetClass;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  const productType = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.productType);
      setLoading(false);
      setAllProductType([]);
      Object.values(response.data).map((item) => {
        if (value == item.id) {
          setValue("ProductType", { label: item.productType, value: item.id });
        }

        let SingleData = {
          label: item.productType,
          value: item.id,
        };
        setAllProductType((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssetClass = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.assetClass);
      setLoading(false);
      setAllAssetClass([]);
      Object.values(response.data).map((item) => {
        if (value == item.id) {
          setValue("AssetClass", { label: item.description, value: item.id });
        }

        let SingleData = {
          label: item.description,
          value: item.id,
        };
        setAllAssetClass((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubAssetClass = async (value, id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Apiurl.subAssetByAsset}${value}`);
      setLoading(false);
      setAllSubAssetClass([]);
      Object.values(response.data).map((item) => {
        if (id == item.id) {
          setValue("SubAssetClass", { label: item.description, value: item.id });
        }

        let SingleData = {
          label: item.description,
          value: item.id,
        };
        setAllSubAssetClass((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/" + encrypt("ProductTypeMasterList"));
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
            labelName="Product ID"
           
            registerName={"ProductID"}
            name={"ProductID"}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={true}
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
            labelName="Product Name"
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "Product Name"),
            }}
            registerName={"ProductName"}
            minLength={1}
            maxLength={80}
            name={"ProductName"}
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
            labelName="Product Description"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Product Description"),
            }}
            registerName={"ProductDescription"}
            minLength={1}
            maxLength={80}
            name={"ProductDescription"}
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
                    registerName="ProductType"
                    mandatory={true}
                    labelName="Product Type"
                    options={allProductType}
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
                    registerName="AssetClass"
                    mandatory={true}
                    labelName="Asset Class"
                    options={allAssetClass}
                    onSelect={(e) => fetchSubAssetClass(e.value)}
                    divClassName={"divClassName"}
                    previewFlag={isViewMode}
                  />
                </div>
                <div className="col-12 col-md-4 col-lg-4">
                  <InputSelect
                    control={control}
                    register={register}
                    setValue={setValue}
                    registerName="SubAssetClass"
                    mandatory={true}
                    labelName="Sub Asset Class"
                    options={allSubAssetClass}
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
