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
      GetallGenderList(initialData.Gender);
      GetallCountry(initialData.Country);
      fetchPincodeListMaster(initialData.Pincode);

      setValue("OtherGender", initialData.OtherGender);

      reset(initialData);
    } else {
      GetallGenderList();
      GetallCountry();

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

  const handleOtherGender = (e) => {};
  const handleCancel = () => {
    navigate(
      "/" + encrypt("UserCreationListLanding") + `/${encryptData("List")}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        
       

       
          <div className="d-flex gap-2">
            <ButtonComp
              wrapperName="submit_btn_wrapper"
              type={"submit"}
              btnStyle="box"
              btnText={
                "Finish"
              }
              // disabled={!isValid}
              onClick={() => handleSubmit()}
            />

            
          </div>
        
      </div>
    </form>
  );
};

FormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
};
export default FormComponent;
