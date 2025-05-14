"use client";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Apiurl } from "../../util/apiurl";
import axiosInstance from "../../util/axiosInstance";
import AppToaster from "../../util/Toaster/AppToaster";
import AppLineChart from "../NewChartComponent/AppLineChart";
import { formattedAmount } from "./../../util/CurrencyFormattar/formattedAmount";
import ButtonComp from "./../ButtonComp/ButtonComp";
import { ThemeChartcolormaste } from "./../ComponentsChart/ThemeChartcolormaste";
import AgTable from "./../ComponentsTable/AgTable";
import AppBarChartSingle from "./../NewChartComponent/AppBarChartSingle";
import ApppieDoughnutChart from "./../NewChartComponent/ApppieDoughnutChart";
import "./Stock.scss";

const StockAnalysisPage = ({
  stock,
  handleClose,
  watchData,
  Transactionstype,
  watchlistold,
  id,
}) => {
  // Transactions data

  console.log(
    "Transactions data",

    stock,
    handleClose,
    watchData,
    Transactionstype,
    watchlistold,
    id
  );

  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    fetchAnalytics();
  }, []);

  const filteredData = watchlistold.filter(
    (item) => item.watchlistEnum === watchData
  );
  const isISINSame = stock.isin === watchlistold.isin;
  const selectedWatchlist =
    Transactionstype == "list" ? "Remove" : isISINSame ? "Remove" : "Add";
  console.log("stock.type", stock.type);
  const fetchAnalytics = async () => {
    // setLoading(true);
    let temp_category_val = [];
    let url;
    if (stock.type == "stocks" || stock.type == "Stock") {
      url = Apiurl.analyticsStock;
    }
    if (stock.type == "mf" || stock.type == "Mutual Fund") {
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
            .format("YYYY-MM-DD")}`
      );
      let watchlistresponse = response.data;
      // setLoading(false);
      if (stock.type == "stocks" || stock.type == "Stock") {
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
        setLineChartData([]);
        Object.values(watchlistresponse.masterFundPerformancevsIndexList).map(
          (item) => {
            let SingleData = {
              name: item.date,
              nav: item.nav,
            };
            setLineChartData((prevData) => [...prevData, SingleData]);
          }
        );
        //Market
        setMarketLoader("call");
        let SingleData = [
          {
            name: "Large Cap",
            value:
              watchlistresponse.largeCap == null
                ? 0
                : watchlistresponse.largeCap,
          },
          {
            name: "Mid Cap",
            value:
              watchlistresponse.midCap == null ? 0 : watchlistresponse.midCap,
          },
          {
            name: "Small Cap",
            value:
              watchlistresponse.smallCap == null
                ? 0
                : watchlistresponse.smallCap,
          },
          {
            name: "Other Cap",
            value:
              watchlistresponse.otherCap == null
                ? 0
                : watchlistresponse.otherCap,
          },
        ];

        setMarketData(SingleData);
        setMarketLoader(SingleData.length > 0 ? "result" : "noresult");

        //Holding
        setHoldingLoader("call");

        watchlistresponse.masterMFSectorHoldingWiseDTOList.map((item) => {
          let SingleData = {
            name: item.sectorName,
            value: item.holding,
          };
          temp_category_val.push(SingleData);
        });

        setHoldingData(temp_category_val);
        setHoldingLoader(temp_category_val.length > 0 ? "result" : "noresult");

        //Asset

        setAssetLoader("call");
        let SingleDataAsset = [
          {
            name: "Equity Ratio",
            value:
              watchlistresponse.equityRatio == null
                ? 0
                : watchlistresponse.equityRatio,
          },
          {
            name: "Debt Ratio",
            value:
              watchlistresponse.debtRatio == null
                ? 0
                : watchlistresponse.debtRatio,
          },
          {
            name: "Other Ratio",
            value:
              watchlistresponse.otherRatio == null
                ? 0
                : watchlistresponse.otherRatio,
          },
        ];

        setAssetData(SingleDataAsset);
        setAssetLoader(SingleDataAsset.length > 0 ? "result" : "noresult");

        //Share
        setRowData(watchlistresponse.portfolioDetailsList);
      }
    } catch (error) {
      // setLoading(false);
      console.error("Login error: ", error);
    } finally {
      // setLoading(false);
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

    let Stockid = stock.id;
    try {
      const response = await axiosInstance.delete(
        `${Apiurl.removeWatchlist}` + Stockid
      );
      setLoading(false);
      toast.success(response.data);
      <AppToaster duration={50000} Toastericon={"👏"} />;
      handleClose(watchData);
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error);
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  const addToWatchList = async () => {
    let data;

    data = {
      userId: id,
      watchlistEnum: watchData,
      isin: stock?.isin,
      rmFlag: true,
      mfFlag: stock.type == "stocks" || stock.type == "Stock" ? false : true,
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
      handleClose(watchData);
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="dashboardContainer">
      {(stock.type == "mf" || stock.type == "Mutual Fund") && (
        <>
          <h1 className="headerTitle">
            {" "}
            <button
              class="start-button btn"
              onClick={() => {
                handleClose(watchData);
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>{" "}
            {shortSchemeDescrip?.schemeName || shortSchemeDescrip?.stockName}
          </h1>

          <nav className="categoryNav">
            <span className="categoryItem">
              {" "}
              {shortSchemeDescrip?.investmentStyle}
            </span>
            <span className="categoryItem">
              {" "}
              {shortSchemeDescrip?.sectorFor}
            </span>
            <span className="categoryItem">{shortSchemeDescrip?.sector} </span>
            <span className="categoryItem"> {shortSchemeDescrip?.beta} </span>
          </nav>

          <section className="contentLayout">
            <div className="mainContent">
              <div className="statsGrid">
                <div className="statsCard">
                  <h3 className="statsTitle">Current NAV</h3>
                  <p className="statsValue">
                    Rs. {shortSchemeDescrip?.currentNav}
                  </p>
                  <span className="statsChange"></span>
                </div>

                <div className="statsCard">
                  <h3 className="statsTitle">CAGR</h3>
                  <p className="statsValue">{shortSchemeDescrip?.cagr} %</p>
                  <span className="statsChange"> </span>
                </div>
              </div>

              <div className="metricsContainer">
                <div className="metricCard">
                  <div className="metricRow">
                    <span className="metricLabel">Min. Investment</span>
                    <span className="metricValue">
                      Rs. {shortSchemeDescrip?.minInvestmentAmount}{" "}
                    </span>
                  </div>
                  <div className="metricRow">
                    <span className="metricLabel">AUM</span>
                    <span className="metricValue">
                      Rs. {shortSchemeDescrip?.aum} cr
                    </span>
                  </div>
                </div>

                <div className="metricCard">
                  <div className="metricRow">
                    <div className="metricLabelWithIcon">
                      <span>Exit load</span>
                      <div />
                    </div>
                    <span className="metricValueBold">
                      {" "}
                      {shortSchemeDescrip?.exitLoadPeriod}{" "}
                    </span>
                  </div>
                  <div className="metricRow">
                    <div className="metricLabelWithIcon">
                      <span>Expense ratio</span>
                      <div />
                    </div>
                    <span className="metricValue">
                      {" "}
                      {formattedAmount(shortSchemeDescrip?.expenseRatio)}{" "}
                    </span>
                  </div>
                </div>
              </div>

              <div className="actionButtons">
                <button className="watchlistBtn mb-3 p-3">
                  <div />
                  <span>{AddWatchlistFun()}</span>
                </button>
              </div>
              <div className="actionButtons d-flex justify-content-evenly">
                <ButtonComp
                  // key={text}
                  wrapperName={"btn_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={"Buy"}
                  // disabled={disabled}
                  // onClick={() => handleFunction(params, action, disabled)}
                />

                <ButtonComp
                  // key={text}
                  wrapperName={"btn_wrapper"}
                  type="button"
                  btnStyle="box"
                  btnText={"SIP"}
                  // disabled={disabled}
                  // onClick={() => handleFunction(params, action, disabled)}
                />
              </div>
            </div>

            <div className="sideContent">
              <AppLineChart
                chartData={lineChartData}
                dataKeys={["nav", "pv"]}
                xAxisKey="name"
                strokeColors={{ nav: "#ff0000", pv: "#00ff00" }}
                height={400}
              />
            </div>
          </section>

          <hr className="divider" />

          <section className="fundManagerCard">
            <h2 className="fundManagerTitle">Fund Manager</h2>
            <div className="fundManagerInfo">
              <div
                dangerouslySetInnerHTML={{
                  __html: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 24.02C18.3623 24.02 23.52 18.8623 23.52 12.5C23.52 6.13766 18.3623 0.97998 12 0.97998C5.63766 0.97998 0.47998 6.13766 0.47998 12.5C0.47998 18.8623 5.63766 24.02 12 24.02Z" stroke="#4B5FCB" stroke-width="2"/>
               <path d="M14.3679 17.5534C14.2978 16.7797 14.3247 16.2397 14.3247 15.5326C14.6751 15.3488 15.3029 14.1766 15.409 13.1864C15.6845 13.1638 16.1189 12.895 16.2461 11.8337C16.3148 11.264 16.0421 10.9433 15.8761 10.8425C16.3244 9.49423 17.2556 5.32303 14.1538 4.89199C13.8346 4.33135 13.0172 4.04767 11.9549 4.04767C7.70503 4.12591 7.19239 7.25695 8.12407 10.8425C7.95847 10.9433 7.68583 11.264 7.75399 11.8337C7.88167 12.895 8.31559 13.1638 8.59111 13.1864C8.69671 14.1761 9.34951 15.3488 9.70087 15.5326C9.70087 16.2397 9.72727 16.7797 9.65719 17.5534C9.05191 19.1806 5.94343 19.3078 4.15015 20.8769C6.02503 22.7648 9.06343 24.115 12.2698 24.115C15.4762 24.115 19.2452 21.5835 19.8725 20.8928C18.0903 19.3093 14.9746 19.1864 14.3679 17.5534Z" fill="#4B5FCB"/>
             </svg>`,
                }}
              />
              <span className="fundManagerName">
                {shortSchemeDescrip?.fundManagers}
              </span>
            </div>
          </section>

          <section className="chartsGrid">
            <div className="chartCard">
              <h2 className="chartTitle">Risk Measure </h2>
              <div className="chartContent">
                {/* Chart SVG content would go here */}
                <div />
                <div className="Portfolio_Performance_charts text-center">
                  <ApppieDoughnutChart
                    chartdata={riskAnalysisData}
                    ChartDataloader={riskAnalysisLoader}
                    uint={"%"}
                    ChartColor={ThemeChartcolormaste.amcMapDataChartColor}
                  />
                </div>
              </div>
            </div>

            <div className="chartCard">
              <h2 className="chartTitle"> Market Capitalisation</h2>
              <div className="chartContent">
                {/* Chart SVG content would go here */}
                <div />
                <div className="Portfolio_Performance_charts text-center">
                  <ApppieDoughnutChart
                    chartdata={marketData}
                    ChartDataloader={marketLoader}
                    uint={"%"}
                    ChartColor={ThemeChartcolormaste.securityExposureChartcolor}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="chartsGrid">
            <div className="chartCard">
              <h2 className="chartTitle">Asset Allocation </h2>
              <div className="chartContent">
                {/* Chart SVG content would go here */}
                <div />
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

            <div className="chartCard">
              <h2 className="chartTitle">Top 10 sector Holdings </h2>
              <div className="chartContent">
                {/* Chart SVG content would go here */}
                <div />
                <div className="Portfolio_Performance_charts text-center">
                  <AppBarChartSingle
                    BarChart_data={holdingData}
                    ChartDataloader={holdingLoader}
                    uint={"%"}
                    Legendvalue={true}
                    Barlayout={"horizontal"}
                    radiusStyle={[10, 10, 0, 0]}
                    ChartColor={ThemeChartcolormaste.securityExposureChartcolor} //  horizontal or vertical
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="holdingsSection">
            <h2 className="holdingsTitle">Share Holder Details</h2>

            <div className="holdingsBody">
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
          </section>
        </>
      )}
      {(stock.type == "stocks" || stock.type == "Stock") && (
        <>
          <h1 className="headerTitle">
            <button
              class="start-button btn"
              onClick={() => {
                handleClose("onClose");
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {stocksData?.schemeName || stocksData?.stockName}
          </h1>

          <nav className="categoryNav">
            <span className="categoryItem">
              {" "}
              {stocksData?.investmentStyle} .
            </span>
            <span className="categoryItem"> {stocksData?.sectorFor} · .</span>
            <span className="categoryItem">{stocksData?.sector} ·</span>
            <span className="categoryItem"> {stocksData?.beta} </span>
          </nav>

          <section className="contentLayout">
            <div className="mainContent">
              <div className="StockstatsGrid">
                <div className="statsCard">
                  <h3 className="statsTitle"> Last Closing Price</h3>
                  <p className="statsValue">
                    Rs. {formattedAmount(stocksData?.lastClosingPrice)}
                  </p>
                </div>
                <div className="statsCard">
                  <h3 className="statsTitle"> Last Closing Price</h3>
                  <p className="statsValue">
                    Rs. {formattedAmount(stocksData?.lastClosingPrice)}
                  </p>
                </div>
                <div className="statsCard">
                  <h3 className="statsTitle"> 52 Week Low</h3>
                  <p className="statsValue">
                    {" "}
                    {formattedAmount(stocksData?.weekLow52)}
                  </p>
                </div>

                <div className="statsCard">
                  <h3 className="statsTitle"> Daily Traded Volume</h3>
                  <p className="statsValue">
                    {" "}
                    {formattedAmount(stocksData?.dailyTradeValue)}
                  </p>
                </div>

                <div className="statsCard">
                  <h3 className="statsTitle">Market Cap</h3>
                  <p className="statsValue">
                    {" "}
                    {formattedAmount(stocksData?.marketCap)}
                  </p>
                </div>

                <div className="statsCard">
                  <h3 className="statsTitle">P/E</h3>
                  <p className="statsValue">
                    {" "}
                    {stocksData?.pe == null
                      ? "-"
                      : formattedAmount(stocksData?.pe)}{" "}
                  </p>
                </div>

                <div className="statsCard">
                  <h3 className="statsTitle">P/B</h3>
                  <p className="statsValue">
                    {" "}
                    {stocksData?.pb == null
                      ? "-"
                      : formattedAmount(stocksData?.pb)}
                  </p>
                </div>

                <div className="statsCard">
                  <h3 className="statsTitle">Div Yield</h3>
                  <p className="statsValue">
                    {" "}
                    {formattedAmount(stocksData?.divYield)}
                  </p>
                </div>

                <div className="statsCard">
                  <h3 className="statsTitle">Div Yield</h3>
                  <p className="statsValue">
                    {" "}
                    {formattedAmount(stocksData?.divYield)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <>
            <div className="actionButtons">
              <button className="watchlistBtn mb-3 p-3">
                <div />
                <span>{AddWatchlistFun()}</span>
              </button>
            </div>
            <div className="actionButtons d-flex justify-content-evenly">
              <ButtonComp
                // key={text}
                wrapperName={"btn_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"Buy"}
                // disabled={disabled}
                // onClick={() => handleFunction(params, action, disabled)}
              />

              <ButtonComp
                // key={text}
                wrapperName={"btn_wrapper"}
                type="button"
                btnStyle="box"
                btnText={"SIP"}
                // disabled={disabled}
                // onClick={() => handleFunction(params, action, disabled)}
              />
            </div>
          </>
          <section className="holdingsSection my-4">
            <h2 className="holdingsTitle">Share Holder Details</h2>

            <div className="holdingsBody">
              <AppLineChart
                chartData={lineChartData}
                dataKeys={["nav", "pv"]}
                xAxisKey="name"
                strokeColors={{ nav: "#ff0000", pv: "#00ff00" }}
                height={400}
              />
            </div>
          </section>

          <section className="holdingsSection my-4">
            <h2 className="holdingsTitle">Performance</h2>

            <div className="holdingsBody">
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
          </section>
        </>
      )}
    </div>
  );
};

export default StockAnalysisPage;
