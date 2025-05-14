import { PropTypes } from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";

import SelectElement from "../../Component/ComponentsInput/InputSelect";
import { decryptData, encrypt } from "../../util/Authenticate/CryptoJS";

const FormComponent = ({
  initialData,
  onSubmit,
  onFileChangeNew,
  previewImage,

}) => {
  const navigate = useNavigate();
  const mode = decryptData(useParams().mode);

  const [reportBy, setReportBy] = useState("Family");
  const [reportType, setReportType] = useState("Both");
  const [activeAccordion, setActiveAccordion] = useState(null); // Track open accordion
  const [radioSelections, setRadioSelections] = useState({}); // Store radio button selections for each accordion
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [rmId, setRmId] = useState("");
  const [family, setFamily] = useState([]);
  const [client, setClient] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedAccountCategory, setSelectedAccountCategory] = useState("");
  const [accountCategory, setAccountCategory] = useState([]);
  const [account, setAccount] = useState([]);
  const [product, setProduct] = useState([]);
  const [reportFormat, setReportFormat] = useState([]);
  const [report, setReport] = useState([]);

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

  //   useEffect(() => {
  //     if (initialData) {
  //       reset(initialData);
  //       setValue("AssetClassID", initialData.id);
  //       setValue("AssetName", initialData.description);
  //       setValue("EntityAssetName", initialData.entityAssetDescription);
  //       setValue("TaxAssetName", initialData.taxAssetDescription);
  //     }
  //   }, [initialData, reset]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // getUserDetails();
    fetchProduct();
    fetchAllFamily(getUserId());
    fetchAllClientByRm(getUserId());
  }, []);

  const isViewMode = mode === "view";
  const isAddMode = mode === "add";
  const isEditMode = mode === "edit";

  const [AssetName] = watch(["AssetName"]);

  const isValidCondition = AssetName;

  const isValid = ValidFunction();

  function ValidFunction() {
    if (isAddMode) {
      return isValidCondition;
    } else {
      return isValidCondition;
    }
  }

  const handleCancel = () => {
    navigate("/" + encrypt("AssetClassList"));
  };

  const getUserDetails = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.userDetails);
      const userData = response.data;
      fetchAllFamily(userData.rmAdvId);
      fetchAllClientByRm(userData.rmAdvId);
    } catch (error) {
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFamily = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Apiurl.allFamily}${id}`);

      setLoading(false);
      let result = response.data;
      // console.log("item", result);

      setFamily([]);
      Object.values(result).map((item) => {
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setFamily((prevData) => [...prevData, SingleData]);
      });
    } catch (error) {
      console.error("Download error: ", error);
    }
  };

  const fetchAllClientByRm = async (id) => {
    // setLoading(true)
    try {
      const response = await axiosInstance.get(
        `${Apiurl.allClientByFamily}${id}`
      );

      setLoading(false);
      let result = response.data;
      Object.values(result).map((item) => {
        let SingleData = {
          label: item.clinetName,
          value: item.id,
        };
        // setClient((prevData) => [...prevData, SingleData]);
      });
    } catch (error) {
      console.error("Download error: ", error);
    }
  };

  const fetchAllAccountCategoryByClient = async (id) => {
    // setLoading(true)
    try {
      const response = await axiosInstance.get(
        `${Apiurl.allAccountCategoryByClient}${id}`
      );

      setLoading(false);
      let result = response.data;
      // setAccountCategory([]);
      Object.values(result).map((item) => {
        let SingleData = {
          label: item,
          value: item,
        };
        // setAccountCategory((prevData) => [...prevData, SingleData]);
      });
    } catch (error) {
      console.error("Download error: ", error);
    }
  };

  const fetchAllAccounByClient = async (id, category) => {
    // setLoading(true)
    try {
      const response = await axiosInstance.get(
        `${Apiurl.allAccountByClient}${id}/${category}`
      );

      setLoading(false);
      let result = response.data;
      setAccount([]);
      Object.values(result).map((item) => {
        let SingleData = {
          label: item.name,
          value: item.id,
        };
        setAccount((prevData) => [...prevData, SingleData]);
      });
    } catch (error) {
      console.error("Download error: ", error);
    }
  };

  const fetchProduct = async () => {
    // setLoading(true)
    try {
      const response = await axiosInstance.get(Apiurl.getProduct);

      setLoading(false);
      let result = response.data;
      // setProduct([]);
      Object.values(result).map((item) => {
        let SingleData = {
          label: item.productName,
          value: item.id,
        };
        // setProduct((prevData) => [...prevData, SingleData]);
      });
    } catch (error) {
      console.error("Download error: ", error);
    }
  };

  useEffect(() => {
    // Start polling with setInterval (runs every 3 seconds)
    const intervalId = setInterval(fetchData, 3000);

    // Clear the interval if polling is successful
    if (isSuccess) {
      clearInterval(intervalId);
    } else {
      if (data == null) {
        clearInterval(intervalId);
      }
    }

    // Cleanup function to clear interval on component unmount or when polling stops
    return () => clearInterval(intervalId);
  }, [fetchData]); // Depend on `fetchData` and `isSuccess`



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row formMainDiv">
        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
          <SelectElement
            {...useFromProps}
            useForm={useForm}
            register={() => {}}
            divClassName={"SelectFamily"}
            isMulti={false}
            readOnly={false}
            previewFlag={""}
            onSelect={() => {}}
            handleInputChange={() => {}}
            registerName={"SelectFamily"}
            mandatory={true}
            labelName="Select Family"
            options={family}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
          <SelectElement
            {...useFromProps}
            useForm={useForm}
            register={() => {}}
            divClassName={"SelectClient"}
            isMulti={false}
            readOnly={false}
            previewFlag={""}
            onSelect={() => {}}
            handleInputChange={() => {}}
            registerName={"SelectClient"}
            mandatory={true}
            labelName="Select Client"
            options={client}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
          <SelectElement
            {...useFromProps}
            useForm={useForm}
            register={() => {}}
            divClassName={"SelectAccountCategory"}
            isMulti={false}
            readOnly={false}
            previewFlag={""}
            onSelect={() => {}}
            handleInputChange={() => {}}
            registerName={"SelectAccountCategory"}
            mandatory={true}
            labelName="Select Account Category"
            options={accountCategory}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
          <SelectElement
            {...useFromProps}
            useForm={useForm}
            register={() => {}}
            divClassName={"SelectAccount"}
            isMulti={false}
            readOnly={false}
            previewFlag={""}
            onSelect={() => {}}
            handleInputChange={() => {}}
            registerName={"SelectAccount"}
            mandatory={true}
            labelName="Select Account"
            options={account}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
          <SelectElement
            {...useFromProps}
            useForm={useForm}
            register={() => {}}
            divClassName={"SelectProduct"}
            isMulti={false}
            readOnly={false}
            previewFlag={""}
            onSelect={() => {}}
            handleInputChange={() => {}}
            registerName={"SelectProduct"}
            mandatory={true}
            labelName="Select Product"
            options={product}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
          <SelectElement
            {...useFromProps}
            useForm={useForm}
            register={() => {}}
            divClassName={"SelectReport"}
            isMulti={false}
            readOnly={false}
            previewFlag={""}
            onSelect={() => {}}
            handleInputChange={() => {}}
            registerName={"SelectReport"}
            mandatory={true}
            labelName="Select Report"
            options={report}
          />
        </div>
        <div className="col-12 col-md-4 col-lg-4 col-xl-4">
          <SelectElement
            {...useFromProps}
            useForm={useForm}
            register={() => {}}
            divClassName={"SelectReport"}
            isMulti={false}
            readOnly={false}
            previewFlag={""}
            onSelect={() => {}}
            handleInputChange={() => {}}
            registerName={"SelectReportFormat"}
            mandatory={true}
            labelName="Select Report Format"
            options={reportFormat}
          />
        </div>
        <div className="d-flex gap-2">
          <ButtonComp
            wrapperName="submit_btn_wrapper"
            type={"submit"}
            btnStyle="box"
            btnText={"Export"}
            disabled={!isValid}
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
