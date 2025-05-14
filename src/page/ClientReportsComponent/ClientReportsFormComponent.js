import moment from "moment";
import { PropTypes } from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Apiurl } from "../../util/apiurl";
import {
  getMomentFromDate,
  getUserFilterDetails,
} from "../../util/Authenticate";
import { decryptData } from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import LoadFromBase64pdf from "../../util/LoadFromBase64Example";
import ReportFilterFormComponent from "../../util/ReportFilterFormComponent";
import { DownloadReportPDFFunction } from "../Uploads/UploasAction";
import { DownloadReportExcelFunction } from "./../Uploads/UploasAction";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

const ClientReportsFormComponent = () => {
  const mode = decryptData(useParams().mode);
  const getReportData = () => {
    switch (mode) {
      case "ClientHoldingReport":
        return "HOLDING_REPORT";
      case "CapitalGainReport":
        return "CAPITAL_GAIN_REPORT";
      case "ClientSummaryReports":
        return "SUMMARY_REPORT";
      case "ClientTransactionReport":
        return "TRANSACTION_REPORT";
      case "ClientXIRRReports":
        return "XIRR_REPORT";
      case "Client360DegreeWealth":
        return "THREE_SIXTY_DEGREE_WEALTH_REPORT";
      default:
    }
  };

  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [reportFileId, setreportFileId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [handleAction, setHandleAction] = useState(null);
  const [viewReportPDF, setViewReportPDF] = useState(null);
  const [viewreportType, setViewreportType] = useState(getReportData());

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleActionChange = useCallback(
    (action) => {
      setViewReportPDF(null);
      // setCount(0)
      console.log(action);
      setHandleAction(action);
    },
    [handleAction]
  );

  const handleSubmit = (formData) => {
    console.log("reportTypehandleAction", formData);
    if (handleAction) {
      if (formData.selectreport) {
        setData(formData);
        handleExportReports(formData, handleAction);
      }
    }
  };

  const handleExportReports = useCallback((reportData, Action) => {
    if (reportData.selectreport.value == "THREE_SIXTY_DEGREE_WEALTH_REPORT") {
      if (Action === "Export") {
        DownloadReportPDFFunction(
          "THREE_SIXTY_DEGREE_WEALTH_REPORT",
          "6b6dc382-accd-4a22-bf2b-3daad5b3f3de"
        );
      }
      if (Action === "View") {
        ViewReportPDFFunction(
          "THREE_SIXTY_DEGREE_WEALTH_REPORT",
          "6b6dc382-accd-4a22-bf2b-3daad5b3f3de"
        );
      }
    }
    // else if (reportData.selectreport.value == "XIRR_REPORT") {
    //   if (Action === "Export") {
    //     DownloadReportPDFFunction(
    //       "XIRR_REPORT",
    //       "60219lwo-c916-4d7f-9532-665708325301"
    //     );
    //   }
    //   if (Action === "View") {
    //     ViewReportPDFFunction(
    //       "XIRR_REPORT",
    //       "6b6dc382-accd-4a22-bf2b-3daad5b3f3de"
    //     );
    //   }
    // }
    else {
      const { url, payload } = getUrlAndPayload(reportData);
      handleReportsExport(url, payload);
    }
  }, []);

  const getUrlAndPayload = (reportType) => {
    let temReporttype = reportType.selectreport.value;
   
    let url = "";
    // let payload = {
    //   clientId: getUserFilterDetails("clientId"),
    //   accountIds:
    //     reportType.selectaccount != undefined
    //       ? reportType.selectaccount.map((item) => item.label)
    //       : null,
    let temreportTypeselectaccount = reportType?.selectaccount
      ? [reportType?.selectaccount]
      : [];
    const rawPayload = {
      clientId: getUserFilterDetails("clientId"),
        accountIds: reportType?.selectaccount?.map((item) => item.label) ?? null,
      heldAway: reportType.Reportsbyheld === "heldaway" ? true : false,
      held: reportType.Reportsbyheld === "held" ? true : false,
      both: reportType.Reportsbyheld === "both" ? true : false,
      fromDate:
        reportType.selectreport.value === "XIRR_REPORT" || reportType.selectreport.value === "HOLDING_REPORT" || reportType.selectreport.value === "CAPITAL_GAIN_REPORT" || reportType.selectreport.value === "SUMMARY_REPORT" || reportType.selectreport.value === "THREE_SIXTY_DEGREE_WEALTH_REPORT"
          ? null
          : reportType.fromdate != undefined
          ? getMomentFromDate(reportType.fromdate, "MonthDateYYYY")
          : null,
      toDate:
        reportType.selectreport.value === "XIRR_REPORT" || reportType.selectreport.value === "HOLDING_REPORT" || reportType.selectreport.value === "CAPITAL_GAIN_REPORT" || reportType.selectreport.value === "SUMMARY_REPORT" || reportType.selectreport.value === "THREE_SIXTY_DEGREE_WEALTH_REPORT"
          ? null
          : reportType.todate != undefined
          ? getMomentFromDate(reportType.todate, "MonthDateYYYY")
          : null,
      logInMode: "Client",
      // asOnDate:
      // reportType.selectreport.value === "TRANSACTION_REPORT" || reportType.selectreport.value === "CAPITAL_GAIN_REPORT" ? null :
      //   reportType.Repasondate != undefined
      //     ? // ? getMomentFromDate(reportType.asondate, "Datepicker")
      //       reportType.Repasondate
      //       ? getMomentFromDate(reportType.Repasondate, "MonthDateYYYY")
      //       : getMomentFromDate(reportType.Repasondate, "MonthDateYYYY")
      //     : null,
        asOnDate: reportType.selectreport.value === "TRANSACTION_REPORT" || reportType.selectreport.value === "CAPITAL_GAIN_REPORT" ? null : reportType?.Repasondate
              ? reportType.Repasondate
                ? getMomentFromDate(reportType.Repasondate, "MonthDateYYYY")
                : getMomentFromDate(reportType.Repasondate, "MonthDateYYYY")
              : null,
      inRmFilterMode: null,
      rmId: null,
      familyId: null,
      clientIds: [],
      productIds: [],
      securityIds: [],
    };

    const reportMapping = {
      HOLDING_REPORT: Apiurl.generateReportHolding,
      TRANSACTION_REPORT: Apiurl.generateReportTransaction,
      CAPITAL_GAIN_REPORT: Apiurl.generateReportCapitalGain,
      SUMMARY_REPORT: Apiurl.clientgenerateSummaryReport,
      XIRR_REPORT: Apiurl.generateReportXirr,
    };

     url = reportMapping[temReporttype];
    const payload = { payload: rawPayload };
    setLoading(true);
    // setData();
    return { url, payload };
  };

  const handleReportsExport = async (url, payload) => {
    console.log("Generate", url, payload);
    try {
      setLoading(true);
      const response = await axiosInstance.post(url, payload.payload);
      if (response.data) {
        setLoading(false);
        if (response.data.errorMessage == "NO DATA FOUND") {
          toast.error("NO DATA FOUND");
        } else {
          toast.success(response.data.message);
          setreportFileId(response.data.reportFileId);
          // GeneratedReportPDFFunction(response.data.reportFileId);
          fetchData();
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Export error: ", error);
      toast.error(t(""));
    } finally {
      setLoading(false);
    }
  };

  const fetchData = useCallback(() => {
    if (reportFileId && !isSuccess) {
      GeneratedReportPDFFunction(viewreportType, reportFileId);
    }
  }, [reportFileId, isSuccess, viewreportType]);

  useEffect(() => {
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const GeneratedReportPDFFunction = async (cx, fileId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.checkIfReportIsGenerated}reportType=${cx}&fileId=${fileId}`
      );
      setLoading(false);
      setIsSuccess(response.data);
      console.log(handleAction);
      if (response.data && handleAction === "Export") {
        if (viewreportType == "TRANSACTION_REPORT") {
          DownloadReportExcelFunction(viewreportType, reportFileId);
        } else {
          DownloadReportPDFFunction(viewreportType, reportFileId);
        }
        setIsSuccess(false);
        setreportFileId(null);
        setLoading(false);
      } else if (response.data && handleAction === "View") {
        ViewReportPDFFunction(viewreportType, reportFileId);
        setIsSuccess(false);
        setreportFileId(null);
        setLoading(false);
      } else {
      }
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Download error: ", error);
    }
  };

  const ViewReportPDFFunction = async (ReportType, fileId) => {
    setLoading(true);
    setViewReportPDF(null);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.generateviewReport}reportType=${ReportType}&fileId=${fileId}`
      );
      setLoading(false);
      setViewReportPDF(response.data);
      toast.success("Report viewed successfully.");
      setLoading(false);
    } catch (error) {
      console.error("Download error: ", error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader pagename="Updating ..." />
      ) : (
        <>
          <div>
            <ReportFilterFormComponent
              initialData={data}
              onSubmit={handleSubmit}
              handleViewCom={handleActionChange}
              handleExportCom={handleActionChange}
              pageName={mode}
            />
          </div>

          <div div className="mt-5">
            {viewReportPDF !== null && (
              <LoadFromBase64pdf pdfdata={viewReportPDF} />
            )}
          </div>
        </>
      )}
    </>
  );
};

ClientReportsFormComponent.propTypes = {
  initialData: PropTypes.any,
  onSubmit: PropTypes.func,
};
export default ClientReportsFormComponent;
