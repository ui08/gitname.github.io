import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Pageheader from "../../../../Layout/Pagehader";

import { Accordion } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Apiurl } from "../../../../util/apiurl";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../../util/axiosInstance";
import ViewFormComponent from "../BankComponent/ViewFormComponent";
import StepDetails from "./../StepDetails";
import AddFormComponent from "./AddFormComponent";
import EditFormComponent from "./EditFormComponent";
import InputText from "../../../../Component/ComponentsInput/InputText";
import InputRadioGroup from "../../../../Component/ComponentsInput/InputRadioGroup";
import ButtonComp from "../../../../Component/ButtonComp/ButtonComp";
import AppModal from "../../../../Component/Modal/AppModal";

export default function ViewComponentFormComponent({ Details }) {
  const mode = decryptData(useParams().mode);
  const id = decryptData(useParams().id);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [stepValues, setStepValues] = useState([]);
  const [OnboardingstepDetails, SetOnboardingStepDetails] = useState([]);
  const [Onboardingstepid, SetOnboardingStepid] = useState();
  const [laststepid, SetLaststepid] = useState();
  const [loadingstep, setLoadingstep] = useState(false);

  const [showOtherRelationN1, setShowOtherRelationN1] = useState(false);
  const [showOtherGender, setShowOtherGender] = useState(false);
  const [showOtherWealthSource1, setShowOtherWealthSource1] = useState(false);
  const [showOtherGenderNom1, setShowOtherGenderNom1] = useState(false);
  const [showOtherRelationNom1, setShowOtherRelationNom1] = useState(false); 
  const [showOtherWealthSourceFatca1, setShowOtherWealthSourceFatca1] = useState(false); 
  showOtherWealthSourceFatca1
  const [reportsbyheld, setReportsbyheld] = useState("Yes");
  const [AutoFeeMappingheld, setAutoFeeMappingheld] = useState("Yes");
  const [FamilyHeadld, setFamilyHeadld] = useState("Yes");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  const breadcrumbItems = [
    {
      label: "Client Onboarding",
      patth:
        "/" + encrypt("ClientMasterProductLanding") + `/${encryptData("List")}`,

      // icon: <FontAwesomeIcon icon={faList} />,
    },
    {
      label: pagemode(),
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  useEffect(() => {
    if (id == 0 && mode === "add") {
      SetOnboardingStepid(0);
      SetLaststepid(1);
      setLoadingstep(true);
    } else {
      setLoadingstep(false);
      fetchgetOnboardingStepDetails();
    }
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
  } = useForm();
  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    watch,
    getValues,
  };
  const fetchgetOnboardingStepDetails = async () => {
    try {
      const response = await axiosInstance.get(
        Apiurl.getOnboardingStepDetails + id
      );
      SetLaststepid(response.data.lastStepId);
      SetOnboardingStepDetails(response.data);
      SetOnboardingStepid(response.data.id);
      setLoadingstep(true);

      let initialData = response.data;
      setValue("InvestorName", initialData?.clientMasterEntityDTO.name);
      setValue(
        "AccountName",
        initialData?.clientAccountDetailEntityDtoList[0].accountName
      );
      setValue("PanNumber", initialData?.clientMasterEntityDTO.pan);
      setValue(
        "Distributor",
        initialData.clientAccountDetailEntityDtoList[0].distributor
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
      setValue(
        "Relationwithminor",
        initialData?.clientGuardianDetailsEntityDto.relationwithMinor
      );
      setValue("Gender", initialData?.clientMasterEntityDTO.gender);
      setValue("pincode", initialData?.clientAddressDetailsEntityDto.pincode);
      setValue(
        "AccountCategory",
        initialData?.clientAccountDetailEntityDtoList[0].accountCategory
      );


     setValue("IncomeSlab1", initialData?.clientJointHolderDetailsEntityDto[0].incomeSlab);
      setValue("Gender1", initialData?.clientJointHolderDetailsEntityDto[0].gender);
      setValue("Country1", initialData?.clientJointHolderDetailsEntityDto[0].countryOfBirth);
      setValue("TaxResidentCountry1", initialData?.clientJointHolderDetailsEntityDto[0].taxResidentCountry);
      setValue("Occupation1", initialData?.clientJointHolderDetailsEntityDto[0].occupation);
      setValue("WealthSource1", initialData?.clientJointHolderDetailsEntityDto[0].wealthSource);
      setValue("HoldingType1", initialData?.clientJointHolderDetailsEntityDto[0].holding);
      setValue("OtherGender", initialData?.clientJointHolderDetailsEntityDto[0].gender);
      setValue("Name1", initialData?.clientJointHolderDetailsEntityDto[0].jointHolderName);
      setValue("Birthdate1", initialData?.clientJointHolderDetailsEntityDto[0].birthDate);
      setValue("IdentificationNumber1", initialData?.clientJointHolderDetailsEntityDto[0].identificationNumber);
      setValue("IdentificationType1", initialData?.clientJointHolderDetailsEntityDto[0].identificationType);
      setValue("OtherWealthSource1", initialData?.clientJointHolderDetailsEntityDto[0].wealthSource == "Others" ? initialData?.clientJointHolderDetailsEntityDto[0].wealthSource : null);
      setValue("PanNumber1", initialData?.clientJointHolderDetailsEntityDto[0].pan);
      setValue("PoliticalExposureType1", initialData?.clientJointHolderDetailsEntityDto[0].politicalExposureType)

    
      setValue("RelationNom1", initialData?.clientNomineeDetailsEntityDtoList[0].relation);
      setValue("GenderNom1", initialData?.clientNomineeDetailsEntityDtoList[0].gender);
      setValue("PincodeNom1", initialData?.clientNomineeDetailsEntityDtoList[0].pincode);
      setValue("OtherGenderNom1", initialData?.clientNomineeDetailsEntityDtoList[0].OtherGender);
      setValue("OtherRelationNom1", initialData?.clientNomineeDetailsEntityDtoList[0].OtherRelation);
      setValue("NameNom1", initialData?.clientNomineeDetailsEntityDtoList[0].nomineeName);
      setValue("BirthdateNom1", initialData?.clientNomineeDetailsEntityDtoList[0].birthDate);
      setValue("PercentageNom1", initialData?.clientNomineeDetailsEntityDtoList[0].percentage);
      setValue("AddressLine1Nom1", initialData?.clientNomineeDetailsEntityDtoList[0].addressLine1);
      setValue("AddressLine2Nom1", initialData?.clientNomineeDetailsEntityDtoList[0].addressLine2);
      setValue("AddressLine3Nom1", initialData?.clientNomineeDetailsEntityDtoList[0].addressLine3);
      setValue("CityNom1", initialData?.clientNomineeDetailsEntityDtoList[0].city);
      setValue("StateNom1", initialData?.clientNomineeDetailsEntityDtoList[0].state);

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
      setValue(
        "AccountType",
        initialData?.clientBankDetailsEntityDto[0].accountType
      );
     
      setValue("CountryFatca1", initialData?.clientFatcaDetailsEntityDto.countryOfBirth);
      setValue("TaxResidentCountryFatca1", initialData?.clientFatcaDetailsEntityDto.taxResidentCountry);
      setValue("OccupationFatca1", initialData?.clientFatcaDetailsEntityDto.occupation);
      setValue("WealthSourceFatca1", initialData?.clientFatcaDetailsEntityDto.wealthSource);
      setValue("IncomeSlabFatca1", initialData?.clientFatcaDetailsEntityDto.incomeSlab);
      setValue("IdentificationNumberFatca1", initialData?.clientFatcaDetailsEntityDto.identificationNumber);
      setValue("IdentificationTypeFatca1", initialData?.clientFatcaDetailsEntityDto.identificationType);
      setValue("OtherWealthSourceFatca1", initialData?.clientFatcaDetailsEntityDto.wealthSource);
      setValue("PoliticalExposureTypeFatca1", initialData?.clientFatcaDetailsEntityDto.politicalExposureType)
    } catch (error) {
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };
  console.log("stepDetails", OnboardingstepDetails);

  const handleFinish = ({action}) => {
    if (action === "redirect") {
      navigate("/" + encrypt("ClientMasterProductLanding") + `/${encryptData("List")}`,
      );
    }
  };

  return (
    <>
      <Pageheader
        pagename={pagemode()}
        Breadcrumbshow={true}
        breadcrumbItems={breadcrumbItems}
      ></Pageheader>
      <div className="pagebody">
        {loadingstep && (
          <>
            <StepDetails
              OnboardingStepDetailsid={id}
              laststepDetails={laststepid}
            ></StepDetails>{" "}
            {/* <RenderJsonAsHtml data={OnboardingstepDetails} /> */}
            <Accordion>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Personal Details</Accordion.Header>
                <Accordion.Body>
                  <div className="row formMainDiv">
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        readOnly={true}
                        disabled={true}
                        type="text"
                        labelName="Investor Name"
                        registerName={"InvestorName"}
                        name={"InvestorName"}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        readOnly={true}
                        disabled={true}
                        type="text"
                        labelName="Account Name"
                        registerName={"AccountName"}
                        name={"AccountName"}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        readOnly={true}
                        disabled={true}
                        type="text"
                        labelName="Account Category"
                        registerName={"AccountCategory"}
                        name={"AccountCategory"}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        readOnly={true}
                        disabled={true}
                        type="text"
                        labelName="Distributor"
                        registerName={"Distributor"}
                        name={"Distributor"}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        minLength={1}
                        maxLength={255}
                        divClassName={"divClassName"}
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center">
                      <span className="app-input-text-group-labels">
                        {" "}
                        Is Held Away ?{" "}
                      </span>
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
                        readOnly={true}
                        disabled={true}
                        type="email"
                        minLength={1}
                        maxLength={80}
                        labelName="Email ID"
                        registerName={"EmailID"}
                        name={"EmailID"}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        minLength={1}
                        maxLength={10}
                        labelName="Mobile Number"
                        registerName={"MobileNumber"}
                        name={"MobileNumber"}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        minLength={1}
                        maxLength={10}
                        labelName="Gender"
                        registerName={"Gender"}
                        name={"Gender"}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={"divClassName"}
                      />

                      {/* if (e.label === "Others") {
                                  setShowOtherGender(true);
                                } else {
                                  setShowOtherGender(false);
                                }
                               */}
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
                        readOnly={true}
                        disabled={true}
                        type="text"
                        labelName="Other Gender"
                        registerName={"OtherGender"}
                        name={"OtherGender"}
                        mandatory={showOtherGender ? true : false}
                        onPaste={false}
                        onCopy={false}
                        minLength={1}
                        maxLength={30}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={
                          showOtherGender
                            ? "divClassName"
                            : "divClassName  d-none"
                        }
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 d-flex align-items-center">
                      <span className="app-input-text-group-labels">
                        Family Head ?
                      </span>
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
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        type="text"
                        labelName="Pan Number"
                        registerName={"PanNumber"}
                        name={"PanNumber"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={30}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={"divClassName"}
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        type="text"
                        labelName="Birth Date"
                        registerName={"Birthdate"}
                        name={"Birthdate"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={30}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={"divClassName"}
                      />{" "}
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        type="text"
                        labelName="NRM/RIA"
                        registerName={"NRMRIA"}
                        name={"NRMRIA"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={255}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={255}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        labelName="Guardian Name"
                        registerName={"GuardianName"}
                        name={"GuardianName"}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        type="text"
                        labelName="Guardian Pan Number"
                        registerName={"GuardianPanNumber"}
                        name={"GuardianPanNumber"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={30}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={"divClassName"}
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        type="text"
                        labelName="Guardian date"
                        registerName={"Guardiandate"}
                        name={"Guardiandate"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={30}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={"divClassName"}
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        type="text"
                        labelName="Relation with minor"
                        registerName={"Relationwithminor"}
                        name={"Relationwithminor"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={30}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
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
                        readOnly={true}
                        disabled={true}
                        type="text"
                        labelName="Other Relation N1"
                        registerName={"OtherRelationN1"}
                        name={"OtherRelationN1"}
                        mandatory={showOtherRelationN1 ? true : false}
                        onPaste={false}
                        onCopy={false}
                        minLength={1}
                        maxLength={30}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={
                          showOtherRelationN1
                            ? "divClassName"
                            : "divClassName  d-none"
                        }
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        readOnly={true}
                        disabled={true}
                        type="text"
                        labelName="RM Code"
                        registerName={"RMCode"}
                        name={"RMCode"}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        minLength={1}
                        maxLength={30}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={
                          showOtherRelationN1
                            ? "divClassName"
                            : "divClassName  d-none"
                        }
                      />
                    </div>{" "}
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        readOnly={true}
                        disabled={true}
                        type="text"
                        labelName="Family Name"
                        registerName={"FamilyName"}
                        name={"FamilyName"}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        minLength={1}
                        maxLength={30}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={
                          showOtherRelationN1
                            ? "divClassName"
                            : "divClassName  d-none"
                        }
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        type="text"
                        labelName="Clientid"
                        registerName={"Clientid"}
                        name={"Clientid"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={30}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={30}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={"divClassName"}
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        type="text"
                        labelName="Address Line 1"
                        registerName={"AddressLine1"}
                        name={"AddressLine1"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={255}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={"divClassName"}
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        type="text"
                        labelName="Address Line 2"
                        registerName={"AddressLine2"}
                        name={"AddressLine2"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={255}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={"divClassName"}
                      />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4">
                      <InputText
                        {...useFromProps}
                        useForm={useForm}
                        type="text"
                        labelName="Pincode"
                        registerName={"Pincode"}
                        name={"Pincode"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={255}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        labelName="State"
                        registerName={"State"}
                        name={"State"}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
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
                        registerName={"City"}
                        name={"City"}
                        readOnly={true}
                        disabled={true}
                        minLength={1}
                        maxLength={30}
                        mandatory={false}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={"divClassName"}
                      />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Joint Holding Details</Accordion.Header>
                <Accordion.Body>
                      <div className="row formMainDiv">
                          <div className="col-12 col-md-4 col-lg-4">
                          <InputText
                              {...useFromProps}
                              useForm={useForm}
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Holding Type"
                              registerName={"HoldingType1"}
                              name={"HoldingType1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Name"
                              registerName={"Name1"}
                              name={"Name1"}
                              mandatory={true}
                             
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                        readOnly={true}
                        disabled={true}
                        type="text"
                        minLength={1}
                        maxLength={10}
                        labelName="Gender"
                        registerName={"Gender1"}
                        name={"Gender1"}
                        mandatory={true}
                        onPaste={false}
                        onCopy={false}
                        previewFlag={true}
                        onChange={() => {}}
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
                        readOnly={true}
                        disabled={true}
                        type="text"
                        labelName="Other Gender"
                        registerName={"OtherGender1"}
                        name={"OtherGender1"}
                        mandatory={showOtherGender ? true : false}
                        onPaste={false}
                        onCopy={false}
                        minLength={1}
                        maxLength={30}
                        previewFlag={true}
                        onChange={() => {}}
                        divClassName={
                          showOtherGender
                            ? "divClassName"
                            : "divClassName  d-none"
                        }
                      />
                    </div>
                  
                          <div className="col-12 col-md-4 col-lg-4">
                            <InputText
                              {...useFromProps}
                              useForm={useForm}
                              type="text"
                              labelName="Pan Number"
                              registerName={"PanNumber1"}
                              name={"PanNumber1"}
                              readOnly={true}
                              disabled={true}
                              minLength={1}
                              maxLength={30}
                              
                              mandatory={true}
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              labelName="Birth Date"
                              registerName={"Birthdate1"}
                              name={"Birthdate1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Country"
                              registerName={"Country1"}
                              name={"Country1"}
                              mandatory={true}
                             
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Tax Resident Country"
                              registerName={"TaxResidentCountry1"}
                              name={"TaxResidentCountry1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              minLength={1}
                              maxLength={10}
                              labelName="Identification Number"
                             
                              registerName={"IdentificationNumber1"}
                              name={"IdentificationNumber1"}
                              mandatory={true}
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              minLength={1}
                              maxLength={10}
                              labelName="Identification Type"
                             
                              registerName={"IdentificationType1"}
                              name={"IdentificationType1"}
                              mandatory={true}
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              labelName="Political Exposure Type"
                              registerName={"PoliticalExposureType1"}
                              name={"PoliticalExposureType1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Income Slab"
                              registerName={"IncomeSlab1"}
                              name={"IncomeSlab1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Occupation"
                              registerName={"Occupation1"}
                              name={"Occupation1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="WealthSource"
                              registerName={"WealthSource1"}
                              name={"WealthSource1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
                              onChange={() => {}}
                              minLength={1}
                              maxLength={255}
                              divClassName={"divClassName"}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Other Wealth Source"
                            
                              registerName={"OtherWealthSource1"}
                              name={"OtherWealthSource1"}
                              mandatory={showOtherWealthSource1 ? true : false}
                              onPaste={false}
                              onCopy={false}
                              minLength={1}
                              maxLength={30}
                              previewFlag={true}
                              onChange={() => {}}
                              divClassName={
                                showOtherWealthSource1 ? "divClassName" : "divClassName  d-none"
                              }
                            />
                            </div>
               </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Nominee Details</Accordion.Header>
                <Accordion.Body>
                  <div className="row formMainDiv">
                         <div className="col-12 col-md-4 col-lg-4">
                           <InputText
                             {...useFromProps}
                             useForm={useForm}
                             readOnly={true}
                             disabled={true}
                             type="text"
                             labelName="Name"
                             registerName={"NameNom1"}
                             name={"NameN1"}
                             mandatory={false}
                             
                             onPaste={false}
                             onCopy={false}
                             previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Gender"
                              registerName={"GenderNom1"}
                              name={"GenderNom1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
                              onChange={() => {}}
                              minLength={1}
                              maxLength={255}
                              divClassName={"divClassName"}
                            />
                         </div>
                         <div
                           className={
                            showOtherGenderNom1
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
                             labelName="Other Gender"
                            
                             registerName={"OtherGenderN1"}
                             name={"OtherGenderN1"}
                             mandatory={showOtherGenderNom1 ? true : false}
                             onPaste={false}
                             onCopy={false}
                             minLength={1}
                             maxLength={30}
                             previewFlag={true}
                             onChange={() => {}}
                             divClassName={
                              showOtherGenderNom1 ? "divClassName" : "divClassName  d-none"
                             }
                           />
                         </div>
                         <div className="col-12 col-md-4 col-lg-4">
                         <InputText
                              {...useFromProps}
                              useForm={useForm}
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Percentage"
                              registerName={"PercentageNom1"}
                              name={"PercentageNom1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Relation"
                              registerName={"RelationNom1"}
                              name={"RelationNom1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
                              onChange={() => {}}
                              minLength={1}
                              maxLength={255}
                              divClassName={"divClassName"}
                            />
                         </div>
                         <div
                           className={
                             showOtherRelationNom1
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
                             labelName="Other Relation"
                           
                             registerName={"OtherRelationNom1"}
                             name={"OtherRelationNom1"}
                             mandatory={showOtherRelationNom1 ? true : false}
                             onPaste={false}
                             onCopy={false}
                             minLength={1}
                             maxLength={30}
                             previewFlag={true}
                             onChange={() => {}}
                             divClassName={
                               showOtherRelationNom1 ? "divClassName" : "divClassName  d-none"
                             }
                           />
                         </div>
                 
                         <div className="col-12 col-md-4 col-lg-4">
                         <InputText
                              {...useFromProps}
                              useForm={useForm}
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Birth Date"
                              registerName={"Birthdate1"}
                              name={"Birthdate1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Address Line 1"
                              registerName={"AddressLineNom1"}
                              name={"AddressLineNom1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Address Line 2"
                              registerName={"AddressLineNom2"}
                              name={"AddressLineNom2"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Address Line 3"
                              registerName={"AddressLineNom3"}
                              name={"AddressLineNom3"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Pincode"
                              registerName={"PincodeNom1"}
                              name={"PincodeNom1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="State"
                              registerName={"StateNom1"}
                              name={"StateNom1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="City"
                              registerName={"CityNom1"}
                              name={"CityNom1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
                              onChange={() => {}}
                              minLength={1}
                              maxLength={255}
                              divClassName={"divClassName"}
                            />
                         </div>
                 
                       </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Bank Details</Accordion.Header>
                <Accordion.Body>
                    <div className="row formMainDiv">
                          <div className="col-12 col-md-4 col-lg-4">
                            <InputText
                              {...useFromProps}
                              useForm={useForm}
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Account Name"
                              registerName={"AccountName"}
                              name={"AccountName"}
                              mandatory={false}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Account Number"
                              registerName={"AccountNumber"}
                              name={"AccountNumber"}
                              mandatory={false}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              minLength={1}
                              maxLength={80}
                              labelName="IFSC Code"
                             
                              registerName={"IFSCCode"}
                              name={"IFSCCode"}
                              mandatory={false}
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              minLength={1}
                              maxLength={80}
                              labelName="Bank Name"
                            
                              registerName={"BankName"}
                              name={"BankName"}
                              mandatory={false}
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              minLength={1}
                              maxLength={80}
                              labelName="Branch Name"
                            
                              registerName={"BranchName"}
                              name={"BranchName"}
                              mandatory={false}
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              minLength={1}
                              maxLength={80}
                              labelName="Account Type"
                            
                              registerName={"AccountType"}
                              name={"AccountType"}
                              mandatory={false}
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
                              onChange={() => {}}
                              divClassName={"divClassName"}
                            />
                          </div>
                  
                        </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>FATCA Details</Accordion.Header>
                <div className="row formMainDiv">
                          
                          <div className="col-12 col-md-4 col-lg-4">
                          <InputText
                              {...useFromProps}
                              useForm={useForm}
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Country"
                              registerName={"CountryFatca1"}
                              name={"CountryFatca1"}
                              mandatory={true}
                             
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Tax Resident Country"
                              registerName={"TaxResidentCountryFatca1"}
                              name={"TaxResidentCountryFatca1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              minLength={1}
                              maxLength={10}
                              labelName="Identification Number"
                             
                              registerName={"IdentificationNumberFatca1"}
                              name={"IdentificationNumberFatca1"}
                              mandatory={true}
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              minLength={1}
                              maxLength={10}
                              labelName="Identification Type"
                             
                              registerName={"IdentificationTypeFatca1"}
                              name={"IdentificationTypeFatca1"}
                              mandatory={true}
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              labelName="Political Exposure Type"
                              registerName={"PoliticalExposureTypeFatca1"}
                              name={"PoliticalExposureTypeFatca1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Income Slab"
                              registerName={"IncomeSlabFatca1"}
                              name={"IncomeSlabFatca1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="Occupation"
                              registerName={"OccupationFatca1"}
                              name={"OccupationFatca1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
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
                              readOnly={true}
                              disabled={true}
                              type="text"
                              labelName="WealthSource"
                              registerName={"WealthSourceFatca1"}
                              name={"WealthSourceFatca1"}
                              mandatory={true}
                              
                              onPaste={false}
                              onCopy={false}
                              previewFlag={true}
                              onChange={() => {}}
                              minLength={1}
                              maxLength={255}
                              divClassName={"divClassName"}
                            />
                          </div>
                          <div 
                            className={
                              showOtherWealthSourceFatca1
                              
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
                              labelName="Other Wealth Source"
                            
                              registerName={"OtherWealthSourceFatca1"}
                              name={"OtherWealthSourceFatca1"}
                              mandatory={showOtherWealthSourceFatca1 ? true : false}
                              onPaste={false}
                              onCopy={false}
                              minLength={1}
                              maxLength={30}
                              previewFlag={true}
                              onChange={() => {}}
                              divClassName={
                                showOtherWealthSourceFatca1 ? "divClassName" : "divClassName  d-none"
                              }
                            />
                            </div>
               </div>
              </Accordion.Item>
            </Accordion>
            <div className="d-flex gap-2">
                        <ButtonComp
                          wrapperName="submit_btn_wrapper"
                          type={"submit"}
                          btnStyle="box"
                          btnText={
                            "Finish"
                          }
                          // disabled={!isValid}
                          onClick={() => setShowModal(true)}
                        />
            
                        
                      </div>
                      {showModal &&
                        <AppModal
                                    isOpen={showModal}
                                    onClose={() => setShowModal(false)}
                                    handleActon={(action) => handleFinish(action)}
                                    buttonConfigs={[
                                      { text: "Close", action: "redirect" },
                                    ]}                                    
                                    Modaldata={""}
                                    Modalsize={"md"}
                                    ModalTitle={""}
                                    ModalBody={"Congratulations!"}
                                    // btnText={"Close"}
                                    show={true}
                                  />}
          </>
        )}
      </div>
    </>
  );

  function pagemode() {
    let modeLabel;

    if (mode === "add") {
      modeLabel = "view  Details  ";
    } else if (mode === "edit") {
      modeLabel = "view  Details ";
    } else if (mode === "view") {
      modeLabel = "view  Details";
    } else {
      modeLabel = ""; // Default case
    }
    return t("Common:App_lms_Common_00005", {
      mode: modeLabel,
      label: t("Common:App_lms_Common_00001L"),
    });
  }

  function pageFunction() {
    let component;
    // if(OnboardingstepDetails.length > 0) {

    if (mode === "add") {
      component = (
        <>
          <StepDetails
            OnboardingStepDetailsid={id}
            laststepDetails={laststepid}
          ></StepDetails>{" "}
          <AddFormComponent Details={OnboardingstepDetails} />
        </>
      );
    } else if (mode === "edit") {
      component = (
        <>
          <StepDetails
            OnboardingStepDetailsid={id}
            laststepDetails={laststepid}
          ></StepDetails>{" "}
          <EditFormComponent Details={OnboardingstepDetails} />
        </>
      );
    } else if (mode === "view") {
      component = (
        <>
          <StepDetails
            OnboardingStepDetailsid={id}
            laststepDetails={laststepid}
          ></StepDetails>{" "}
          <ViewFormComponent Details={OnboardingstepDetails} />
        </>
      );
    } else {
      component = null; // or use an empty fragment <></> if you prefer
    }
    // }

    return component;
  }
}
