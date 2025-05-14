import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Pagehader from "./../../../Layout/Pagehader";
import {
  decryptData,
  encrypt,
  encryptData,
} from "./../../../util/Authenticate/CryptoJS";
import Loader from "./../../../util/Loader";
import { useForm } from "react-hook-form";
import InputSelect from "../../../Component/ComponentsInput/InputSelect";
import InputDatePicker from "../../../Component/ComponentsInput/InputDatePicker";
import dayjs from "dayjs";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";

// import IncentiveReportList from "./PayableReportList";
// import IncentiveReportListRm from "./PayableReportListDefine";

export default function CommissionReceivableReport() {
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [UploadModalOpen, setUploadModalOpen] = useState(false);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const pageName = decryptData(useParams().pageName);
    const [category, setCategory] = useState(null)
  const [allCategory, setAllCategory] = useState([
      {label : "Mutual Fund", value : "Mutual Fund"},
      {label : "AIF", value : "AIF"},
      {label : "PMS", value : "PMS"},
      // {label : "Other Product", value : "Other Product"}
    ])
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  // Callback for Date Picker
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleCategorySelect = (e) => {
    setCategory(e.value);
    setShowReport(false)

  
};

  // Callback for Export Button
  const handleExportClick = () => {
    console.log("Export Button Clicked");
  };

  // Callback for Reset Button
  const handleResetClick = () => {
    console.log("Reset Button Clicked");
  };


  const breadcrumbItems = [
    // {
    //   label: {category.label != '' ? category.label : ''},
    //   // icon: <FontAwesomeIcon icon={faList} />,
    // },
    {
      label: "Commission Receivables Report",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    // {
    //   headerName: "Client Code",
    //   field: "clientCode",
    //   minWidth: 150,
    //   sortable: true,
    //   filter: true,
      
    // },
    // {
    //   headerName: "Client Name",
    //   field: "clientName",
    //   minWidth: 250,
    //   sortable: true,
    //   filter: true,
      
    // },
    // {
    //   headerName: "RM Code",
    //   field: "rmCode",
    //   minWidth: 150,
    //   maxWidth: 150,      sortable: true,
    //   filter: true,
      
    // },
    // {
    //   headerName: "RM Name",
    //   field: "rmName",
    //   minWidth: 150,
    //   sortable: true,
    //   filter: true,
     
    // },
    {
      headerName: "AMC Name",
      field: "amcName",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
     
    },
    {
      headerName: "MF Scheme ISIN",
      field: "mfSchemeNameIsin",
      minWidth: 150,
      maxWidth: 150,      sortable: true,
      filter: true,
     
    },
    {
      headerName: "MF Scheme Name",
      field: "mfSchemeName",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    },
    {
      headerName: "Upfront",
      field: "upfront",
      minWidth: 150,
      sortable: true,
      filter: true,
     
    },
    {
      headerName: "Trail",
      field: "trail",
      minWidth: 150,
      sortable: true,
      filter: true,
      
    }
  ];


   const [rowData, setRowData] = useState([
      {
        clientCode : "CLT12345",
        clientName : "Rajesh Kumar",
        rmCode : "RK001",
        rmName : "Rajesh Kumar",
        amcName : "HDFC AMC",
        mfSchemeNameIsin : "INHDF000005",
        mfSchemeName : "HDFC Equity Fund",
        upfront : "5,00,000",
        trail : "0",
  
      },
      {
        clientCode : "CLT23456",
        clientName : "Priya Mehta",
        rmCode : "PV002",
        rmName : "Priya Mehta",
        amcName : "ICICI Prutential",
        mfSchemeNameIsin : "ICICI000012",
        mfSchemeName : "ICICI Balanced Fund",
        upfront : "7,50,000",
        trail : "0",
  
      },
      {
        clientCode : "CLT34567",
        clientName : "Sanjay Patel",
        rmCode : "SP003",
        rmName : "Sanjay Patel",
        amcName : "Axis AMC ",
        mfSchemeNameIsin : "INAXIS000028",
        mfSchemeName : "Axis Long Term Equity",
        upfront : "0",
        trail : "25,00,000",
  
      },
      {
        clientCode : "CLT45678",
        clientName : "Neha Agarwal",
        rmCode : "NA004",
        rmName : "Neha Agarwal",
        amcName : "SBI Mutual Fund ",
        mfSchemeNameIsin : "INSBI000103",
        mfSchemeName : "SBI Debt Fund",
        upfront : "10,00,000",
        trail : "12,00,000",
  
      },
      {
        clientCode : "CLT5679",
        clientName : "Amit Varma",
        rmCode : "AV005",
        rmName : "Amit Varma",
        amcName : "Aditya Birla AMC",
        mfSchemeNameIsin : "INAB000017",
        mfSchemeName : "Aditya Birla Hybrid Fund",
        upfront : "15,00,000",
        trail : "13,00,000",
  
      }
    ])

    const getRowStyle = (params) => {
      return {
        backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
      };
    };

    const viewReport = () => {
      setShowReport(true)
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
            breadcrumbItems={
             
              breadcrumbItems             
            }
          ></Pagehader>
          <div className="pagebody">
            <div className = "row">
              <div className="col-12 col-md-6 col-lg-6">
                                 <InputSelect
                                   control={control}
                                   register={register}
                                   setValue={setValue}
                                   registerName="Category"
                                   mandatory={true}
                                   labelName="Select Category"
                                   options={allCategory}
                                   onSelect={(e) => {handleCategorySelect(e)}}
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
                                    </div>
                                    <div className="d-flex gap-3">
                                                     <ButtonComp
                                                       wrapperName={"download_temp_wrapper"}
                                                       type="button"
                                                       btnStyle="box"
                                                       btnText={"Submit"}
                                                       onClick={() => {
                                                         viewReport();
                                                       }}
                                                     />
                                                   </div>
          {showReport &&
             <div>
                    <AgTable
                      columnDefs={columnDefs}
                      rowData={rowData}
                      filenames="Credit_Rating"
                      StyleClass="btn btn-primary"
                      type="table"
                      gridOptions={{
                        getRowStyle,
                      }}
                      onSearchChange={handleSearchChange}
                      onDateChange={handleDateChange}
                      onExportClick={handleExportClick}
                      onResetClick={handleResetClick}
                      showDatePicker={false}
                    />
                  </div>}
          </div>
        </>
      )}
    </>
  );
}
