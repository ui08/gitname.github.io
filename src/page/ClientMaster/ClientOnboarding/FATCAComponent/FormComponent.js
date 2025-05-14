import { PropTypes } from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Apiurl } from "../../../../util/apiurl";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../../util/axiosInstance";
import { ValidationPattern } from "../../../../ValidationPattern/ValidationPattern";
import ButtonComp from "./../../../../Component/ButtonComp/ButtonComp";
import InputSelect from "./../../../../Component/ComponentsInput/InputSelect";
import InputText from "./../../../../Component/ComponentsInput/InputText";

import PatternMessage from "./../../../../util/PatternMessage";
import InputDatePickerWithMoment from "./../../../../Component/ComponentsInput/InputDatePickerWithMoment";
import moment from "moment/moment";
import {
  PoliticalExposureTypeOption
} from "./../../../../util/FrontendMaster";

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,
}) => {
  const navigate = useNavigate();
  const mode = decryptData(useParams().mode);
  const id = decryptData(useParams().id);
  const [loading, setLoading] = useState(false);
  const [allHoldingType, setAllHoldingType] = useState([]);

  const [allGender, setAllGender] = useState([]);
  const [allCountry, setAllCountry] = useState([]);
  const [allTaxResidentCountry, setAllTaxResidentCountry] = useState([]);
  const [allPoliticalExposureType, setAllPoliticalExposureType] = useState(
    {id : 1, label : "Yes", value : "Yes"},
    {id : 2, label : "No", value : "No"}
  );
  const [allIncomeSlab, setAllIncomeSlab] = useState([]);
  const [allWealthSource, setAllWealthSource] = useState([]);
  const [allOccupation, setAllOccupation] = useState([]);
  const [allIdentificationType, setAllIdentificationType] = useState([]);
  const [showOtherGender1, setShowOtherGender1] = useState(false);
  const [showOtherWealthSource1, setShowOtherWealthSource1] = useState(false);


  const { t } = useTranslation(["Common", "Messages", "Form"]);
  useEffect(() => {
    return () => {};
  }, []);
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
      
  
      
      GetallCountry(initialData?.clientFatcaDetailsEntityDto.countryOfBirth , 'country');
      GetallCountry(initialData?.clientFatcaDetailsEntityDto.taxResidentCountry, 'tax');
      GetOccupationList(initialData?.clientFatcaDetailsEntityDto.occupation);
      GetWealthSourceList(initialData?.clientFatcaDetailsEntityDto.wealthSource);
      GetIdentificationTypeList(initialData?.clientFatcaDetailsEntityDto.identificationType)
      GetIncomeSlabList(initialData?.incomeSlab);
      setValue("IdentificationNumber1", initialData?.clientFatcaDetailsEntityDto.identificationNumber);
   
      setValue("OtherWealthSource1", initialData?.clientFatcaDetailsEntityDto.wealthSource);
      setValue("PoliticalExposureType1", initialData?.clientFatcaDetailsEntityDto.politicalExposureType)

      reset(initialData);
    } else {
      GetallGenderList();
      GetallHoldingTypeList();
      GetallCountry();
      GetOccupationList();
      GetWealthSourceList();
      GetIncomeSlabList();
      GetIdentificationTypeList();
    }
    
  }, [initialData, reset]);
  

  const GetallGenderList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.SubCategoryListapi + "GENDER"
      );
      setLoading(false);
      setAllGender([]);
      Object.values(response.data).map((item) => {
        if (value == item.name) {
          setValue("Gender1", {
            label: item.name,
            value: item.id,
          });
          if (value === "Others") {
            setShowOtherGender1(true);
          } else {
            setShowOtherGender1(false);
          }
        }
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllGender((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const GetallHoldingTypeList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.SubCategoryListapi + "HOLDING_TYPE"
      );
      setLoading(false);
      setAllHoldingType([]);
      Object.values(response.data).map((item) => {
        if (value == item.name) {
          setValue("HoldingType1", {
            label: item.name,
            value: item.id,
          });
        }
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllHoldingType((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  

  const GetIncomeSlabList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.SubCategoryListapi + "INCOME_SLAB"
      );
      setLoading(false);
      setAllIncomeSlab([]);
      Object.values(response.data).map((item) => {
        if (value == item.name) {
          setValue("IncomeSlab1", {
            label: item.name,
            value: item.id,
          });
        }
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllIncomeSlab((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const GetWealthSourceList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.SubCategoryListapi + "WEALTH_SOURCE"
      );
      setLoading(false);
      setAllWealthSource([]);
      Object.values(response.data).map((item) => {
        if (value == item.name) {
          setValue("WealthSource1", {
            label: item.name,
            value: item.id,
          });
        }
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllWealthSource((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const GetOccupationList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.SubCategoryListapi + "OCCUPATION"
      );
      setLoading(false);
      setAllOccupation([]);
      Object.values(response.data).map((item) => {
        if (value == item.name) {
          setValue("Occupation1", {
            label: item.name,
            value: item.id,
          });
        }
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllOccupation((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };
  // allCountry
  const GetallCountry = async (value, type) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.allCountry);
      setLoading(false);
      setAllCountry([]);
      setAllTaxResidentCountry([]);
      Object.values(response.data).map((item) => {
        if(type == 'country') {
          if (value == item.id) {
            setValue("Country1", {
              label: item.countryName,
              value: item.id,
            });
          }  else if (value == null) {
            setValue("Country1", {
              label: "India",
              value: 101,
            });
          }
        } else {
          if (value == item.id) {
            setValue("TaxResidentCountry1", {
              label: item.countryName,
              value: item.id,
            });
          }  else if (value == null) {
            setValue("TaxResidentCountry1", {
              label: "India",
              value: 101,
            });
          }
        }
        
        let SingleData = {
          label: item.countryName,
          value: item.id,
        };
        setAllCountry((prev) => [...prev, SingleData]);
        setAllTaxResidentCountry((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

   const GetIdentificationTypeList = async (value) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          Apiurl.SubCategoryListapi + "IDENTIFICATION_TYPE"
        );
        setLoading(false);
        setAllIdentificationType([]);
        Object.values(response.data).map((item) => {
          if (value == item.name) {
            setValue("IdentificationType1", {
              label: item.name,
              value: item.id,
            });
          }
        
          let SingleData = {
            label: item.name,
            value: item.id,
          };
          setAllIdentificationType((prev) => [...prev, SingleData]);
        });
      } catch (error) {
        setLoading(false);
        console.error("Error during POST request:", error.message);
      } finally {
        setLoading(false);
      }
    };


  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [
    Country,
    TaxResidentCountry,
    IdentificationNumber,
    IdentificationType,
    PoliticalExposureType,
    IncomeSlab,
    Occupation,
    WealthSource,
  ] = watch([
    "Country1",
    "TaxResidentCountry1",
    "IdentificationNumber1",
    "IdentificationType1",
    "PoliticalExposureType1",
    "IncomeSlab1",
    "Occupation1",
    "WealthSource1"  ]);
  const [deactivationReason] = watch(["deactivationReason"]);
  const isValidCondition =
    Country &&
    TaxResidentCountry &&
    IdentificationNumber &&
    IdentificationType &&
    PoliticalExposureType &&
    IncomeSlab &&
    Occupation &&
    WealthSource;
  const isValidDeactivateCondition = deactivationReason;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode || isEditMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  const handleOtherGender = (e) => {};
  const handleCancel = () => {
    navigate(
      "/" + encrypt("UserCreationListLanding") + `/${encryptData("List")}`
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
            registerName="Country1"
            mandatory={true}
            labelName="Country"
            options={allCountry}
            previewFlag={isViewMode}
            onSelect={() => {}}
            divClassName={"divClassName"}
          />
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="TaxResidentCountry1"
            mandatory={true}
            labelName="Tax Resident Country"
            options={allTaxResidentCountry}
            previewFlag={isViewMode}
            onSelect={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            minLength={1}
            maxLength={10}
            labelName="Identification Number"
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("invalid", "Identification Number"),
            }}
            registerName={"IdentificationNumber1"}
            name={"IdentificationNumber1"}
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
                      registerName="IdentificationType1"
                      mandatory={false}
                      labelName="Identification Type"
                      options={allIdentificationType}
                      previewFlag={isViewMode}
                      divClassName={"divClassName"}
                    />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="PoliticalExposureType1"
            mandatory={true}
            labelName="Political Exposure Type"
            options={PoliticalExposureTypeOption}
            previewFlag={isViewMode}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="IncomeSlab1"
            mandatory={true}
            labelName="Income Slab"
            options={allIncomeSlab}
            previewFlag={isViewMode}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="Occupation1"
            mandatory={true}
            labelName="Occupation"
            options={allOccupation}
            previewFlag={isViewMode}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="WealthSource1"
            mandatory={true}
            labelName="Wealth Source"
            options={allWealthSource}
            previewFlag={isViewMode}
            divClassName={"divClassName"}
            onSelect={(e) => {
              if (e.label === "OTHERS") {
                setShowOtherWealthSource1(true);
              } else {
                setShowOtherWealthSource1(false);
              }
            }}
          />
        </div>
        <div 
          className={
            showOtherWealthSource1
            
              ? "col-12 col-md-4 col-lg-4"
              : "col-12 col-md-4 col-lg-4  d-none"
          }
        >
        <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            labelName="Other Wealth Source"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Other Wealth Source"),
            }}
            registerName={"OtherWealthSource1"}
            name={"OtherWealthSource1"}
            mandatory={showOtherWealthSource1 ? true : false}
            onPaste={false}
            onCopy={false}
            minLength={1}
            maxLength={30}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={
              showOtherWealthSource1 ? "divClassName" : "divClassName  d-none"
            }
          />
        </div>

        {!isViewMode && (
          <div className="d-flex gap-2">
            <ButtonComp
              wrapperName="submit_btn_wrapper"
              type={"submit"}
              btnStyle="box"
              btnText={
                mode === "edit"
                  ? "Edit"
                  : mode === "Deactivation"
                  ? "Deactivate"
                  : mode === "Activation"
                  ? "Activate"
                  : "Submit"
              }
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
