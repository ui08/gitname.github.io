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

import moment from "moment/moment";
import InputDatePickerWithMoment from "./../../../../Component/ComponentsInput/InputDatePickerWithMoment";
import InputRadioGroup from "./../../../../Component/ComponentsInput/InputRadioGroup";
import PatternMessage from "./../../../../util/PatternMessage";

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,
}) => {
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
  const navigate = useNavigate();
  const mode = decryptData(useParams().mode);
  const [loading, setLoading] = useState(false);
  const [allGender, setAllGender] = useState([]);
  const [allDistributor, setAllDistributor] = useState([]);
  const [allPincode, setAllPincode] = useState([]);
  const [showOtherRelationN1, setShowOtherRelationN1] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [showGuardianFields, setShowGuardianFields] = useState(false);
  const [allAccountCategory, setAllAccountCategory] = useState([]);
  const [allRMCode, setAllRMCode] = useState([
    {
      value: 16,
      label: "Prashant Shetty",
    },
    {
      value: 18,
      label: "Aditya Palve",
      email: "aditya.p+rm@finlabsindia.com",
    },
    {
      value: 5,
      label: "Kritika Chanda",
      email: "kritika.c+rm@finlabsindia.com",
    },
    {
      value: 4,
      label: "Mihir Gala",
      email: "mihir.g+rm@finlabsindia.com",
    },
    {
      value: 7,
      label: "Kritika Chanda",
      email: "kritika.c+rmnew@finlabsindia.com",
    },
    {
      value: 17,
      label: "Santosh Bahera",
      email: "santosh.b+rm@finlabsindia.com",
    },
    {
      value: 9,
      label: "AdiRm  Pramanik",
      email: "adi.p+rm@finlabsindia.com",
    },
    {
      value: 8,
      label: "Rajesh Tak",
      email: "mfd@rvhconsultants.in",
    },
    {
      value: 11,
      label: "vbvbcghgb saddsfdsfd",
      email: "tbnmjklrenjkmfgdv.jklv@hpfghdj.comga",
    },
    {
      value: 10,
      label: "Mihir Bipin Gala",
      email: "mihir.g+rmdemo@finlabsindia.com",
    },
    {
      value: 13,
      label: "sanjay nandi",
      email: "sanjay.n+dd@finlabsindia.com",
    },
    {
      value: 6,
      label: "Arti Deshmukh",
      email: "harish@gmail.com",
    },
    {
      value: 14,
      label: "Abhijit Nijampurkar",
      email: "abhijit.n@finlabsindia.com",
    },
    {
      value: 15,
      label: "Aryan Reddy",
      email: "aryan+rm@finlabsindia.com",
    },
    {
      value: 12,
      label: "sanjay sen",
      email: "ss@gmail.com",
    },
    {
      value: 24,
      label: "Arati Deshmukh",
      email: "arati.d+rm@finlabsindia.com",
    },
    {
      value: 23,
      label: "Supra Rm One",
      email: "supratim.c+rm1@finlabsindia.com",
    },
    {
      value: 25,
      label: "rm rm",
      email: "finlabsrm@finlabs.com",
    },
    {
      value: 26,
      label: "Kiran Chavan",
      email: "kiran.c+rm@finlabsindia.com",
    },
    {
      value: 27,
      label: "Test User RM",
      email: "test1@gmail.com",
    },
  ]);
  const [showOtherGender, setShowOtherGender] = useState(false);
  const [reportsbyheld, setReportsbyheld] = useState("No");
  const [AutoFeeMappingheld, setAutoFeeMappingheld] = useState("Yes");
  const [FamilyHeadld, setFamilyHeadld] = useState("Yes");
  const [familyMsterOptions, setFamilyMsterOptions] = useState([]);
  const [allRelation, setAllRelation] = useState([]);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [showPincodeOptions, setShowPincodeOptions] = useState(false);
  useEffect(() => {
    return () => {};
  }, []);

  // const handleDateChange = useCallback((event) => {
  //   const value = event.target.value;
  //   setSelectedDate(value);
  //   if (onDateChange) {
  //     onDateChange(value);
  //   }
  // }, []);
  useEffect(() => {
    console.log("initial", initialData);
    if (initialData) {
      setValue("InvestorName", initialData?.clientMasterEntityDTO.name);
      setValue(
        "AccountName",
        initialData?.clientAccountDetailEntityDtoList[0].accountName
      );
      setValue("PanNumber", initialData?.clientMasterEntityDTO.pan);

      GetallGenderList(initialData?.clientMasterEntityDTO.gender);
      fetchPincodeListMaster(
        initialData?.clientAddressDetailsEntityDto.pincode
      );
      GetallAccountCategory(
        initialData?.clientAccountDetailEntityDtoList[0].accountCategory
      );
      GetallDistributorList(
        initialData?.clientAccountDetailEntityDtoList[0].distributor
      );
      setValue("OtherGender", initialData?.OtherGender);
      setValue("EmailID", initialData?.clientMasterEntityDTO.email);
      setValue("MobileNumber", initialData?.clientMasterEntityDTO.mobileNo);
      setValue("Birthdate", initialData?.clientMasterEntityDTO.dateOfBirth);
      setValue("NRMRIA", initialData?.clientMasterEntityDTO.nrmRia);
      setValue("InvestorType", initialData?.clientMasterEntityDTO.investorType);
      setValue(
        "GuardianName",
        initialData?.clientGuardianDetailsEntityDto.name
      );
      setValue(
        "GuardianPanNumber",
        initialData?.clientGuardianDetailsEntityDto.pan
      );
      setValue(
        "Guardiandate",
        initialData?.clientGuardianDetailsEntityDto.dateOfBirth
      );
      GetallRelationList(
        initialData?.clientGuardianDetailsEntityDto.relationwithMinor
      );
      setValue("Clientid", initialData?.clientMasterEntityDTO.userCode);
      setValue(
        "AccountUniqueID",
        initialData?.clientAccountDetailEntityDtoList[0].accountUniqueId
      );
      setValue(
        "AddressLine1",
        initialData?.clientAddressDetailsEntityDto.addressLine1
      );
      setValue(
        "AddressLine2",
        initialData?.clientAddressDetailsEntityDto.addressLine2
      );
      setValue(
        "AddressLine3",
        initialData?.clientAddressDetailsEntityDto.addressLine3
      );
      setValue("State", initialData?.clientAddressDetailsEntityDto.state);
      setValue("City", initialData?.clientAddressDetailsEntityDto.city);
    } else {
      GetallGenderList();
      GetallRelationList();
      GetallAccountCategory();
      GetallDistributorList();
      reset(initialData);
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
          setValue("Gender", {
            label: item.name,
            value: item.id,
          });
          if (value === "Others") {
            setShowOtherGender(true);
          } else {
            setShowOtherGender(false);
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

  const GetallDistributorList = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.SubCategoryListapi + "DISTRIBUTOR"
      );
      setLoading(false);
      setAllDistributor([]);
      Object.values(response.data).map((item) => {
        if (value == item.name) {
          setValue("Distributor", {
            label: item.name,
            value: item.id,
          });
        }
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllDistributor((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const GetallAccountCategory = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.SubCategoryListapi + "HOLDING_TYPE"
      );
      setLoading(false);
      setAllAccountCategory([]);
      Object.values(response.data).map((item) => {
        if (value == item.name) {
          setValue("AccountCategory", {
            label: item.name,
            value: item.id,
          });
        }
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAllAccountCategory((prev) => [...prev, SingleData]);
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
          setValue("Pincode", {
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
          setValue("RelationwithMinor", {
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
  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [
    FirstName,
    LastName,
    EmailID,
    MobileNumber,
    Pincode,
    State,
    EmployeeCode,
    Role,
    SupervisorUser,
  ] = watch([
    "FirstName",
    "LastName",
    "EmailID",
    "MobileNumber",
    "Pincode",
    "Role",
    "EmployeeCode",
    "SupervisorUser",
    "State",
  ]);
  const [deactivationReason] = watch(["deactivationReason"]);
  const isValidCondition =
    FirstName &&
    LastName &&
    EmailID &&
    MobileNumber &&
    Pincode &&
    State &&
    EmployeeCode &&
    Role &&
    SupervisorUser;
  const isValidDeactivateCondition = deactivationReason;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode || isEditMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  // useEffect(() => {
  //   if (birthdate) {
  //     const age = moment().diff(moment(birthdate), "years");
  //     setShowGuardianFields(age < 18);
  //   }
  // }, [birthdate]);

  // Search Input Change Handler
  const handleDateChange = useCallback(
    (birthdate) => {
      console.log("birthdate", birthdate);
      if (birthdate) {
        const age = moment().diff(moment(birthdate), "years");
        setShowGuardianFields(age < 18);
      }
    },
    [showGuardianFields]
  );

  const handleOtherGender = (e) => {};
  const handleCancel = () => {
    navigate(
      "/" + encrypt("UserCreationListLanding") + `/${encryptData("List")}`
    );
  };

  const handleReportsbyheld = (value) => {
    setReportsbyheld("");
    setReportsbyheld(value.target.value);
  };
  const handleAutoFeeMapping = (value) => {
    setAutoFeeMappingheld("");
    setAutoFeeMappingheld(value.target.value);
  };

  const handleFamilyHead = (value) => {
    setFamilyHeadld("");
    setFamilyHeadld(value.target.value);
  };

  const GetFamilyMsterListByRmIdOptions = async (id) => {
    try {
      const response = await axiosInstance.get(
        Apiurl.getFamilyMsterListByRmId + id
      );

      setFamilyMsterOptions([]);

      Object.values(response.data).map((item) => {
        let SingleData = {
          label: item.familyHeadName,
          value: item.familyHeadId,
        };
        setFamilyMsterOptions((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };

  const handleAddress = () => {
    setShowAddressFields(true);
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
            labelName="Investor Name"
            registerName={"InvestorName"}
            name={"InvestorName"}
            mandatory={true}
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "First Name"),
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
            labelName="Account Name"
            registerName={"AccountName"}
            name={"AccountName"}
            mandatory={true}
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "Account Name"),
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
            registerName="AccountCategory"
            mandatory={false}
            labelName="Account Category"
            options={allAccountCategory}
            previewFlag={isViewMode}
            onSelect={(e) => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="Distributor"
            mandatory={false}
            labelName="Distributor"
            options={allDistributor}
            previewFlag={isViewMode}
            onSelect={(e) => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center">
          <span className="app-input-text-group-labels"> Is Held Away ? </span>
          <InputRadioGroup
            {...useFromProps}
            useForm={useForm}
            registerName="Reportsbyheld"
            type={"radio"}
            checked={reportsbyheld === "Yes" ? true : false}
            defaultValue="Yes"
            labelName={<>yes</>}
            mandatory={true}
            id={"heldid"}
            errorLabel={"radio Box"}
            onChange={(e) => handleReportsbyheld(e)}
          />
          <InputRadioGroup
            {...useFromProps}
            useForm={useForm}
            registerName="Reportsbyheld"
            type={"radio"}
            defaultValue="No"
            checked={reportsbyheld === "No" ? true : false}
            labelName={<>No</>}
            mandatory={true}
            id={"heldawayid"}
            errorLabel={"radio Box"}
            onChange={(e) => handleReportsbyheld(e)}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center">
          <span className="app-input-text-group-labels">
            {" "}
            Auto Fee Mapping ?
          </span>
          <InputRadioGroup
            {...useFromProps}
            useForm={useForm}
            registerName="AutoFeeMappinghe"
            type={"radio"}
            checked={AutoFeeMappingheld === "Yes" ? true : false}
            defaultValue="Yes"
            labelName={<>Yes</>}
            mandatory={true}
            id={"AutoFeeYes"}
            errorLabel={"radio Box"}
            onChange={(e) => handleAutoFeeMapping(e)}
          />
          <InputRadioGroup
            {...useFromProps}
            useForm={useForm}
            registerName="AutoFeeMappinghe"
            type={"radio"}
            defaultValue="No"
            mandatory={true}
            checked={AutoFeeMappingheld === "No" ? true : false}
            labelName={<>No</>}
            id={"AutoFeeNo"}
            errorLabel={"radio Box"}
            onChange={(e) => handleAutoFeeMapping(e)}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode}
            disabled={isViewMode}
            type="email"
            minLength={1}
            maxLength={80}
            labelName="Email ID"
            pattern={{
              value: ValidationPattern.email,
              message: PatternMessage("email", "Email ID"),
            }}
            registerName={"EmailID"}
            name={"EmailID"}
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
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            minLength={1}
            maxLength={10}
            labelName="Mobile Number"
            pattern={{
              value: ValidationPattern.mobile,
              message: PatternMessage("MobileNumber", "Mobile Number"),
            }}
            registerName={"MobileNumber"}
            name={"MobileNumber"}
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
            registerName="Gender"
            mandatory={true}
            labelName="Gender"
            options={allGender}
            previewFlag={isViewMode}
            onSelect={(e) => {
              if (e.label === "Others") {
                setShowOtherGender(true);
              } else {
                setShowOtherGender(false);
              }
            }}
            divClassName={"divClassName"}
          />
        </div>
        <div
          className={
            showOtherGender
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
            registerName={"OtherGender"}
            name={"OtherGender"}
            mandatory={showOtherGender ? true : false}
            onPaste={false}
            onCopy={false}
            minLength={1}
            maxLength={30}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={
              showOtherGender ? "divClassName" : "divClassName  d-none"
            }
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center">
          <span className="app-input-text-group-labels">Family Head ?</span>
          <InputRadioGroup
            {...useFromProps}
            useForm={useForm}
            registerName="FamilyHead"
            type={"radio"}
            defaultValue="Yes"
            checked={FamilyHeadld === "Yes" ? true : false}
            labelName={<>Yes</>}
            mandatory={true}
            id={"FamilyYesid"}
            errorLabel={"radio Box"}
            onChange={(e) => handleFamilyHead(e)}
          />
          <InputRadioGroup
            {...useFromProps}
            useForm={useForm}
            registerName="FamilyHead"
            type={"radio"}
            defaultValue="No"
            checked={FamilyHeadld === "No" ? true : false}
            labelName={<>No</>}
            mandatory={true}
            id={"FamilyNoid"}
            errorLabel={"radio Box"}
            onChange={(e) => handleFamilyHead(e)}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 pan_class">
          <InputText
            {...useFromProps}
            useForm={useForm}
            type="text"
            labelName="Pan"
            registerName={"PanNumber"}
            name={"PanNumber"}
            readOnly={isViewMode}
            disabled={isViewMode}
            minLength={1}
            maxLength={30}
            pattern={{
              value: ValidationPattern.pancard,
              message: PatternMessage("invalid", "Pan Number"),
            }}
            mandatory={true}
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
            labelName="Birth Date"
            registerName="Birthdate"
            mandatory={true}
            dateformat="DD/MM/YYYY"
            disabled={false}
            dateviews={"year"}
            minDateVal={null}
            maxDateVal={moment()}
            onSelect={(value) => handleDateChange(value)}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            type="text"
            labelName="NRM/RIA"
            registerName={"NRMRIA"}
            name={"NRMRIA"}
            readOnly={isViewMode}
            disabled={isViewMode}
            minLength={1}
            maxLength={255}
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "NRM/RIA"),
            }}
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
            labelName="Investor Type"
            registerName={"InvestorType"}
            name={"InvestorType"}
            readOnly={isViewMode}
            disabled={isViewMode}
            minLength={1}
            maxLength={255}
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "InvestorType"),
            }}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div
          className={
            showGuardianFields
              ? "col-12 col-md-4 col-lg-4"
              : "col-12 col-md-4 col-lg-4  d-none"
          }
        >
          {" "}
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode}
            disabled={isViewMode}
            type="text"
            labelName="Guardian Name"
            registerName={"GuardianName"}
            name={"GuardianName"}
            mandatory={showGuardianFields ? true : false}
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage("alphanumeric", "Guardian Name"),
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
        <div
          className={
            showGuardianFields
              ? "col-12 col-md-4 col-lg-4 pan_class"
              : "col-12 col-md-4 col-lg-4  d-none"
          }
        >
          {" "}
          <InputText
            {...useFromProps}
            useForm={useForm}
            type="text"
            labelName="Guardian Pan Number"
            registerName={"GuardianPanNumber"}
            name={"GuardianPanNumber"}
            readOnly={isViewMode}
            disabled={isViewMode}
            minLength={1}
            maxLength={30}
            pattern={{
              value: ValidationPattern.pancard,
              message: PatternMessage("invalid", "Guardian Pan Number"),
            }}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div
          className={
            showGuardianFields
              ? "col-12 col-md-4 col-lg-4"
              : "col-12 col-md-4 col-lg-4  d-none"
          }
        >
          <InputDatePickerWithMoment
            control={control}
            setValue={setValue}
            errors={errors}
            labelName="Guardian  Date"
            registerName="Guardiandate"
            mandatory={showGuardianFields ? true : false}
            dateformat="DD/MM/YYYY"
            disabled={false}
            dateviews={"year"}
            minDateVal={null}
            maxDateVal={moment()}
            onSelect={(e) => {}}
          />
        </div>
        <div
          className={
            showGuardianFields
              ? "col-12 col-md-4 col-lg-4"
              : "col-12 col-md-4 col-lg-4  d-none"
          }
        >
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="Relationwithminor"
            mandatory={false}
            labelName="Relation with minor"
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
            labelName="Other Relation N1"
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
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="RMCode"
            mandatory={true}
            labelName="RM Code"
            options={allRMCode}
            previewFlag={isViewMode}
            onSelect={(e) => {
              GetFamilyMsterListByRmIdOptions(e.value);
            }}
            divClassName={"divClassName"}
          />
        </div>{" "}
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="FamilyName"
            mandatory={false}
            labelName="Family Name"
            options={familyMsterOptions}
            previewFlag={isViewMode}
            onSelect={(e) => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            type="text"
            labelName="Client Id"
            registerName={"Clientid"}
            name={"Clientid"}
            readOnly={isViewMode}
            disabled={isViewMode}
            minLength={1}
            maxLength={30}
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
            labelName="Account Unique ID"
            registerName={"AccountUniqueID"}
            name={"AccountUniqueID"}
            readOnly={isViewMode}
            disabled={isViewMode}
            minLength={1}
            maxLength={30}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div>
          <ButtonComp
            key={"Address"}
            wrapperName={"btn_wrapper"}
            type="button"
            btnStyle="round"
            btnText={"Address"}
            onClick={() => setShowAddressFields(true)}
          />
        </div>
        {/* {showAddressFields && */}
        <>
          <div
            className={
              showAddressFields
                ? "col-12 col-md-4 col-lg-4"
                : "col-12 col-md-4 col-lg-4  d-none"
            }
          >
            <InputText
              {...useFromProps}
              useForm={useForm}
              type="text"
              labelName="Address Line 1"
              registerName={"AddressLine1"}
              name={"AddressLine1"}
              readOnly={isViewMode}
              disabled={isViewMode}
              minLength={1}
              maxLength={255}
              pattern={{
                value: ValidationPattern.alphanumericSpecial,
                message: PatternMessage("alphanumericSpecial", "InvestorType"),
              }}
              mandatory={false}
              onPaste={false}
              onCopy={false}
              previewFlag={isViewMode}
              onChange={() => {}}
              divClassName={"divClassName"}
            />
          </div>
          <div
            className={
              showAddressFields
                ? "col-12 col-md-4 col-lg-4"
                : "col-12 col-md-4 col-lg-4  d-none"
            }
          >
            <InputText
              {...useFromProps}
              useForm={useForm}
              type="text"
              labelName="Address Line 2"
              registerName={"AddressLine2"}
              name={"AddressLine2"}
              readOnly={isViewMode}
              disabled={isViewMode}
              minLength={1}
              maxLength={255}
              pattern={{
                value: ValidationPattern.alphanumericSpecial,
                message: PatternMessage("alphanumericSpecial", "InvestorType"),
              }}
              mandatory={false}
              onPaste={false}
              onCopy={false}
              previewFlag={isViewMode}
              onChange={() => {}}
              divClassName={"divClassName"}
            />
          </div>
          <div
            className={
              showAddressFields
                ? "col-12 col-md-4 col-lg-4"
                : "col-12 col-md-4 col-lg-4  d-none"
            }
          >
            <InputSelect
              control={control}
              register={register}
              setValue={setValue}
              registerName="Pincode"
              mandatory={false}
              labelName="Pincode"
              options={allPincode}
              onSelect={(e) => {
                setValue("State", e.pcmStateName);
              }}
              handleInputChange={handlePincodeChange}
              previewFlag={isViewMode}
              divClassName={"divClassName"}
            />
          </div>
          <div
            className={
              showAddressFields
                ? "col-12 col-md-4 col-lg-4"
                : "col-12 col-md-4 col-lg-4  d-none"
            }
          >
            <InputText
              {...useFromProps}
              useForm={useForm}
              readOnly={true}
              disabled={true}
              type="text"
              labelName="State"
              registerName={"State"}
              name={"State"}
              mandatory={false}
              onPaste={false}
              onCopy={false}
              previewFlag={isViewMode}
              onChange={() => {}}
              divClassName={"divClassName"}
            />
          </div>
          <div
            className={
              showAddressFields
                ? "col-12 col-md-4 col-lg-4"
                : "col-12 col-md-4 col-lg-4  d-none"
            }
          >
            <InputText
              {...useFromProps}
              useForm={useForm}
              type="text"
              labelName="City"
              registerName={"City"}
              name={"City"}
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
        </>
        {/* } */}
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
