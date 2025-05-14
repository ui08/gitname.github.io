import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import ButtonComp from "./../../Component/ButtonComp/ButtonComp";
import Pagehader from "./../../Layout/Pagehader";
import {
  decryptData,
  encrypt,
  encryptData,
} from "./../../util/Authenticate/CryptoJS";
import Loader from "./../../util/Loader";
import { PayablePageurl } from "./PayablePageurl";
import { useForm } from "react-hook-form";
import InputSelect from "../../Component/ComponentsInput/InputSelect";
import PayableDefineList from "./PayableDefineList";
import InputDatePicker from "../../Component/ComponentsInput/InputDatePicker";
import dayjs from "dayjs";
import axiosInstance from "../../util/axiosInstance";
import { Apiurl } from "../../util/apiurl";

// import IncentiveReportList from "./PayableReportList";
// import IncentiveReportListRm from "./PayableReportListDefine";

export default function PayableDefineLanding() {
  const [loading, setLoading] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [allProduct, setAllProduct] = useState([
    {label : 'PMS', value : 'PMS'},
    {label : 'AIF', value : 'AIF'}

  ]);
  const [viewReport, setViewReport] = useState(false)
  const pageName = decryptData(useParams().pageName);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // productList();
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

  const handleAddNew = () => {
    navigate(
      "/" +
        encrypt("PayableDefineFormComponent") +
        `/${encryptData("add")}` +
        `/${encryptData("ss")}`
    );
  };

  // const productList = async (value) => {
  //       setLoading(true);
  //       try {
  //         const response = await axiosInstance.get(Apiurl.allProduct);
  //         setLoading(false);
  //         setAllProduct([]);
  //         Object.values(response.data).map((item) => {
           
    
  //           let SingleData = {
  //             label: item.productName,
  //             value: item.id,
  //           };
  //           setAllProduct((prev) => [...prev, SingleData]);
  //         });
  //       } catch (error) {
  //         setLoading(false);
  //         console.error("Error during POST request:", error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

      const handleView = () => {
        setViewReport(true)
      }

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00269")}
            Breadcrumbshow={true}
            breadcrumbItems={PayablePageurl.OtherProductsList}
          ></Pagehader>
          <div className="pagebody">
          <div className="d-flex gap-3">
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Add Entry"}
                onClick={() => {
                  handleAddNew();
                }}
              />
            </div>
            <div className="row">
              <div className="col-12 col-md-3 col-lg-3">
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
                  // previewFlag={isViewMode}
                />
              </div>
              <div className="col-12 col-md-3 col-lg-3">
                <InputDatePicker
                  control={control}
                  setValue={setValue}
                  errors={errors}
                  labelName="Select Month"
                  registerName="asondate"
                  mandatory={true}
                  dateformat="DD/MM/YYYY"
                  disabled={false}
                  minDateVal={null} // Optional: Specify the minimum date
                  maxDateVal={dayjs()} // Disable future dates
                />{" "}
              </div>
              <div className="col-12 col-md-3 col-lg-3 d-flex gap-3 mt-3">
              <ButtonComp
                wrapperName={"download_temp_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"View"}
                onClick={() => {
                  handleView();
                }}
              />
            </div>
            </div>
            
            {viewReport &&
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
              {<PayableDefineList />}
            </div>}
          </div>
        </>
      )}
    </>
  );
}
