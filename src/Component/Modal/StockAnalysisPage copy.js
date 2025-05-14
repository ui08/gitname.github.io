import {
  faChevronLeft,
  faHeart,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formattedAmount } from "../../util/CurrencyFormattar/formattedAmount";
import AppToaster from "../../util/Toaster/AppToaster";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import { ThemeChartcolormaste } from "../ComponentsChart/ThemeChartcolormaste";
import AppLineChart from "../NewChartComponent/AppLineChart";
import Loader from "./../../util/Loader";
import AgTable from "./../ComponentsTable/AgTable";
import AppBarChartSingle from "./../NewChartComponent/AppBarChartSingle";
import ApppieDoughnutChart from "./../NewChartComponent/ApppieDoughnutChart";
import "./WatchListModal.scss";

const StockAnalysisPage = ({
  stock,
  handleClose,
  id,
  watchData,
  watchlistold,
  Transactionstype,
}) => {
  console.log(
    stock,
    handleClose,
    id,
    watchData,
    watchlistold,
    Transactionstype
  );
  // Transactions data
  const [rowData, setRowData] = useState([]);
  const [riskAnalysisData, setRiskAnalysisData] = useState([]);
  const [riskAnalysisLoader, setRiskAnalysisLoader] = useState("call");
  const [holdingData, setHoldingData] = useState("");
  const [holdingLoader, setHoldingLoader] = useState("call");
  const [marketData, setMarketData] = useState([]);
  const [marketLoader, setMarketLoader] = useState("call");
  const [assetData, setAssetData] = useState([]);
  const [assetLoader, setAssetLoader] = useState("call");
  const [stocksData, setStocksData] = useState({});
  const [lineChartData, setLineChartData] = useState([]);

  const [shortSchemeDescrip, setShortSchemeDescrip] = useState({});
  const filteredData = watchlistold.filter(
    (item) => item.watchlistEnum === watchData
  );
  console.log("FunctionFunction", stock);
  let filteredsearchData;
  // Function to check if types are the same and if values match
  function checkMatching(item1, item2) {
    // Check if type is the same
    if (item1.type === item2.type) {
      // If type is "stocks", check stockName or mfShortDescription
      if (item1.type === "stocks") {
        filteredsearchData = item1;

        return (
          item1.stockName === item2.stockName ||
          item1.mfShortDescription === item2.mfShortDescription
        );
      }
      // If type is "mf", check shortSchemeDescrip or mfShortDescription
      if (item1.type === "mf") {
        filteredsearchData = item1;
        return (
          item1.shortSchemeDescrip === item2.shortSchemeDescrip ||
          item1.mfShortDescription === item2.mfShortDescription
        );
      }
    }
    return false; // Return false if types don't match or no values match
  }

  // Test against the data arrays
  const result = filteredData.some((item1) => checkMatching(item1, stock));

  const [loading, setLoading] = useState(false);



  const WatchListClick = () => {
    
    if (selectedWatchlist === "Remove") {
      removeToWatchList();
    }
    if (selectedWatchlist === "Add") {
      addToWatchList();
    }
  };
  const removeToWatchList = async () => {
    setLoading(true);
    console.log("Transactionstype", Transactionstype, filteredsearchData);
    let Stockid =
      Transactionstype === "search" ? filteredsearchData.id : stock.id;
    try {
      const response = await axiosInstance.delete(
        `${Apiurl.removeWatchlist}` + Stockid
      );
      setLoading(false);
      toast.success(response.data);
      <AppToaster duration={50000} Toastericon={"👏"} />;
      handleClose();
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };
  console.log("watchDatawatchDatawatchData", stock);
  const addToWatchList = async () => {
    let data;

    data = {
      userId: id,
      watchlistEnum: watchData,
      isin: stock?.isin,
      rmFlag: true,
      mfFlag: stock.type == "stocks" ? false : true,
    };

    try {
      const response = await axiosInstance.post(
        `${Apiurl.saveWatchList}`,
        data
      );
      let watchlistresponse = response.data;
      console.log("watchlistresponse", watchlistresponse);
      toast.success(response.data);
      <AppToaster duration={50000} Toastericon={"👏"} />;
      handleClose();
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [stock]);

  const fetchAnalytics = async () => {
    setLoading(true);
    let temp_category_val = [];
    let url;
    if (stock.type == "stocks") {
      url = Apiurl.analyticsStock;
    } else {
      url = Apiurl.analyticsMF;
    }
    try {
      const response = await axiosInstance.get(
        url +
          "ISIN=" +
          `${stock.isin}` +
          `&startDate=${moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD")}&endDate=${moment()
            .subtract(30, "days")
            .format("YYYY-MM-DD")}`,
        data
      );
      let watchlistresponse = response.data;
      setLoading(false);
      if (stock.type == "stocks") {
        setRowData([]);
        setShortSchemeDescrip(null);
        setStocksData(watchlistresponse);
        setRowData([watchlistresponse.masterStockPerformanceTimePeriod]);
        setLineChartData([]);
        Object.values(watchlistresponse.masterStockPerformancevsIndexList).map(
          (item) => {
            let SingleData = {
              name: item.date,
              nav: item.closingPrice,
            };
            setLineChartData((prevData) => [...prevData, SingleData]);
          }
        );
      } else {
        setShortSchemeDescrip(watchlistresponse);
        RiskAnalys(watchlistresponse);

        //Market
        setMarketLoader("call");
        let SingleData = [
          { name: "Large Cap", value: watchlistresponse.largeCap },
          { name: "Mid Cap", value: watchlistresponse.midCap },
          { name: "Small Cap", value: watchlistresponse.smallCap },
          { name: "Other Cap", value: watchlistresponse.otherCap },
        ];

        setMarketData(SingleData);
        setMarketLoader(SingleData.length > 0 ? "result" : "noresult");

        //Holding
        setHoldingLoader("call");

        watchlistresponse.masterMFSectorHoldingWiseDTOList.map((item) => {
          let SingleData = {
            name: item.sectorName,
            value: formattedAmount(item.holding),
          };
          temp_category_val.push(SingleData);
        });

        setHoldingData(temp_category_val);
        setHoldingLoader(temp_category_val.length > 0 ? "result" : "noresult");

        //Asset

        setAssetLoader("call");
        let SingleDataAsset = [
          { name: "Equity Ratio", value: watchlistresponse.equityRatio },
          { name: "Debt Ratio", value: watchlistresponse.debtRatio },
          { name: "Other Ratio", value: watchlistresponse.otherRatio },
        ];

        setAssetData(SingleDataAsset);
        setAssetLoader(SingleDataAsset.length > 0 ? "result" : "noresult");

        //Share
        setRowData(watchlistresponse.portfolioDetailsList);
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const RiskAnalys = useCallback(
    (params) => {
      //Risk Analyzer
      setRiskAnalysisLoader("call");
      const formattedArray = Object.keys(params.riskMeasureMap).map((key) => ({
        name: key,
        value: Number(params.riskMeasureMap[key]), // Round to two decimal places
      }));

      setRiskAnalysisData(formattedArray);
      setRiskAnalysisLoader(formattedArray.length > 0 ? "result" : "noresult");
    },
    [riskAnalysisData]
  );

  function AddWatchlistFun() {
    return (
      <button
        className={
          selectedWatchlist === "Add"
            ? "watchlist_button w-100 add_watchlist_button"
            : "watchlist_button w-100 remove_watchlist_button"
        }
        onClick={() => WatchListClick(selectedWatchlist)}
      >
        <>
          <FontAwesomeIcon icon={faHeart} />{" "}
          {selectedWatchlist === "Add"
            ? "Add To Watchlist"
            : "Remove From Watchlist"}
        </>
      </button>
    );
  }

  const columnDefsMF = [
    {
      headerName: "Holdings",

      field: "holdings",
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "% of Total",

      field: "percOfPortfolio",
      cellRenderer: (params) => {
        return params.data?.percOfPortfolio == null
          ? "-"
          : formattedAmount(params.data?.percOfPortfolio);
      },
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "Sector",
      cellRenderer: (params) => {
        return params.data?.sector == null ? "-" : params.data?.sector;
      },
      field: "sector",
      sortable: true,
      filter: true,
      minWidth: 180,
    },
  ];

  const columnDefsStocks = [
    {
      headerName: "Benchmark",

      field: "benchMark",
      cellRenderer: (params) => {
        return params.data?.benchMark == null ? "-" : params.data?.benchMark;
      },
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "1M",

      field: "month1Value",
      cellRenderer: (params) => {
        return params.data?.month1Value == null
          ? "-"
          : params.data?.month1Value;
      },
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "3M",

      field: "month3Value",
      cellRenderer: (params) => {
        return params.data?.month3Value == null
          ? "-"
          : formattedAmount(params.data?.month3Value);
      },
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "6M",

      field: "month6Value",
      cellRenderer: (params) => {
        return params.data?.month6Value == null
          ? "-"
          : formattedAmount(params.data?.month6Value);
      },
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "1Y",

      field: "year1Value",
      cellRenderer: (params) => {
        return params.data?.year1Value == null
          ? "-"
          : formattedAmount(params.data?.year1Value);
      },
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "3Y",

      field: "year3Value",
      cellRenderer: (params) => {
        return params.data?.year3Value == null
          ? "-"
          : formattedAmount(params.data?.year3Value);
      },
      sortable: true,
      filter: true,
      minWidth: 180,
    },
    {
      headerName: "5Y",

      field: "year5Value",
      cellRenderer: (params) => {
        return params.data?.year5Value == null
          ? "-"
          : formattedAmount(params.data?.year5Value);
      },
      sortable: true,
      filter: true,
      minWidth: 180,
    },
  ];
  return (
    <>
      {!loading ? (
        <>
          <div class="button-container">
            <button
              class="start-button btn"
              onClick={() => {
                handleClose("onClose");
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              class="end-button btn"
              onClick={() => {
                handleClose("onClose");
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          {stock.type == "mf" ? (
            <div className="p-4 mb-5">
              <div className="row mb-2">
                <div className="col-12">
                  <div className="stock-header p-3">
                    <h2 className="schemeName">
                      {shortSchemeDescrip?.schemeName ||
                        shortSchemeDescrip?.stockName}
                    </h2>

                    <p>
                      {shortSchemeDescrip?.investmentStyle} .
                      {shortSchemeDescrip?.sectorFor} ·{" "}
                      {shortSchemeDescrip?.sector} ·{shortSchemeDescrip?.beta}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-12 col-md-4">
                  <div className="row">
                    <div className="col-6">
                      <div className="schemeNameboxNAV">
                        <div className="schemeNameboxNAV_hadertext">
                          Current NAV
                        </div>
                        <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervaluePu">
                          {" "}
                          Rs. {shortSchemeDescrip?.currentNav}{" "}
                          <span>+1.12%</span>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="schemeNameboxNAV">
                        <div className="schemeNameboxNAV_hadertext">CAGR</div>
                        <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervalueNa">
                          {" "}
                          {shortSchemeDescrip?.cagr} %
                          <span className="spanvisibility"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="schemeNameboxInvest">
                        <div className="schemeNameboxInvest_box">
                          <div className="schemeNameboxInvest_hadertext">
                            Min. Investment
                          </div>
                          <div className="schemeNameboxInvest_hadervalue ">
                            {" "}
                            Rs. {shortSchemeDescrip?.minInvestmentAmount}{" "}
                          </div>
                        </div>
                        <div className="schemeNameboxInvest_box">
                          <div className="schemeNameboxInvest_hadertext">
                            AUM
                          </div>
                          <div className="schemeNameboxInvest_hadervalue ">
                            {" "}
                            Rs. {shortSchemeDescrip?.aum}{" "}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="schemeNameboxInvest">
                        <div className="schemeNameboxInvest_box">
                          <div className="schemeNameboxInvest_hadertext">
                            Exit load
                          </div>
                          <div className="schemeNameboxInvest_hadervalue ">
                            {" "}
                            {shortSchemeDescrip?.exitLoadPeriod}{" "}
                          </div>
                        </div>
                        <div className="schemeNameboxInvest_box">
                          <div className="schemeNameboxInvest_hadertext">
                            Expense ratio
                          </div>
                          <div className="schemeNameboxInvest_hadervalue ">
                            {" "}
                            {formattedAmount(
                              shortSchemeDescrip?.expenseRatio
                            )}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mt-3 add_watchlist">
                        {AddWatchlistFun()}
                      </div>
                      <div className="d-flex gap-5 w-100 mt-3 buy_list ">
                        <button className="btn buy_button flex-fill">
                          Buy
                        </button>
                        <button className="btn SIP_button flex-fill">
                          SIP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  {" "}
                  <div class=" RmDashbordcardbody">
                    <AppLineChart
                      chartData={lineChartData}
                      dataKeys={["nav", "pv"]}
                      xAxisKey="name"
                      strokeColors={{ nav: "#ff0000", pv: "#00ff00" }}
                      height={400}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="row my-4">
                <div className="col-12 Managernamebox">
                  <p className="Managernametitle">Fund Manager</p>
                  <p className="Managername">
                    {" "}
                    <div className="faUsericone">
                      {" "}
                      <FontAwesomeIcon icon={faUser} />
                    </div>{" "}
                    {shortSchemeDescrip?.fundManagers}
                  </p>
                </div>
              </div>
              {console.log("riskAnalysisData", riskAnalysisData)}
              <div class="row my-2 ">
                <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                  <div class=" RmDashbord_card">
                    <div class="RmDashbord_card_header">Risk Measure</div>
                    <div class="RmDashbord_card_body">
                      <div className="Portfolio_Performance_charts text-center">
                        <ApppieDoughnutChart
                          chartdata={riskAnalysisData}
                          ChartDataloader={riskAnalysisLoader}
                          uint={""}
                          ChartColor={ThemeChartcolormaste.amcMapDataChartColor}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {console.log("marketData", marketData)}

                <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                  <div class=" RmDashbord_card">
                    <div class="RmDashbord_card_header">
                      Market Capitalisation
                    </div>
                    <div class="RmDashbord_card_body">
                      <div className="Portfolio_Performance_charts text-center">
                        <ApppieDoughnutChart
                          chartdata={marketData}
                          ChartDataloader={marketLoader}
                          uint={""}
                          ChartColor={
                            ThemeChartcolormaste.securityExposureChartcolor
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {console.log("assetData", assetData)}

                <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                  <div class=" RmDashbord_card">
                    <div class="RmDashbord_card_header">Asset Allocation</div>
                    <div class="RmDashbord_card_body">
                      <div className="Portfolio_Performance_charts text-center">
                        <ApppieDoughnutChart
                          chartdata={assetData}
                          ChartDataloader={assetLoader}
                          uint={""}
                          ChartColor={ThemeChartcolormaste.assetMap}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {console.log("holdingData", holdingData)}
                <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xl-6 Rm_content_2">
                  <div class=" RmDashbord_card">
                    <div class="RmDashbord_card_header">
                      Top 10 sector Holdings
                    </div>
                    <div class="RmDashbord_card_body">
                      <div className="Portfolio_Performance_charts text-center">
                        <AppBarChartSingle
                          BarChart_data={holdingData}
                          ChartDataloader={holdingLoader}
                          uint={"%"}
                          Legendvalue={true}
                          Barlayout={"horizontal"}
                          radiusStyle={[10, 10, 0, 0]}
                          ChartColor={
                            ThemeChartcolormaste.securityExposureChartcolor
                          } //  horizontal or vertical
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 mb-3">
                <div class="col-12 col-sm-12 col-md-12  Rm_content_2">
                  <div class=" RmDashbord_card">
                    <div class="RmDashbord_card_header">
                      Share Holder Details
                    </div>
                    <div class="RmDashbord_card_body">
                      <AgTable
                        columnKeys={columnDefsMF.field}
                        columnDefs={columnDefsMF}
                        rowData={rowData}
                        filenames={"Information"}
                        StyleClass={"ag_export_btn ripple_btn"}
                        downloadbtnstext={true}
                        showDatePicker={false}
                        // onSelectionChanged={onSelectionChangedContribution}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {stock.type == "stocks" ? (
            <div className="p-4 mb-5">
              <div className="row mb-2">
                <div className="col-12">
                  <div className="stock-header p-3">
                    <h2 className="schemeName">
                      {stocksData?.schemeName || stocksData?.stockName}
                    </h2>

                    <p>
                      {stocksData?.investmentStyle} .{stocksData?.sectorFor} ·{" "}
                      {stocksData?.sector} ·{stocksData?.beta}{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-3">
                  <div className="schemeNameboxNAV">
                    <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervaluePu">
                      {" "}
                      Rs. {formattedAmount(stocksData?.lastClosingPrice)}
                    </div>
                    <div className="schemeNameboxNAV_hadertext">
                      Last Closing Price
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="schemeNameboxNAV">
                    <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervalueNa">
                      {" "}
                      Rs. {formattedAmount(stocksData?.weekHigh52)}
                      <span className="spanvisibility"></span>
                    </div>
                    <div className="schemeNameboxNAV_hadertext">
                      52 Week High
                    </div>
                  </div>
                </div>

                <div className="col-3">
                  <div className="schemeNameboxNAV">
                    <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervaluePu">
                      {" "}
                      Rs. {formattedAmount(stocksData?.weekLow52)}
                    </div>
                    <div className="schemeNameboxNAV_hadertext">
                      52 Week Low
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="schemeNameboxNAV">
                    <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervalueNa">
                      {" "}
                      Rs. {formattedAmount(stocksData?.dailyTradeValue)}
                      <span className="spanvisibility"></span>
                    </div>
                    <div className="schemeNameboxNAV_hadertext">
                      Daily Traded Volume
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="schemeNameboxNAV">
                    <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervaluePu">
                      {" "}
                      Rs. {formattedAmount(stocksData?.marketCap)}
                    </div>
                    <div className="schemeNameboxNAV_hadertext">Market Cap</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="schemeNameboxNAV">
                    <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervalueNa">
                      {" "}
                      {stocksData?.pe == null
                        ? "-"
                        : formattedAmount(stocksData?.pe)}{" "}
                      <span className="spanvisibility"></span>
                    </div>
                    <div className="schemeNameboxNAV_hadertext">P/E</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="schemeNameboxNAV">
                    <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervaluePu">
                      {" "}
                      {stocksData?.pb == null
                        ? "-"
                        : formattedAmount(stocksData?.pb)}
                    </div>
                    <div className="schemeNameboxNAV_hadertext">P/B</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="schemeNameboxNAV">
                    <div className="schemeNameboxNAV_hadervalue schemeNameboxNAV_hadervalueNa">
                      {" "}
                      {formattedAmount(stocksData?.divYield)}
                      <span className="spanvisibility"></span>
                    </div>
                    <div className="schemeNameboxNAV_hadertext">Div Yield</div>
                  </div>
                </div>

                <div className="col-12 col-md-8"></div>
              </div>
              <hr />
              <div className="col-12">
                <div className="mt-3 add_watchlist">{AddWatchlistFun()}</div>
                <div className="d-flex gap-5 w-100 mt-3 buy_list ">
                  <button className="btn buy_button flex-fill">Buy</button>
                  <button className="btn SIP_button flex-fill">SIP</button>
                </div>
              </div>
              <div class="row my-2 ">
                <div class="col-12 col-sm-12 col-md-12  Rm_content_2">
                  <div class=" RmDashbord_card">
                    {/* <div class="RmDashbord_card_header">Risk Measure</div> */}
                    <div class=" RmDashbordcardbody">
                      <AppLineChart
                        chartData={lineChartData}
                        dataKeys={["nav", "pv"]}
                        xAxisKey="name"
                        strokeColors={{ nav: "#ff0000", pv: "#00ff00" }}
                        height={400}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 mb-3">
                <div class="col-12 col-sm-12 col-md-12  Rm_content_2">
                  <div class=" RmDashbord_card">
                    <div class="RmDashbord_card_header">Performance</div>
                    <div class="RmDashbord_card_body">
                      <AgTable
                        columnKeys={columnDefsStocks.field}
                        columnDefs={columnDefsStocks}
                        rowData={rowData}
                        filenames={"Information"}
                        StyleClass={"ag_export_btn ripple_btn"}
                        downloadbtnstext={true}
                        showDatePicker={false}
                        // onSelectionChanged={onSelectionChangedContribution}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default StockAnalysisPage;
