import moment from "moment/moment";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { useNavigate } from "react-router-dom";
import Pagehader from "../../../../src/Layout/Pagehader";
import ButtonComp from "../../../Component/ButtonComp/ButtonComp";
import InputText from "../../../Component/ComponentsInput/InputText";
import AgTable from "../../../Component/ComponentsTable/AgTable";
import { Apiurl } from "../../../util/apiurl";
import { getMomentFromDate } from "../../../util/Authenticate";
import axiosInstance from "../../../util/axiosInstance";
import { formattedAmount } from "../../../util/CurrencyFormattar/formattedAmount";
import Loader from "../../../util/Loader";
import { VMPageurl } from "../VMPageurl";
import InputDatePickerWithMoment from "./../../../Component/ComponentsInput/InputDatePickerWithMoment";

export default function VMBondsList() {
  const [rowData, setRowData] = useState();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState([]);

  // custom pageable
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).subtract(1, "days")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPagesize, setPerPagesize] = useState(100);
  const [totalPages, setTotalPages] = useState();
  const [totalElements, setTotalElements] = useState();
  const [rowLoading, setRowLoading] = useState(false);
  useEffect(() => {
    setValue("SelectDate", moment(new Date()).subtract(1, "days"));
    fetchData(currentPage, perPagesize, selectedDate);
  }, []);

  // Callback for Search
  const [SearchValue, setSearchValue] = useState();
  const handleSearchChange = (value) => {
    console.log("Search", value);
    setSearchValue(value);
  };

  // Callback for Date Picker

  const handleDateChange = useCallback(
    (value) => {
      console.log(value);

      setValue("SelectDate", value);
      getfetchData(1, 100, value);
      setSelectedDate(value);
    },
    [selectedDate]
  );
  const [ExportClickvalue, setExportClickvalue] = useState();
  // Callback for Export Button
  const handleExportClick = () => {
    setExportClickvalue(true);
    setResetClickvalue(false);
    setTimeout(() => {
      setExportClickvalue(false);
      setResetClickvalue(false);
    }, 100);
  };

  const [ResetClickvalue, setResetClickvalue] = useState();

  const handleResetClick = () => {
    setExportClickvalue(false);
    setResetClickvalue(true);
    setTimeout(() => {
      setExportClickvalue(false);
      setResetClickvalue(false);
    }, 100);
  };

  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const handlePageChange = useCallback(
    (page, perPagesizeX) => {
      setCurrentPage(page);

      getfetchData(page, perPagesizeX, selectedDate);
    },
    [perPagesize, selectedDate]
  );

  const handlePageSizeChange = useCallback(
    (x) => {
      setPerPagesize(x.target.value);
      setCurrentPage(1);
      getfetchData(1, x.target.value, selectedDate);
    },
    [selectedDate]
  );
  const getfetchData = (getcurrentPage, getperPagesize, getselectedDate) => {
    fetchData(getcurrentPage, getperPagesize, getselectedDate);
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
  const fetchData = async (getcurrentPage, getperPagesize, getselectedDate) => {
    setRowData(null);
    setRowLoading(false);
    setExportClickvalue(false);
    setResetClickvalue(false);

    try {
      const response = await axiosInstance.get(
        Apiurl?.VMBondsList +
          `?tradeDate=${getMomentFromDate(
            getselectedDate,
            "MonthDateYYYY"
          )}&page=${getcurrentPage}&size=${getperPagesize}`
      );
      // custom pageable
      setValue("SelectDate", getselectedDate);
      setPerPagesize(response?.data?.size);
      setTotalPages(response?.data?.totalPages);

      setTotalElements(response?.data?.totalElements);
      // setRowData(response?.data?.content);
      const RowData = [];
      let pageNumber = response?.data?.pageable.pageNumber;
      let pageSize = response?.data?.pageable.pageSize;

      Object.values(response?.data?.content).map((item, index) => {
        console.log(
          "item.numberOfDeals",
          item.numberOfDeals == null,
          item.numberOfDeals == ""
        );
        let SingleData = {
          srNo: pageNumber * pageSize + index + 1, // Computed field
          id: item.id === "" || item.id == null ? "-" : item.id,
          masterId:
            item.masterId === "" || item.masterId == null ? "-" : item.masterId,
          tradeDate:
            item.tradeDate === "" || item.tradeDate == null
              ? "-"
              : getMomentFromDate(item.tradeDate, "Date"),
          stockExchange:
            item.stockExchange === "" || item.stockExchange == null
              ? "-"
              : item.stockExchange,
          issue: item.issue === "" || item.issue == null ? "-" : item.issue,
          issueKind:
            item.issueKind === "" || item.issueKind == null
              ? "-"
              : item.issueKind,
          issuer: item.issuer === "" || item.issuer == null ? "-" : item.issuer,
          country:
            item.country === "" || item.country == null ? "-" : item.country,
          region: item.region === "" || item.region == null ? "-" : item.region,
          subregion:
            item.subregion === "" || item.subregion == null
              ? "-"
              : item.subregion,
          issuerType:
            item.issuerType === "" || item.issuerType == null
              ? "-"
              : item.issuerType,
          securityName:
            item.securityName === "" || item.securityName == null
              ? "-"
              : item.securityName,
          isin: item.isin === "" || item.isin == null ? "-" : item.isin,
          isin144a:
            item.isin144a === "" || item.isin144a == null ? "-" : item.isin144a,
          isinTemporary:
            item.isinTemporary === "" || item.isinTemporary == null
              ? "-"
              : item.isinTemporary,
          tradingModeId:
            item.tradingModeId === "" || item.tradingModeId == null
              ? "-"
              : item.tradingModeId,
          showRu: item.showRu === "" || item.showRu == null ? "-" : item.showRu,
          bidAtClose:
            item.bidAtClose === "" || item.bidAtClose == null
              ? "-"
              : item.bidAtClose,
          askAtClose:
            item.askAtClose === "" || item.askAtClose == null
              ? "-"
              : item.askAtClose,
          lastPrice:
            item.lastPrice === "" || item.lastPrice == null
              ? "-"
              : item.lastPrice,
          openPrice:
            item.openPrice === "" || item.openPrice == null
              ? "-"
              : item.openPrice,
          maxPrice:
            item.maxPrice === "" || item.maxPrice == null ? "-" : item.maxPrice,
          minPrice:
            item.minPrice === "" || item.minPrice == null ? "-" : item.minPrice,
          weightedAvgPrice:
            item.weightedAvgPrice === "" || item.weightedAvgPrice == null
              ? "-"
              : item.weightedAvgPrice,
          numberOfDeals:
            item.numberOfDeals === "" || item.numberOfDeals == null
              ? "-"
              : item.numberOfDeals,
          midPrice:
            item.midPrice === "" || item.midPrice == null ? "-" : item.midPrice,
          turnover:
            item.turnover === "" || item.turnover == null ? "-" : item.turnover,
          yieldToMaturitySimple:
            item.yieldToMaturitySimple === "" ||
            item.yieldToMaturitySimple == null
              ? "-"
              : item.yieldToMaturitySimple,
          putCallDate:
            item.putCallDate === "" || item.putCallDate == null
              ? "-"
              : getMomentFromDate(item.putCallDate, "Date"),
          yieldToPutCallSimple:
            item.yieldToPutCallSimple === "" ||
            item.yieldToPutCallSimple == null
              ? "-"
              : item.yieldToPutCallSimple,
          yieldToMaturityEffective:
            item.yieldToMaturityEffective === "" ||
            item.yieldToMaturityEffective == null
              ? "-"
              : item.yieldToMaturityEffective,
          yieldToPutCallEffective:
            item.yieldToPutCallEffective === "" ||
            item.yieldToPutCallEffective == null
              ? "-"
              : item.yieldToPutCallEffective,
          currentYieldAtWeightedAvgPrice:
            item.currentYieldAtWeightedAvgPrice === "" ||
            item.currentYieldAtWeightedAvgPrice == null
              ? "-"
              : item.currentYieldAtWeightedAvgPrice,
          yieldToMaturityNominal:
            item.yieldToMaturityNominal === "" ||
            item.yieldToMaturityNominal == null
              ? "-"
              : item.yieldToMaturityNominal,
          yieldToPutCallNominal:
            item.yieldToPutCallNominal === "" ||
            item.yieldToPutCallNominal == null
              ? "-"
              : item.yieldToPutCallNominal,
          durationToMaturityDays:
            item.durationToMaturityDays === "" ||
            item.durationToMaturityDays == null
              ? "-"
              : item.durationToMaturityDays,
          modifiedDurationToMaturity:
            item.modifiedDurationToMaturity === "" ||
            item.modifiedDurationToMaturity == null
              ? "-"
              : item.modifiedDurationToMaturity,
          modifiedDurationToPutCall:
            item.modifiedDurationToPutCall === "" ||
            item.modifiedDurationToPutCall == null
              ? "-"
              : item.modifiedDurationToPutCall,
          aci: item.aci === "" || item.aci == null ? "-" : item.aci,
          yieldToMaturityBidEffective:
            item.yieldToMaturityBidEffective === "" ||
            item.yieldToMaturityBidEffective == null
              ? "-"
              : item.yieldToMaturityBidEffective,
          yieldToMaturityAskEffective:
            item.yieldToMaturityAskEffective === "" ||
            item.yieldToMaturityAskEffective == null
              ? "-"
              : item.yieldToMaturityAskEffective,
          yieldToPutCallBidEffective:
            item.yieldToPutCallBidEffective === "" ||
            item.yieldToPutCallBidEffective == null
              ? "-"
              : item.yieldToPutCallBidEffective,
          yieldToPutCallAskEffective:
            item.yieldToPutCallAskEffective === "" ||
            item.yieldToPutCallAskEffective == null
              ? "-"
              : item.yieldToPutCallAskEffective,
          currentYieldAtBidPrice:
            item.currentYieldAtBidPrice === "" ||
            item.currentYieldAtBidPrice == null
              ? "-"
              : item.currentYieldAtBidPrice,
          currentYieldAtAskPrice:
            item.currentYieldAtAskPrice === "" ||
            item.currentYieldAtAskPrice == null
              ? "-"
              : item.currentYieldAtAskPrice,
          yieldToMaturityLastEffective:
            item.yieldToMaturityLastEffective === "" ||
            item.yieldToMaturityLastEffective == null
              ? "-"
              : item.yieldToMaturityLastEffective,
          yieldToPutCallLastEffective:
            item.yieldToPutCallLastEffective === "" ||
            item.yieldToPutCallLastEffective == null
              ? "-"
              : item.yieldToPutCallLastEffective,
          currentYieldAtLastPrice:
            item.currentYieldAtLastPrice === "" ||
            item.currentYieldAtLastPrice == null
              ? "-"
              : item.currentYieldAtLastPrice,
          yieldToMaturityCloseEffective:
            item.yieldToMaturityCloseEffective === "" ||
            item.yieldToMaturityCloseEffective == null
              ? "-"
              : item.yieldToMaturityCloseEffective,
          yieldToPutCallCloseEffective:
            item.yieldToPutCallCloseEffective === "" ||
            item.yieldToPutCallCloseEffective == null
              ? "-"
              : item.yieldToPutCallCloseEffective,
          currentYieldAtClosePrice:
            item.currentYieldAtClosePrice === "" ||
            item.currentYieldAtClosePrice == null
              ? "-"
              : item.currentYieldAtClosePrice,
          yieldToMaturityOpenEffective:
            item.yieldToMaturityOpenEffective === "" ||
            item.yieldToMaturityOpenEffective == null
              ? "-"
              : item.yieldToMaturityOpenEffective,
          yieldToMaturityMaxEffective:
            item.yieldToMaturityMaxEffective === "" ||
            item.yieldToMaturityMaxEffective == null
              ? "-"
              : item.yieldToMaturityMaxEffective,
          yieldToMaturityMinEffective:
            item.yieldToMaturityMinEffective === "" ||
            item.yieldToMaturityMinEffective == null
              ? "-"
              : item.yieldToMaturityMinEffective,
          clearPrice:
            item.clearPrice === "" || item.clearPrice == null
              ? "-"
              : item.clearPrice,
          durationToPutCallDays:
            item.durationToPutCallDays === "" ||
            item.durationToPutCallDays == null
              ? "-"
              : item.durationToPutCallDays,
          marketPriceFromMoscowExchange:
            item.marketPriceFromMoscowExchange === "" ||
            item.marketPriceFromMoscowExchange == null
              ? "-"
              : item.marketPriceFromMoscowExchange,
          marketPrice2FromMoscowExchange:
            item.marketPrice2FromMoscowExchange === "" ||
            item.marketPrice2FromMoscowExchange == null
              ? "-"
              : item.marketPrice2FromMoscowExchange,
          volumeInSecurities:
            item.volumeInSecurities === "" || item.volumeInSecurities == null
              ? "-"
              : item.volumeInSecurities,
          volumeOfTransactionsMonetaryUnitsAtFaceValue:
            item.volumeOfTransactionsMonetaryUnitsAtFaceValue === "" ||
            item.volumeOfTransactionsMonetaryUnitsAtFaceValue == null
              ? "-"
              : item.volumeOfTransactionsMonetaryUnitsAtFaceValue,
          yearsToMaturity:
            item.yearsToMaturity === "" || item.yearsToMaturity == null
              ? "-"
              : item.yearsToMaturity,
          yearsToOffer:
            item.yearsToOffer === "" || item.yearsToOffer == null
              ? "-"
              : item.yearsToOffer,
          pvbp: item.pvbp === "" || item.pvbp == null ? "-" : item.pvbp,
          pvbpToPutCall:
            item.pvbpToPutCall === "" || item.pvbpToPutCall == null
              ? "-"
              : item.pvbpToPutCall,
          convexity:
            item.convexity === "" || item.convexity == null
              ? "-"
              : item.convexity,
          convexityToPutCall:
            item.convexityToPutCall === "" || item.convexityToPutCall == null
              ? "-"
              : item.convexityToPutCall,
          admittedPriceByFFMS:
            item.admittedPriceByFFMS === "" || item.admittedPriceByFFMS == null
              ? "-"
              : item.admittedPriceByFFMS,
          closePrice:
            item.closePrice === "" || item.closePrice == null
              ? "-"
              : item.closePrice,
          currentYield:
            item.currentYield === "" || item.currentYield == null
              ? "-"
              : item.currentYield,
          indicativePrice:
            item.indicativePrice === "" || item.indicativePrice == null
              ? "-"
              : item.indicativePrice,
          indicativePriceType:
            item.indicativePriceType === "" || item.indicativePriceType == null
              ? "-"
              : item.indicativePriceType,
          indicativeYield:
            item.indicativeYield === "" || item.indicativeYield == null
              ? "-"
              : item.indicativeYield,
          indicativeYieldType:
            item.indicativeYieldType === "" || item.indicativeYieldType == null
              ? "-"
              : item.indicativeYieldType,
          bidAskSpreadBps:
            item.bidAskSpreadBps === "" || item.bidAskSpreadBps == null
              ? "-"
              : item.bidAskSpreadBps,
          sourceTableUpdateTime:
            item.sourceTableUpdateTime === "" ||
            item.sourceTableUpdateTime == null
              ? "-"
              : getMomentFromDate(item.sourceTableUpdateTime, "Time"),
          creationDate:
            item.creationDate === "" || item.creationDate == null
              ? "-"
              : getMomentFromDate(item.creationDate, "Date"),
          updateDate:
            item.updateDate === "" || item.updateDate == null
              ? "-"
              : getMomentFromDate(item.updateDate, "Date"),
          aciEurobond:
            item.aciEurobond === "" || item.aciEurobond == null
              ? "-"
              : item.aciEurobond,
          dirtyPriceCurrencyUnits:
            item.dirtyPriceCurrencyUnits === "" ||
            item.dirtyPriceCurrencyUnits == null
              ? "-"
              : item.dirtyPriceCurrencyUnits,
          gspread:
            item.gspread === "" || item.gspread == null ? "-" : item.gspread,
          tspread:
            item.tspread === "" || item.tspread == null ? "-" : item.tspread,
          tspreadBenchmarkId:
            item.tspreadBenchmarkId === "" || item.tspreadBenchmarkId == null
              ? "-"
              : item.tspreadBenchmarkId,
        };
        RowData.push(SingleData);
      });
      setRowData(RowData);

      setRowLoading(true);
    } catch (error) {
      setRowLoading(false);
      console.error("Error during POST request:", error.message);
    } finally {
    }
  };

  const getRowStyle = (params) => {
    return {
      backgroundColor: params.node.rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff", // Alternating colors
    };
  };

  const columnDefs = [
    {
      headerName: t("Common:App_lms_Common_00006"),
      valueGetter: "node.rowIndex + 1",
      filed: "srNo",
      pinned: "left",
      minWidth: 120,
      maxWidth: 120,
    },
    {
      headerName: "Security Name",
      field: "securityName",
      pinned: "left",
      minWidth: 350,
      sortable: true,
      filter: true,
    },
    {
      headerName: "ISIN",
      field: "isin",
      minWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Master Id",
      field: "masterId",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Trade Date",
      field: "tradeDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Dirty Price Currency Units",
      field: "dirtyPriceCurrencyUnits",
      minWidth: 215,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.dirtyPriceCurrencyUnits);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Clear Price",
      field: "clearPrice",
      minWidth: 215,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.clearPrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    // {
    //   headerName: "Issue Id",
    //   field: "issueId",
    //   minWidth: 210,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Stock Exchange Id",
    //   field: "stockExchangeId",
    //   minWidth: 210,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Issue Kind Id",
    //   field: "issueKindId",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    // {
    //   headerName: "Issuer Id",
    //   field: "issuerId",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "Country",
      field: "country",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Region",
      field: "region",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Sub Region",
      field: "subregion",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Issuer Type",
      field: "issuerType",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    // {
    //   headerName: "ISIN",
    //   field: "isin",
    //   minWidth: 215,
    //   sortable: true,
    //   filter: true,
    // },
    {
      headerName: "ISIN 144A",
      field: "isin144a",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "ISIN Temporary",
      field: "isinTemporary",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Trading Mode",
      field: "tradingModeId",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "ShowRU",
      field: "showRu",
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Bid At Close",
      field: "bidAtClose",
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Ask At Close",
      field: "askAtClose",
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Price",
      field: "lastPrice",
      minWidth: 210,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params?.data?.lastPrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Open Price",
      field: "openPrice",
      minWidth: 210,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.openPrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Max Price",
      field: "maxPrice",
      minWidth: 215,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params?.data?.maxPrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Min Price",
      field: "minPrice",
      minWidth: 215,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.minPrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Weighted Avg Price",
      field: "weightedAvgPrice",
      minWidth: 215,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.weightedAvgPrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Number Of Deals",
      field: "numberOfDeals",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.numberOfDeals);
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Mid Price",
      field: "midPrice",
      minWidth: 215,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.midPrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Turnover",
      field: "turnover",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.turnover);
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Maturity Simple",
      field: "yieldToMaturitySimple",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Put Call Date",
      field: "putCallDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Put Call Simple",
      field: "yieldToPutCallSimple",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Maturity Effective",
      field: "yieldToMaturityEffective",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.yieldToMaturityEffective);
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Put Call Effective",
      field: "yieldToPutCallEffective",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Current Yield At Weighted Avg Price",
      field: "currentYieldAtWeightedAvgPrice",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.currentYieldAtWeightedAvgPrice);
      },
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Maturity Nominal",
      field: "yieldToMaturityNominal",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Put Call Nominal",
      field: "yieldToPutCallNominal",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Duration To Maturity Days",
      field: "durationToMaturityDays",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.durationToMaturityDays);
      },
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Modified Duration To Maturity",
      field: "modifiedDurationToMaturity",
      minWidth: 215,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.modifiedDurationToMaturity);
      },
      sortable: true,
      filter: true,
    },
    {
      headerName: "Modified Duration To Put Call",
      field: "modifiedDurationToPutCall",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "ACI",
      field: "aci",
      minWidth: 215,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.aci);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "Yield To Maturity Bid Effective",
      field: "yieldToMaturityBidEffective",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Maturity Ask Effective",
      field: "yieldToMaturityAskEffective",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Put Call Bid Effective",
      field: "yieldToPutCallBidEffective",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Put Call Ask Effective",
      field: "yieldToPutCallAskEffective",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Current Yield At Bid Price",
      field: "currentYieldAtBidPrice",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Current Yield At Ask Price",
      field: "currentYieldAtAskPrice",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Maturity Last Effective",
      field: "yieldToMaturityLastEffective",
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Put Call Last Effective",
      field: "yieldToPutCallLastEffective",
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Current Yield At Last Price",
      field: "currentYieldAtLastPrice",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Maturity Close Effective",
      field: "yieldToMaturityCloseEffective",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.yieldToMaturityCloseEffective);
      },
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Put Call Close Effective",
      field: "yieldToPutCallCloseEffective",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Current Yield At Close Price",
      field: "currentYieldAtClosePrice",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.currentYieldAtClosePrice);
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Maturity Open Effective",
      field: "yieldToMaturityOpenEffective",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Maturity Max Effective",
      field: "yieldToMaturityMaxEffective",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Yield To Maturity Min Effective",
      field: "yieldToMaturityMinEffective",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Duration To Put Call Days",
      field: "durationToPutCallDays",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Market Price From Moscow Exchange",
      field: "marketPriceFromMoscowExchange",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Market Price 2 From Moscow Exchange",
      field: "marketPrice2FromMoscowExchange",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Volume In Securities",
      field: "volumeInSecurities",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Volume Of Transactions Monetary Units At Face Value",
      field: "volumeOfTransactionsMonetaryUnitsAtFaceValue",
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Years To Maturity",
      field: "yearsToMaturity",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Years To Offer",
      field: "yearsToOffer",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "PVBP",
      field: "pvbp",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.pvbp);
      },
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "PVBP To Put Call",
      field: "pvbpToPutCall",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Convexity",
      field: "convexity",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.convexity);
      },
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Convexity To Put Call",
      field: "convexityToPutCall",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Admitted Price By FFMS",
      field: "admittedPriceByFFMS",
      minWidth: 215,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Close Price",
      field: "closePrice",
      minWidth: 180,
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return formattedAmount(params.data?.closePrice);
      },
      cellClass: "textright",
      headerClass: "ag-right-aligned-header",
    },
    {
      headerName: "G Spread",
      field: "gspread",
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "T Spread",
      field: "tspread",
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "T Spread Benchmark",
      field: "tspreadBenchmarkId",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Current Yield",
      field: "currentYield",
      minWidth: 210,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Indicative Price",
      field: "indicativePrice",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Indicative Price Type",
      field: "indicativePriceType",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Indicative Yield",
      field: "indicativeYield",
      cellRenderer: (params) => {
        return formattedAmount(params.data?.indicativeYield);
      },
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Indicative Yield Type",
      field: "indicativeYieldType",
      sortable: true,
      minWidth: 215,
      filter: true,
    },
    {
      headerName: "Bid Ask Spread Bps",
      field: "bidAskSpreadBps",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Source Table Update Time",
      field: "sourceTableUpdateTime",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Creation Date",
      field: "creationDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Update Date",
      field: "updateDate",
      maxWidth: 180,
      minWidth: 180,
      sortable: true,
      filter: true,
    },
    {
      headerName: "ACI Eurobond",
      field: "aciEurobond",
      sortable: true,
      minWidth: 215,
      filter: true,
    },
  ];

  const breadcrumbItems = [
    {
      label: "Bonds",
      // icon: <FontAwesomeIcon icon={faList} />,
    },
  ];
  //EDIT USER
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader pagename={t("Common:App_lms_Common_00269")} />
      ) : (
        <>
          <Pagehader
            pagename={t("Common:App_lms_Common_00272")}
            Breadcrumbshow={true}
            breadcrumbItems={VMPageurl.BondsList}
          ></Pagehader>
          <div className="pagebody">
            {rowLoading && (
              <div className="row">
                <div className="col-12 col-md-3 col-lg-3">
                  <InputText
                    {...useFromProps}
                    useForm={useForm}
                    readOnly={false}
                    disabled={false}
                    type="text"
                    labelName="Search..."
                    registerName={"name"}
                    name={"name"}
                    mandatory={false}
                    onPaste={false}
                    onCopy={false}
                    previewFlag={false}
                    onChange={(e) => {
                      handleSearchChange(e.target.value);
                    }}
                    divClassName={"divClassName"}
                  />
                </div>
                <div className="col-12 col-md-3 col-lg-3">
                  <InputDatePickerWithMoment
                    control={control}
                    setValue={setValue}
                    errors={errors}
                    labelName="Select Date"
                    registerName="SelectDate"
                    mandatory={true}
                    dateformat="DD/MM/YYYY"
                    disabled={false}
                    dateviews={"year"}
                    minDateVal={null}
                    maxDateVal={moment().subtract(1, "days")}
                    onSelect={(value) => handleDateChange(value)}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="table_btn_div">
                    {" "}
                    <ButtonComp
                      wrapperName={"btn_wrapper table_btn"}
                      type="button"
                      btnStyle="box"
                      btnText={"Export"}
                      onClick={handleExportClick}
                    />
                    <ButtonComp
                      wrapperName={"btn_wrapper table_btn"}
                      type="button"
                      btnStyle="box"
                      btnText={"Reset Filter"}
                      onClick={handleResetClick}
                    />
                  </div>
                </div>
              </div>
            )}
            <AgTable
              columnDefs={columnDefs}
              rowData={rowData}
              filenames={
                "Valuation_Master_Bonds_List_" +
                getMomentFromDate(new Date(), "Date&Time")
              }
              onResetClick={handleResetClick}
              ResetClickvalue={ResetClickvalue}
              onExportClick={handleExportClick}
              ExportClickvalue={ExportClickvalue}
              onSearchClick={handleSearchChange}
              SearchClickvalue={SearchValue}
              rowLoading={rowLoading}
              StyleClass="btn btn-primary"
              type="table"
              gridOptions={{
                getRowStyle,
              }}
              pagination={false}
              showSearchBar={false}
              showDatePicker={false}
              showExportButton={false}
              showResetButton={false}
            />
            {/* // custom pageable */}
            {rowLoading && (
              <div className="row mt-3 px-2">
                <div className="col-md-6 col-12">
                  <div className="row">
                    <div className="col-6  selectedPageSize">
                      Page Size :{" "}
                      <select
                        id="page-size"
                        value={perPagesize}
                        onChange={handlePageSizeChange}
                      >
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={500}>500</option>
                        <option value={1000}>1000</option>
                      </select>
                    </div>
                    <div className="col-6  selectedPageSize">
                      Number Of Records : {totalElements}
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 col-12 d-flex
              justify-content-end "
                >
                  <ResponsivePaginationComponent
                    total={totalPages}
                    current={currentPage}
                    onPageChange={(page) =>
                      handlePageChange(page, perPagesize, selectedDate)
                    }
                    previousLabel="Previous"
                    nextLabel="Next"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
