import React, { useState } from "react";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import "./FundCompare.scss";
import { GetSvgStyleBox } from "../../assets/img/app/GetSvgStyleBox";
import AppLineChart from "../../Component/NewChartComponent/AppLineChart";
import AppBarChartSingle from "../../Component/NewChartComponent/AppBarChartSingle";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { ThemeChartcolormaste } from "../../Component/ComponentsChart/ThemeChartcolormaste";

const FundCompareCard = ({ fundData, lineChartData, selectedRadio }) => {
  if (!fundData || Object.keys(fundData).length === 0) {
    return <p>No data available</p>;
  }

  // Validate chart data
  const hasChartData = Array.isArray(lineChartData) && lineChartData.length > 0;
  console.log(lineChartData, "lineChartData2");

  const {
    schemeName,
    stockName,
    schemeinceptionDate,
    subAssetClass,
    benchmarkIndex,
    minInvestmentAmount,
    exitLoadPeriod,
    currentNav,
    masterFundPerformanceTimePeriod,
    masterBenchMarkPerformanceTimePeriod,
    masterMFSectorHoldingWiseDTOList,
    masterStockPerformanceTimePeriod,
    masterMaturityProfileMap,
    riskMeasureMap,
    portfolioDetailsList,
    aum,
    fundManagers,
    capRank,
    investmentStyle,
    lastClosingPrice,
    weekHigh52,
    weekLow52,
    dailyTradeValue,
    marketCap,
    pe,
    pb,
    divYield,
    expenseRatio,
  } = fundData;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination values
  const totalPages =
    Math.ceil(portfolioDetailsList?.length / itemsPerPage) || 1;
  const currentItems =
    portfolioDetailsList?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || [];

  const Marketdata =
    masterMFSectorHoldingWiseDTOList?.map((item) => ({
      name: item.sectorName,
      value: item.holding,
    })) || [];
  const MarketDatalabels =
    masterMFSectorHoldingWiseDTOList?.map((sector) => sector?.sectorName) || [];

  //  *************** AG-Grid Code Starts *************//
  const portfolioDetailsColumns = [
    // {
    //   headerName: "Sr.no",
    //   valueGetter: "node.rowIndex + 1",
    //   minWidth: 150
    // },
    {
      headerName: "Holdings",
      field: "holdings",
      //   sortable: true,
      //   filter: true,
      minWidth: 150,
    },
    {
      headerName: "% of total",
      field: "percOfPortfolio",
      //   sortable: true,
      //   filter: true,
      minWidth: 100,
    },
    {
      headerName: "Sector",
      field: "sector",
      //   sortable: true,
      //   filter: true,
      minWidth: 100,
    },
  ];

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  //  *************** AG-Grid Code Ends *************//

  return selectedRadio === "directEquity" ? (
    <div className="FundComparecard">
      <p className="Fundname">{stockName}</p>
      <div className="mt-3 mb-2">
        <div className="row d-flex justify-content-center">
          <div className="col-6 Fundcard">
            <p className="FundcardLable">Last Closing Price</p>
            <p className="FundcardVlaue">{lastClosingPrice}</p>
          </div>
          <div className="col-6 Fundcard">
            <p className="FundcardLable">52 Week High</p>
            <p className="FundcardVlaue">{weekHigh52}</p>
          </div>
          <div className="col-6 Fundcard">
            <p className="FundcardLable">52 Week Low</p>
            <p className="FundcardVlaue">{weekLow52}</p>
          </div>
          <div className="col-6 Fundcard">
            <p className="FundcardLable">Daily Trade Value</p>
            <p className="FundcardVlaue">{dailyTradeValue}</p>
          </div>
          <div className="col-6 Fundcard">
            <p className="FundcardLable">Market Cap</p>
            <p className="FundcardVlaue">{marketCap}</p>
          </div>
          <div className="col-6 Fundcard">
            <p className="FundcardLable">PE</p>
            <p className="FundcardVlaue">{pe}</p>
          </div>
          <div className="col-6 Fundcard">
            <p className="FundcardLable">PB</p>
            <p className="FundcardVlaue">{pb}</p>
          </div>
          <div className="col-6 Fundcard">
            <p className="FundcardLable">Div Yield</p>
            <p className="FundcardVlaue">{divYield}</p>
          </div>
        </div>
        {/* Line Chart */}
        <div className="row mt-4 lineChartDiv">
          {lineChartData.length === 0 ? (
            <div className="row">No data available</div>
          ) : (
            <AppLineChart
              chartData={lineChartData}
              dataKeys={["nav", "pv"]}
              xAxisKey="name"
              strokeColors={{ nav: "#38479B", pv: "#00ff00" }}
              height={400}
            />
          )}
        </div>
        {/* Fund & Benchmark Performance */}
        <div>
          <table className="Fund_BSE">
            <thead>
              <tr>
                {/* <th>Fund</th> */}
                <th colSpan="2">
                  {masterStockPerformanceTimePeriod?.benchMark}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-50">1M :</td>
                <td className="w-50">
                  {masterStockPerformanceTimePeriod?.month1Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="w-50">3M :</td>
                <td className="w-50">
                  {masterStockPerformanceTimePeriod?.month3Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="w-50">6M :</td>
                <td className="w-50">
                  {masterStockPerformanceTimePeriod?.month6Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="w-50">1Y :</td>
                <td className="w-50">
                  {masterStockPerformanceTimePeriod?.year1Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="w-50">3Y :</td>
                <td className="w-50">
                  {masterStockPerformanceTimePeriod?.year3Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="w-50">5Y :</td>
                <td className="w-50">
                  {masterStockPerformanceTimePeriod?.year5Value?.toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="col-12">
      <div className="FundComparecard">
        <p className="Fundname">{schemeName}</p>
        <div className="d-flex align-items-center gap-3">
          <p className="navlable">NAV</p>
          <p className="navvalue">₹ {currentNav}</p>
        </div>

        <div className="mt-3 mb-2">
          <ButtonComp
            wrapperName={"btn_wrapper"}
            type="button"
            btnStyle="box"
            btnText={"Buy"}
          />
        </div>
        {/* <div className="mt-4 mb-2">
          <ButtonComp
            wrapperName={"btn_wrapper"}
            type="button"
            btnStyle="box"
            btnText={"Sell"}
          />
        </div> */}

        {/* <div className="row mt-4 lineChartDiv">
          <AppLineChart
            chartData={lineChartData}
            dataKeys={["nav", "pv"]}
            xAxisKey="name"
            strokeColors={{ nav: "#38479B", pv: "#00ff00" }}
            height={300}
          />
        </div> */}

        {/* Line Chart */}
        {lineChartData?.length === 0 ? (
          <div className="row mt-3 mb-3 mx-1">No data available</div>
        ) : (
          <div className="row mt-4 lineChartDiv">
            <AppLineChart
              chartData={lineChartData}
              dataKeys={["nav", "pv"]}
              xAxisKey="name"
              strokeColors={{ nav: "#38479B", pv: "#00ff00" }}
              height={300}
            />
          </div>
        )}

        {/* Fund & Benchmark Performance */}
        <div className="mt-3">
          <table className="Fund_BSE">
            <thead>
              <tr>
                <th>Fund Performance</th>
                <th>{masterBenchMarkPerformanceTimePeriod?.benchMark}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="label">1M :</td>
                <td className="value">
                  {masterFundPerformanceTimePeriod?.month1Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="label">3M :</td>
                <td className="value">
                  {masterFundPerformanceTimePeriod?.month3Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="label">6M :</td>
                <td className="value">
                  {masterFundPerformanceTimePeriod?.month6Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="label">1Y :</td>
                <td className="value">
                  {masterFundPerformanceTimePeriod?.year1Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="label">3Y :</td>
                <td className="value">
                  {masterFundPerformanceTimePeriod?.year3Value?.toFixed(2)}%
                </td>
              </tr>
              <tr>
                <td className="label">5Y :</td>
                <td className="value">
                  {masterFundPerformanceTimePeriod?.year5Value?.toFixed(2)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Style Box */}
        <div className="mt-3">
          <div className="row">
            {capRank && investmentStyle ? (
              <GetSvgStyleBox iconName={`${capRank} ${investmentStyle}`} />
            ) : (
              <span>No Style Box Data Found</span>
            )}
          </div>
        </div>

        {/* Asset Details */}
        <div className="mt-3">
          <div className="row d-flex justify-content-center">
            <div className="col-6 Fundcard">
              <p className="FundcardLable">AUM (in-CR)</p>
              <p className="FundcardVlaue">{aum}</p>
            </div>
            <div className="col-6 Fundcard">
              <p className="FundcardLable">Benchmark Index</p>
              <p className="FundcardVlaue">{benchmarkIndex}</p>
            </div>
            <div className="col-6 Fundcard">
              <p className="FundcardLable">Inception</p>
              <p className="FundcardVlaue">{schemeinceptionDate}</p>
            </div>
            <div className="col-6 Fundcard">
              <p className="FundcardLable">Sub Asset Class</p>
              <p className="FundcardVlaue">{subAssetClass}</p>
            </div>
            <div className="col-6 Fundcard">
              <p className="FundcardLable">Min. Investment</p>
              <p className="FundcardVlaue">Rs. {minInvestmentAmount}</p>
            </div>
            <div className="col-6 Fundcard">
              <p className="FundcardLable">Expense Ratio</p>
              <p className="FundcardVlaue">{expenseRatio?.toFixed(4)}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12 Fundfullcard">
              <p className="FundcardLable">Exit Load & Period</p>
              <p className="FundcardVlaue">{exitLoadPeriod}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12 Fundfullcard">
              <p className="FundcardLable">Fund Manager</p>
              <p className="FundcardVlaue">{fundManagers}</p>
            </div>
          </div>
        </div>

        {/* Risk Measure */}
        <div className="mt-4">
          <table className="Fund_BSE">
            <thead>
              <tr>
                <th colSpan="2">Risk Measure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-50">Sharpe Ratio :</td>
                <td className="w-50">
                  {riskMeasureMap?.SharpeRatio?.toFixed(4)}
                </td>
              </tr>
              <tr>
                <td className="w-50">Sortino :</td>
                <td className="w-50">{riskMeasureMap?.Sortino?.toFixed(4)}</td>
              </tr>
              <tr>
                <td className="w-50">Alpha :</td>
                <td className="w-50">{riskMeasureMap?.Alpha?.toFixed(4)}</td>
              </tr>
              <tr>
                <td className="w-50">Treynor Ratio :</td>
                <td className="w-50">
                  {riskMeasureMap?.TreynorRatio?.toFixed(4)}
                </td>
              </tr>
              <tr>
                <td className="w-50">Beta :</td>
                <td className="w-50">{riskMeasureMap?.Beta?.toFixed(4)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Top 10 Sector Holdings */}
        <div className="mt-3">
          <strong className="d-flex justify-content-center align-items-center mb-3">
            Top 10 Sector Holdings
          </strong>
          <div className="d-flex justify-content-center align-items-center Portfolio_Performance_charts_for_Analytics">
            <div style={{ width: "300px", height: "300px" }}>
              <AppBarChartSingle
                BarChart_data={Marketdata}
                ChartDataloader={"result"}
                uint={"%"}
                Legendvalue={true}
                Barlayout={"vertical"}
                showLegend={false}
                radiusStyle={[0, 10, 10, 0]}
                ChartColor={ThemeChartcolormaste.amcMapDataChartColor}
                labelFontSize={8} // <-- Smaller font size
                containerWidth="80%"
                containerMarginLeft="40px"
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <strong className="d-flex justify-content-center align-items-center mb-3">
            Underlying Holdings
          </strong>

          <div className="holdings-table-header">
            <th className="holdings-table-header-cell">Holdings</th>
            <th className="holdings-table-header-cell">% of total</th>
            <th className="holdings-table-header-cell">Sector</th>
          </div>
          {/* Table Rows - Only showing current page items */}
          {currentItems?.map((row, index) => (
            <div key={index} className="holdings-table-row">
              <td className="holdings-table-cell">{row.holdings}</td>
              <td className="holdings-table-cell-centered">
                {row.percOfPortfolio}
              </td>
              <td className="holdings-table-cell">{row.sector}</td>
            </div>
          ))}
          {/* Pagination */}
          <div className={`row holdings-pagination-container`}>
            <ResponsivePaginationComponent
              total={totalPages}
              current={currentPage}
              onPageChange={setCurrentPage}
              previousLabel="Previous"
              nextLabel="Next"
              maxWidth={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundCompareCard;
