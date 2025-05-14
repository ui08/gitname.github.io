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

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,
}) => {
  const navigate = useNavigate();
  const mode = decryptData(useParams().mode);
  const [loading, setLoading] = useState(false);
  const [allAccountType, setAllAccountType] = useState([]);
  const [allCountry, setAllCountry] = useState([]);
  const [allPincode, setAllPincode] = useState([]);
  const [allrole, setAllrole] = useState([]);
  const [allSupervisorrole, setAllSupervisorrole] = useState([]);
  const [allzone, setAllzone] = useState([]);
  const [allbranch, setAllbranch] = useState([]);

  const [showPincodeOptions, setShowPincodeOptions] = useState(false);
  const [showOtherGender, setShowOtherGender] = useState(false);
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

  console.log("initialData", initialData);
  useEffect(() => {
    if (initialData) {
      setValue(
        "AccountName",
        initialData?.clientBankDetailsEntityDto[0].bankAccountName
      );
      setValue(
        "AccountNumber",
        initialData?.clientBankDetailsEntityDto[0].accountNumber
      );
      setValue("IFSCCode", initialData?.clientBankDetailsEntityDto[0].ifscCode);
      setValue("BankName", initialData?.clientBankDetailsEntityDto[0].bankName);
      setValue(
        "BranchName",
        initialData?.clientBankDetailsEntityDto[0].branchName
      );
      GetallAccountTypeList(
        initialData?.clientBankDetailsEntityDto[0].accountType
      );
      reset(initialData);
    } else {
      GetallAccountTypeList();
    }
  }, [initialData, reset]);

  const GetallAccountTypeList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.SubCategoryListapi + "BANK_ACCOUNT_TYPE"
      );
      setLoading(false);
      setAllAccountType([]);
      Object.values(response.data).map((item) => {
        if (value == item.name) {
          setValue("AccountType", {
            label: item.name,
            value: item.id,
          });
        }
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllAccountType((prev) => [...prev, SingleData]);
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
    AccountName,
    AccountNumber,
    IFSCCode,
    AccountType,
    BankName,
    BranchName,
  ] = watch([
    "AccountName",
    "AccountNumber",
    "IFSCCode",
    "AccountType",
    "BankName",
    "BranchName",
  ]);
  const [deactivationReason] = watch(["deactivationReason"]);
  const isValidCondition =
    AccountName &&
    AccountNumber &&
    AccountType &&
    IFSCCode &&
    BankName &&
    BranchName;
  const isValidDeactivateCondition = deactivationReason;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode || isEditMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

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
            labelName="Account Name"
            registerName={"AccountName"}
            name={"AccountName"}
            mandatory={false}
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Account Name"),
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
            labelName="Account Number"
            registerName={"AccountNumber"}
            name={"AccountNumber"}
            mandatory={false}
            pattern={{
              value: ValidationPattern.alphaNumericWithoutSymbol,
              message: PatternMessage(
                "alphaNumericWithoutSymbol",
                "Account Number"
              ),
            }}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            minLength={1}
            maxLength={80}
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
            maxLength={80}
            labelName="IFSC Code"
            pattern={{
              value: ValidationPattern.alphaNumericWithoutSymbol,
              message: PatternMessage("alphaNumericWithoutSymbol", "IFSC Code"),
            }}
            registerName={"IFSCCode"}
            name={"IFSCCode"}
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
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            minLength={1}
            maxLength={80}
            labelName="Bank Name"
            pattern={{
              value: ValidationPattern.alphaNumericWithoutSymbol,
              message: PatternMessage("alphaNumericWithoutSymbol", "Bank Name"),
            }}
            registerName={"BankName"}
            name={"BankName"}
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
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            minLength={1}
            maxLength={80}
            labelName="Branch Name"
            pattern={{
              value: ValidationPattern.alphaNumericWithoutSymbol,
              message: PatternMessage(
                "alphaNumericWithoutSymbol",
                "Branch Name"
              ),
            }}
            registerName={"BranchName"}
            name={"BranchName"}
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
            registerName="AccountType"
            mandatory={false}
            labelName="Account Type"
            options={allAccountType}
            previewFlag={isViewMode}
            onSelect={(e) => {}}
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
