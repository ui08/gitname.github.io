import { PropTypes } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import InputSelect from "../../Component/ComponentsInput/InputSelect";
import InputText from "../../Component/ComponentsInput/InputText";
import { Apiurl } from "../../util/apiurl";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import PatternMessage from "../../util/PatternMessage";
import { ValidationPattern } from "../../ValidationPattern/ValidationPattern";
import {
  ActivationReason,
  DeactivationReason,
} from "./../../util/FrontendMaster";
import "./UserCreationFormComponent.scss";

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
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      GetallGenderList(initialData.Gender);
      GetallCountry(initialData.Country);
      fetchPincodeListMaster(initialData.Pincode);
      Getallrole(initialData.Role);
      setValue("OtherGender", initialData.OtherGender);
      setActivationinitialData(initialData?.displayNameactivation);
      GetallZone(initialData.zone);
    } else {
      GetallGenderList();
      GetallCountry();
      Getallrole();
    }
  }, [initialData, reset]);
  console.log(activationinitialData == null, "rolenamawaite");
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
  // allCountry
  const GetallCountry = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.allCountry);
      setLoading(false);
      setAllCountry([]);
      Object.values(response.data).map((item) => {
        if (value == item.id) {
          setValue("Country", {
            label: item.countryName,
            value: item.id,
          });
        } else if (value == null) {
          setValue("Country", {
            label: "India",
            value: 101,
          });
        }
        let SingleData = {
          label: item.countryName,
          value: item.id,
        };
        setAllCountry((prev) => [...prev, SingleData]);
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
  const Getallrole = async (value) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getallrole);
      setLoading(false);
      setAllrole([]);
      Object.values(response.data)
        .filter((x) => x.roleName != "client" && x.roleName != "super_admin")
        .map((item) => {
          if (value == item.roleName) {
            setValue("Role", {
              label: item.displayName,
              value: item.roleId,
              roleName: item.roleName,
            });

            setTemrolebyRole(item.roleName);
            if (item.roleId != 1) {
              GetallsupervisorRolebyRole(
                item.roleId,
                initialData.Supervisorrole
              );
            }
          }
          let SingleData = {
            label: item.displayName,
            value: item.roleId,
            roleName: item.roleName,
          };
          setAllrole((prev) => [...prev, SingleData]);
        });
    } catch (error) {
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const GetallsupervisorRolebyRole = async (value, editvalue) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        Apiurl.fetchSupervisorRolebyRoleid + value
      );
      setLoading(false);
      setAllSupervisorrole([]);
      console.log("SupervisorUser", value, editvalue);

      setValue("SupervisorRoledisplay", response.data.displayName);
      Object.values(response.data.users).map((item) => {
        if (editvalue == item.userId) {
          setValue("Supervisorrole", {
            label: item.email,
            value: item.userId,
          });
        }
        let SingleData = {
          label: item.email,
          value: item.userId,
        };
        setAllSupervisorrole((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setValue("SupervisorRoledisplay", "");
      setLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
      setLoading(false);
    }
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
          if (initialData?.branch) {
            fetchDataAllbranch(item.mappedBranches);
          }
          console.log(initialData.branch);
        }
        let SingleData = {
          label: item.displayName,
          value: item.zoneId,
          mappedBranches: item.mappedBranches,
        };
        setAllzone((prev) => [...prev, SingleData]);
      });
    } catch (error) {
      setValue("SupervisorRoledisplay", "");
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
      let temp = [];
      if (response.length < 0) {
        setValue("branch", null);
      }
      Object.values(response).map((item) => {
        console.log("response", item.displayName);

        if (initialData?.branch == item.branchId) {
          setValue("branch", {
            label: item.displayName,
            value: item.branchId,
          });
        }
        temp.push({
          label: item.displayName,
          value: item.branchId,
        });
      });
      setAllbranch(temp);
      console.log("response", temp);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const isActivationMode = mode === "Activation" || mode === "Deactivate";

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
    } else if (isActivationMode) {
      return isValidDeactivateCondition;
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
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
            type="text"
            labelName="First Name"
            registerName={"FirstName"}
            name={"FirstName"}
            mandatory={true}
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "First Name"),
            }}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode || isActivationMode}
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
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
            type="text"
            labelName="Last Name"
            registerName={"LastName"}
            name={"LastName"}
            mandatory={true}
            pattern={{
              value: ValidationPattern.alphabet,
              message: PatternMessage("alphabet", "Last Name"),
            }}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            minLength={1}
            maxLength={80}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="Gender"
            mandatory={false}
            labelName="Gender"
            options={allGender}
            previewFlag={isViewMode || isActivationMode}
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
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
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
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            divClassName={
              showOtherGender ? "divClassName" : "divClassName  d-none"
            }
          />
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={
              isViewMode || isActivationMode || isEditMode ? true : false
            }
            disabled={
              isViewMode || isActivationMode || isEditMode ? true : false
            }
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
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="Country"
            mandatory={false}
            labelName="Country"
            options={allCountry}
            previewFlag={isViewMode || isActivationMode}
            onSelect={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
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
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="Pincode"
            mandatory={true}
            labelName="Pincode"
            options={allPincode}
            onSelect={(e) => {
              setValue("State", e.pcmStateName);
            }}
            handleInputChange={handlePincodeChange}
            previewFlag={isViewMode || isActivationMode}
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
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode || isActivationMode}
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
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
            minLength={1}
            maxLength={30}
            pattern={{
              value: ValidationPattern.alphanumericSpecial,
              message: PatternMessage("alphaNumericWithoutSymbol", "City"),
            }}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            type="text"
            labelName="Employee Code"
            registerName={"EmployeeCode"}
            name={"EmployeeCode"}
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
            minLength={1}
            maxLength={30}
            pattern={{
              value: ValidationPattern.employeeID,
              message: PatternMessage(
                "alphaNumericWithoutSymbol",
                "Employee Code"
              ),
            }}
            mandatory={true}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            type="text"
            labelName="EUIN"
            registerName={"EUIN"}
            name={"EUIN"}
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
            minLength={1}
            maxLength={7}
            pattern={{
              value: ValidationPattern.EUIN,
              message: "Starting with e/E followed by 6 digit",
            }}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputText
            {...useFromProps}
            useForm={useForm}
            type="text"
            labelName="Sub Broker Code"
            registerName={"SubBrokerCode"}
            name={"SubBrokerCode"}
            readOnly={isViewMode || isActivationMode ? true : false}
            disabled={isViewMode || isActivationMode ? true : false}
            minLength={1}
            maxLength={30}
            pattern={{
              value: ValidationPattern.alphanumeric,
              message: PatternMessage(
                "alphaNumericWithoutSymbol",
                "Sub Broker Code"
              ),
            }}
            mandatory={false}
            onPaste={false}
            onCopy={false}
            previewFlag={isViewMode || isActivationMode}
            onChange={() => {}}
            divClassName={"divClassName"}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <InputSelect
            control={control}
            register={register}
            setValue={setValue}
            registerName="Role"
            mandatory={true}
            labelName="Role"
            options={allrole}
            previewFlag={isViewMode || isActivationMode}
            onSelect={(e) => {
              setAllSupervisorrole([]);

              setTemrolebyRole(e.roleName);
              if (e.roleName != "super_admin") {
                GetallsupervisorRolebyRole(e.value);
              }
              if (e.roleName == "relationship_manager") {
                GetallZone();
              }
            }}
            divClassName={"divClassName"}
          />
        </div>
        {temrolebyRole == "relationship_manager" && (
          <>
            <div className="col-12 col-md-4 col-lg-4">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="zone"
                mandatory={true}
                labelName="Zone"
                options={allzone}
                previewFlag={isViewMode || isActivationMode}
                onSelect={(e) => {
                  console.log("allzone", e.mappedBranches);

                  fetchDataAllbranch(e.mappedBranches);
                }}
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
                labelName="Branch"
                options={allbranch}
                previewFlag={isViewMode || isActivationMode}
                divClassName={"divClassName"}
              />
            </div>
          </>
        )}

        {temrolebyRole != "super_admin" && (
          <>
            <div className="col-12 col-md-4 col-lg-4">
              <InputText
                {...useFromProps}
                useForm={useForm}
                type="text"
                labelName="Supervisor Role"
                registerName={"SupervisorRoledisplay"}
                name={"SupervisorRoledisplay"}
                readOnly={true}
                disabled={true}
                mandatory={false}
                onPaste={false}
                onCopy={false}
                previewFlag={true}
                onChange={() => {}}
                divClassName={"divClassName"}
              />
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="Supervisorrole"
                mandatory={temrolebyRole != "super_admin" ? true : false}
                labelName="Supervisor  Name"
                options={allSupervisorrole}
                onSelect={(e) => {}}
                divClassName={"divClassName"}
                previewFlag={isViewMode || isActivationMode}
              />
            </div>
          </>
        )}
        {mode === "Deactivation" || mode === "Activation" ? (
          <>
            <div className="col-12 col-md-4 col-lg-4">
              <InputSelect
                control={control}
                register={register}
                setValue={setValue}
                registerName="DeactivationorActivation"
                mandatory={true}
                labelName={
                  mode === "Deactivation"
                    ? "Deactivation Reason"
                    : mode === "Activation"
                    ? "Activation Reason"
                    : null
                }
                options={
                  mode === "Deactivation"
                    ? DeactivationReason
                    : mode === "Activation"
                    ? ActivationReason
                    : " -"
                }
                onSelect={() => {}}
                // previewFlag={isViewMode}
                divClassName={"divClassName"}
              />
            </div>
          </>
        ) : null}

        {activationinitialData !== null && mode === "view" && (
          <div className="col-12 col-md-4 col-lg-4">
            <InputText
              {...useFromProps}
              useForm={useForm}
              readOnly={isViewMode || isActivationMode ? true : false}
              disabled={isViewMode || isActivationMode ? true : false}
              type="text"
              labelName={
                initialData?.displayNameactivationstatus === "Active"
                  ? "Activation  Reason"
                  : " Deactivation  Reason"
              }
              // pattern={{
              //   value: ValidationPattern.alphabet,
              //   message: PatternMessage("alphabet", "Display Name"),
              // }}
              registerName={"displayNameactivation"}
              name={"displayNameactivation"}
              mandatory={true}
              onPaste={false}
              onCopy={false}
              minLength={1}
              maxLength={80}
              previewFlag={isViewMode}
              onChange={() => {}}
              divClassName={"divClassName"}
            />
          </div>
        )}
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
