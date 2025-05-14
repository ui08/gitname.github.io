import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import "../../App.scss";
import AppModal from "../../Component/Modal/AppModal";
import Pagehader from "../../Layout/Pagehader";
import { CapitalGainTable } from "../../page/ClientReportsComponent/CapitalGainTable";
import { Apiurl } from "../../util/apiurl";
import {
  getMomentFromDate,
  getUserFilterDetails,
} from "../../util/Authenticate";
import { decryptData, encrypt } from "../../util/Authenticate/CryptoJS";
import axiosInstance from "../../util/axiosInstance";
import Loader from "../../util/Loader";
import ReportFilterFormComponent from "../../util/ReportFilterFormComponent";
import {
  DownloadReportExcelFunction,
  DownloadReportPDFFunction,
} from "../Uploads/UploasAction";
import LoadFromBase64pdf from "./../../util/LoadFromBase64Example";

export default function EntityReport() {
  const Reportmode = decryptData(useParams().Reportmode);
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [reportFileId, setreportFileId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [handleAction, setHandleAction] = useState(null);
  const [viewReportPDF, setViewReportPDF] = useState(null);
  const [viewreportType, setViewreportType] = useState();
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [schemeData, setSchemeData] = useState(null);
  const [tableData, setTableData] = useState([]);
  console.log(tableData, "tableData");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleActionChange = useCallback(
    (action) => {
      setViewReportPDF(null);
      setCount(0);
      console.log(action);
      setHandleAction(action);
    },
    [handleAction]
  );

  const handleSubmit = async (formData) => {
    console.log("reportType1", formData, formData.selectreport.value);
    setViewreportType(formData.selectreport.value);
    if (!handleAction || !formData.selectreport) return;
    setData(formData);

    if (formData.selectreport.value === "CAPITAL_GAIN_REPORT") {
      setLoading(true);
      const CustomPayload = {
        clientId: null,
        logInMode: "RM",
        heldAway: false,
        held: false,
        both: true,
        financialYear: formData.financialYear.value,
        inRmFilterMode: formData.Reportsby,
        familyId: formData.selectfamily?.value ?? null,
        clientIds: formData.selectclient ? [formData.selectclient.value] : null,
        fromDate: formData.financialYear.fromDate,
        toDate: formData.financialYear.toDate,
      };

      try {
        const response = await axiosInstance.post(
          `${Apiurl.getSchemeNameFolio}`,
          CustomPayload
        );
        if (response.data) {
          setSchemeData(response.data);
          toast.success(response.data.message);
          const isMutualFund =
            formData?.selectproduct === null ||
            formData?.selectproduct?.label === "Mutual Funds";
          if (!isMutualFund) {
            handleExportReports(formData, handleAction, null); // Pass null for tableData when not mutual fund
          } else {
            setShowModal(true);
          }
        }
      } catch (error) {
        console.error("Export error: ", error);
        toast.error(t(""));
      } finally {
        setLoading(false);
      }
    } else {
      handleExportReports(formData, handleAction, null);
    }
  };

  const handleTableDataSubmit = async (submitdata) => {
    setTableData(submitdata);
    handleExportReports(data, handleAction, submitdata); // Pass submitdata directly
    setShowModal(false);
  };

  const handleExportReports = useCallback((reportData, Action, tableData) => {
    if (reportData?.selectreport?.value == "THREE_SIXTY_DEGREE_WEALTH_REPORT") {
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
    // else if (reportData?.selectreport?.value == "CAPITAL_GAIN_REPORT") {
    //   const { url, payload } = getUrlAndPayload(reportData);
    //   handleReportsExport(url, payload);
    // }
    //  else if (reportData.selectreport.value == "XIRR_REPORT") {
    //    if (Action === "Export") {
    //      DownloadReportPDFFunction(
    //        "XIRR_REPORT",
    //        "60219lwo-c916-4d7f-9532-665708325301"
    //      );
    //    }
    //    if (Action === "View") {
    //      ViewReportPDFFunction(
    //        "XIRR_REPORT",
    //        "6b6dc382-accd-4a22-bf2b-3daad5b3f3de"
    //      );
    //    }}
    else {
      const { url, payload } = getUrlAndPayload(reportData, tableData);
      handleReportsExport(url, payload);
    }
  }, []);

  const getUrlAndPayload = (reportType, tableData) => {
    console.log("reportType", reportType.fromDate);
    let temReporttype = reportType?.selectreport?.value;

    const isCapitalGainReport =
      reportType?.selectreport?.value === "CAPITAL_GAIN_REPORT";

    const isTransactionReport =
      reportType?.selectreport?.value === "TRANSACTION_REPORT";

    const holdingList = isCapitalGainReport
      ? reportType?.selectproduct == null ||
        reportType?.selectproduct?.value === 19
        ? (tableData || [])?.map((item) => ({
            isin: item.isin,
            id: item.clientMutualFundId,
            assetClass: item.sebiAssetType,
            schemeName: item.schemeName,
            flag: item.sebiAssetType?.includes("Equity") ? false : true,
          }))
        : null
      : null;
    //     const holdingList =
    // isCapitalGainReport &&
    // (reportType?.selectproduct == null || reportType?.selectproduct?.[0]?.value === 19)
    //   ? Array.isArray(schemeData)
    //     ? schemeData.map((item) => ({
    //         isin: item.isin,
    //         id: item.clientMutualFundId,
    //         assetClass: item.sebiAssetType,
    //         schemeName: item.schemeName,
    //         flag: item.sebiAssetType?.includes("Equity") ? false : true,
    //       }))
    //     : null
    //   : null;

    const financialYear =
      isCapitalGainReport && reportType?.financialYear?.value;
    const fromDate = isCapitalGainReport
      ? reportType?.financialYear?.fromDate
      : isTransactionReport
      ? getMomentFromDate(reportType.fromdate, "MonthDateYYYY")
      : null;

    const toDate = isCapitalGainReport
      ? reportType?.financialYear?.toDate
      : isTransactionReport
      ? getMomentFromDate(reportType.todate, "MonthDateYYYY")
      : null;

    const rawPayload = {
      clientId: null,
      accountIds: reportType?.selectaccount?.map((item) => item.label) ?? null,
      heldAway: reportType?.Reportsbyheld === "heldaway",
      held: reportType?.Reportsbyheld === "held",
      both: reportType?.Reportsbyheld === "both",

      logInMode: "RM",
      asOnDate: reportType?.Repasondate
        ? reportType.Repasondate
          ? getMomentFromDate(reportType.Repasondate, "MonthDateYYYY")
          : getMomentFromDate(reportType.Repasondate, "MonthDateYYYY")
        : null,
      inRmFilterMode: reportType?.Reportsby,
      rmId: getUserFilterDetails("rmAdvId"),
      familyId: reportType?.selectfamily?.value ?? null,
      clientIds: reportType?.selectclient?.value
        ? [reportType.selectclient.value]
        : null,
      // For productIds - handle both array and single object cases
      productIds: reportType?.selectproduct
        ? Array.isArray(reportType.selectproduct)
          ? reportType.selectproduct.map((item) => item.value)
          : [reportType.selectproduct.value] // if it's a single object
        : null,
      fromDate:
        reportType.selectreport.value === "XIRR_REPORT" ||
        reportType.selectreport.value === "HOLDING_REPORT" ||
        reportType.selectreport.value === "CAPITAL_GAIN_REPORT" ||
        reportType.selectreport.value === "SUMMARY_REPORT" ||
        reportType.selectreport.value === "THREE_SIXTY_DEGREE_WEALTH_REPORT"
          ? null
          : reportType.fromdate != undefined
          ? getMomentFromDate(reportType.fromdate, "MonthDateYYYY")
          : null,
      toDate:
        reportType.selectreport.value === "XIRR_REPORT" ||
        reportType.selectreport.value === "HOLDING_REPORT" ||
        reportType.selectreport.value === "CAPITAL_GAIN_REPORT" ||
        reportType.selectreport.value === "SUMMARY_REPORT" ||
        reportType.selectreport.value === "THREE_SIXTY_DEGREE_WEALTH_REPORT"
          ? null
          : reportType.todate != undefined
          ? getMomentFromDate(reportType.todate, "MonthDateYYYY")
          : null,
      asOnDate:
        reportType.selectreport.value === "TRANSACTION_REPORT" ||
        reportType.selectreport.value === "CAPITAL_GAIN_REPORT"
          ? null
          : reportType?.Repasondate
          ? reportType.Repasondate
            ? getMomentFromDate(reportType.Repasondate, "MonthDateYYYY")
            : getMomentFromDate(reportType.Repasondate, "MonthDateYYYY")
          : null,
      // For securityIds - handle both array and single object cases
      securityIds: reportType?.selectfund
        ? Array.isArray(reportType.selectfund)
          ? reportType.selectfund.flatMap((item) => item.value)
          : [reportType.selectfund.value] // if it's a single object
        : null,
      ...(isCapitalGainReport && { holdingList }),
      ...(isCapitalGainReport && { financialYear }),
      ...(isCapitalGainReport && { fromDate }),
      ...(isCapitalGainReport && { toDate }),
      ...(isTransactionReport && { fromDate }),
      ...(isTransactionReport && { toDate }),
    };

    const reportMapping = {
      HOLDING_REPORT: Apiurl.generateReportHolding,
      TRANSACTION_REPORT: Apiurl.generateReportTransaction,
      CAPITAL_GAIN_REPORT: Apiurl.generateReportCapitalGain,
      SECURITY_REPORT: Apiurl.generateReportSecurity,
      SUMMARY_REPORT: Apiurl.clientgenerateSummaryReport,
      XIRR_REPORT: Apiurl.generateReportXirr,
      FAMILY_OFFICE_REPORT: Apiurl.generateFamilyOfficeReport,
    };

    const url = reportMapping[temReporttype];
    const payload = { payload: rawPayload };

    setLoading(true);
    return { url, payload };
  };

  const handleReportsExport = async (url, payload) => {
    console.log("Generate", url, payload);
    setLoading(true);
    try {
      const response = await axiosInstance.post(url, payload.payload);
      if (response.data) {
        // setLoading(false);
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
      toast.error(error.errorMessage);
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
    // setLoading(true);
    if (count == 0) {
      try {
        const response = await axiosInstance.get(
          `${Apiurl.checkIfReportIsGenerated}reportType=${cx}&fileId=${fileId}`
        );
        setIsSuccess(response.data);
        console.log(handleAction);
        setCount(1);
        setLoading(false);
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
    }
  };

  const ViewReportPDFFunction = async (ReportType, fileId) => {
    setLoading(true);
    setViewReportPDF(null);
    if (count == 0) {
      try {
        const response = await axiosInstance.get(
          `${Apiurl.generateviewReport}reportType=${ReportType}&fileId=${fileId}`
        );
        setViewReportPDF(response.data);
        setCount(1);
        setLoading(false);
        toast.success("Report viewed successfully.");
        setLoading(false);
      } catch (error) {
        console.error("Download error: ", error);
      }
    }
  };
  const breadcrumbItems = [
    {
      label: t("Common:App_lms_Common_00119"),
      href: "/" + encrypt("Rmdashboard"),
    },
    { label: t("Common:App_lms_Common_00248") },
  ];
  return (
    <>
      {loading ? (
        <Loader pagename="EReports" />
      ) : (
        <>
          <Pagehader
            pagename="EReports"
            Breadcrumbshow
            breadcrumbItems={breadcrumbItems}
          />
          <div className="pagebody">
            <div>
              <ReportFilterFormComponent
                initialData={data}
                onSubmit={handleSubmit}
                handleViewCom={handleActionChange}
                handleExportCom={handleActionChange}
                pageName="EntityReport"
              />
            </div>
            {viewReportPDF !== null && (
              <LoadFromBase64pdf pdfdata={viewReportPDF} />
            )}
          </div>
        </>
      )}
      <AppModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        handleAction={""}
        Modalsize={"xl"}
        buttonConfigs={[]}
        ModalBody={
          <CapitalGainTable
            data={schemeData}
            onSubmit={(data) => handleTableDataSubmit(data)}
          />
        }
      />
    </>
  );
}
