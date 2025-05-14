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
import InputDatePickerWithMoment from "../../../../Component/ComponentsInput/InputDatePickerWithMoment";
import moment from "moment";

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,
}) => {
  const navigate = useNavigate();
  const mode = decryptData(useParams().mode);
  const [loading, setLoading] = useState(false);
  const [allGender, setAllGender] = useState([]);
  const [allRelation, setAllRelation] = useState([]);
  const [allPincode, setAllPincode] = useState([]);
  const [allrole, setAllrole] = useState([]);
  const [allSupervisorrole, setAllSupervisorrole] = useState([]);
  const [allzone, setAllzone] = useState([]);
  const [allbranch, setAllbranch] = useState([]);

  const [showPincodeOptions, setShowPincodeOptions] = useState(false);
  const [showOtherGenderN1, setShowOtherGenderN1] = useState(false);
  const [showOtherRelationN1, setShowOtherRelationN1] = useState(false);
  const [allCity, setAllCity] = useState([]);
  const [temrolebyRole, setTemrolebyRole] = useState();
  const [activationinitialData, setActivationinitialData] = useState();
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
      GetallGenderList(initialData?.clientNomineeDetailsEntityDtoList[0].gender);
      GetallRelationList(initialData?.clientNomineeDetailsEntityDtoList[0].relation);
      fetchPincodeListMaster(initialData?.clientNomineeDetailsEntityDtoList[0].pincode);
      setValue("OtherGender", initialData?.clientNomineeDetailsEntityDtoList[0].OtherGender);
      setValue("OtherRelation", initialData?.clientNomineeDetailsEntityDtoList[0].OtherRelation);
      setValue("NameN1", initialData?.clientNomineeDetailsEntityDtoList[0].nomineeName);
      setValue("BirthdateN1", initialData?.clientNomineeDetailsEntityDtoList[0].birthDate);
      setValue("PercentageN1", initialData?.clientNomineeDetailsEntityDtoList[0].percentage);
      setValue("AddressLine1N1", initialData?.clientNomineeDetailsEntityDtoList[0].addressLine1);
      setValue("AddressLine2N1", initialData?.clientNomineeDetailsEntityDtoList[0].addressLine2);
      setValue("AddressLine3N1", initialData?.clientNomineeDetailsEntityDtoList[0].addressLine3);
      setValue("CityN1", initialData?.clientNomineeDetailsEntityDtoList[0].city);
      setValue("StateN1", initialData?.clientNomineeDetailsEntityDtoList[0].state);

      reset(initialData);
    } else {
      GetallGenderList();
      GetallRelationList();
      fetchPincodeListMaster();
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
          setValue("GenderN1", {
            label: item.name,
            value: item.id,
          });
          if (value === "Others") {
            setShowOtherGenderN1(true);
          } else {
            setShowOtherGenderN1(false);
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
  // allCountry
  const GetallRelationList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.SubCategoryListapi + "RELATION"
      );
      setLoading(false);
      setAllRelation([]);
      Object.values(response.data).map((item) => {
        if (value == item.id) {
          setValue("RelationN1", {
            label: item.name,
            value: item.id,
          });
        }
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllRelation((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeChange = useCallback((typedOption) => {
    var pattern = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;
    if (typedOption.length === 6 && pattern.test(typedOption)) {
      fetchPincodeListMaster(typedOption);
      setShowPincodeOptions(true);
    } else {
      setShowPincodeOptions(false);
    }
  }, []);
  const fetchPincodeListMaster = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getAllPincode + value);
      setLoading(false);
      setAllPincode([]);
      setShowPincodeOptions(true);
      Object.values(response.data).map((item) => {
        if (value == item.pcmPinCodePk) {
          setValue("PincodeN1", {
            label: item.pcmPinCodePk,
            value: item.pcmPinCodePk,
            pcmStateName: item.pcmStateName,
          });
        }
        let SingleData = {
          label: item.pcmPinCodePk,
          value: item.pcmPinCodePk,
          pcmStateName: item.pcmStateName,
        };
        setAllPincode((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setShowPincodeOptions(false);
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
    Name,
    Gender,
    Birthdate,
    AddressLine1,
    AddressLine2,
    AddressLine3,
    Pincode,
    City,
    State,
    Relation,
    Percentage,
  ] = watch([
    "NameN1",
    "GenderN1",
    "BirthdateN1",
    "AddressLine1N1",
    "AddressLine2N1",
    "AddressLine3N1",
    "PincodeN1",
    "StateN1",
    "CityN1",
    "RelationN1",
    "PercentageN1",
  ]);
  const [deactivationReason] = watch(["deactivationReason"]);
  const isValidCondition =
    Name &&
    Gender &&
    Birthdate &&
    AddressLine1 &&
    AddressLine2 &&
    AddressLine3 &&
    Pincode &&
    State &&
    City &&
    Relation &&
    Percentage;

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
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            labelName="Name"
            registerName={"NameN1"}
            name={"NameN1"}
            mandatory={false}
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Name"),
            }}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            minLength={1}
            maxLength={255}
            divClassName={"divClassName"}
          />
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="GenderN1"
            mandatory={false}
            labelName="Gender"
            options={allGender}
            previewFlag={isViewMode}
            onSelect={(e) => {
              if (e.label === "Others") {
                setShowOtherGenderN1(true);
              } else {
                setShowOtherGenderN1(false);
              }
            }}
            divClassName={"divClassName"}
          />
        </div>
        <div
          className={
            showOtherGenderN1
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
            labelName="Other Gender"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Other Gender"),
            }}
            registerName={"OtherGenderN1"}
            name={"OtherGenderN1"}
            mandatory={showOtherGenderN1 ? true : false}
            onPaste={false}
            onCopy={false}
            minLength={1}
            maxLength={30}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={
              showOtherGenderN1 ? "divClassName" : "divClassName  d-none"
            }
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            labelName="Percentage"
            registerName={"PercentageN1"}
            name={"PercentageN1"}
            mandatory={false}
            pattern={{
              value: ValidationPattern.decimal,
              message: PatternMessage("number", "Decimal"),
            }}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            minLength={1}
            maxLength={6}
            divClassName={"divClassName"}
          />
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="RelationN1"
            mandatory={false}
            labelName="Relation"
            options={allRelation}
            previewFlag={isViewMode}
            onSelect={(e) => {
              if (e.label === "Others") {
                setShowOtherRelationN1(true);
              } else {
                setShowOtherRelationN1(false);
              }
            }}
            divClassName={"divClassName"}
          />
        </div>
        <div
          className={
            showOtherRelationN1
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
            labelName="Other Relation"
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Other Relation"),
            }}
            registerName={"OtherRelationN1"}
            name={"OtherRelationN1"}
            mandatory={showOtherRelationN1 ? true : false}
            onPaste={false}
            onCopy={false}
            minLength={1}
            maxLength={30}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={
              showOtherRelationN1 ? "divClassName" : "divClassName  d-none"
            }
          />
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <InputDatePickerWithMoment
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="Birth Date"
            registerName="BirthdateN1"
            mandatory={false}
            dateformat="dd/MM/yyyy"
            disabled={false}
            minDateVal={null} // Optional: Specify the minimum date
            maxDateVal={moment()} // Disable future dates
            onSelect={(e) => {}}
          />{" "}
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            labelName="Address Line 1"
            registerName={"AddressLine1N1"}
            name={"AddressLine1N1"}
            mandatory={false}
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumericSpecial", "Address Line 1"),
            }}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            minLength={1}
            maxLength={255}
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
            labelName="Address Line 2"
            registerName={"AddressLine2N1"}
            name={"AddressLine2N1"}
            mandatory={false}
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumericSpecial", "Address Line 2"),
            }}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            minLength={1}
            maxLength={255}
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
            labelName="Address Line 3"
            registerName={"AddressLine3N1"}
            name={"AddressLine3N1"}
            mandatory={false}
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphanumericSpecial", "Address Line 3"),
            }}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            minLength={1}
            maxLength={255}
            divClassName={"divClassName"}
          />
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="PincodeN1"
            mandatory={false}
            labelName="Pincode"
            options={allPincode}
            onSelect={(e) => {
              setValue("StateN1", e.pcmStateName);
            }}
            handleInputChange={handlePincodeChange}
            previewFlag={isViewMode}
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
            labelName="State"
            registerName={"StateN1"}
            name={"StateN1"}
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
            type="text"
            labelName="City"
            registerName={"CityN1"}
            name={"City N1"}
            readOnly={isViewMode}
            disabled={isViewMode}
            minLength={1}
            maxLength={30}
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphaNumericWithoutSymbol", "City"),
            }}
            mandatory={false}
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
              btnText={
                mode === "edit"
                  ? "Edit"
                  : mode === "Deactivation"
                  ? "Deactivate"
                  : mode === "Activation"
                  ? "Activate"
                  : "Submit"
              }
              // disabled={!isValid}
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
