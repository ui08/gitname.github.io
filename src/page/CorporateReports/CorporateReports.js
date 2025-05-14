import { faDownload } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import "../../App.scss";
import ActionButtons from "../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../Component/ComponentsTable/AgTable";
import Pagehader from "../../Layout/Pagehader";
import { Apiurl } from "../../util/apiurl";
import { encrypt } from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import AppToaster from "../../util/Toaster/AppToaster";
import { DownloadReportExcelFunction } from "../Uploads/UploasAction";
import ViewArea from "./../../util/ViewArea";
import FormComponent from "./FormComponent";

export default function CorporateReports() {
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

  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportDate, setReportDate] = useState();

  const [corporateReportsData, setCorporateReportsData] = useState();
  const [corporateReportspastData, setCorporateReportspastData] = useState();
  const [corporateReportsrecentData, setCorporateReportsrecentData] =
    useState();

  const { t } = useTranslation(["Common", "Messages", "Form"]);
  let historyAPIAttributes = ["HOLDING_REPORT","TRANSACTION_REPORT"];
  const hasRun = useRef(false); //To prevent multiple reders of useEffect 

  useEffect(() => {
    if (!hasRun.current) {
      setLoading(true);
      setTimeout(() => {
        handlereportHistory(historyAPIAttributes);
        setLoading(false);
      }, 2000);
      hasRun.current = true;
    }
  }, []);

  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00119"),
      href: "/" + encrypt("Rmdashboard"),
      //   icon: <FontAwesomeIcon icon={faFileLines} />,
    },
    {
      label: t("Common:App_lms_Common_00247"),
      //   icon: <FontAwesomeIcon icon={faList} />,
    },
  ];

  const handleReportsExport = async (reportName, CorporateReportdate) => {
    // setData(null);
    console.log('report', reportName)
    let url;
    if (reportName == "HOLDING_REPORT") {
      url = Apiurl.generateReportHolding;
    } else if (reportName == "TRANSACTION_REPORT") {
      url = Apiurl.generateReportTransaction;
    }
    setLoading(true);
    let payload = {
      fileName: "",
      message: "",
      asOnDate: CorporateReportdate,
    };
    try {
      const response = await axiosInstance.post(url, payload);
      if (response) {
        // setLoading(false);
        toast.success(response.data.message);
        setCorporateReportsrecentData();
        setCorporateReportspastData();
        // handleCorporateReportsrecent(reportName);
        // handleCorporateReportspast(reportName);
        handlereportHistory(reportName);
        // setData(response.data.reportFileId);
        // fetchData();
        // DownloadReportPDFFunction("HOLDING_REPORT", "28b50983-e111-44a0-907a-dc6204cfe4f3");
      }
    } catch (error) {
      // setLoading(false);
      console.error("Login error: ", error);
      toast.error(t(""));
    } finally {
      // setLoading(false);
    }
  };

  const handleAddSubmit = async (data) => {
    setLoading(true);
    let CorporateReportdate = moment(data.date.$d).format("DD/MM/YYYY");
    let CorporateReportType = data.CorporateReport.value;
    handleReportsExport(CorporateReportType, CorporateReportdate);
  };

  const handlereportHistory = async (data) => {
    setLoading(true);
    let url = Apiurl.reportHistory + `?reportTypeList=${data}`;
    try {
      const response = await axiosInstance.get(url);
      if (response) {
        setLoading(false);
        // toast.success(response.data.message);
        <AppToaster duration={50000} Toastericon={"👏"} />;
        setCorporateReportsrecentData(response.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleTableFunction = (params, action) => {
    if (action === "handleDownload") {
      if(params.data.reportType == 'TRANSACTION_REPORT') {
        DownloadReportExcelFunction(params.data.reportType, params.data.reportFileId);

      } else {
      handlePDF(params.data.reportType, params.data.reportFileId);
      }
    } 
  };

  const handlePDF = async (reportType, reportFileId) => {
    try {
      // Construct the API endpoint dynamically with the provided parameters (query parameters)
      const endpoint = `${Apiurl.downloadReport}reportType=${reportType}&fileId=${reportFileId}`;

      // Make an API request to fetch the PDF file
      const response = await axiosInstance.get(endpoint, {
        responseType: "blob", // Ensure the response is in blob format
      });

      // Create a temporary URL for the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create an anchor link to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${reportType}.pdf`); // Set the default filename for the download

      // Append the link to the DOM, simulate a click to trigger the download, then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the created URL object
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Handle errors if download fails
      // setError("Error downloading the PDF");
      console.error("Error downloading the PDF", err);
    } finally {
      // setLoading(false); // Reset the loading state after the operation completes
    }
  };

  const columnDefs = [
   
    {
      headerName: "Report Name",
      field: "reportType",
     
      sortable: true,
      filter: true,
      maxWidth: 180,
    },
    {
      headerName: "Report Type",
      field: "reportFileType",
     
      sortable: true,
      filter: true,
      maxWidth: 100,
    },
    {
      headerName: "File Id",
      field: "reportFileId",
      sortable: true,
      filter: true,
      maxWidth: 600,
    },
   
    {
      headerName: "Created By",
      field: "createdBy",
      sortable: true,
      filter: true,
      maxWidth: 300,
    },
    {
      headerName: "Created Date",
      field: "createdDate",
      cellRenderer: (params) =>
        moment(params.data.createdDate).format("DD/MM/YYYY HH:mm:ss"),
      sortable: true,
      filter: true,
      maxWidth: 300,
    },
    {
      headerName: "Download",
      minWidth: 100,
      cellRenderer: (params) => (
    ActionButtonsFunction(params, handleTableFunction)
      ),
    },
    
  ];

  return (
    <>
      {loading ? (
        <Loader pagename="Reports " />
      ) : (
        <>
          <Pagehader
            pagename="Reports"
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
          ></Pagehader>

          <div className="pagebody ">
            <div className="row justify-content-center Reportspagebody">
              <div className="row">
                <p className="ReportsRequest">Corporate Reports Request </p>
                <FormComponent onSubmit={handleAddSubmit} />
              </div>
            </div>
            {!corporateReportsrecentData ? (
              <ViewArea></ViewArea>
            ) : (
              <div className="row">
                <p className="corporateReportHading">History</p>

                <AgTable
                  columnKeys={columnDefs.field}
                  columnDefs={columnDefs}
                  rowData={corporateReportsrecentData}
                  // filenames={
                  //   `${optionbtn}` +
                  //   "_" +
                  //   `${optionbtn === "All" ? "" : selectedOptioncard}` +
                  //   "_" +
                  //   "Information"
                  // }
                  StyleClass={"ag_export_btn ripple_btn"}
                  downloadbtnstext={true}
                  showDatePicker={false}
                  // onSelectionChanged={onSelectionChangedContribution}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

const styles = {
  buttonGroup: {
    display: "flex",
    gap: "5px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4f74f7",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },
};

function ActionButtonsFunction(params, handleTableFunction) {
  return <ActionButtons
    params={params}
    buttonConfigs={[
      {
        text: "Download",
        icon: faDownload,
        action: "handleDownload",
        show: true,
        disabled: params.data.reportDownloadFlag == "N" ? true : false,
      },
      
    ]}
    handleFunction={handleTableFunction} />;
}