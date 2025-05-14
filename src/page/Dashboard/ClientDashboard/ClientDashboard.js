import {
  faAdd,
  faCircleChevronLeft,
  faCircleChevronRight,
  faExpand,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import RangeInputField from "../../../Component/ComponentsChart/RangeInputField";
import { ThemeChartcolormaste } from "../../../Component/ComponentsChart/ThemeChartcolormaste";
import TreemapChart from "../../../Component/ComponentsChart/TreemapChart";
import ActionButtons from "../../../Component/ComponentsTable/ActionButtons";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import AppModal from "../../../Component/Modal/AppModal";
import WatchListPage from "../../../Component/Modal/WatchListModel";
import AppBarChartSingle from "../../../Component/NewChartComponent/AppBarChartSingle";
import ApppieChart from "../../../Component/NewChartComponent/ApppieChart";
import Chartloader from "../../../Component/NewChartComponent/Chartloader";
import ErrorLoader from "../../../Component/NewChartComponent/ErrorLoader";
import NoresultLoader from "../../../Component/NewChartComponent/NoresultLoader";
import Pageheader from "../../../Layout/Pagehader";
import { Apiurl } from "../../../util/apiurl";
import {
  getMomentFromDate,
  getUserFilterDetails,
  getUserId,
} from "../../../util/Authenticate";
import axiosInstance from "../../../util/axiosInstance";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import NewsSliderClient from "../NewsSliderClient";
import ApppieDoughnutChart from "./../../../Component/NewChartComponent/ApppieDoughnutChart";
import "./ClientDashboard.scss";
import LastTransaction from "./LastTransaction.svg";

import { useCallback } from "react";
import Systematicicon from "./Systematicicon.svg";
import upicon from "./upicon.svg";

const ClientDashboard = () => {
  const breadcrumbItems = [{ label: "Dashboard" }];
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [allviewModaType, setAllviewModaType] = useState();

  const [amc, setAMC] = useState([]);
  const [rowDataSecurityExposure, setRowDataSecurityExposure] = useState([]);
  const [rowDataMutualExposure, setRowDataMutualExposure] = useState([]);
  const [rowDataSectorExposure, setRowDataSectorExposure] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const [totalValues, setTotalValues] = useState(0);
  const [showMoreTable, setShowMoreTable] = useState(false);
  const [investmentChartData, setInvestmentChartData] = useState();
  const [productName, setProductName] = useState();
  const [productAccordionLoader, setProductAccordionLoader] = useState("call");
  const [investmentChartDataloader, setInvestmentChartDataloader] =
    useState("call");
  const [assetPerformanceXIRRloader, setAssetPerformanceXIRRloader] =
    useState("call");
  const [portfolioValuesloader, setPortfolioValuesloader] = useState("call");

  const [topHoldingDataloader, setTopHoldingDataloader] = useState("call");
  const [marketCapLoader, setMarketcaploader] = useState("call");
  const [securityExposureLoader, setSecurityExposureLoader] = useState("call");
  const [productLoader, setProductLoader] = useState("call");
  const [assetDataLoader, setAssetDataLoader] = useState("call");
  const [rangeData, setRangeData] = useState();
  const [allHoldingData, setAllHoldingData] = useState([]);
  const [assetData, setAssetData] = useState([]);
  const [assetMapData, setAssetMapData] = useState([]);
  const [assetMapDatacolors, setAssetMapDatacolors] = useState([]);

  const [securityExposureMapData, setSecurityExposureMapData] = useState([]);

  const [productGraphData, setProductGraphData] = useState([]);
  const [amcMapData, setAMCMapData] = useState([]);
  const [marketCap, setMarketCap] = useState([]);
  const [sectorExposureMapData, setSectorExposureMapData] = useState([]);
  const [sectorExposureMapDataLoader, setSectorExposureMapDataLoader] =
    useState("call");
  const [amcMapDataLoader, setAmcMapDataLoader] = useState("call");

  const [topHolding, setTopHolding] = useState([]);
  const [productAllocationData, setProductAllocationData] = useState([]);
  const [assetPerformance, setAssetPerformance] = useState([]);
  const [assetPerformanceKeys, setAssetPerformanceKeys] = useState([]);
  const [assetPerformanceLabel, setAssetPerformanceLabel] = useState([]);
  const [portfolioValues, setPortfolioValues] = useState([]);
  const [portfolioValuesKeys, setPortfolioValuesKeys] = useState([]);
  const [lastTransactionData, setLastTransactionData] = useState([]);
  const [upcomingCorporateActionData, setUpcomingCorporateActionData] =
    useState([]);

  const [showModal, setShowModal] = useState(false);

  const [watchlistCount, setWatchlistCount] = useState("");
  const [watchlistData, setWatchlistData] = useState("");

  const [lastTransactionLoader, setLastTransactionLoader] = useState("call");
  const [upcomingCorporateActionLoader, setUpcomingCorporateActionLoader] =
    useState("call");
  const [accordionLoader, setAccordionLoader] = useState("call");
  const [watchlistCountData, setWatchlistCountData] = useState({});
  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };
  const assetDatathead = [
    { thead: "Product Name", theadclass: "text" },
    { thead: "AUM", theadclass: "ammount_Value" },
  ];
  // const productDatathead = [
  //   { thead: "Product Type", theadclass: "text" },
  //   { thead: "Action Type", theadclass: "text" },
  //   { thead: "Name", theadclass: "text" },

  // ];
  const productDatathead = [
    { thead: "Product Name", theadclass: "text" },
    { thead: "Current Value", theadclass: "ammount_Value" },
  ];
  const TopHoldingshead = [
    { thead: "Security Name", theadclass: "text" },
    { thead: "Current Value", theadclass: "ammount_Value" },
    { thead: "Percentage Of Portfolio", theadclass: "ammount_Value" },
  ];
  const systematicTransactionHead = [
    { thead: "Scheme Name", theadclass: "text" },
    { thead: "Amount", theadclass: "ammount_Value" },
    { thead: "Next Installment Date", theadclass: "text" },
    { thead: "No. of Installments Pending", theadclass: "text" },
  ];
  const systematicTransactionData = [
    {
      type: "Mirae Mid Cap Fund",
      value: 15000,
      date: "04/05/2025",
      installment: 7,
    },
    {
      type: "Axis Focused Scheme",
      value: 15000,
      date: "07/05/2025",
      installment: 3,
    },
    {
      type: "HDFC Flexi Cap Fund",
      value: 15000,
      date: "15/02/2025",
      installment: 25,
    },
  ];
  const [rowDataTopHoldings, setRowDataTopHoldings] = useState([]);
  useEffect(() => {
    fetchInvestmentChartData(getUserFilterDetails("clientId"));
    fetchAllHolding(getUserFilterDetails("clientId"));
    fetchAllAssetAllocation(getUserFilterDetails("clientId"));
    fetchTopHoldings(getUserFilterDetails("clientId", "top"));
    // fetchAssetAllocationerformanceChart(getUserFilterDetails("clientId"));
    fetchPortfolioXirr(getUserFilterDetails("clientId"));
    fetchProductAllocation(getUserFilterDetails("clientId"));
    fetchSectorExposure(getUserFilterDetails("clientId"), "top");
    fetchAMC(getUserFilterDetails("clientId"), "top");
    fetchMarketCap(getUserFilterDetails("clientId"));
    fetchSecurityExposure(getUserFilterDetails("clientId"), "top");
    fetchLastTransaction(getUserFilterDetails("clientId"));
    fetchUpcomingCorporateAction();
    fetchWatchlist();
  }, []);
  const fetchWatchlist = async () => {
    try {
      const response = await axiosInstance.get(Apiurl.watchlistCount);
      // toast.success(t("Messages:UploadTemplate"));
      if (!response.statusText == "OK")
        throw new Error("Network response was not ok");
      const result = await response.data;
      console.log("length", result);
      console.log("length", result.length);
      setWatchlistData(result);
      setWatchlistCount(result.length);
    } catch (error) {
    } finally {
    }
  };
  const fetchInvestmentChartData = async (id) => {
    const InvestmentChartData = [];
    try {
      setInvestmentChartDataloader("call");
      const response = await axiosInstance.get(
        `${Apiurl.investmentChartData}${id}`
      );
      const result = response.data;

      result.held.replace(" Cr", "");
      result.heldAway.replace(" Cr", "");
      let Helddata = result.held.replace(" Cr", "");
      let heldAway = result.heldAway.replace(" Cr", "");
      setTotalClients(result.investedvalue);
      setTotalValues(result.totalValue);
      Object.entries(result).map(([keys, value]) => {
        InvestmentChartData.push({
          name: keys,
          value: value == null ? 0 : Number(value.replace(" Cr", "")),
        });

        // setWatchlist((prevData) => [...prevData, SingleData]);
      });
      const filteredData = InvestmentChartData.filter(
        (item) => item.name === "held" || item.name === "heldAway"
      );
      setInvestmentChartData(filteredData);
      setInvestmentChartDataloader("result");
      setRangeData([
        {
          label: "Unrealised Gain/Loss",
          value:
            result.unrealisedGainLoss == null ? 0 : result.unrealisedGainLoss,
          color: "#FFC107", // Yellow
          max: 10,
          valuein: "Cr",
          labelname: "Unrealised_Gain_Loss",
          // icon: ,
        },
        {
          label: "Absolute Return",
          value: result.absoluteReturn == null ? 0 : result.absoluteReturn,
          color: "#8B5CF6", // Purple
          max: 200,
          valuein: "%",
          labelname: "Absolute_Return",
        },
        {
          label: "Annualised Return",
          value: result.annualisedReturn == null ? 0 : result.annualisedReturn,
          color: "#FB7185", // Pink
          max: 100,
          valuein: "%",
          labelname: "Annualised_Return",
        },
      ]);
    } catch (error) {
      setInvestmentChartDataloader("error");
      console.error("Login error: ", error);
    } finally {
    }
  };

  const fetchAllHolding = async (id) => {
    try {
      setAccordionLoader("call");

      const response = await axiosInstance.get(`${Apiurl.combineHolding}${id}`);
      const result = response.data;

      setAllHoldingData(result);
      setAccordionLoader(result ? "result" : "noresult");

      // Set the state with the filtered arrays
    } catch (error) {
      console.error("Login error: ", error);
      setAccordionLoader("error");
    } finally {
    }
  };
  const fetchAllAssetAllocation = async (id) => {
    let temp = [];
    let temp2 = [];
    let tempclor = [];
    let temp_category_val = [];
    try {
      setAssetDataLoader("call");
      setAssetPerformanceXIRRloader("call");
      const response = await axiosInstance.get(
        `${Apiurl.allAssetAllocation}${id}`
      );
      const result = response.data;
      setAssetData([]);
      setAssetMapData([]);
      setAssetMapDatacolors([]);
      Object.values(result).map((item) => {
        let SingleData = {
          type: item.description,
          value: item.valueInCr,
        };

        temp.push({
          name: item.description,
          value: Number(item.percentageValue),
        });
        temp2.push({
          name: item.description,
          value: Number(item.performance),
        });

        setAssetData((prevData) => [...prevData, SingleData]);
      });

      const filteredInvestments = result.filter(
        (investment) => investment.investmentAssetClass !== null
      );

      filteredInvestments.map((item) => {
        let SingleData = {
          name: item.investmentAssetClass,
          value: item.cagrXirr,
        };
        temp_category_val.push(SingleData);
      });

      setAssetPerformance(temp2);
      setAssetPerformanceKeys([]);
      setAssetPerformanceXIRRloader(result ? "result" : "noresult");
      setAssetMapDatacolors(tempclor);
      setAssetMapData(temp);
      setAssetDataLoader(result ? "result" : "noresult");
    } catch (error) {
      setAssetDataLoader("error");
      setAssetPerformanceXIRRloader("error");
    } finally {
    }
  };
  const fetchTopHoldings = async (id, count) => {
    try {
      setTopHoldingDataloader("call");
      const response = await axiosInstance.get(
        `${Apiurl.topHoldings}${id}/${count}`
      );

      const result = response.data;
      const top10Array = result.slice(0, 10); // Extracts elements from index 0 to 9

      setTopHolding([]);
      Object.values(top10Array).map((item) => {
        let SingleData = {
          type: item.securityName,
          value: item.valueOfPortfolio,
          percentageOfPortfolio: item.percOfPortfolio + "%",
          typeclass: "text",
          typepercentageOfPortfolio: "ammount_Value",
          valueclass: "ammount_Value",
        };

        setTopHolding((prevData) => [...prevData, SingleData]);
      });
      setTopHoldingDataloader(result ? "result" : "noresult");
    } catch (error) {
      setTopHoldingDataloader("error");
    } finally {
    }
  };

  // const fetchAssetAllocationerformanceChart = async (id) => {
  //   setAssetPerformanceXIRRloader("call");
  //   const temp_category_val = [];
  //   try {
  //     const response = await axiosInstance.get(
  //       `${Apiurl.assetAllocationChart}${id}`
  //     );
  //     const result = response.data;
  //     const filteredInvestments = result.filter(
  //       (investment) => investment.investmentAssetClass !== null
  //     );

  //     filteredInvestments.map((item) => {
  //       let SingleData = {
  //         name: item.investmentAssetClass,
  //         value: item.cagrXirr,
  //       };
  //       temp_category_val.push(SingleData);
  //     });

  //     setAssetPerformance(temp_category_val);
  //     setAssetPerformanceKeys([]);
  //     setAssetPerformanceXIRRloader(result ? "result" : "noresult");
  //   } catch (error) {
  //     setAssetPerformanceXIRRloader("error");
  //   } finally {
  //   }
  // };

  const fetchPortfolioXirr = async (id) => {
    setPortfolioValuesloader("call");
    let temp_value = [];
    try {
      const response = await axiosInstance.get(`${Apiurl.portfolioXirr}${id}`);
      const result = response.data;

      setPortfolioValues([
        {
          name: "MTD",
          value: result.lastMonthXirr == null ? 0 : result.lastMonthXirr,
        },
        {
          name: "LQ",
          value: result.lastQuarterXirr == null ? 0 : result.lastQuarterXirr,
        },
        {
          name: "YTD",
          value: result.lastOneYearXirr == null ? 0 : result.lastOneYearXirr,
        },
        {
          name: "Inception",
          value:
            result.inceptionToCurrentDateXirr == null
              ? 0
              : result.inceptionToCurrentDateXirr,
        },
      ]);
      setPortfolioValuesKeys(["MTD", "LQ", "YTD", "Inception"]);
      setPortfolioValuesloader(result ? "result" : "noresult");
    } catch (error) {
      setPortfolioValuesloader("error");
    } finally {
    }
  };

  const fetchProductAllocation = async (id) => {
    let temp = [];
    try {
      setProductLoader("call");
      const response = await axiosInstance.get(
        `${Apiurl.productAllocation}${id}`
      );
      const result = response.data;
      setProductGraphData([]);
      setProductAllocationData([]);
      Object.values(result).map((item) => {
        let SingleData = {
          type: item.product,
          value: item.valueInCr,
          typeclass: "text",
          valueclass: "ammount_Value",
        };

        temp.push({
          name: item.product,
          value: Number(item.percentageValue),
        });
        setProductAllocationData((prevData) => [...prevData, SingleData]);
      });

      setProductGraphData(temp);
      setProductLoader(result ? "result" : "noresult");
    } catch (error) {
      setProductLoader("error");
    } finally {
    }
  };

  const fetchSectorExposure = async (id, count) => {
    let temp = [];
    setSectorExposureMapDataLoader("call");
    try {
      const response = await axiosInstance.get(
        `${Apiurl.sectorExposure}${id}/${count}`
      );
      const result = response.data;
      let SectorExposuretemp = [];
      Object.values(result).map((item) => {
        if (count == "top") {
          let data1 = [
            {
              x: item.sectorName,
              y: formattedAmount(Number(item.exposureInPortfolio) + 50),
            },
          ];

          temp.push({
            data: data1,
          });
        }
        if (count == "all") {
          let data2 = {
            sector: item.sectorName == null ? "-" : item.sectorName,
            percentageVlaue:
              item.exposureInPortfolio == null
                ? "-"
                : item.exposureInPortfolio + "%",
          };

          SectorExposuretemp.push(data2);
        }
      });
      if (count == "all") {
        setRowDataSectorExposure(SectorExposuretemp);
      } else {
        setSectorExposureMapData(temp);
      }

      setSectorExposureMapDataLoader(result ? "result" : "noresult");
    } catch (error) {
      setSectorExposureMapDataLoader("error");
    } finally {
    }
  };

  const fetchAMC = async (id, count) => {
    let temp = [];
    setAmcMapDataLoader("call");
    try {
      const response = await axiosInstance.get(
        `${Apiurl.mutualFundAMCExposure}${id}/${count}`
      );
      const result = response.data;
      console.log("temptemp", result);
      let MutualExposuretemp = [];
      Object.values(result).map((item) => {
        if (count == "top") {
          let data1 = [
            {
              x: item.sectorName,
              y: item.exposureInPortfolio + 50,
            },
          ];

          temp.push({
            data: data1,
          });
        }
        if (count == "all") {
          let data2 = {
            name: item.sectorName == null ? "-" : item.sectorName,
            percentage:
              item.exposureInPortfolio == null
                ? "-"
                : item.exposureInPortfolio + "%",
          };

          MutualExposuretemp.push(data2);
        }
      });
      if (count == "all") {
        setRowDataMutualExposure(MutualExposuretemp);
      } else {
        setAMCMapData(temp);
      }

      setAmcMapDataLoader(result ? "result" : "noresult");
    } catch (error) {
      setAmcMapDataLoader("error");
    } finally {
    }
  };

  const fetchMarketCap = async (id) => {
    let temp = [];
    try {
      setMarketcaploader("call");

      const response = await axiosInstance.get(`${Apiurl.marketCap}${id}`);
      const result = response.data;
      Object.values(result).map((item) => {
        temp.push({
          name: item.marketCap,
          value: Number(item.percentage),
        });
      });
      setMarketCap(temp);
      setMarketcaploader(result ? "result" : "noresult");
    } catch (error) {
      setMarketcaploader("error");
    } finally {
    }
  };

  const fetchSecurityExposure = async (id, count) => {
    let temp = [];
    try {
      setSecurityExposureLoader("call");
      const response = await axiosInstance.get(
        `${Apiurl.topHoldings}${id}/${count}`
      );
      const result = response.data;
      let SecurityExposuretemp = [];
      setSecurityExposureMapData([]);
      Object.values(result).map((item) => {
        if (count == "top") {
          let data1 = [
            {
              x: item.securityName,
              y: item.percOfPortfolio + 50,
            },
          ];

          temp.push({
            data: data1,
          });
        }

        if (count == "all") {
          let data2 = {
            name: item.securityName == null ? "-" : item.securityName,
            percentage:
              item.percOfPortfolio == null ? "-" : item.percOfPortfolio + "%",
          };

          SecurityExposuretemp.push(data2);
        }
      });
      if (count == "all") {
        setRowDataSecurityExposure(SecurityExposuretemp);
      } else {
        setSecurityExposureMapData(temp);
      }
      setSecurityExposureLoader(result ? "result" : "noresult");
    } catch (error) {
      setSecurityExposureLoader("error");
    } finally {
    }
  };

  const fetchLastTransaction = async (id) => {
    try {
      setLastTransactionLoader("call");
      const response = await axiosInstance.get(
        `${Apiurl.lastTransaction}${id}`
      );
      const result = response.data;
      setLastTransactionData([]);
      Object.values(result).map((item) => {
        let SingleData = {
          schemeName: item.schemeName,
          trxnType: item.trxnType,
          date: item.date,
          amount: formattedAmount(item.amount),
          typeclass: "text",
          typepercentageOfPortfolio: "ammount_Value",
          valueclass: "ammount_Value",
        };

        setLastTransactionData((prevData) => [...prevData, SingleData]);
      });
      setLastTransactionLoader(result ? "result" : "noresult");
    } catch (error) {
      setTopHoldingDataloader("error");
    } finally {
    }
  };

  const fetchUpcomingCorporateAction = async (id) => {
    try {
      setUpcomingCorporateActionLoader("call");
      const response = await axiosInstance.get(
        `${Apiurl.upcomingCorporateAction}`
      );
      const result = response.data;
      setUpcomingCorporateActionData([]);
      Object.values(result).map((item) => {
        let SingleData = {
          productType: item.productType,
          actionType: item.actionType,
          name: item.name,
          amount: formattedAmount(item.amount),
          typeclass: "text",
          typepercentageOfPortfolio: "ammount_Value",
          valueclass: "ammount_Value",
        };

        setUpcomingCorporateActionData((prevData) => [...prevData, SingleData]);
      });
      setUpcomingCorporateActionLoader(result ? "result" : "noresult");
    } catch (error) {
      setTopHoldingDataloader("error");
    } finally {
    }
  };

  // const Portfolio_Performance_charts_data = [
  //   {
  //     name: "Inception Till Date",
  //     uv: -90,
  //     fill: "black",
  //   },
  //   {
  //     name: "Year Till Date",
  //     uv: 80,
  //   },
  //   {
  //     name: "Quarter Till Date",
  //     uv: 60,
  //   },
  //   {
  //     name: "Month Till date",
  //     uv: 40,
  //   },
  // ];

  const columnSecurityExposure = [
    {
      headerName: "Sr. No.",
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Security Name",
      field: "name",

      sortable: true,
      filter: true,
    },
    {
      headerName: "Percentage",
      field: "percentage",

      sortable: true,
      filter: true,
    },
  ];
  const columnMutualExposure = [
    {
      headerName: "Sr. No.",
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "name",
      field: "name",

      sortable: true,
      filter: true,
    },
    {
      headerName: "Percentage",
      field: "percentage",
      sortable: true,
      filter: true,
    },
  ];
  const columnSectorExposure = [
    {
      headerName: "Sr. No.",
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Sector",
      field: "sector",

      sortable: true,
      filter: true,
    },
    {
      headerName: "Percentage",
      field: "percentageVlaue",
      sortable: true,
      filter: true,
      maxWidth: 180,
    },
  ];
  const handleAllview = (Allview, count) => {
    setDeleteModalOpen(true);
    setAllviewModaType(Allview);
    if (Allview === "Sector_Exposure") {
      fetchSectorExposure(getUserFilterDetails("clientId"), count);
    }
    if (Allview === "Security_Exposure") {
      fetchSecurityExposure(getUserFilterDetails("clientId"), count);
    }
    if (Allview === "Mutual_Exposure") {
      fetchAMC(getUserFilterDetails("clientId"), count);
    }

    newFunctioncolumnDefs(Allview);
    newFunctionRow(Allview);
  };
  const CloseModalOpen = (Allview, count) => {
    setDeleteModalOpen(false);

    if (Allview === "Sector_Exposure") {
      fetchSectorExposure(getUserFilterDetails("clientId"), count);
    }
    if (Allview === "Security_Exposure") {
      fetchSecurityExposure(getUserFilterDetails("clientId"), count);
    }
    if (Allview === "Mutual_Exposure") {
      fetchAMC(getUserFilterDetails("clientId"), count);
    }
  };

  function newFunctioncolumnDefs(Allview) {
    if (Allview === "Security_Exposure") {
      return columnSecurityExposure;
    }

    if (Allview === "Mutual_Exposure") {
      return columnMutualExposure;
    }

    if (Allview === "Sector_Exposure") {
      return columnSectorExposure;
    }
  }
  function newFunctionRow(Allview) {
    if (Allview === "Security_Exposure") {
      return rowDataSecurityExposure;
    }

    if (Allview === "Mutual_Exposure") {
      return rowDataMutualExposure;
    }

    if (Allview === "Sector_Exposure") {
      return rowDataSectorExposure;
    }
  }
  const handleAction = () => {};
  const handleOpenModal = () => {
    setShowModal(true);
    // navigate("/" + encrypt("WatchListModel"));
  };
  const handleCloseModal = () => {
    fetchWatchlist(), setShowModal(false);
  };
  function newFunctionTitle(Allview) {
    if (Allview === "Security_Exposure") {
      return "Security Exposure - Equity";
    }

    if (Allview === "Mutual_Exposure") {
      return "Mutual Fund AMC Exposure";
    }

    if (Allview === "Sector_Exposure") {
      return "Sector Exposure";
    }
  }

  const getTableFunction = (type) => {
    let loaderType;
    if (type == "asset") {
      loaderType = assetDataLoader;
    } else if (type == "topHolding") {
      loaderType = topHoldingDataloader;
    } else if ("product") {
      loaderType = productLoader;
    }
    // console.log("selectedOption", selectedOption);
    if (loaderType === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (loaderType === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (loaderType === "result") {
      return (
        <div className={`Dashbord_AgTabley AgGrid${type}TableCol`}>
          <AgTable
            columnDefs={
              type == "asset"
                ? assetDatacolumnDefs
                : type == "topHolding"
                ? topHoldingcolumnDefs
                : type == "product"
                ? productAllocationDatacolumnDefs
                : []
            }
            rowData={
              type == "asset"
                ? assetData
                : type == "topHolding"
                ? topHolding
                : type == "product"
                ? productAllocationData
                : []
            }
            filenames="Asset Wise AUM"
            StyleClass="btn btn-primary"
            type="table"
            gridOptions={{
              getRowStyle,
            }}
            showSearchBar={false}
            showExportButton={false}
            showResetButton={false}
            pagination={type == "topHolding" ? true : false}
          />
          {/* <TableComponent
            tbodydata={
              type == "asset"
                ? assetData
                : type == "topHolding"
                ? topHolding
                : type == "product"
                ? productAllocationData
                : null
            }
            thead={
              type == "asset"
                ? assetDatathead
                : type == "topHolding"
                ? TopHoldingshead
                : type == "product"
                ? productDatathead
                : null
            }
            totaleCol={3}
          ></TableComponent> */}
        </div>
      );
    } else if (loaderType === "noresult") {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  };

  const getUpcomingCorporateAction = () => {
    // console.log("selectedOption", selectedOption);
    if (upcomingCorporateActionLoader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (upcomingCorporateActionLoader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (upcomingCorporateActionLoader === "result") {
      return (
        <div className="Dashbord_card_body my-3">
          {Object.values(upcomingCorporateActionData).map((item) => {
            return (
              <div className="Systematicdiv">
                <div className="Systematicicon">
                  <img src={upicon} className="my-1" />
                </div>
                <div className="SystematictextDiv">
                  {" "}
                  <div className="SystematictextDiv1">
                    <div className="Systematictexttext1">
                      <p className="mb-0">
                        {item?.productType} - {item?.actionType}{" "}
                      </p>
                      {item?.name}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (upcomingCorporateActionLoader === "noresult") {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  };
  const columnallHoldingData = [
    {
      headerName: "Name",
      field: "productName",
      minWidth: 120,
      maxWidth: 300,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Current Value",
      field: "currentValue",
      minWidth: 150,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.currentValue ? params.data?.currentValue : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Invested Value",
      field: "investedValue",
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.investedValue ? params.data?.investedValue : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      minWidth: 150,
      filter: true,
    },
    {
      headerName: "Annualised Returns",
      field: "xirr",
      minWidth: 180,
      cellRenderer: (params) => {
        return params.data?.xirr ? Math.abs(params.data?.xirr) + "%" : "-";
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Unrealized Gain/Loss",
      field: "unrealizedGainLoss",
      minWidth: 150,
      cellRenderer: (params) => {
        return params.data?.unrealizedGainLoss == null
          ? "0.00 Cr"
          : params.data?.unrealizedGainLoss;
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Realized Gain/Loss",
      field: "realizedGainLoss",
      minWidth: 150,
      cellRenderer: (params) => {
        return params.data?.realizedGainLoss == null
          ? "0.00 Cr"
          : params.data?.realizedGainLoss;
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "STCG",
    //   field: "stcg",
    //   minWidth: 150,
    //   // cellRenderer: (params) => {
    //   //   return formattedAmount(params.data?.stcg ? params.data?.stcg : "-");
    //   // },
    //   cellClass: "textright",
    //   headerClass: "ag-right-aligned-header",
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "LTCG",
    //   field: "ltcg",
    //   minWidth: 150,
    //   // cellRenderer: (params) => {
    //   //   return formattedAmount(params.data?.ltcg ? params.data?.ltcg : "-");
    //   // },
    //   cellClass: "textright",
    //   headerClass: "ag-right-aligned-header",
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Weight",
      field: "weight",
      cellRenderer: (params) => {
        return params?.data?.weight + "%";
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 120,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      minWidth: 150,
      cellRenderer: (params) =>
        ActionButtonsFunction(params, handleTableFunction),
    },
  ];
  const getAccordionComponent = () => {
    // console.log("selectedOption", selectedOption);
    if (accordionLoader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (accordionLoader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (accordionLoader === "result") {
      return (
        <div className="Dashbord_card_body m-3">
          <AgTable
            columnDefs={columnallHoldingData}
            rowData={allHoldingData}
            filenames="Instrument List"
            StyleClass="btn btn-primary"
            type="table"
            gridOptions={{
              getRowStyle,
            }}
          />
        </div>
      );
    } else if (accordionLoader === "noresult") {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  };
  const fetchRangeData = () => {
    // console.log("selectedOption", selectedOption);
    if (investmentChartDataloader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (investmentChartDataloader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (investmentChartDataloader === "result") {
      return (
        <div className="Dashbord_card_body my-3">
          <RangeInputField data={rangeData} />
        </div>
      );
    } else if (investmentChartDataloader === "noresult") {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  };
  const getLastTransaction = () => {
    // console.log("selectedOption", selectedOption);
    if (lastTransactionLoader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (lastTransactionLoader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (lastTransactionLoader === "result") {
      return (
        <div className="LastTransaction">
          {" "}
          {Object.values(lastTransactionData).map((item) => {
            return (
              <div className="Systematicdiv lastTransactiondiv">
                <div className="Systematicicon Systematiciconbar">
                  <img src={LastTransaction} className="my-1" />
                </div>
                <div className="SystematictextDiv">
                  {" "}
                  <div className="SystematictextDiv1">
                    <div className="Systematictexttext1">
                      <strong>
                        {item?.amount} -{" "}
                        {getMomentFromDate(item?.date, "Date&Month")} -{" "}
                        {item?.trxnType}
                      </strong>
                      <br />
                      {item?.schemeName}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (lastTransactionLoader === "noresult") {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  };

  const assetDatacolumnDefs = [
    {
      headerName: "Asset Class",
      field: "type",
      sortable: true,
      minWidth: 150,
      filter: true,
    },

    {
      headerName: "AUM",
      field: "value",
      minWidth: 150,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.currentValue ? params.data?.currentValue : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
  ];
  const topHoldingcolumnDefs = [
    {
      headerName: "Security Name",
      field: "type",
      sortable: true,
      minWidth: 150,
      filter: true,
    },

    {
      headerName: "Current Value",
      field: "value",
      minWidth: 150,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.valueOfPortfolio ? params.data?.valueOfPortfolio : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "% of Portfolio",
      field: "percentageOfPortfolio",
      minWidth: 150,
      maxWidth: 250,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.currentValue ? params.data?.currentValue : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
  ];

  const productAllocationDatacolumnDefs = [
    {
      headerName: "Product Name",
      field: "type",
      sortable: true,
      minWidth: 150,
      filter: true,
    },

    {
      headerName: "AUM",
      field: "value",
      minWidth: 150,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.currentValue ? params.data?.currentValue : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
  ];
  const handleTableFunction = (params, action) => {
    handleEdit(params.data);
    console.log(params.data);
  };

  const handleEdit = useCallback(
    (data) => {
      setShowMoreTable(true);
      setProductName(data.productId);
      handleAccordionOpen(data.productId);
    },
    [productName]
  );

  const handleAccordionOpen = async (id) => {
    setRowData([]);
    setProductAccordionLoader("call");
    // let holding_name;
    // let name = decodeURIComponent(productName);
    // if (name == "Bonds / Debentures") {
    //   holding_name = "Bonds_Debentures";
    // } else {
    //   holding_name = name;
    // }
    // console.log("productName", name);

    try {
      const response = await axiosInstance.get(
        Apiurl.individualHolding + id + `/` + getUserFilterDetails("clientId")
      );
      setRowData(response?.data);
      setProductAccordionLoader(response?.data ? "result" : "noresult");
    } catch (error) {
      setProductAccordionLoader("error");
      console.error("Error during GET request:", error.message);
    } finally {
      // setLoading(false);
    }
  };

  const ProductNamedcolumnDefs = [
    {
      headerName: "Sr.no",
      valueGetter: "node.rowIndex + 1",
      minWidth: 120,
      maxWidth: 120,
    },

    {
      headerName: "Instrument Name",
      field: "instrumentName",
      sortable: true,
      minWidth: 150,
      filter: true,
    },

    {
      headerName: "Current Value",
      field: "currentValue",
      minWidth: 150,
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.currentValue ? params.data?.currentValue : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 150,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Invested Value",
      field: "investedValue",
      // cellRenderer: (params) => {
      //   return formattedAmount(params.data?.investedValue ? params.data?.investedValue : '-');
      // },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      minWidth: 150,
      filter: true,
    },
    {
      headerName: "Annualised Returns",
      field: "xirr",
      minWidth: 180,
      cellRenderer: (params) => {
        return params.data?.xirr ? Math.abs(params.data?.xirr) + "%" : "-";
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Unrealized Gain/Loss",
      field: "unrealizedGainLoss",
      minWidth: 150,
      cellRenderer: (params) => {
        return params.data?.unrealizedGainLoss == null
          ? "0.00 Cr"
          : params.data?.unrealizedGainLoss;
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Realized Gain/Loss",
      field: "realizedGainLoss",
      minWidth: 150,
      cellRenderer: (params) => {
        return params.data?.realizedGainLoss == null
          ? "0.00 Cr"
          : params.data?.realizedGainLoss;
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "STCG",
    //   field: "stcg",
    //   minWidth: 150,
    //   // cellRenderer: (params) => {
    //   //   return formattedAmount(params.data?.stcg ? params.data?.stcg : "-");
    //   // },
    //   cellClass: "textright",
    //   headerClass: "ag-right-aligned-header",
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "LTCG",
    //   field: "ltcg",
    //   minWidth: 150,
    //   // cellRenderer: (params) => {
    //   //   return formattedAmount(params.data?.ltcg ? params.data?.ltcg : "-");
    //   // },
    //   cellClass: "textright",
    //   headerClass: "ag-right-aligned-header",
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Weight",
      field: "weight",
      cellRenderer: (params) => {
        return params?.data?.weight + "%";
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
      minWidth: 120,
      sortable: true,
      filter: true,
    },
  ];

  const ProductTransaction = () => {
    // console.log("selectedOption", selectedOption);
    if (productAccordionLoader === "call") {
      return <Chartloader type={"doughnut"} />;
    } else if (productAccordionLoader === "error") {
      return <ErrorLoader type={"doughnut"}></ErrorLoader>;
    } else if (productAccordionLoader === "result") {
      return (
        <div className="LastTransaction">
          <AgTable
            columnDefs={ProductNamedcolumnDefs}
            rowData={rowData}
            filenames="Instrument List"
            StyleClass="btn btn-primary"
            type="table"
            gridOptions={{
              getRowStyle,
            }}
          />
        </div>
      );
    } else if (productAccordionLoader === "noresult") {
      return <NoresultLoader type={"doughnut"}></NoresultLoader>;
    } else {
      return <Chartloader type={"doughnut"} />;
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const gowatchToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % watchlistData.length); // Loop back to the first item
  };

  const gowatchToPrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + watchlistData.length) % watchlistData.length
    ); // Loop back to the last item
  };

  const currentwatchlists = useMemo(
    () => watchlistData[currentIndex],
    [watchlistData, currentIndex]
  );
  return (
    <div>
      <Pageheader
        pagename="Dashboard"
        getfullName={"Dashboard"}
        Breadcrumbshow={true}
        breadcrumbItems={breadcrumbItems}
        showScroller = {"true"}

      ></Pageheader>
      <div className="pagebody Client_Dashboard">
        <div className="row Client_content_1">
          {/* Main Tile Section */}
          <div className="col-12 col-md-8 aumcharts_sidebar">
            {/* Total and Invest Values with Chart */}
            <div className="row">
              <div className="col-12 col-md-7 d-flex">
                <div className="card-body">
                  <div className="row justify-content-between">
                    <div className="col-6  p-3">
                      <p className="mb-0 ps-4">Total Value</p>
                      <span className="ps-4">
                        <FontAwesomeIcon icon={faUserGroup} className="pe-2" />
                        {totalValues}
                      </span>
                    </div>
                    <div className="col-6 TotalValue p-3">
                      <p className="mb-0 ps-4">Invested Value</p>
                      <span className="ps-4">
                        <FontAwesomeIcon icon={faUserGroup} className="pe-2" />
                        {totalClients}
                      </span>
                    </div>
                  </div>

                  <div className="aumcharts text-center">
                    <ApppieDoughnutChart
                      chartdata={investmentChartData}
                      ChartDataloader={investmentChartDataloader}
                      uint={"Cr"}
                      ChartLegend={true}
                      ChartColor={ThemeChartcolormaste.investmentChartData}
                    />
                  </div>
                </div>
                <div className="aumchartsdiv"></div>
              </div>

              {/* Range Input Section */}
              <div className="col-12 col-md-5">
                <div className="mt-5 card-body d-flex flex-column justify-content-center">
                  <div className="p-3 mt-2">{fetchRangeData()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* News and Carousel Section */}
          <div className="col-12 col-md-4 ">
            {/* First News/Carousel Card */}
            <div className="NewsCarouselClient py-0">
              {" "}
              <NewsSliderClient />
            </div>
            <div className="card Watchlistcard">
              {/* AddWatchlist */}
              <div className="WatchlistcardValuediv">
                {watchlistCount > 0 ? (
                  <>
                    <p className="Watchlistcardtext_name">View Watchlist</p>
                    <div className="Niftybox">
                      <div className="watchBox">
                        <>
                          <div className="watchoverlay">
                            <div className="watchnavigation">
                              {currentIndex !== 0 && (
                                <button
                                  className={`btn Previousbtn btn`}
                                  onClick={gowatchToPrevious}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircleChevronLeft}
                                    style={{
                                      color: "#38479B",
                                      fontSize: "2rem",
                                    }}
                                  />
                                </button>
                              )}

                              <p
                                onClick={() =>
                                  handleOpenModal(
                                    watchlistCount,
                                    currentwatchlists
                                  )
                                }
                              >
                                {currentwatchlists.watchlistEnum}
                              </p>

                              <button
                                className={`btn Nextbtn btn`}
                                onClick={gowatchToNext}
                              >
                                <FontAwesomeIcon
                                  icon={faCircleChevronRight}
                                  style={{
                                    color: "#38479B",
                                    fontSize: "2rem",
                                  }}
                                />
                              </button>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="Watchlistcardtext_name">Add Watchlist</p>
                    <button
                      type="button"
                      className="btn Watchlistcardtext_btn"
                      onClick={() => handleOpenModal(0, "Default")}
                    >
                      <FontAwesomeIcon icon={faAdd} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3 ">
          <div className="col-12">
            <div className="holdingsDiv">
              <span>Holdings (All Values in INR)</span>
              <div className="buttonDiv">
                {/* <ButtonComp
                  wrapperName={"btn_wrapper "}
                  type="button"
                  btnStyle="box"
                  btnText={"Summary Excel"}
                  // onClick={decoratedOnClick}
                /> */}

                {/*                          
                <button className="buttonClass">
                  <FontAwesomeIcon icon={faFileExcel} /> Summary Excel
                </button>
                <button className="buttonClass">
                  <FontAwesomeIcon icon={faFilePdf} /> Summary
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-12">
            <div className=" holdings_acc_Div">
              {/* <AccordionComponent
                pageSt={"Dashbord_Accordion"}
                Accordiondata={allHoldingData}
              /> */}
              {getAccordionComponent()}
            </div>
          </div>
        </div>

        {/* Asset Allocation */}

        <div className="row my-3 ">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">Asset Wise AUM</div>
              <div className="Dashbord_card_body">
                {getTableFunction("asset")}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">Asset Wise Portfolio</div>
              <div className="Dashbord_card_body">
                {" "}
                <div className="Product_Wise_Portfoliocharts text-center">
                  <ApppieDoughnutChart
                    chartdata={assetMapData}
                    ChartDataloader={assetDataLoader}
                    uint={"%"}
                    ChartColor={ThemeChartcolormaste.assetMap}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Holdings */}
        <div className="row my-3 ">
          <div className="col-12 col-sm-12 col-md-12  Client_content_3">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">Top Holdings</div>
              <div className="Dashbord_card_body">
                {/* <TableComponent
                  tbodydata={topHolding}
                  thead={TopHoldingshead}
                  totaleCol={3}
                ></TableComponent> */}
                {getTableFunction("topHolding")}
              </div>
            </div>
          </div>
        </div>

        {/* Product Allocation */}

        <div className="row my-3 ">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">Product Allocation</div>
              <div className="Dashbord_card_body">
                {getTableFunction("product")}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">Product Wise Portfolio</div>
              <div className="Dashbord_card_body">
                <div className="Product_Wise_Portfoliocharts text-center">
                  <ApppieDoughnutChart
                    chartdata={productGraphData}
                    ChartDataloader={productLoader}
                    uint={"%"}
                    ChartColor={ThemeChartcolormaste.ProductWisePortfolio}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Class Performance - Since Inception */}

        <div className="row my-3 ">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">
                Asset Class Performance - Since Inception
              </div>
              <div className="Dashbord_card_body">
                <div className="Asset_Class_Performance_charts text-center">
                  <AppBarChartSingle
                    BarChart_data={assetPerformance}
                    ChartDataloader={assetPerformanceXIRRloader}
                    uint={"%"}
                    Legendvalue={true}
                    Barlayout={"horizontal"}
                    ChartColor={ThemeChartcolormaste.assetPerformancecolor}
                    radiusStyle={[10, 10, 0, 0]}
                    //  horizontal or vertical
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">Portfolio Performance</div>
              <div className="Dashbord_card_body">
                <div className="Portfolio_Performance_charts text-center">
                  <AppBarChartSingle
                    BarChart_data={portfolioValues}
                    ChartDataloader={portfolioValuesloader}
                    uint={"%"}
                    Legendvalue={true}
                    Barlayout={"horizontal"}
                    ChartColor={ThemeChartcolormaste.PortfolioPerformance}
                    radiusStyle={[10, 10, 0, 0]}
                    //  h//  horizontal or vertical
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  Sector Exposure & Mutual Fund AMC Exposure */}

        <div className="row my-3 ">
          <div className="col-12 col-sm-12 col-md-12  Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">
                <div className="Dashbord_all">
                  <p>Top 10 Sector Exposure </p>

                  <button
                    className="btn"
                    onClick={() => handleAllview("Sector_Exposure", "all")}
                  >
                    <FontAwesomeIcon icon={faExpand} />
                  </button>
                </div>
              </div>

              <div className="Dashbord_card_body">
                {" "}
                <div className="Dashbord_card_TreemapChart">
                  <TreemapChart
                    data={sectorExposureMapData}
                    ChartDataloader={sectorExposureMapDataLoader}
                    temcolors={ThemeChartcolormaste.sectorExposureColor}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-12 col-sm-12 col-md-12  Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">
                <div className="Dashbord_all">
                  <p>Top 10 Mutual Fund AMC Exposure</p>

                  <button
                    className="btn"
                    onClick={() => handleAllview("Mutual_Exposure", "all")}
                  >
                    <FontAwesomeIcon icon={faExpand} />
                  </button>
                </div>
              </div>
              <div className="Dashbord_card_body">
                {" "}
                <div className="Dashbord_card_TreemapChart">
                  <TreemapChart
                    data={amcMapData}
                    ChartDataloader={amcMapDataLoader}
                    temcolors={ThemeChartcolormaste.amcMapDataChartColor}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  Market Cap Exposure - Equity */}

        <div className="row my-3 ">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">
                Market Cap Exposure - Equity
              </div>
              <div className="Dashbord_card_body">
                {" "}
                <div className="Market_Cap_charts text-center">
                  <ApppieChart
                    chartdata={marketCap}
                    ChartDataloader={marketCapLoader}
                    uint={"%"}
                    ChartColor={ThemeChartcolormaste.assetPerformancecolor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">Last 5 Transaction</div>
              <div className="Dashbord_card_body my-2">
                {" "}
                {getLastTransaction()}
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-12 col-sm-12 col-md-12  Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">
                <div className="Dashbord_all">
                  <p>Top 10 Security Exposure - Equity</p>

                  <button
                    className="btn"
                    onClick={() => handleAllview("Security_Exposure", "all")}
                  >
                    <FontAwesomeIcon icon={faExpand} />
                  </button>
                </div>
              </div>
              <div className="Dashbord_card_body">
                {" "}
                <div className="Dashbord_card_TreemapChart">
                  <TreemapChart
                    data={securityExposureMapData}
                    ChartDataloader={securityExposureLoader}
                    temcolors={ThemeChartcolormaste.securityExposureChartcolor}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3 ">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">
                Upcoming Corporate Actions
              </div>

              {getUpcomingCorporateAction()}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Client_content_2">
            <div className=" Dashbord_card">
              <div className="Dashbord_card_header">
                Systematic Transactions
              </div>

              <div className=" Dashbord_card_body my-3">
                {systematicTransactionData.map((label) => (
                  <div className="Systematicdiv">
                    <div className="Systematicicon">
                      <img src={Systematicicon} className="my-1" />
                    </div>
                    <div className="SystematictextDiv">
                      {" "}
                      <div className="SystematictextDiv1">
                        <div className="Systematictexttext1">
                          <p className="mb-0">{label.type}</p>
                          <span className="SystematictexttextP1">
                            {" "}
                            Next Installment Date : {label.date}
                          </span>
                        </div>
                      </div>
                      <div className="SystematictextAmmoutn">
                        {label.value}
                        <br />
                        <span className="SystematictexttextP1">
                          {" "}
                          {label.installment}/100
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="Dashbord_card_body">
                <TableComponent
                  Valueclassname={"ammount_Value"}
                  tbodydata={systematicTransactionData}
                  thead={systematicTransactionHead}
                  totaleCol={4}
                ></TableComponent>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <AppModal
        isOpen={showModal}
        onClose={handleCloseModal}
        handleActon={handleAction} // Ensure this is defined and passed correctly
        ModalTitle="Watch List"
        Modalsize="xl"
        buttonConfigs={[{ text: "Continue", icon: null, action: "continue" }]}
        ModalBody={
          // <p>You have been idle for some time. Do you want to continue?</p>
          <div className="row h-75">
            <WatchListPage
              userId={getUserId()}
              WATCHLISTindex={watchlistCount}
              WATCHLISTdata={watchlistCountData}
              WATCHLISTfulldata={watchlistData}
            />
          </div>
        }
        ModalType="Watchlist"
        ModalScrollable={true}
        // ReactOdometervalue={seconds}
      />

      <AppModal
        isOpen={showMoreTable}
        onClose={() => {
          setShowMoreTable(false);
        }}
        Modalsize={"xl"}
        buttonConfigs={[]}
        ModalTitle={"Details View"}
        ModalBody={ProductTransaction()}
        btnText={"Close"}
        show={true}
      />
      {deleteModalOpen && (
        <AppModal
          isOpen={deleteModalOpen}
          onClose={() => CloseModalOpen(allviewModaType, "top")}
          Modalsize={"xl"}
          buttonConfigs={[]}
          ModalTitle={newFunctionTitle(allviewModaType)}
          ModalBody={
            <AgTable
              columnDefs={newFunctioncolumnDefs(allviewModaType)}
              // rowData={rowData}
              rowData={newFunctionRow(allviewModaType)}
              filenames={newFunctionTitle(allviewModaType)}
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
      )}
    </div>
  );
};
function ActionButtonsFunction(params, handleTableFunction) {
  return (
    <ActionButtons
      params={params}
      buttonConfigs={[
        {
          text: "View",
          action: "handleEdit",
          show: true,
        },
      ]}
      handleFunction={handleTableFunction}
    />
  );
}
export default ClientDashboard;
