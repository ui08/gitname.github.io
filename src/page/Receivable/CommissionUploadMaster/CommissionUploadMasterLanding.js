import { faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import {
  decryptData,
  encryptData,
  encrypt,
  decrypt,
} from "../../../util/Authenticate/CryptoJS";
import toast from "react-hot-toast";
import { Apiurl } from "../../../util/apiurl";
import axiosInstance from "../../../util/axiosInstance";
import moment from "moment";
import { getMomentFromDate } from "../../../util/Authenticate";
import InputDatePicker from "../../../Component/ComponentsInput/InputDatePicker";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";

import Pageheader from "../../../Layout/Pagehader";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import CommissionUploadViewReport from "./CommissionUploadViewReport";

export default function CommissionUploadMasterLanding() {
  // const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [viewReport, setViewReport] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const hasRun = useRef(false); //To prevent multiple reders of useEffect
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [category, setCategory] = useState(null)

  // Callback for Search
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  // Callback for Date Picker
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  // Callback for Export Button
  const handleExportClick = () => {
    console.log("Export Button Clicked");
  };

  // Callback for Reset Button
  const handleResetClick = () => {
    console.log("Reset Button Clicked");
  };

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



  

  

  

 



  const breadcrumbItems = [
    // {
    //   label: {category.label != '' ? category.label : ''},
    //   // icon: <FontAwesomeIcon icon={faList} />,
    // },
    {
      label: "Commission Upload Master",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  //EDIT USER
  const navigate = useNavigate();

  const [allCategory, setAllCategory] = useState([
    {label : "Mutual Fund", value : "Mutual Fund"},
    {label : "AIF", value : "AIF"},
    {label : "PMS", value : "PMS"},
    // {label : "Other Product", value : "Other Product"}
  ])

  const [allCategoryType, setAllCategoryType] = useState([
    {label : "Aditya Birla Sun Life Mutual Fund", value : "Aditya Birla Sun Life Mutual Fund"},
    {label : "Axis Mutual Fund", value : "Axis Mutual Fund"},
    {label : "Bajaj Finserve Mutual Fund", value : "Edelweiss Mutual Fund"},
    {label : "Edelweiss Mutual Fund", value : "Edelweiss Mutual Fund"}
  ])

  const [allFinancialYear, setAllFinancialYear] = useState([
    {label : "2024-2025", value : "2024-2025"}
  ])
  const [allDateRange, setAllDateRange] = useState([
    {label : "01-07-2024 to 31-07-2024", value : "01-07-2024 to 31-07-2024"},
    {label : "01-08-2024 to 31-08-2024", value : "01-08-2024 to 31-08-2024"}
  ])

  const handleCategorySelect = (e) => {
      setCategory(e.value);
      setViewReport(false)

    
  };

  const viewReportClick = () => {
    setViewReport(true)
  }

  const handleAddNew = () => {
 navigate(
      "/" +
        encrypt("CommissionUploadAdd") + `/${encryptData(category)}` 
    );  }
 
  return (
    <>
         {loading ? (
           <Loader pagename={t("Common:App_lms_Common_00269")} />
         ) : (
           <>
             <Pageheader
               pagename={t("Common:App_lms_Common_00269")}
               Breadcrumbshow={true}
               breadcrumbItems={breadcrumbItems}
             ></Pageheader>
             <div className="pagebody">
             {category &&
               <div className="d-flex gap-3">
                 <ButtonComp
                   wrapperName={"download_temp_wrapper"}
                   type="button"
                   btnStyle="box"
                   btnText={"Add Details"}
                   onClick={() => {
                     handleAddNew();
                   }}
                 />
               </div>}
               <div className="row">
                 <div className="col-12 col-md-6 col-lg-6">
                   <InputSelect
                     control={control}
                     register={register}
                     setValue={setValue}
                     registerName="Category"
                     mandatory={true}
                     labelName="Select Product Category"
                     options={allCategory}
                     onSelect={(e) => {handleCategorySelect(e)}}
                     divClassName={"divClassName"}
                     // previewFlag={isViewMode}
                   />
                 </div>
                
                {category &&
                 <div className="col-12 col-md-6 col-lg-6">
                   <InputSelect
                     control={control}
                     register={register}
                     setValue={setValue}
                     registerName="CategoryType"
                     mandatory={true}
                     labelName={`Select ${category} Category`}
                     options={allCategoryType}
                     onSelect={() => {}}
                     divClassName={"divClassName"}
                     // previewFlag={isViewMode}
                   />
                 </div>}
                
                {/* } */}
                <div className="col-12 col-md-6 col-lg-6">
                <InputSelect
                     control={control}
                     register={register}
                     setValue={setValue}
                     registerName="FinancialYear"
                     mandatory={true}
                     labelName="Financial Year"
                     options={allFinancialYear}
                     onSelect={() => {}}
                     divClassName={"divClassName"}
                     // previewFlag={isViewMode}
                   />
                 </div>
                 <div className="col-12 col-md-6 col-lg-6">
                   <InputSelect
                     control={control}
                     register={register}
                     setValue={setValue}
                     registerName="DateRange"
                     mandatory={true}
                     labelName="Date Range"
                     options={allDateRange}
                     onSelect={() => {}}
                     divClassName={"divClassName"}
                     // previewFlag={isViewMode}
                   />
                 </div>
                 {category &&
                 <div className="d-flex gap-3">
                 <ButtonComp
                   wrapperName={"download_temp_wrapper"}
                   type="button"
                   btnStyle="box"
                   btnText={"View Report"}
                   onClick={() => {
                    viewReportClick();
                   }}
                 />
                  {/* <ButtonComp
                   wrapperName={"download_temp_wrapper"}
                   type="button"
                   btnStyle="box"
                   btnText={"Download Report"}
                   onClick={() => {
                    //  handleAddNew();
                   }}
                 /> */}
               </div>}
               </div>
              {
                viewReport &&  (
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xl-12">
                  {<CommissionUploadViewReport type = {category} />}
                </div>
                )
              }
              
             </div>
           </>
         )}
       </>
  );
}

