import {
  faDatabase,
  faDiamond,
  faEye,
  faLayerGroup,
  faPiggyBank,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AppModal from "../../../Component/Modal/AppModal";
import AppBarChartSingle from "../../../Component/NewChartComponent/AppBarChartSingle";
import ApppieDoughnutChart from "../../../Component/NewChartComponent/ApppieDoughnutChart";
import Pageheader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import {
  getMomentFromDate,
  getsessionStorage,
  setsessionStorage,
} from "../../../util/Authenticate";
import {
  decryptData,
  encrypt,
  encryptData,
} from "../../../util/Authenticate/CryptoJS";
import axiosInstance from "../../../util/axiosInstance";
import Loader from "../../../util/Loader";
import { ThemeChartcolormaste } from "./../../../Component/ComponentsChart/ThemeChartcolormaste";
import AgTable from "./../../../Component/ComponentsTable/AgTable";
import { formattedAmount } from "./../../../util/CurrencyFormattar/formattedAmount";
import NewsSliderClient from "./../NewsSliderClient";
import FilterComponent from "./FilterComponent";
import "./OperationDashboard.scss";
const fetchGraphLabel = (product) => {
  let labelColorValue;
  if (product == "Mutual Funds") {
    labelColorValue = "MutualFunds";
  } else if (product == "Bonds / Debentures") {
    labelColorValue = "BondsDebentures";
  } else if (product == "Stocks") {
    labelColorValue = "Stocks";
  } else if (product == "Others") {
    labelColorValue = "Others";
  } else if (product == "Finance") {
    labelColorValue = "Finance";
  } else if (product == "AUMHeld") {
    labelColorValue = "AUMHeld";
  } else if (product == "AwayAUM") {
    labelColorValue = "AwayAUM";
  } else if (product == "PMS") {
    labelColorValue = "PMS";
  } else if (product == "Small Cap") {
    labelColorValue = "SmamllCap";
  } else if (product == "Large Cap") {
    labelColorValue = "LargeCap";
  } else if (product == "Debt") {
    labelColorValue = "Debt";
  } else if (product == "Equity") {
    labelColorValue = "Equity";
  } else if (product == "Cash") {
    labelColorValue = "Cash";
  }
  return labelColorValue;
};
export default function OperationDashboard() {
  const [loading, setLoading] = useState(false);
  const [showMoreTable, setShowMoreTable] = useState(false);
  const [showMoreTableAditya, setShowMoreTableAditya] = useState(false);
  const [showMoreTableSIP, setShowMoreTableSIP] = useState(false);
  const [clientData, setClientData] = useState();

  const navigate = useNavigate();

  const [fullname, setFullname] = useState("Test");
  const [productAllocationData, setProductAllocationData] = useState([]);
  const [productGraphData, setProductGraphData] = useState([]);
  const [assetAllocationData, setAssetAllocationData] = useState([]);
  const [assetGraphData, setAssetGraphData] = useState([]);
  //   {
  //     name: "Direct Equity",
  //     value: 1.35,
  //   },
  //   {
  //     name: "Mutual Funds",
  //     value: 6.76,
  //   },
  //   {
  //     name: "Bonds",
  //     value: 1.61,
  //   },
  //   {
  //     name: "PMS",
  //     value: 9.46,
  //   },
  //   {
  //     name: "AIF",
  //     value: 8.11,
  //   },
  //   {
  //     name: "Real Estate",
  //     value: 53.78,
  //   },
  //   {
  //     name: "Gold",
  //     value: 12.17,
  //   },
  //   {
  //     name: "All Other Assets",
  //     value: 6.76,
  //   },
  // ]);
  const [productLoader, setProductLoader] = useState("call");
  const [assetLoader, setAssetLoader] = useState("call");

  const [myClientRowData, setMyClientRowData] = useState([]);
  const [myClientRowDataLoader, setMyClientRowDataLoader] = useState("call");
  const [selectedRowData, setSelectedRowData] = useState({});

  const breadcrumbItems = [{ label: "Dashboard" }];

  const [AUMPerformance, setAUMPerformance] = useState([
    { name: "Sep-24", value: 709.18 },
    { name: "Oct-24", value: 787.98 },
    { name: "Nov-24", value: 838.27 },
    { name: "Dec-24", value: 882.39 },
    { name: "Jan-25", value: 1026.04 },
    { name: "Feb-25", value: 884.52 },
    { name: "Mar-25", value: 931.07 },
  ]);
  const [AUMPerformanceloader, setAUMPerformanceloader] = useState("result");

  const [aUMReportbyFundHouse, setAUMReportbyFundHouse] = useState([]);
  //   { name: "Investment", value: 178.96 },
  //   { name: "DIV_REINV", value: 6.62 },
  //   { name: "DIV_Paid", value: 35.85 },
  //   { name: "ABS_return", value: 83.46 },
  //   { name: "AUM", value: 226.57 },
  //   { name: "Equity", value: 108.28 },
  //   { name: "Debt", value: 71.04 },
  //   { name: "Hybrid", value: 29.2 },
  //   { name: "SOL_Oriented", value: 10.19 },
  //   { name: "Others", value: 7.86 },
  // ]);
  useEffect(() => {
    if (decryptData(getsessionStorage(encrypt("Clienttorm"))) == "true") {
      navigate(`/${encrypt("DashboardLandingPage")}`);

      window.location.reload();
    }
  }, [getsessionStorage(encrypt("Clienttorm"))]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getClinetAnalysis(),
          ProductAllocation(),
          getAllAssetAllocation(),
          aumReportbyFundHouse(),
          aumReportForOpUser(),
          getInvesterDetails(),
          rmRelationshipdetailsByType(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // handleSubmit
  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const myClientColumnDefs = [
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "Current Value",
      field: "currentValue",
      // cellRenderer: (params) =>
      //   AmountFormatterFunction(params.data.currentValue),

      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
      maxWidth: 180,
    },
    {
      headerName: "AUM Held",
      field: "aumHeld",
      // cellRenderer: (params) => AmountFormatterFunction(params.data.aumHeld),
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
      maxWidth: 180,
    },
    {
      headerName: "AUM Held Away",
      field: "aumHeldAway",
      // cellRenderer: (params) =>
      //   AmountFormatterFunction(params.data.aumHeldAway),
      sortable: true,
      filter: true,
      maxWidth: 180,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Gain / Loss",
      field: "gainOrLoss",
      sortable: true,
      filter: true,
      maxWidth: 180,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Actions",
      minWidth: 250,
      field: "clientId",
      hide: true,
    },
    {
      headerName: "Actions",
      minWidth: 250,
      cellRenderer: (params) =>
        ActionButtonsFunction2(params, handleActivation),
    },
  ];

  const handleActivation = async (data) => {
    // Set values in sessionStorage
    setsessionStorage(encrypt("Clienttorm"), encryptData(true)); // "true" will be encrypted
    setsessionStorage(
      encrypt("ClienttormID"),
      encryptData(data.data?.clientId)
    );
    setsessionStorage(encrypt("ClienttormName"), encryptData(data.data?.name));

    // Navigate to the dashboard page
    navigate(`/${encrypt("DashboardLandingPage")}`);
    window.location.reload();
  };

  const columnDefs = [
    {
      headerName: "AMC Name",
      minWidth: 120,
      field: "amcName",
    },
    {
      headerName: "Investment",
      field: "investment",
      minWidth: 150,
      sortable: true,
      filter: true,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.investment);
      // },

      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "DIV Paid",
      field: "divPaid",
      minWidth: 210,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.divPaid);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "DIV Reinv",
      field: "divReinv",
      sortable: true,
      minWidth: 150,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.divReinv);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "AUM",
      field: "aum",
      minWidth: 215,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.aum);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "XIRR Return(%)",
      field: "xiir",
      sortable: true,
      minWidth: 150,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.xiir);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "AMC Weight(%)",
      field: "amcWeight",
      sortable: true,
      minWidth: 150,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.amcWeight);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Equity",
      field: "equity",
      sortable: true,
      minWidth: 150,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.equity);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Debt",
      field: "debt",
      sortable: true,
      minWidth: 150,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.debt);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Hybrid",
      field: "hybrid",
      sortable: true,
      minWidth: 150,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.hybrid);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },

    {
      headerName: "Others",
      field: "others",
      sortable: true,
      minWidth: 150,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.others);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Actions",
      minWidth: 100,
      maxWidth: 150,
      pinned: "right",
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];

  const [rowData, setRowData] = useState([]);

  const columnDefsAUM = [
    {
      headerName: "Name",
      field: "name",
      minWidth: 200,
    },
    {
      headerName: "Invest",
      field: "invest",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.invest);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      maxWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "DIV Paid",
      field: "divPaid",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.divPaid);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "DIV Reinv",
      field: "divReiv",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.divReiv);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      minWidth: 150,
      sortable: true,
      filter: true,
    },

    {
      headerName: "AUM",
      field: "aum",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.aum);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
      minWidth: 250,
      sortable: true,
      filter: true,
    },
    {
      headerName: "XIRR Return(%)",
      field: "xirr",
      minWidth: 250,
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
  ];
  const [rowDataAUM, setRowDataAUM] = useState([]);

  const [rowDataAUMAditya, setRowDataAUMAditya] = useState([
    {
      SchemeName: "Debt Scheme - Banking and PSU Fund",
      Invest: 14.77,
      DIVpaid: "-",
      DivReinv: 1.23,
      aum: 25.09,
      XIRR: 16.84,
    },
    {
      SchemeName: "Aditya Birla Hybrid Eq",
      Invest: 9.69,
      DIVpaid: 1.23,
      DivReinv: 1.5,
      aum: 16.46,
      XIRR: 11.45,
    },
  ]);

  const AUMGrowthcolumnDefs = [
    {
      headerName: "Sr.no",
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Month",
      field: "month",
      minWidth: 120,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "AUM",
      field: "aum",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Trend",
      field: "trend",
      minWidth: 150,
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
  ];
  const [AUMGrowthrowData, setAUMGrowthrowData] = useState([
    { month: "Dec-24", aum: 882.39, trend: "up" },
    { month: "Jan-25", aum: 1026.04, trend: "up" },
    { month: "Feb-25", aum: 884.52, trend: "up" },
    { month: "Mar-25", aum: 931.07, trend: "Down" },
  ]);
  const [TransactionStatement, setTransactionStatement] = useState([
    { name: "Inflow", value: 200000 },
    { name: "DIV_REINV", value: 100000 },
    { name: "Outflow", value: 500000 },
    { name: "DIV_Paid", value: 600000 },
  ]);
  const TransactioncolumnDefs = [
    {
      headerName: "Fund Name",
      field: "FundName",
      minWidth: 120,
    },

    {
      headerName: "Folio",
      field: "folio",
      minWidth: 120,
      maxWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Inflow",
      field: "Inflow",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.Inflow);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Outflow",
      field: "Outflow",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.Outflow);
      },
      sortable: true,
      minWidth: 150,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Div Reinv",
      field: "DivReinv",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.DivReinv);
      },
      minWidth: 215,
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "DIV Paid",
      field: "DIVpaid",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.DIVpaid);
      },
      sortable: true,
      minWidth: 150,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
  ];
  const [TransactionrowData, setTransactionRowData] = useState([
    {
      FundName: "Aditya Birla Sun Life MF",
      folio: "- ",
      Inflow: 120000,
      Outflow: 120001,
      DivReinv: 120002,
      DIVpaid: 120005,
    },
    {
      FundName: "Axis Mutual Fund",
      folio: "- ",
      Inflow: 120000,
      Outflow: 120001,
      DivReinv: 120002,
      DIVpaid: 120005,
    },
  ]);
  const [ClientSIPStatement, setClientSIPStatement] = useState([
    { name: "Total Active SIPs", value: 135 },
    { name: "Total SIP Value", value: 1.3 },
    { name: "Average SIP Value", value: 17895 },
  ]);
  const ClientSIPcolumnDefs = [
    {
      headerName: "Investor Name",
      field: "name",
      minWidth: 120,
    },

    {
      headerName: "PAN",
      field: "pan",
      minWidth: 120,
      maxWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "SIP Amount",
      field: "sipAmount",
      cellRenderer: (params) => {
        console.log("sipAmount", params);
        return params.data.name === "Mihir Gala"
          ? formattedAmount(95000)
          : formattedAmount(65000 + Number(params.node.rowIndex * 100));
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 210,
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "SIP Count",
    //   field: "sipCount",
    //   cellRenderer: (params) => {
    //     return formattedAmount(params.data?.sipCount);
    //   },
    //   sortable: true,
    //   minWidth: 150,
    //   filter: true,
    //   cellClass: "textright",
    // },
    {
      headerName: "Current Invest",
      field: "currentInvestment",

      minWidth: 215,
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },

    {
      headerName: "DIV Paid",
      field: "divPaid",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.divPaid);
      },
      sortable: true,
      minWidth: 150,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Div Reinv",
      field: "divReinv",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.divReinv);
      },
      minWidth: 215,
      sortable: true,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "XIRR Return(%)",
      field: "xirr",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.xirr);
      },
      sortable: true,
      minWidth: 150,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Actions",
      minWidth: 100,
      maxWidth: 150,
      pinned: "right",
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];
  const [ClientSIProwData, setClientSIPRowData] = useState([]);
  //   {
  //     name: "Jahon Sharma",
  //     pan: "ANHPS8753G",
  //     sipAmount: 35000,
  //     sipCount: 3,
  //     currentInvest: 191541,
  //     divPaid: 0.0,
  //     divReinv: 0.0,
  //     xirrReturn: 12.25,
  //   },
  //   {
  //     name: "Jenny Gupta",
  //     pan: "CASSG3667H",
  //     sipAmount: 60000,
  //     sipCount: 7,
  //     currentInvest: 157533,
  //     divPaid: 0.0,
  //     divReinv: 0.0,
  //     xirrReturn: 14.52,
  //   },
  //   {
  //     name: "Kiran Jain",
  //     pan: "AERDJ9277F",
  //     sipAmount: 20000,
  //     sipCount: 2,
  //     currentInvest: 197544,
  //     divPaid: 0.0,
  //     divReinv: 0.0,
  //     xirrReturn: 11.02,
  //   },
  //   {
  //     name: "Sachin Kumavat",
  //     pan: "DASSK2788J",
  //     sipAmount: 35000,
  //     sipCount: 3,
  //     currentInvest: 124097,
  //     divPaid: 0.0,
  //     divReinv: 0.0,
  //     xirrReturn: 9.84,
  //   },
  // ]);

  const ClientwiseSIPcolumnDefs = [
    {
      headerName: "Sr.no",
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Folio Number",
      field: "folioNumber",
      minWidth: 120,
    },

    {
      headerName: "SIP Frequency",
      field: "sipFrequency",
      minWidth: 120,
      maxWidth: 200,
      sortable: true,
      filter: true,
    },
    {
      headerName: "SIP Registration No",
      field: "sipRegistrationNo",

      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "SIP Start Date",
      field: "sipStartDate",

      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "SIP End Date",
      field: "sipEndDate",

      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "SIP Amount",
      field: "sipAmount",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.sipAmount);
      },
      sortable: true,
      minWidth: 150,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "SIP Date",
      field: "sipDate",

      minWidth: 215,
      sortable: true,
      filter: true,
    },

    {
      headerName: "XIRR Return(%)",
      field: "xirr",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.xirr);
      },
      sortable: true,
      minWidth: 150,
      filter: true,
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      headerClass: "ag-right-aligned-header",
    },
  ];
  const [ClientwiseSIProwData, setClientwiseSIPRowData] = useState([
    {
      srNo: 1,
      schemeName: "Axis Bluechip Fund",
      folioNumber: "9844322344",
      sipFrequency: "Monthly",
      sipRegistrationNo: "2385454545",
      sipStartDate: "1/1/2022",
      sipEndDate: "12/30/2031",
      sipAmount: 15000,
      sipDate: "2/10/2025",
      // accDetails: "HDFC-4233",
      xirr: 12.23,
    },
    {
      srNo: 2,
      schemeName: "ICICI Prudential Infrastructure Direct-Growth",
      folioNumber: "75449823",
      sipFrequency: "Monthly",
      sipRegistrationNo: "1185454546",
      sipStartDate: "1/2/2023",
      sipEndDate: "12/30/2032",
      sipAmount: 20000,
      sipDate: "2/11/2025",
      // accDetails: "HDFC-4233",
      xirr: 14.87,
    },
    {
      srNo: 3,
      schemeName: "HDFC Flexi cap",
      folioNumber: "4322346",
      sipFrequency: "Monthly",
      sipRegistrationNo: "6485454547",
      sipStartDate: "1/3/2020",
      sipEndDate: "12/31/2029",
      sipAmount: 25000,
      sipDate: "2/12/2025",
      // accDetails: "HDFC-4233",
      xirr: 13.69,
    },
    {
      srNo: 4,
      schemeName: "SBI PSU Direct Plan-Growth",
      folioNumber: "7244322347",
      sipFrequency: "Monthly",
      sipRegistrationNo: "5385454548",
      sipStartDate: "1/4/2025",
      sipEndDate: "1/2/2035",
      sipAmount: 35000,
      sipDate: "2/13/2025",
      // accDetails: "HDFC-4233",
      xirr: 8.74,
    },
  ]);

  const getClinetAnalysis = async () => {
  setLoading(true);
  try {
    const response = await axiosInstance.get(Apiurl.getClinetAnalysis);

    // Transform totalSip key to TOTALSIP
    const transformedData = Object.keys(response.data).reduce((acc, key) => {
      if (key === "totalSip") {
        acc["Total SIP"] = response.data[key];
      } else if  (key === "clientCount") {
        acc["Client Count"] = response.data[key];
      } else if  (key === "accountCount") {
        acc["Account Count"] = response.data[key];
      } else if  (key === "folioCount") {
        acc["Folio Count"] = response.data[key];
      }  else {
        acc[key] = response.data[key];
      }
      return acc;
    }, {});

    setClientData(transformedData);
  } catch (error) {
    console.error("Error during GET request:", error.message);
  } finally {
    setLoading(false);
  }
};


  const ProductAllocation = async () => {
    setLoading(true);
    setProductLoader("call");

    try {
      const response = await axiosInstance.get(Apiurl.getProductAllocation);

      // if (response?.data && Array.isArray(response.data)) {
      //   // Transform the API response to match chart data format
      //   // const GraphOptions = response.data.map((item) => ({
      //   //   name: item.product,
      //   //   value: parseFloat(item.percentageValue), // Ensure it's a number
      //   // }));
      const result = response?.data;
      let InvestmentChartData = [];
      Object.values(result).map((itme, value) => {
        InvestmentChartData.push({
          name: itme.product,
          value:
            itme.percentageValue == null ? 0 : Number(itme.percentageValue),
        });
      });

      setProductAllocationData(result);
      setProductGraphData(InvestmentChartData); // Store formatted data in state
      setProductLoader("result");
      // } else {
      //   setProductLoader("noresult");
      // }
    } catch (error) {
      setProductLoader("error");
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllAssetAllocation = async () => {
    setLoading(true);
    setAssetLoader("call");

    try {
      const response = await axiosInstance.get(Apiurl.getAllAssetAllocation);

      // if (response?.data && Array.isArray(response.data)) {
      // Transform the API response to match chart data format
      // const GraphOptions = response.data.map((item) => ({
      //   name: item.description,
      //   value: parseFloat(item.percentageValue), // Ensure it's a number
      // }));
      // const result = response?.data;
      // const assetGraphData = useMemo(() => {
      //   return (
      //     result?.map((item) => ({
      //       name: item.product,
      //       value: parseFloat(item.percentageValue),
      //     })) || []
      //   );
      // }, [productAllocationData]);

      // setAssetAllocationData(response.data);
      // setAssetGraphData(assetGraphData); // Store formatted data in state
      // setAssetLoader("result");
      // } else {
      //   setAssetLoader("noresult");
      // }

      const result = response?.data;
      let InvestmentChartData = [];
      Object.values(result).map((itme, value) => {
        InvestmentChartData.push({
          name: itme.description,
          value:
            itme.percentageValue == null ? 0 : Number(itme.percentageValue),
        });
      });

      setAssetAllocationData(result);
      setAssetGraphData(InvestmentChartData); // Store formatted data in state
      setAssetLoader("result");
    } catch (error) {
      setAssetLoader("error");
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const aumReportbyFundHouse = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.aumReportbyFundHouse);
      setAUMReportbyFundHouse(response?.data || []);
    } catch (error) {
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const aumReportForOpUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.aumReportForOpUser);
      setRowData(response?.data || []);
    } catch (error) {
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getInvesterDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(Apiurl.getInvesterDetails);
      const sortedData = [...response?.data].sort((a, b) => {
        if (a.name === "Mihir Gala") return -1; // "Mihir Gala" should come first
        if (b.name === "Mihir Gala") return 1; // "Mihir Gala" should come first
        return a.name.localeCompare(b.name); // Sort the rest alphabetically
      });
      console.log(sortedData);
      setClientSIPRowData(sortedData || []);
      console.log(response?.data, "getInvesterDetails");
    } catch (error) {
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // opClint
  const rmRelationshipdetailsByType = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${Apiurl.relationshipDetailsByClient}${"opClint"}`
      );
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response?.data;
      const sortedData = [...response?.data].sort((a, b) => {
        if (a.name === "Mihir Gala") return -1; // "Mihir Gala" should come first
        if (b.name === "Mihir Gala") return 1; // "Mihir Gala" should come first
        return a.name.localeCompare(b.name); // Sort the rest alphabetically
      });
      setMyClientRowData(sortedData);
      setMyClientRowDataLoader(result.length > 0 ? "result" : "noresult");
    } catch (error) {
      console.error("Error during GET request:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSchemesByAMCName = useCallback(
    async (AMCName) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${Apiurl.getSchemesByAMCName}${AMCName}`
        );
        if (!response.statusText == "OK")
          throw new Error("Network response was not ok");
        const result = await response?.data;
        setRowDataAUM(result || []);
      } catch (error) {
        console.error("Error during GET request:", error.message);
      } finally {
        setLoading(false);
      }
    },
    [selectedRowData]
  );

  const handleTableFunction = useCallback(
    (params, action) => {
      setSelectedRowData({
        amcName: params?.data?.amcName || "N/A",
        investment: params?.data?.investment || 0,
        divPaid: params?.data?.divPaid || 0,
        divReinv: params?.data?.divReinv || 0,
        aum: params?.data?.aum || 0,
        xiir: params?.data?.xiir || 0,
        amcWeight: params?.data?.amcWeight || 0,
        equity: params?.data?.equity || 0,
        debt: params?.data?.debt || 0,
        hybrid: params?.data?.hybrid || 0,
        others: params?.data?.others || 0,
      });
      console.log(action, "action");
      if (action === "handleView") {
        // if (params.data.amcName) {
        //   setShowMoreTable(true);
        //   getSchemesByAMCName(params?.data?.amcName);
        // } else {
        setShowMoreTableSIP(true);
        // }
      }
      if (action === "handleActivation") {
        handleActivation(params.data);
      }
    },
    [getSchemesByAMCName, selectedRowData]
  );

  return (
    <>
      {loading ? (
        <Loader pagename="Dashboard" />
      ) : (
        <>
          <Pageheader
            pagename="Dashboard"
            getfullName={fullname}
            Breadcrumbshow={true}
            breadcrumbItems={breadcrumbItems}
            showScroller = {"true"}
          ></Pageheader>
          <div className="pagebody Client_Dashboard">
            <div className="row ">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xl-6 op_content_2 my-2">
                <div className=" opDashbord_card">
                  <div className="opDashbord_card_header">Client Analysis</div>
                  <div className="opDashbord_card_body">
                    <div className="Client_Analysis_charts text-center">
                      <div className="row">
                        <div className="col-3 Client_Analysis_charts_icon">
                          <div className="faUserTie">
                            {" "}
                            <FontAwesomeIcon icon={faUserTie} />
                          </div>
                        </div>
                        <div className="col-9 Client_Analysis_charts_text">
                          <div className="row w-100">
                            {clientData &&
                              Object.entries(clientData).map(
                                ([key, value], index) => (
                                  <div className="col-5 mb-4" key={index}>
                                    <div className="row align-items-center">
                                      <div className="col-4 alignicon">
                                        <FontAwesomeIcon icon={faUserTie} />
                                      </div>
                                      <div className="col-8 aligntext">
                                        {/* Make the key more readable by replacing camelCase with spaces */}
                                        {key
                                         }
                                        <br />
                                        <strong>{value}</strong>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xl-6 op_content_2 my-2">
                <div className="NewsCarouselop">
                  <NewsSliderClient />
                </div>
              </div>
            </div>
            <div className="row my-3 p-2">
              <div className="clientCard mb-2">
                <div className="opDashbord_card_header p-3">My Client</div>
                <div className="InformationTable">
                  <AgTable
                    columnKeys={myClientColumnDefs.field}
                    columnDefs={myClientColumnDefs}
                    rowData={myClientRowData}
                    filenames={`My_Client_Information`}
                    // StyleClass={"ag_export_btn ripple_btn"}
                    StyleClass="btn btn-primary"
                    downloadbtnstext={true}
                    showDatePicker={false}
                    bodyFontSize={14}
                    // onSelectionChanged={onSelectionChangedContribution}
                  />
                </div>
              </div>
            </div>
            <div className="row my-3">
              {/* Product Level AUM(In Cr.)*/}
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xl-6 op_content_2">
                <div className=" opDashbord_card">
                  <div className="opDashbord_card_header">
                    Product Level AUM (in Cr.)
                  </div>
                  <div className="opDashbord_card_body">
                    <div className="Client_Analysis_charts text-center">
                      <div className="row">
                        <div className="col-3 Client_Analysis_charts_icon">
                          <div className="faLayerGroup">
                            <FontAwesomeIcon
                              icon={faLayerGroup}
                              color="#38479B"
                            />
                          </div>
                        </div>
                        <div className="col-9 Client_Analysis_charts_text">
                          <div className="row w-100">
                            {productAllocationData?.map((investment, index) => (
                              <div className="col-4 mb-4" key={index}>
                                <div className="row align-items-center">
                                  <div className="col-4 alignicon">
                                    {/* <FontAwesomeIcon icon={faLayerGroup} color="#38479B"/> */}
                                  </div>
                                  <div
                                    className={`col-9 ${
                                      investment?.product?.length > 10 ? 9 : 8
                                    } aligntext1`}
                                  >
                                    {investment?.product} <br />
                                    <strong>{investment?.valueInCr}</strong>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xl-6 op_content_2">
                <div className=" opDashbord_card">
                  <div className="opDashbord_card_header">
                    Product Wise Portfolio
                  </div>
                  <div className="opDashbord_card_body">
                    <div className="Portfolio_Performance_charts text-center">
                      <ApppieDoughnutChart
                        chartdata={productGraphData}
                        ChartDataloader={productLoader}
                        uint="%"
                        ChartColor={ThemeChartcolormaste.amcMapDataChartColor}
                        ChartLegend={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Asset Level AUM(In Cr.) */}
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xl-6 op_content_2 my-4">
                <div className=" opDashbord_card">
                  <div className="opDashbord_card_header">
                    Asset AUM (in Cr.)
                  </div>
                  <div className="opDashbord_card_body">
                    <div className="Client_Analysis_charts text-center">
                      <div className="row">
                        <div className="col-3 Client_Analysis_charts_icon">
                          <div className="faLayerGroup">
                            <FontAwesomeIcon icon={faDiamond} color="#38479B"/>
                          </div>
                        </div>
                        <div className="col-9 Client_Analysis_charts_text">
                          <div className="row w-100">
                            {assetAllocationData?.map((investment, index) => (
                              <div className="col-4 mb-4" key={index}>
                                <div className="row align-items-center">
                                  <div className="col-4 alignicon">
                                    {/* <FontAwesomeIcon icon={faDiamond} color="#38479B"/> */}
                                  </div>
                                  <div
                                    className={`col-9 ${
                                      investment?.description?.length > 10
                                        ? 9
                                        : 8
                                    } aligntext1`}
                                  >
                                    {investment?.description} <br />
                                    <strong>{investment?.valueInCr}</strong>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xl-6 op_content_2 my-4">
                <div className=" opDashbord_card">
                  <div className="opDashbord_card_header">
                    Asset Wise Portfolio
                  </div>
                  <div className="opDashbord_card_body">
                    <div className="Portfolio_Performance_charts text-center">
                      <ApppieDoughnutChart
                        chartdata={assetGraphData}
                        ChartDataloader={assetLoader}
                        uint={"%"}
                        ChartColor={ThemeChartcolormaste.AssetWiseColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-12 col-sm-12 col-md-12 mb-3">
                <div className=" opDashbord_card">
                  <div className="opDashbord_card_header">
                    AUM Report by Fund House as on{" "}
                    {getMomentFromDate(new Date(), "Date")}
                  </div>
                  <div className="opDashbord_card_body AUM_Report_card_div">
                    {aUMReportbyFundHouse?.map((item, index) => {
                      const firstWord = item.name.split(/[\s\.\/]/)[0];
                      return (
                        <div className="AUM_Reportcard" key={index}>
                          <div
                            className={`AUM_Reportcard_bar AUM_Reportcard_bar_${firstWord}`}
                          ></div>
                          <div>
                            {item.name.replace("_", " ")} <br />
                            <strong>{item.value}</strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <br />
                  <AgTable
                    columnDefs={columnDefs}
                    rowData={rowData}
                    filenames={"" + getMomentFromDate(new Date(), "Date&Time")}
                    StyleClass="btn btn-primary"
                    type="table"
                    gridOptions={{
                      getRowStyle,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12 col-sm-12 col-md-12 mb-3">
                <div className=" opDashbord_card">
                  <div className="opDashbord_card_header">
                    Client wise SIP Exposure
                  </div>
                  <div className="Dashbord_card_body mb-3">
                    <FilterComponent />
                  </div>

                  <div className="opDashbord_card_body Client_SIP_Report_card_div">
                    {ClientSIPStatement?.map((item, index) => (
                      <div className="Client_SIP_Reportcard">
                        <div
                          className={
                            `Client_SIP_Reportcard_bar Client_SIP_Reportcard_bar_` +
                            item.name.replace(" ", "_")
                          }
                        ></div>
                        <div className="">
                          {item.name.replace("_", " ")} <br />
                          <strong>
                            {formattedAmount(item.value)}{" "}
                            {item.value == 1.3 ? "Cr" : ""}{" "}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <br />

                  <AgTable
                    columnDefs={ClientSIPcolumnDefs}
                    rowData={ClientSIProwData}
                    filenames={"" + getMomentFromDate(new Date(), "Date&Time")}
                    StyleClass="btn btn-primary"
                    type="table"
                    gridOptions={{
                      getRowStyle,
                    }}
                  />

                  {/* <AgTable
                    columnDefs={ClientwiseSIPcolumnDefs}
                    rowData={ClientwiseSIProwData}
                    filenames={"" + getMomentFromDate(new Date(), "Date&Time")}
                    StyleClass="btn btn-primary"
                    type="table"
                    gridOptions={{
                      getRowStyle,
                    }}
                  /> */}
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-12 col-sm-12 col-md-12 op_content_2">
                <div className=" opDashbord_card">
                  <div className="opDashbord_card_header">
                    AUM Growth Report
                  </div>

                  <div className="row my-3">
                    <div className="col-12 col-sm-12 col-md-6 ">
                      {" "}
                      <div className="Dashbord_card_body AUM_Growth_Report">
                        <div className=" ">
                          <AgTable
                            columnDefs={AUMGrowthcolumnDefs}
                            rowData={AUMGrowthrowData}
                            filenames={
                              "" + getMomentFromDate(new Date(), "Date&Time")
                            }
                            StyleClass="btn btn-primary"
                            type="table"
                            gridOptions={{
                              getRowStyle,
                            }}
                            showSearchBar={false}
                            showExportButton={false}
                            showResetButton={false}
                            pagination={false}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 ">
                      {" "}
                      <div className="Dashbord_card_body">
                        <div className="AUM_Performance_charts text-center">
                          <AppBarChartSingle
                            BarChart_data={AUMPerformance}
                            ChartDataloader={AUMPerformanceloader}
                            uint={"cr"}
                            Legendvalue={true}
                            Barlayout={"horizontal"}
                            radiusStyle={[10, 10, 0, 0]}
                            ChartColor={
                              ThemeChartcolormaste.securityExposureChartcolor
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row my-3">
              <div className="col-12 col-sm-12 col-md-12 ">
                <div className=" opDashbord_card">
                  <div className="opDashbord_card_header">
                    Transaction Statement For Financial Year 2024
                  </div>
                  <div className="opDashbord_card_body Transaction_Report_card_div">
                    {TransactionStatement.map((item, index) => (
                      <div className="Transaction_Reportcard">
                        <div
                          className={
                            `Transaction_Reportcard_bar Transaction_Reportcard_bar_` +
                            item.name
                          }
                        ></div>
                        <div className=" ">
                          {item.name.replace("_", " ")} <br />
                          <strong>{formattedAmount(item.value)}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <br />

                  <AgTable
                    columnDefs={TransactioncolumnDefs}
                    rowData={TransactionrowData}
                    filenames={"" + getMomentFromDate(new Date(), "Date&Time")}
                    StyleClass="btn btn-primary"
                    type="table"
                    gridOptions={{
                      getRowStyle,
                    }}
                  />
                </div>
              </div>
            </div> */}
            <AppModal
              isOpen={showMoreTable || showMoreTableAditya || showMoreTableSIP}
              onClose={() => {
                setShowMoreTable(false);
                setShowMoreTableAditya(false);
                setShowMoreTableSIP(false);
              }}
              Modalsize={"xl"}
              buttonConfigs={[]}
              ModalTitle={"Details View"}
              ModalBody={
                <AgTable
                  columnDefs={
                    showMoreTable ? columnDefsAUM : ClientwiseSIPcolumnDefs
                  }
                  rowData={
                    showMoreTable
                      ? rowDataAUM
                      : showMoreTableAditya
                      ? rowDataAUMAditya
                      : ClientwiseSIProwData
                  }
                  filenames={"Details View"}
                  StyleClass="btn btn-primary"
                  type="table"
                  gridOptions={{
                    getRowStyle,
                  }}
                />
              }
              btnText={"Close"}
              show={true}
            />
          </div>
        </>
      )}
    </>
  );
}

function ActionButtonsFunction(params, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: "View",
          icon: faEye,
          action: "handleView",
          show: true,
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}

function ActionButtonsFunction2(params, handleActivation) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: "View",
          icon: faEye,
          action: "handleActivation",
          show: true,
        },
      ]}
      handleFunction={handleActivation}
    />
  );
}
